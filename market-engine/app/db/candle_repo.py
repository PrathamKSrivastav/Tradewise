# market-engine/app/db/candle_repo.py
from sqlalchemy import delete, select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import CandleHistory
from app.config import settings
async def insert_candle(session: AsyncSession, candle: dict) -> None:
    row = CandleHistory(
        symbol=candle["symbol"],
        timestamp=candle["timestamp"],
        open=candle["open"],
        high=candle["high"],
        low=candle["low"],
        close=candle["close"],
        volume=candle["volume"],
    )
    session.add(row)
    await session.commit()
async def trim_history(session: AsyncSession, symbol: str) -> None:
    subq = (
        select(CandleHistory.id)
        .where(CandleHistory.symbol == symbol)
        .order_by(CandleHistory.timestamp.desc())
        .limit(settings.candle_history_limit)
        .subquery()
    )
    await session.execute(
        delete(CandleHistory).where(
            CandleHistory.symbol == symbol,
            CandleHistory.id.not_in(select(subq.c.id)),
        )
    )
    await session.commit()
async def get_history(session: AsyncSession, symbol: str, limit: int = 390) -> list[dict]:
    result = await session.execute(
        select(CandleHistory)
        .where(CandleHistory.symbol == symbol)
        .order_by(CandleHistory.timestamp.asc())
        .limit(limit)
    )
    rows = result.scalars().all()
    return [
        {
            "symbol": r.symbol,
            "timestamp": r.timestamp,
            "open": r.open,
            "high": r.high,
            "low": r.low,
            "close": r.close,
            "volume": r.volume,
        }
        for r in rows
    ]