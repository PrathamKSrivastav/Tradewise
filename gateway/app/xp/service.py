# gateway/app/xp/service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models import User

# XP needed to unlock each level
LEVEL_XP_THRESHOLDS = {
    1: 0,
    2: 120,
    3: 270,
    4: 470,
    5: 670,
    6: 850,
    7: 1050,
    8: 1270,
}

def _streak_multiplier(streak: int) -> float:
    if streak >= 30:
        return 2.0
    if streak >= 14:
        return 1.5
    if streak >= 7:
        return 1.25
    return 1.0

def _compute_unlocked_levels(total_xp: int) -> list[int]:
    return [lvl for lvl, threshold in LEVEL_XP_THRESHOLDS.items() if total_xp >= threshold]

async def get_user_progress(user_id: int, db: AsyncSession) -> dict:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        return {}
    return {
        "totalXP": user.total_xp,
        "currentLevel": user.current_level,
        "currentStreak": user.current_streak,
        "streakMultiplier": float(user.streak_multiplier),
        "unlockedLevels": user.unlocked_levels,
        "badges": user.badges,
    }

async def award_xp(user_id: int, lesson_xp_reward: int, score: int, db: AsyncSession) -> dict:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise ValueError("User not found")

    multiplier = float(user.streak_multiplier)
    perfect_bonus = 10 if score == 100 else 0
    xp_earned = int(lesson_xp_reward * multiplier) + perfect_bonus

    new_total = user.total_xp + xp_earned
    new_unlocked = _compute_unlocked_levels(new_total)
    new_level = max(new_unlocked)
    leveled_up = new_level > user.current_level

    await db.execute(
        update(User)
        .where(User.id == user_id)
        .values(
            total_xp=new_total,
            current_level=new_level,
            unlocked_levels=new_unlocked,
        )
    )
    await db.commit()

    # re-fetch for badge check downstream
    result = await db.execute(select(User).where(User.id == user_id))
    updated_user = result.scalar_one()

    return {
        "xpEarned": xp_earned,
        "newTotal": new_total,
        "leveledUp": leveled_up,
        "currentLevel": new_level,
        "unlockedLevels": new_unlocked,
        "user": updated_user,
    }
