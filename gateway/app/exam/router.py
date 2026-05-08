# gateway/app/exam/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_session
from app.auth.deps import get_current_user
from app.db.models import User
from app.exam.schemas import (
    StartExamRequest, StartExamResponse,
    SubmitExamRequest, SubmitExamResponse,
    ExamStatusResponse,
)
from app.exam.service import start_exam, submit_exam, get_exam_status

router = APIRouter(prefix="/api/exam", tags=["exam"])


@router.get("/status/{user_id}", response_model=ExamStatusResponse)
async def exam_status(
    user_id: int,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    return await get_exam_status(user_id, db)


@router.post("/start", response_model=StartExamResponse)
async def start(
    body: StartExamRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        return await start_exam(body.userId, body.seeds, db)
    except ValueError as e:
        raise HTTPException(status_code=429, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/submit", response_model=SubmitExamResponse)
async def submit(
    body: SubmitExamRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        return await submit_exam(body.sessionId, body.userId, body.answers, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
