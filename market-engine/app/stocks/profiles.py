# market-engine/app/stocks/profiles.py
from dataclasses import dataclass
@dataclass(frozen=True)
class StockProfile:
    symbol: str
    name: str
    base_price: float
    drift: float
    volatility: float
    risk_label: str
PROFILES: dict[str, StockProfile] = {
    "STABLE": StockProfile(
        symbol="STABLE",
        name="Bharat Infra Ltd",
        base_price=1200.0,
        drift=0.00003,
        volatility=0.004,
        risk_label="LOW",
    ),
    "GROWTH": StockProfile(
        symbol="GROWTH",
        name="IndiaNext Technologies",
        base_price=850.0,
        drift=0.00007,
        volatility=0.009,
        risk_label="MEDIUM",
    ),
    "SWING": StockProfile(
        symbol="SWING",
        name="Desh Pharma Corp",
        base_price=430.0,
        drift=0.00004,
        volatility=0.018,
        risk_label="HIGH",
    ),
    "SPECULATIVE": StockProfile(
        symbol="SPECULATIVE",
        name="RocketEdge Ventures",
        base_price=95.0,
        drift=0.00010,
        volatility=0.038,
        risk_label="EXTREME",
    ),
}
SYMBOLS = list(PROFILES.keys())