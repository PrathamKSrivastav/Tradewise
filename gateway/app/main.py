# gateway/app/main.py
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.pubsub.redis_client import get_redis, close_pool
from app.websocket.relay import start_relay
from app.websocket.connection_manager import manager
from app.db.session import engine
from app.db.models import Base
from app.auth.router import router as auth_router
from app.trades.router import router as trades_router
from app.market.router import router as market_router
from app.wallet.router import router as wallet_router
from app.leaderboard.router import router as leaderboard_router
from app.stocks.symbols import SYMBOLS
from app.rag.router import router as rag_router
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
)
log = logging.getLogger(__name__)
_relay_tasks = []
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("booting gateway")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    redis = get_redis()
    tasks = await start_relay(redis)
    _relay_tasks.extend(tasks)
    log.info("gateway ready")
    yield
    for t in _relay_tasks:
        t.cancel()
    await close_pool()
    log.info("gateway shutdown complete")
app = FastAPI(
    title="Tradewise Gateway",
    version="0.1.0",
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(trades_router)
app.include_router(market_router)
app.include_router(wallet_router)
app.include_router(leaderboard_router)
app.include_router(rag_router)
@app.websocket("/ws/{symbol}")
async def websocket_endpoint(ws: WebSocket, symbol: str):
    if symbol not in SYMBOLS:
        await ws.close(code=4004)
        return
    await manager.connect(symbol, ws)
    try:
        while True:
            # keep connection alive — client sends ping, we ignore it
            await ws.receive_text()
    except WebSocketDisconnect:
        await manager.disconnect(symbol, ws)
@app.get("/healthz", tags=["ops"])
async def health():
    return {"status": "ok"}