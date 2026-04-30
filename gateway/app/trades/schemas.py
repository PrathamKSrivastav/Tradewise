# gateway/app/trades/schemas.py
from pydantic import BaseModel, field_validator
from app.stocks.symbols import SYMBOLS
class TradeRequest(BaseModel):
    symbol: str
    side: str
    quantity: int
    @field_validator("symbol")
    @classmethod
    def valid_symbol(cls, v: str) -> str:
        if v not in SYMBOLS:
            raise ValueError(f"symbol must be one of {SYMBOLS}")
        return v
    @field_validator("side")
    @classmethod
    def valid_side(cls, v: str) -> str:
        if v not in ("buy", "sell"):
            raise ValueError("side must be buy or sell")
        return v
    @field_validator("quantity")
    @classmethod
    def valid_quantity(cls, v: int) -> int:
        if v <= 0:
            raise ValueError("quantity must be positive")
        return v
class TradeResponse(BaseModel):
    trade_id: int
    symbol: str
    side: str
    quantity: int
    price: float
    total: float
    wallet_balance: float
    timestamp: int
class PositionOut(BaseModel):
    symbol: str
    quantity: int
    avg_buy_price: float
    current_price: float | None = None
    unrealised_pnl: float | None = None