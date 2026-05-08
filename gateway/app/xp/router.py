# gateway/app/xp/router.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.auth.deps import get_current_user
from app.db.models import User
from app.xp.service import get_user_progress, award_xp
from app.badges.service import check_badges

router = APIRouter(prefix="/api/xp", tags=["xp"])


class AwardXPRequest(BaseModel):
    userId: int
    lessonId: str
    lessonXpReward: int
    score: int


@router.get("/{user_id}")
async def get_xp(
    user_id: int,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    progress = await get_user_progress(user_id, db)
    if not progress:
        raise HTTPException(status_code=404, detail="User not found")
    return progress


@router.post("/award")
async def award_xp_endpoint(
    body: AwardXPRequest,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        result = await award_xp(body.userId, body.lessonXpReward, body.score, db)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    new_badges = await check_badges(result["user"], db)
    return {
        "xpEarned": result["xpEarned"],
        "newTotal": result["newTotal"],
        "leveledUp": result["leveledUp"],
        "currentLevel": result["currentLevel"],
        "unlockedLevels": result["unlockedLevels"],
        "newBadges": new_badges,
    }
