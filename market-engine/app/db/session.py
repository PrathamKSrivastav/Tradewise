# market-engine/app/db/session.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.config import settings
engine = create_async_engine(settings.database_url, pool_size=5, max_overflow=2, echo=False)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session