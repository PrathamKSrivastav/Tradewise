# gateway/app/leaderboard/router.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.deps import get_current_user
from app.db.session import get_session
from app.db.models import User
from app.leaderboard.service import get_xp_leaderboard, get_trader_leaderboard

router = APIRouter(prefix="/api/leaderboard", tags=["leaderboard"])


@router.get("")
async def xp_leaderboard(
    limit: int = Query(default=50, ge=1, le=50),
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """XP-based Academy leaderboard — top 50 + caller's rank."""
    return await get_xp_leaderboard(session, current_user.id, limit)


@router.get("/trader")
async def trader_leaderboard(
    limit: int = Query(default=20, ge=1, le=50),
    _: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    """PnL-based Simulator leaderboard (original)."""
    return await get_trader_leaderboard(session, limit)
