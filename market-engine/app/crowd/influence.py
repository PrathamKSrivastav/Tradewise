# market-engine/app/crowd/influence.py
from dataclasses import dataclass
from app.stocks.gbm import StockState
# max drift adjustment crowd can apply per event batch
_MAX_DRIFT_BUMP = 0.0018
# decay factor per tick (~10 ticks to near-zero)
_DECAY = 0.85
# minimum net order count to trigger influence
_THRESHOLD = 3
@dataclass
class CrowdEvent:
    symbol: str
    side: str   # "buy" or "sell"
    quantity: int
def apply_crowd_events(states: dict[str, StockState], events: list[CrowdEvent]) -> None:
    net: dict[str, int] = {}
    for ev in events:
        delta = ev.quantity if ev.side == "buy" else -ev.quantity
        net[ev.symbol] = net.get(ev.symbol, 0) + delta
    for symbol, net_qty in net.items():
        if symbol not in states:
            continue
        if abs(net_qty) < _THRESHOLD:
            continue
        # normalise to a bounded drift bump
        bump = np.tanh(net_qty / 500) * _MAX_DRIFT_BUMP
        states[symbol].drift_adjustment += bump
        states[symbol].drift_decay = _DECAY
# import after dataclass def to avoid circular at module level
import numpy as np  # noqa: E402