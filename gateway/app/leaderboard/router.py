# gateway/app/leaderboard/router.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.deps import get_current_user
from app.db.session import get_session
from app.db.models import User
from app.leaderboard.service import get_leaderboard
router = APIRouter(prefix="/leaderboard", tags=["leaderboard"])
@router.get("/")
async def leaderboard(
    limit: int = Query(default=20, ge=1, le=50),
    _: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    return await get_leaderboard(session, limit)