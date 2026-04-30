# gateway/app/rag/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.auth.deps import get_current_user
from app.db.models import User
router = APIRouter(prefix="/rag", tags=["rag"])
class ChatRequest(BaseModel):
    question: str
    chart_prompt: str
class ChatResponse(BaseModel):
    answer: str
@router.post("/chat", response_model=ChatResponse)
async def chat(
    body: ChatRequest,
    _: User = Depends(get_current_user),
):
    # stub response until Phase 5 RAG pipeline is wired
    # replace this function body with rag/service.py call once Qdrant + books are ready
    if not body.chart_prompt or "No chart data" in body.chart_prompt:
        return ChatResponse(answer="No chart data is available yet. Please wait for the market to open and some candles to appear.")
    return ChatResponse(
        answer=(
            "RAG pipeline not yet configured — books have not been ingested yet. "
            "Once Phase 5 is complete, I will be able to analyse the chart and provide "
            "buy/sell suggestions based on candlestick patterns from the knowledge base."
        )
    )