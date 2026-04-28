# market-engine/app/stocks/gbm.py
import numpy as np
from dataclasses import dataclass, field
from app.stocks.profiles import StockProfile, PROFILES
@dataclass
class StockState:
    symbol: str
    price: float
    drift_adjustment: float = 0.0
    drift_decay: float = 0.0
    def apply_decay(self) -> None:
        self.drift_adjustment *= self.drift_decay
        if abs(self.drift_adjustment) < 1e-8:
            self.drift_adjustment = 0.0
            self.drift_decay = 0.0
_rng = np.random.default_rng()
def _gbm_step(price: float, drift: float, volatility: float, dt: float = 1.0) -> float:
    z = _rng.standard_normal()
    return price * np.exp((drift - 0.5 * volatility ** 2) * dt + volatility * np.sqrt(dt) * z)
def next_price(state: StockState, bias_drift: float = 0.0) -> float:
    profile: StockProfile = PROFILES[state.symbol]
    effective_drift = profile.drift + state.drift_adjustment + bias_drift
    new_price = _gbm_step(state.price, effective_drift, profile.volatility)
    new_price = max(new_price, profile.base_price * 0.10)
    state.price = round(new_price, 2)
    state.apply_decay()
    return state.price
def init_states() -> dict[str, StockState]:
    return {sym: StockState(symbol=sym, price=PROFILES[sym].base_price) for sym in PROFILES}