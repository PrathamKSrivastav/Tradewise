# market-engine/app/stocks/ohlcv_builder.py
import time
import numpy as np
from app.stocks.gbm import StockState, next_price
from app.stocks.indian_bias import get_bias_drift, get_volatility_multiplier
from app.stocks.profiles import PROFILES
_rng = np.random.default_rng()
def build_candle(state: StockState, bias_drift: float = 0.0) -> dict | None:
    bias = get_bias_drift()
    # sentinel — market closed, do not emit
    if bias == -999.0:
        return None
    vol_mult = get_volatility_multiplier()
    open_price = state.price
    close_price = next_price(state, bias_drift=bias + bias_drift)
    profile = PROFILES[state.symbol]
    spread = profile.volatility * vol_mult * open_price
    noise_h = abs(_rng.normal(0, spread * 0.6))
    noise_l = abs(_rng.normal(0, spread * 0.6))
    high_price = round(max(open_price, close_price) + noise_h, 2)
    low_price = round(min(open_price, close_price) - noise_l, 2)
    low_price = max(low_price, profile.base_price * 0.10)
    volume = int(_rng.integers(10_000, 500_000) * vol_mult)
    return {
        "symbol": state.symbol,
        "timestamp": int(time.time()),
        "open": open_price,
        "high": high_price,
        "low": low_price,
        "close": close_price,
        "volume": volume,
    }