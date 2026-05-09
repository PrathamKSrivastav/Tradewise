# gateway/app/trades/service.py
import time
import json
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete
from redis.asyncio import Redis
from app.db.models import Trade, Position, Wallet, PendingOrder
from app.trades.schemas import TradeRequest, TradeResponse
log = logging.getLogger(__name__)
_CROWD_CHANNEL = "crowd:events"

async def _get_latest_price(redis: Redis, symbol: str) -> float | None:
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
    current_price = await _get_latest_price(redis, req.symbol)
    if current_price is None:
        raise ValueError("market data unavailable — no price published yet")

    if req.order_type == "Market":
        return await _execute_market_order(session, redis, user_id, req, current_price)
    else:
        return await _place_pending_order(session, user_id, req)

async def _execute_market_order(session, redis, user_id, req, price) -> TradeResponse:
    total = round(price * req.quantity, 2)
    wallet = await _get_wallet(session, user_id)

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
        user_id=user_id, symbol=req.symbol, side=req.side, quantity=req.quantity,
        price=price, total=total, timestamp=ts
    )
    session.add(trade)
    await session.commit()
    await redis.publish(_CROWD_CHANNEL, json.dumps({"symbol": req.symbol, "side": req.side, "quantity": req.quantity}))

    return TradeResponse(
        trade_id=trade.id, symbol=trade.symbol, side=trade.side, quantity=trade.quantity,
        price=price, total=total, wallet_balance=wallet.balance, timestamp=ts
    )

async def _place_pending_order(session, user_id, req) -> TradeResponse:
    if req.target_price is None:
        raise ValueError("target price required for limit/stop orders")

    total = round(req.target_price * req.quantity, 2)
    wallet = await _get_wallet(session, user_id)

    if req.side == "buy":
        if wallet.balance < total:
            raise ValueError(f"insufficient balance for pending order — need ₹{total:.2f}")
        wallet.balance = round(wallet.balance - total, 2)
    else:
        position = await _get_position(session, user_id, req.symbol)
        if position is None or position.quantity < req.quantity:
            held = position.quantity if position else 0
            raise ValueError(f"insufficient position for pending order — need {req.quantity}, have {held}")
        # Deduct quantity from position immediately to "lock" it
        await _reduce_position(session, user_id, req.symbol, req.quantity)

    ts = int(time.time())
    order = PendingOrder(
        user_id=user_id, symbol=req.symbol, side=req.side, order_type=req.order_type,
        quantity=req.quantity, target_price=req.target_price, status="pending", timestamp=ts
    )
    session.add(order)
    await session.commit()

    return TradeResponse(
        trade_id=0, # No trade ID yet
        symbol=req.symbol, side=req.side, quantity=req.quantity,
        price=req.target_price, total=total, wallet_balance=wallet.balance, timestamp=ts
    )

async def evaluate_pending_orders(session: AsyncSession, redis: Redis, symbol: str, current_price: float):
    # Fetch all pending orders for this symbol
    result = await session.execute(
        select(PendingOrder).where(PendingOrder.symbol == symbol, PendingOrder.status == "pending")
    )
    orders = result.scalars().all()

    for order in orders:
        should_execute = False
        if order.order_type == "Limit":
            if order.side == "buy" and current_price <= order.target_price: should_execute = True
            if order.side == "sell" and current_price >= order.target_price: should_execute = True
        elif order.order_type == "Stop":
            if order.side == "buy" and current_price >= order.target_price: should_execute = True
            if order.side == "sell" and current_price <= order.target_price: should_execute = True

        if should_execute:
            await _execute_pending_order(session, redis, order, current_price)

async def _execute_pending_order(session, redis, order, price):
    order.status = "executed"
    total = round(price * order.quantity, 2)

    # If it was a buy, we already deducted balance at target_price. 
    # Let's adjust balance if execution price is different (improvement: slippage)
    # But for simplicity, we just use the price it hit.
    if order.side == "buy":
        # We already deducted order.target_price * order.quantity.
        # If price < order.target_price, refund the difference.
        diff = round((order.target_price - price) * order.quantity, 2)
        if diff != 0:
            wallet = await _get_wallet(session, order.user_id)
            wallet.balance = round(wallet.balance + diff, 2)
        await _upsert_position(session, order.user_id, order.symbol, order.quantity, price)
    else:
        # Sell: we already deducted quantity. Now add total to balance.
        wallet = await _get_wallet(session, order.user_id)
        wallet.balance = round(wallet.balance + total, 2)

    ts = int(time.time())
    trade = Trade(
        user_id=order.user_id, symbol=order.symbol, side=order.side, quantity=order.quantity,
        price=price, total=total, timestamp=ts
    )
    session.add(trade)
    await session.commit()
    await redis.publish(_CROWD_CHANNEL, json.dumps({"symbol": order.symbol, "side": order.side, "quantity": order.quantity}))
    log.info("pending order executed user=%d %s %d %s @ %.2f", order.user_id, order.side, order.quantity, order.symbol, price)

async def _get_wallet(session: AsyncSession, user_id: int) -> Wallet:
    result = await session.execute(select(Wallet).where(Wallet.user_id == user_id))
    return result.scalar_one()

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