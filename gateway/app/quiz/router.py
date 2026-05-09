# gateway/app/quiz/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.auth.deps import get_current_user
from app.db.models import User
from app.quiz.schemas import GenerateRequest, GenerateResponse, SubmitRequest, SubmitResponse
from app.quiz.service import generate_quiz, submit_quiz

router = APIRouter(prefix="/api/quiz", tags=["quiz"])

# Lesson XP rewards — kept here to avoid importing frontend content objects
_LESSON_XP: dict[str, int] = {}  # populated by /api/quiz/register at startup or seeded manually


def register_lesson_xp(lesson_id: str, xp_reward: int) -> None:
    _LESSON_XP[lesson_id] = xp_reward


@router.post("/generate", response_model=GenerateResponse)
async def generate(
    body: GenerateRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    # quiz_seeds must be supplied by the frontend in the request for now
    # (lesson content lives on the frontend side)
    raise HTTPException(
        status_code=501,
        detail="Call /api/quiz/generate-with-seeds — seeds must be provided by the client",
    )


@router.post("/generate-with-seeds", response_model=GenerateResponse)
async def generate_with_seeds(
    body: GenerateRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        result = await generate_quiz(body.lessonId, body.userId, body.seeds, body.difficulty, db)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/submit", response_model=SubmitResponse)
async def submit(
    body: SubmitRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        return await submit_quiz(
            body.sessionId,
            body.lessonId,
            body.userId,
            body.xpReward,
            body.answers,
            db,
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
