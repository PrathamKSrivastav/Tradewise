# gateway/app/market/service.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.stocks.symbols import SYMBOLS, SYMBOL_META
async def get_candle_history(session: AsyncSession, symbol: str, limit: int = 390) -> list[dict]:
    result = await session.execute(
        text(
            "SELECT symbol, timestamp, open, high, low, close, volume "
            "FROM candle_history WHERE symbol = :symbol "
            "ORDER BY timestamp ASC LIMIT :limit"
        ),
        {"symbol": symbol, "limit": limit},
    )
    rows = result.fetchall()
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
def get_all_stocks() -> list[dict]:
    return [{"symbol": sym, **SYMBOL_META[sym]} for sym in SYMBOLS]