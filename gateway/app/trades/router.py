# gateway/app/trades/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from redis.asyncio import Redis
from app.auth.deps import get_current_user
from app.db.session import get_session
from app.db.models import User, Trade, Position
from app.trades.schemas import TradeRequest, TradeResponse, PositionOut
from app.trades.service import execute_trade
from app.pubsub.redis_client import get_redis
router = APIRouter(prefix="/trade", tags=["trade"])
@router.post("/", response_model=TradeResponse, status_code=status.HTTP_201_CREATED)
async def place_trade(
    body: TradeRequest,
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
    redis: Redis = Depends(get_redis),
):
    try:
        return await execute_trade(session, redis, user.id, body)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
@router.get("/positions", response_model=list[PositionOut])
async def get_positions(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(select(Position).where(Position.user_id == user.id))
    positions = result.scalars().all()
    return [
        PositionOut(symbol=p.symbol, quantity=p.quantity, avg_buy_price=p.avg_buy_price)
        for p in positions
    ]
@router.get("/history", response_model=list[TradeResponse])
async def get_trade_history(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(Trade)
        .where(Trade.user_id == user.id)
        .order_by(Trade.timestamp.desc())
        .limit(100)
    )
    trades = result.scalars().all()
    return [
        TradeResponse(
            trade_id=t.id,
            symbol=t.symbol,
            side=t.side,
            quantity=t.quantity,
            price=t.price,
            total=t.total,
            wallet_balance=0.0,
            timestamp=t.timestamp,
        )
        for t in trades
    ]