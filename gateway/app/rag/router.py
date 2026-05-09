# gateway/app/rag/router.py
import asyncio
import json
from typing import AsyncIterator, Optional
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from groq import AsyncGroq
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.deps import get_current_user
from app.db.models import User
from app.config import settings
from app.db.session import get_session
from app.market.service import get_candle_history
from app.rag.service import get_relevant_context

router = APIRouter(prefix="/rag", tags=["rag"])

_client: Optional[AsyncGroq] = None


def _get_client() -> AsyncGroq:
    global _client
    if _client is None:
        _client = AsyncGroq(api_key=settings.groq_api_key)
    return _client


# ── In-memory session counters (per user, resets on server restart) ────────────
_session_counts: dict[int, int] = {}
MAX_MESSAGES_PER_SESSION = 20


class ChatRequest(BaseModel):
    question: str
    symbol: Optional[str] = None
    chart_prompt: str = ""
    mode: str = "simulator"
    lesson_snapshot: str = ""
    lesson_title: str = ""


class ChatResponse(BaseModel):
    answer: str
    grounding: str
    messages_used: int


def _simulator_system_prompt(chart_prompt: str, market_context: str, rag_context: str) -> str:
    return f"""You are a highly skilled and patient financial tutor for Tradewise, an Indian paper-trading simulator.
Your goal is to guide the user through a professional market analysis process, teaching them how to "read" the situation instead of just giving answers.

STRICT GUARD-RAILS:
- You may ONLY answer questions related to: trading, stock markets, personal finance, technical analysis, and wealth management.
- For any other topics, politely decline and steer back to finance.
- Frame all suggestions as educational analysis, not absolute financial advice.

INSTRUCTIONS (TEACHING BY GUIDING):
1. USE MARKDOWN: Always use clear Markdown formatting (bullet points, bold text, numbered lists) for better readability.
2. ANALYZE DATA: Look at the RECENT MARKET DATA and CHART SNAPSHOT. Identify current trends, support/resistance levels, or momentum.
3. ENCOURAGE CHART TOOLS: Explicitly ask the user to turn on specific technical overlays available in the simulator (e.g., "Try turning on the **SMA 20** and **EMA 9**...") and explain exactly what they should look for in those lines to confirm your analysis.
4. REFERENCE RISK: Point out relevant risk metrics (Volatility, Sharpe Ratio, VaR, Max Drawdown, Beta) to explain why a move is risky or stable.
5. ACTIONABLE GUIDANCE: Conclude with a clear recommendation (**Buy, Sell, Hold, or Staged Entry** at specific rates). 
6. EXPLAIN THE "WHY": Step-by-step, explain the logic behind your recommendation so the user learns how to perform this analysis themselves next time.

EXTRACTED KNOWLEDGE (RAG):
{rag_context or "No additional technical documents found for this query."}

RECENT MARKET DATA (Last 10 Ticks):
{market_context or "No live data available yet."}

CHART SNAPSHOT (Visual Context):
{chart_prompt or "No visual snapshot provided."}"""


def _lesson_system_prompt(lesson_snapshot: str, lesson_title: str) -> str:
    return f"""You are a patient financial education tutor for Tradewise Academy.
Your goal is to help the user understand the lesson they are reading and explain concepts step-by-step.

STRICT GUARD-RAILS:
- Ground every answer strictly in the provided Lesson Context. If a question is outside the scope of this lesson, say: "That's a great question, but it's covered in a later level of the Academy. For now, let's focus on {lesson_title}."
- Only discuss trade, money, and personal finance.
- Label every response start with: "📚 Grounded to: {lesson_title}"

LESSON CONTEXT:
{lesson_snapshot or "No lesson context provided."}"""


async def _get_market_context(db: AsyncSession, symbol: str) -> str:
    try:
        # Fetch last 10 candles
        candles = await get_candle_history(db, symbol, limit=10)
        if not candles:
            return ""
        
        ctx = []
        for c in candles:
            # Format: [Time] Price: XXX (Vol: YYY)
            ctx.append(f"Price: ₹{c['close']:.2f} (H: {c['high']:.2f} L: {c['low']:.2f})")
        
        return "\n".join(ctx)
    except Exception:
        return ""


async def _call_groq(system: str, question: str) -> str:
    client = _get_client()
    response = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_completion_tokens=500,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": question},
        ],
    )
    return response.choices[0].message.content or ""


async def _stream_groq(system: str, question: str) -> AsyncIterator[str]:
    client = _get_client()
    stream = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_completion_tokens=500,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": question},
        ],
        stream=True,
    )
    async for chunk in stream:
        text = chunk.choices[0].delta.content
        if text:
            yield text


@router.post("/chat", response_model=ChatResponse)
async def chat(
    body: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    user_id = current_user.id

    count = _session_counts.get(user_id, 0)
    if count >= MAX_MESSAGES_PER_SESSION:
        return ChatResponse(
            answer="You've reached the 20-message limit for this session. Refresh the page to start a new session.",
            grounding="rate-limited",
            messages_used=count,
        )

    _session_counts[user_id] = count + 1

    if body.mode == "lesson":
        system = _lesson_system_prompt(body.lesson_snapshot, body.lesson_title)
        grounding = f"📚 {body.lesson_title}" if body.lesson_title else "lesson"
    else:
        market_ctx = ""
        rag_ctx = await get_relevant_context(body.question)
        if body.symbol:
            market_ctx = await _get_market_context(db, body.symbol)
        system = _simulator_system_prompt(body.chart_prompt, market_ctx, rag_ctx)
        grounding = "chart"

    answer = await _call_groq(system, body.question)
    if not answer:
        answer = "I couldn't generate a response. Please try rephrasing your question."

    return ChatResponse(
        answer=answer,
        grounding=grounding,
        messages_used=_session_counts[user_id],
    )


@router.post("/chat/stream")
async def chat_stream(
    body: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """SSE streaming endpoint — returns text/event-stream."""
    user_id = current_user.id

    count = _session_counts.get(user_id, 0)
    if count >= MAX_MESSAGES_PER_SESSION:
        async def _limit():
            yield "data: [RATE_LIMITED]\n\n"
        return StreamingResponse(_limit(), media_type="text/event-stream")

    _session_counts[user_id] = count + 1

    if body.mode == "lesson":
        system = _lesson_system_prompt(body.lesson_snapshot, body.lesson_title)
    else:
        market_ctx = ""
        rag_ctx = await get_relevant_context(body.question)
        if body.symbol:
            market_ctx = await _get_market_context(db, body.symbol)
        system = _simulator_system_prompt(body.chart_prompt, market_ctx, rag_ctx)

    async def _generate():
        async for text in _stream_groq(system, body.question):
            escaped = text.replace("\n", "\\n")
            yield f"data: {escaped}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(_generate(), media_type="text/event-stream")
