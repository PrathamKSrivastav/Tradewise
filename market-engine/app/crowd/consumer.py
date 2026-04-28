# market-engine/app/crowd/consumer.py
import asyncio
import json
import logging
from redis.asyncio import Redis
from app.crowd.influence import CrowdEvent, apply_crowd_events
from app.stocks.gbm import StockState
log = logging.getLogger(__name__)
_CHANNEL = "crowd:events"
_BATCH_INTERVAL = 55  # collect events for 55s, apply just before each tick
class CrowdConsumer:
    def __init__(self, redis: Redis, states: dict[str, StockState]) -> None:
        self._redis = redis
        self._states = states
        self._buffer: list[CrowdEvent] = []
        self._lock = asyncio.Lock()
    async def start(self) -> None:
        asyncio.create_task(self._listen())
        asyncio.create_task(self._flush_loop())
    async def _listen(self) -> None:
        async with self._redis.pubsub() as ps:
            await ps.subscribe(_CHANNEL)
            async for msg in ps.listen():
                if msg["type"] != "message":
                    continue
                try:
                    data = json.loads(msg["data"])
                    ev = CrowdEvent(
                        symbol=data["symbol"],
                        side=data["side"],
                        quantity=int(data["quantity"]),
                    )
                    async with self._lock:
                        self._buffer.append(ev)
                except Exception as exc:
                    log.warning("bad crowd event: %s", exc)
    async def _flush_loop(self) -> None:
        while True:
            await asyncio.sleep(_BATCH_INTERVAL)
            async with self._lock:
                if self._buffer:
                    apply_crowd_events(self._states, self._buffer)
                    self._buffer.clear()