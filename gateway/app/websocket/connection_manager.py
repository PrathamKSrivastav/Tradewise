# gateway/app/websocket/connection_manager.py
import asyncio
import logging
from fastapi import WebSocket
log = logging.getLogger(__name__)
class ConnectionManager:
    def __init__(self) -> None:
        # symbol → set of active WebSocket connections
        self._connections: dict[str, set[WebSocket]] = {}
        self._lock = asyncio.Lock()
    async def connect(self, symbol: str, ws: WebSocket) -> None:
        await ws.accept()
        async with self._lock:
            self._connections.setdefault(symbol, set()).add(ws)
        log.debug("ws connected symbol=%s total=%d", symbol, len(self._connections[symbol]))
    async def disconnect(self, symbol: str, ws: WebSocket) -> None:
        async with self._lock:
            self._connections.get(symbol, set()).discard(ws)
        log.debug("ws disconnected symbol=%s", symbol)
    async def broadcast(self, symbol: str, payload: str) -> None:
        sockets = list(self._connections.get(symbol, set()))
        if not sockets:
            return
        dead: list[WebSocket] = []
        results = await asyncio.gather(*[ws.send_text(payload) for ws in sockets], return_exceptions=True)
        for ws, result in zip(sockets, results):
            if isinstance(result, Exception):
                log.debug("stale ws removed symbol=%s", symbol)
                dead.append(ws)
        if dead:
            async with self._lock:
                for ws in dead:
                    self._connections.get(symbol, set()).discard(ws)
    def active_count(self, symbol: str) -> int:
        return len(self._connections.get(symbol, set()))
# singleton shared across the app
manager = ConnectionManager()