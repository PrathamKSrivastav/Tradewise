# gateway/app/market/router.py
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session
from app.market.service import get_candle_history, get_all_stocks
from app.stocks.symbols import SYMBOLS
router = APIRouter(prefix="/market", tags=["market"])
@router.get("/stocks")
async def list_stocks():
    return get_all_stocks()
@router.get("/candles/{symbol}")
async def candle_history(
    symbol: str,
    limit: int = Query(default=390, ge=1, le=390),
    session: AsyncSession = Depends(get_session),
):
    if symbol not in SYMBOLS:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="unknown symbol")
    candles = await get_candle_history(session, symbol, limit)
    return candles