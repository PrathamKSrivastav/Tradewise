# gateway/app/streak/router.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.auth.deps import get_current_user
from app.db.models import User
from app.streak.service import checkin

router = APIRouter(prefix="/api/streak", tags=["streak"])


class CheckinRequest(BaseModel):
    userId: int


@router.post("/checkin")
async def streak_checkin(
    body: CheckinRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        return await checkin(body.userId, db)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
