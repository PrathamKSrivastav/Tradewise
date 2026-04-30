# market-engine/app/pubsub/publisher.py
import json
import logging
from redis.asyncio import Redis
from app.stocks.gbm import StockState
from app.stocks.ohlcv_builder import build_candle
log = logging.getLogger(__name__)
_CHANNEL_PREFIX = "market"
async def publish_tick(redis: Redis, states: dict[str, StockState]) -> None:
    for symbol, state in states.items():
        candle = build_candle(state)
        if candle is None:
            log.debug("market closed — skipping tick for %s", symbol)
            continue
        channel = f"{_CHANNEL_PREFIX}:{symbol}"
        payload = json.dumps(candle)
        await redis.publish(channel, payload)
        # write last close price so gateway trade endpoint can read it instantly
        await redis.set(f"last_price:{symbol}", str(candle["close"]))
        log.debug("published %s → close=%.2f", channel, candle["close"])