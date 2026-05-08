# gateway/app/badges/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.auth.deps import get_current_user
from app.db.models import User
from app.badges.service import get_badges

router = APIRouter(prefix="/api/badges", tags=["badges"])


@router.get("/{user_id}")
async def badges_for_user(
    user_id: int,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    try:
        return await get_badges(user_id, db)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
