# gateway/app/rag/router.py
import asyncio
from typing import AsyncIterator, Optional
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import anthropic

from app.auth.deps import get_current_user
from app.db.models import User
from app.config import settings

router = APIRouter(prefix="/rag", tags=["rag"])

_client: Optional[anthropic.AsyncAnthropic] = None


def _get_client() -> anthropic.AsyncAnthropic:
    global _client
    if _client is None:
        _client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
    return _client


# ── In-memory session counters (per user, resets on server restart) ────────────
# Maps user_id → message count for current session
_session_counts: dict[int, int] = {}
MAX_MESSAGES_PER_SESSION = 20


class ChatRequest(BaseModel):
    question: str
    chart_prompt: str = ""
    mode: str = "simulator"          # "simulator" | "lesson"
    lesson_snapshot: str = ""        # serialised lesson context (lesson mode only)
    lesson_title: str = ""           # for grounding label


class ChatResponse(BaseModel):
    answer: str
    grounding: str
    messages_used: int


def _simulator_system_prompt(chart_prompt: str) -> str:
    return f"""You are a chart analysis assistant for Tradewise, an Indian paper-trading simulator.
You help retail investors understand candlestick charts and price action.

STRICT RULES:
- You may ONLY discuss the chart data provided below. Do NOT discuss any other stocks, portfolios, or market data.
- Keep every response under 200 words.
- Never give buy/sell advice as absolute instructions — frame as analysis ("the chart suggests…").
- Do not discuss the Market Server, order execution, or backend systems.
- If you cannot answer from the chart data alone, say so clearly.

CHART DATA (what the user currently sees):
{chart_prompt or "No chart data available yet."}"""


def _lesson_system_prompt(lesson_snapshot: str, lesson_title: str) -> str:
    return f"""You are a financial education tutor for Tradewise Academy.
You help Indian retail investors understand the lesson they are currently reading.

STRICT RULES:
- Ground every answer in the lesson facts provided below. Do NOT invent data, figures, or citations.
- Keep every response under 200 words.
- If the user asks something not covered by this lesson, say: "That's outside this lesson — explore Level X for that topic."
- Never discuss stock trading execution, the simulator, or make buy/sell recommendations.
- Label every response start with: "📚 Grounded to: {lesson_title}"

LESSON CONTEXT:
{lesson_snapshot or "No lesson context provided."}"""


async def _stream_claude(system: str, question: str) -> AsyncIterator[str]:
    client = _get_client()
    async with client.messages.stream(
        model="claude-sonnet-4-6",
        max_tokens=400,
        system=system,
        messages=[{"role": "user", "content": question}],
    ) as stream:
        async for text in stream.text_stream:
            yield text


@router.post("/chat", response_model=ChatResponse)
async def chat(
    body: ChatRequest,
    current_user: User = Depends(get_current_user),
):
    user_id = current_user.id

    # Rate-limit check
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
        system = _simulator_system_prompt(body.chart_prompt)
        grounding = "chart"

    # Collect streamed response into a single string (non-streaming endpoint for simplicity)
    # SSE streaming version available at /rag/chat/stream
    chunks: list[str] = []
    async for chunk in _stream_claude(system, body.question):
        chunks.append(chunk)

    answer = "".join(chunks).strip()
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
        system = _simulator_system_prompt(body.chart_prompt)

    async def _generate():
        async for text in _stream_claude(system, body.question):
            # SSE format
            escaped = text.replace("\n", "\\n")
            yield f"data: {escaped}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(_generate(), media_type="text/event-stream")
