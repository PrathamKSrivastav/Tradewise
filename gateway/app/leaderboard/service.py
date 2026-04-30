# gateway/app/leaderboard/service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case
from app.db.models import Trade, User, Wallet
from app.config import settings
async def get_leaderboard(session: AsyncSession, limit: int = 20) -> list[dict]:
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