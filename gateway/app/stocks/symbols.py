# gateway/app/stocks/symbols.py
# single source of truth for stock symbols in the gateway
# mirrors market-engine profiles without importing from that service
SYMBOLS: list[str] = ["STABLE", "GROWTH", "SWING", "SPECULATIVE"]
SYMBOL_META: dict[str, dict] = {
    "STABLE": {"name": "Bharat Infra Ltd", "risk_label": "LOW", "base_price": 1200.0},
    "GROWTH": {"name": "IndiaNext Technologies", "risk_label": "MEDIUM", "base_price": 850.0},
    "SWING": {"name": "Desh Pharma Corp", "risk_label": "HIGH", "base_price": 430.0},
    "SPECULATIVE": {"name": "RocketEdge Ventures", "risk_label": "EXTREME", "base_price": 95.0},
}