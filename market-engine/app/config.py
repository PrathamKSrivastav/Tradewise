# market-engine/app/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache
from zoneinfo import ZoneInfo
class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://tradewise:DefaultPassword1234@postgres:5432/tradewise"
    redis_url: str = "redis://redis:6379"
    tick_interval_seconds: int = 60
    candle_history_limit: int = 390
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
@lru_cache
def get_settings() -> Settings:
    return Settings()
IST = ZoneInfo("Asia/Kolkata")
settings = get_settings()