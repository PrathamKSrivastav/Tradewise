# gateway/app/leaderboard/service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case
from app.db.models import Trade, User, Wallet


async def get_xp_leaderboard(session: AsyncSession, requesting_user_id: int, limit: int = 50) -> dict:
    """XP-based leaderboard for the Academy."""
    result = await session.execute(
        select(User.id, User.username, User.total_xp, User.current_level)
        .where(User.is_active == True, User.is_admin == False)
        .order_by(User.total_xp.desc())
        .limit(limit)
    )
    rows = result.fetchall()
    board = [
        {
            "rank": idx + 1,
            "userId": r.id,
            "name": r.username,
            "totalXP": r.total_xp,
            "level": r.current_level,
        }
        for idx, r in enumerate(rows)
    ]

    # Find requesting user's rank
    user_rank_result = await session.execute(
        select(func.count(User.id))
        .where(User.is_active == True, User.is_admin == False)
        .where(User.total_xp > select(User.total_xp).where(User.id == requesting_user_id).scalar_subquery())
    )
    user_rank = (user_rank_result.scalar() or 0) + 1

    return {"board": board, "userRank": user_rank}


async def get_trader_leaderboard(session: AsyncSession, limit: int = 20) -> list[dict]:
    """Original PnL-based leaderboard for the Simulator."""
    pnl_subq = (
        select(
            Trade.user_id,
            func.sum(
                case(
                    (Trade.side == "sell", Trade.total),
                    else_=-Trade.total,
                )
            ).label("realised_pnl"),
        )
        .group_by(Trade.user_id)
        .subquery()
    )
    result = await session.execute(
        select(
            User.id,
            User.username,
            Wallet.balance,
            func.coalesce(pnl_subq.c.realised_pnl, 0.0).label("realised_pnl"),
        )
        .join(Wallet, Wallet.user_id == User.id)
        .outerjoin(pnl_subq, pnl_subq.c.user_id == User.id)
        .where(User.is_active == True, User.is_admin == False)
        .order_by(func.coalesce(pnl_subq.c.realised_pnl, 0.0).desc())
        .limit(limit)
    )
    rows = result.fetchall()
    return [
        {
            "rank": idx + 1,
            "user_id": r.id,
            "username": r.username,
            "wallet_balance": round(r.balance, 2),
            "realised_pnl": round(r.realised_pnl, 2),
            "net_worth": round(r.balance, 2),
        }
        for idx, r in enumerate(rows)
    ]
