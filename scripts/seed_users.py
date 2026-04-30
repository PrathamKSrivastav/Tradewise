# scripts/seed_users.py
# creates 20 test users with wallets — run once before a test session
# usage: python scripts/seed_users.py
import asyncio
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "gateway"))
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select
import bcrypt
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://tradewise:DoggyBeater@localhost:5432/tradewise")
INITIAL_BALANCE = float(os.getenv("INITIAL_WALLET_BALANCE", "100000.0"))
TEST_USERS = [
    {"username": f"trader{i:02d}", "email": f"trader{i:02d}@tradewise.test", "password": "test1234"}
    for i in range(1, 21)
]
async def seed():
    engine = create_async_engine(DATABASE_URL, echo=False)
    Session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    # import models after path is set
    from app.db.models import Base, User, Wallet
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    created = 0
    skipped = 0
    async with Session() as session:
        for u in TEST_USERS:
            existing = await session.execute(select(User).where(User.email == u["email"]))
            if existing.scalar_one_or_none():
                skipped += 1
                continue
            hashed = bcrypt.hashpw(u["password"].encode(), bcrypt.gensalt()).decode()
            user = User(username=u["username"], email=u["email"], hashed_password=hashed)
            session.add(user)
            await session.flush()
            wallet = Wallet(user_id=user.id, balance=INITIAL_BALANCE)
            session.add(wallet)
            created += 1
        await session.commit()
    await engine.dispose()
    print(f"✓ seed complete — created={created} skipped={skipped}")
    print(f"  login with any trader01–trader20 / test1234")
asyncio.run(seed())