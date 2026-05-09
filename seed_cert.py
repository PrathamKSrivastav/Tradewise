import asyncio
import os
import sys
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select

# Add gateway to path
sys.path.insert(0, os.path.join(os.getcwd(), "gateway"))

from app.db.models import User, Certificate
# Manually load DATABASE_URL to avoid config loading issues outside Docker
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://tradewise:tradewise1234@localhost:5432/tradewise")

async def seed_sample_cert():
    engine = create_async_engine(DATABASE_URL, echo=True)
    Session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with Session() as session:
        # Get the first user
        result = await session.execute(select(User).limit(1))
        user = result.scalar_one_or_none()
        
        if not user:
            print("No users found. Please run seed_users.py first.")
            return

        # Check if cert already exists
        existing = await session.execute(select(Certificate).where(Certificate.user_id == user.id))
        if existing.scalar_one_or_none():
            print(f"User {user.username} already has a certificate.")
            return

        # Create sample cert
        # Using a publicly accessible sample PDF for testing
        sample_url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        
        cert = Certificate(
            user_id=user.id,
            score=95,
            certificate_url=sample_url
        )
        session.add(cert)
        await session.commit()
        print(f"✓ Created sample certificate for {user.username} (ID: {user.id})")
        print(f"URL: {sample_url}")

if __name__ == "__main__":
    asyncio.run(seed_sample_cert())
