# market-engine/app/stocks/indian_bias.py
from datetime import datetime, time
from zoneinfo import ZoneInfo
from app.config import IST
# market session boundaries in IST
_PRE_OPEN_START = time(9, 0)
_MARKET_OPEN = time(9, 15)
_LUNCH_START = time(12, 45)
_LUNCH_END = time(13, 30)
_CLOSE_APPROACH = time(15, 0)
_MARKET_CLOSE = time(15, 30)
def is_market_open(now: datetime | None = None) -> bool:
    t = (now or datetime.now(IST)).time()
    return _MARKET_OPEN <= t < _MARKET_CLOSE
def get_bias_drift(now: datetime | None = None) -> float:
    dt = now or datetime.now(IST)
    t = dt.time()
    # outside session — no movement
    # if not (_PRE_OPEN_START <= t < _MARKET_CLOSE): ---------------temporarily disable off-hours halt to allow testing of bias effects throughout the day
    #     return -999.0
    # pre-open auction spike (9:00–9:15): strong upward drift
    if _PRE_OPEN_START <= t < _MARKET_OPEN:
        return 0.0012
    # opening volatility surge (9:15–9:30)
    if t < time(9, 30):
        return 0.0008
    # lunch dip (12:45–13:30): mild downward pressure
    if _LUNCH_START <= t < _LUNCH_END:
        return -0.0004
    # closing rush (15:00–15:30): elevated volatility, slight upward
    if _CLOSE_APPROACH <= t < _MARKET_CLOSE:
        return 0.0006
    # Thursday F&O expiry: add extra volatility via drift noise
    if dt.weekday() == 3:
        return 0.0003
    # normal session
    return 0.0
def get_volatility_multiplier(now: datetime | None = None) -> float:
    dt = now or datetime.now(IST)
    t = dt.time()
    if not is_market_open(dt):
        return 0.0
    if t < time(9, 30):
        return 1.8
    if _LUNCH_START <= t < _LUNCH_END:
        return 0.6
    if _CLOSE_APPROACH <= t < _MARKET_CLOSE:
        return 1.5
    if dt.weekday() == 3:
        return 1.3
    return 1.0