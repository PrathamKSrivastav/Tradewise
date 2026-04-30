# gateway/app/wallet/service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Wallet, Trade, User
from app.config import settings
async def get_wallet(session: AsyncSession, user_id: int) -> dict:
    result = await session.execute(select(Wallet).where(Wallet.user_id == user_id))
    wallet = result.scalar_one_or_none()
    if wallet is None:
        raise ValueError("wallet not found")
    return {"user_id": user_id, "balance": wallet.balance}
async def get_pnl(session: AsyncSession, user_id: int) -> dict:
    result = await session.execute(
        select(Trade).where(Trade.user_id == user_id)
    )
    trades = result.scalars().all()
    realised = sum(
        t.total if t.side == "sell" else -t.total
        for t in trades
    )
    return {"user_id": user_id, "realised_pnl": round(realised, 2)}
async def reset_wallet(session: AsyncSession, user_id: int) -> dict:
    result = await session.execute(select(Wallet).where(Wallet.user_id == user_id))
    wallet = result.scalar_one_or_none()
    if wallet is None:
        raise ValueError("wallet not found")
    wallet.balance = settings.initial_wallet_balance
    await session.commit()
    return {"user_id": user_id, "balance": wallet.balance, "reset": True}
async def reset_all_wallets(session: AsyncSession) -> dict:
    result = await session.execute(select(Wallet))
    wallets = result.scalars().all()
    for w in wallets:
        w.balance = settings.initial_wallet_balance
    await session.commit()
    return {"reset_count": len(wallets), "balance": settings.initial_wallet_balance}