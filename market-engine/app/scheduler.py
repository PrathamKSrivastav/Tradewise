# market-engine/app/scheduler.py
import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.config import settings
from app.stocks.gbm import init_states, StockState
from app.pubsub.publisher import publish_tick
from app.pubsub.redis_client import get_redis
from app.db.session import SessionLocal
from app.db.candle_repo import insert_candle, trim_history
log = logging.getLogger(__name__)
_states: dict[str, StockState] = {}
_scheduler = AsyncIOScheduler()
async def _tick() -> None:
    redis = get_redis()
    try:
        async with SessionLocal() as session:
            for symbol, state in _states.items():
                from app.stocks.ohlcv_builder import build_candle
                candle = build_candle(state)
                if candle is None:
                    continue
                await publish_tick(redis, {symbol: state})
                await insert_candle(session, candle)
                await trim_history(session, symbol)
    except Exception as exc:
        log.error("tick error: %s", exc, exc_info=True)
    finally:
        await redis.aclose()
def start_scheduler(states: dict[str, StockState]) -> None:
    global _states
    _states = states
    _scheduler.add_job(
        _tick,
        trigger=IntervalTrigger(seconds=settings.tick_interval_seconds),
        id="market_tick",
        replace_existing=True,
        max_instances=1,
    )
    _scheduler.start()
    log.info("scheduler started — tick every %ds", settings.tick_interval_seconds)
def stop_scheduler() -> None:
    _scheduler.shutdown(wait=False)
    log.info("scheduler stopped")