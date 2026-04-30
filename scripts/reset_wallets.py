# scripts/reset_wallets.py
# resets all wallets to initial balance and deletes all trades + positions
# usage: python scripts/reset_wallets.py
# add --confirm flag to skip the prompt
import asyncio
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "gateway"))
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select, delete
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://tradewise:DoggyBeater@localhost:5432/tradewise")
INITIAL_BALANCE = float(os.getenv("INITIAL_WALLET_BALANCE", "100000.0"))
async def reset(confirm: bool = False):
    if not confirm:
        answer = input("This will delete ALL trades and positions and reset all wallets. Type YES to continue: ")
        if answer.strip() != "YES":
            print("aborted.")
            return
    engine = create_async_engine(DATABASE_URL, echo=False)
    Session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    from app.db.models import Wallet, Trade, Position
    async with Session() as session:
        await session.execute(delete(Trade))
        await session.execute(delete(Position))
        result = await session.execute(select(Wallet))
        wallets = result.scalars().all()
        for w in wallets:
            w.balance = INITIAL_BALANCE
        await session.commit()
    await engine.dispose()
    print(f"✓ reset complete — {len(wallets)} wallets restored to ₹{INITIAL_BALANCE:,.0f}")
    print("  all trades and positions cleared")
confirm_flag = "--confirm" in sys.argv
asyncio.run(reset(confirm=confirm_flag))