# gateway/app/streak/service.py
from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models import User


def _multiplier_for(streak: int) -> float:
    if streak >= 30:
        return 2.0
    if streak >= 14:
        return 1.5
    if streak >= 7:
        return 1.25
    return 1.0


async def checkin(user_id: int, db: AsyncSession) -> dict:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise ValueError("User not found")

    today = date.today()
    last = user.last_active_date

    if last == today:
        # Already checked in today — idempotent
        return {
            "currentStreak": user.current_streak,
            "multiplier": float(user.streak_multiplier),
            "freezeAvailable": _freeze_available(user.current_streak),
        }

    if last is None:
        new_streak = 1
    elif last == today - timedelta(days=1):
        # Consecutive day
        new_streak = user.current_streak + 1
    elif last == today - timedelta(days=2) and _freeze_available(user.current_streak):
        # One missed day within 7-day window — freeze grace
        new_streak = user.current_streak + 1
    else:
        # Streak broken
        new_streak = 1

    new_multiplier = _multiplier_for(new_streak)
    new_longest = max(user.longest_streak, new_streak)

    await db.execute(
        update(User)
        .where(User.id == user_id)
        .values(
            current_streak=new_streak,
            longest_streak=new_longest,
            last_active_date=today,
            streak_multiplier=new_multiplier,
        )
    )
    await db.commit()

    return {
        "currentStreak": new_streak,
        "multiplier": new_multiplier,
        "freezeAvailable": _freeze_available(new_streak),
    }


def _freeze_available(streak: int) -> bool:
    # One freeze grace per 7-day window: available when streak is a multiple of 7
    return streak > 0 and streak % 7 != 0
