# gateway/app/trades/service.py
import time
import json
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from redis.asyncio import Redis
from app.db.models import Trade, Position, Wallet
from app.trades.schemas import TradeRequest, TradeResponse
log = logging.getLogger(__name__)
_CROWD_CHANNEL = "crowd:events"
async def _get_latest_price(redis: Redis, symbol: str) -> float | None:
    # fetch last published candle close price from Redis
    raw = await redis.get(f"last_price:{symbol}")
    if raw:
        return float(raw)
    return None
async def execute_trade(
    session: AsyncSession,
    redis: Redis,
    user_id: int,
    req: TradeRequest,
) -> TradeResponse:
    price = await _get_latest_price(redis, req.symbol)
    if price is None:
        raise ValueError("market data unavailable — no price published yet")
    total = round(price * req.quantity, 2)
    wallet_result = await session.execute(select(Wallet).where(Wallet.user_id == user_id))
    wallet = wallet_result.scalar_one_or_none()
    if wallet is None:
        raise ValueError("wallet not found")
    if req.side == "buy":
        if wallet.balance < total:
            raise ValueError(f"insufficient balance — need ₹{total:.2f}, have ₹{wallet.balance:.2f}")
        wallet.balance = round(wallet.balance - total, 2)
        await _upsert_position(session, user_id, req.symbol, req.quantity, price)
    else:
        position = await _get_position(session, user_id, req.symbol)
        if position is None or position.quantity < req.quantity:
            held = position.quantity if position else 0
            raise ValueError(f"insufficient position — trying to sell {req.quantity}, holding {held}")
        wallet.balance = round(wallet.balance + total, 2)
        await _reduce_position(session, user_id, req.symbol, req.quantity)
    ts = int(time.time())
    trade = Trade(
        user_id=user_id,
        symbol=req.symbol,
        side=req.side,
        quantity=req.quantity,
        price=price,
        total=total,
        timestamp=ts,
    )
    session.add(trade)
    await session.commit()
    await session.refresh(trade)
    await redis.publish(_CROWD_CHANNEL, json.dumps({
        "symbol": req.symbol,
        "side": req.side,
        "quantity": req.quantity,
    }))
    log.info("trade executed user=%d %s %d %s @ %.2f", user_id, req.side, req.quantity, req.symbol, price)
    return TradeResponse(
        trade_id=trade.id,
        symbol=trade.symbol,
        side=trade.side,
        quantity=trade.quantity,
        price=price,
        total=total,
        wallet_balance=wallet.balance,
        timestamp=ts,
    )
async def _get_position(session: AsyncSession, user_id: int, symbol: str) -> Position | None:
    result = await session.execute(
        select(Position).where(Position.user_id == user_id, Position.symbol == symbol)
    )
    return result.scalar_one_or_none()
async def _upsert_position(session: AsyncSession, user_id: int, symbol: str, qty: int, price: float) -> None:
    position = await _get_position(session, user_id, symbol)
    if position is None:
        session.add(Position(user_id=user_id, symbol=symbol, quantity=qty, avg_buy_price=price))
    else:
        total_qty = position.quantity + qty
        position.avg_buy_price = round((position.quantity * position.avg_buy_price + qty * price) / total_qty, 4)
        position.quantity = total_qty
async def _reduce_position(session: AsyncSession, user_id: int, symbol: str, qty: int) -> None:
    position = await _get_position(session, user_id, symbol)
    position.quantity -= qty
    if position.quantity == 0:
        await session.delete(position)