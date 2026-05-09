# gateway/app/websocket/relay.py
import asyncio
import logging
import json
from redis.asyncio import Redis
from app.stocks.symbols import SYMBOLS
from app.websocket.connection_manager import manager
from app.trades.service import evaluate_pending_orders
from app.db.session import SessionLocal

log = logging.getLogger(__name__)
_CHANNEL_PREFIX = "market"

async def _relay_symbol(redis: Redis, symbol: str) -> None:
    channel = f"{_CHANNEL_PREFIX}:{symbol}"
    async with redis.pubsub() as ps:
        await ps.subscribe(channel)
        log.info("relay subscribed to %s", channel)
        async for msg in ps.listen():
            if msg["type"] != "message":
                continue
            
            data = msg["data"]
            try:
                candle = json.loads(data)
                price = float(candle["close"])
                # Evaluate pending orders on every tick
                async with SessionLocal() as session:
                    await evaluate_pending_orders(session, redis, symbol, price)
            except Exception as e:
                log.error("error evaluating orders for %s: %s", symbol, e)
            
            await manager.broadcast(symbol, data)
async def start_relay(redis: Redis) -> None:
    tasks = [asyncio.create_task(_relay_symbol(redis, sym)) for sym in SYMBOLS]
    log.info("relay started for %d symbols", len(tasks))
    return tasks