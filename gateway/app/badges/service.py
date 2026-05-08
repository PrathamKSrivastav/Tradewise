# gateway/app/badges/service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models import User, Trade, QuizHistory

BADGE_DEFINITIONS = {
    "first-lesson": "Complete your first lesson",
    "first-trade": "Place your first trade in the simulator",
    "streak-7": "Maintain a 7-day learning streak",
    "streak-30": "Maintain a 30-day learning streak",
    "quiz-perfect": "Score 100% on any quiz",
    "level-3-complete": "Complete Level 3: Technical Analysis",
    "portfolio-10": "Achieve 10%+ portfolio return",
    "market-ready": "Pass the Level 8 final exam",
}


async def check_badges(user: User, db: AsyncSession) -> list[str]:
    """Evaluate all badge conditions and award any newly earned badges. Returns list of newly earned badge IDs."""
    earned = set(user.badges or [])
    newly_earned: list[str] = []

    async def _award(badge_id: str):
        if badge_id not in earned:
            earned.add(badge_id)
            newly_earned.append(badge_id)

    # first-lesson
    if len(user.completed_lessons or []) >= 1:
        await _award("first-lesson")

    # first-trade
    trade_result = await db.execute(
        select(Trade).where(Trade.user_id == user.id).limit(1)
    )
    if trade_result.scalar_one_or_none():
        await _award("first-trade")

    # streak badges
    if user.current_streak >= 7:
        await _award("streak-7")
    if user.current_streak >= 30:
        await _award("streak-30")

    # quiz-perfect
    perfect_result = await db.execute(
        select(QuizHistory).where(QuizHistory.user_id == user.id, QuizHistory.score == 100).limit(1)
    )
    if perfect_result.scalar_one_or_none():
        await _award("quiz-perfect")

    # level-3-complete
    if 4 in (user.unlocked_levels or []):
        await _award("level-3-complete")

    if newly_earned:
        await db.execute(
            update(User).where(User.id == user.id).values(badges=list(earned))
        )
        await db.commit()

    return newly_earned


async def get_badges(user_id: int, db: AsyncSession) -> dict:
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise ValueError("User not found")

    earned_ids = set(user.badges or [])
    earned = [
        {"id": bid, "description": BADGE_DEFINITIONS[bid]}
        for bid in BADGE_DEFINITIONS
        if bid in earned_ids
    ]
    locked = [
        {"id": bid, "description": BADGE_DEFINITIONS[bid]}
        for bid in BADGE_DEFINITIONS
        if bid not in earned_ids
    ]
    return {"earned": earned, "locked": locked}
