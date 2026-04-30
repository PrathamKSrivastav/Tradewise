# scripts/load_test.py
# simulates 20 concurrent websocket clients subscribing to all 4 symbols
# usage: python scripts/load_test.py
# optional: python scripts/load_test.py --duration 60
import asyncio
import sys
import time
import json
import websockets
WS_BASE = "ws://localhost:8000"
SYMBOLS = ["STABLE", "GROWTH", "SWING", "SPECULATIVE"]
DURATION = 30
for i, arg in enumerate(sys.argv):
    if arg == "--duration" and i + 1 < len(sys.argv):
        DURATION = int(sys.argv[i + 1])
stats: dict[str, int] = {}
lock = asyncio.Lock()
async def client(client_id: int, symbol: str):
    uri = f"{WS_BASE}/ws/{symbol}"
    label = f"client{client_id:02d}:{symbol}"
    try:
        async with websockets.connect(uri, ping_interval=30) as ws:
            async with lock:
                stats[label] = 0
            deadline = time.time() + DURATION
            while time.time() < deadline:
                try:
                    msg = await asyncio.wait_for(ws.recv(), timeout=5.0)
                    candle = json.loads(msg)
                    async with lock:
                        stats[label] = stats.get(label, 0) + 1
                except asyncio.TimeoutError:
                    continue
    except Exception as exc:
        print(f"  ✗ {label} error: {exc}")
async def main():
    print(f"starting load test — 20 clients × 4 symbols for {DURATION}s")
    print(f"total connections: 80")
    tasks = [
        asyncio.create_task(client(i, sym))
        for i in range(1, 6)
        for sym in SYMBOLS
    ]
    await asyncio.gather(*tasks)
    print("\n── results ──")
    total = 0
    for label, count in sorted(stats.items()):
        print(f"  {label}: {count} candles received")
        total += count
    print(f"\n  total candles received: {total}")
    print(f"  connections held: {len(stats)}/20")
    if len(stats) == 20:
        print("  ✓ load test passed")
    else:
        print(f"  ✗ only {len(stats)} connections succeeded")
asyncio.run(main())