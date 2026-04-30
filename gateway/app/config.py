# gateway/app/config.py
from pydantic_settings import BaseSettings
from functools import lru_cache
class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://tradewise:changeme@postgres:5432/tradewise"
    redis_url: str = "redis://redis:6379"
    jwt_secret: str = "change-this-to-a-long-random-string"
    jwt_expire_minutes: int = 10080
    qdrant_url: str = "http://qdrant:6333"
    qdrant_collection: str = "tradewise_rag"
    openai_api_key: str = ""
    initial_wallet_balance: float = 100000.0
    candle_history_limit: int = 390
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
@lru_cache
def get_settings() -> Settings:
    return Settings()
settings = get_settings()