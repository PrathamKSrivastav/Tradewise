# market-engine/app/main.py
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config import settings
from app.stocks.gbm import init_states
from app.pubsub.redis_client import get_redis, close_pool
from app.crowd.consumer import CrowdConsumer
from app.scheduler import start_scheduler, stop_scheduler
from app.db.session import engine
from app.db.models import Base
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
)
log = logging.getLogger(__name__)
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("booting market engine")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    states = init_states()
    redis = get_redis()
    consumer = CrowdConsumer(redis, states)
    await consumer.start()
    start_scheduler(states)
    log.info("market engine ready — tracking %d symbols", len(states))
    yield
    stop_scheduler()
    await close_pool()
    log.info("market engine shutdown complete")
app = FastAPI(
    title="Tradewise Market Engine",
    version="0.1.0",
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
)
@app.get("/healthz", tags=["ops"])
async def health():
    return {"status": "ok", "tick_interval": settings.tick_interval_seconds}