# gateway/app/websocket/relay.py
import asyncio
import logging
from redis.asyncio import Redis
from app.stocks.symbols import SYMBOLS
from app.websocket.connection_manager import manager
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
            await manager.broadcast(symbol, msg["data"])
async def start_relay(redis: Redis) -> None:
    tasks = [asyncio.create_task(_relay_symbol(redis, sym)) for sym in SYMBOLS]
    log.info("relay started for %d symbols", len(tasks))
    return tasks