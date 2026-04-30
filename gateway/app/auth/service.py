# gateway/app/auth/service.py
from datetime import datetime, timedelta, timezone
import bcrypt
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.config import settings
from app.db.models import User, Wallet
_ALGORITHM = "HS256"
def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()
def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())
def create_token(user_id: int, username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_expire_minutes)
    return jwt.encode(
        {"sub": str(user_id), "username": username, "exp": expire},
        settings.jwt_secret,
        algorithm=_ALGORITHM,
    )
def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.jwt_secret, algorithms=[_ALGORITHM])
    except JWTError:
        return {}
async def register_user(session: AsyncSession, username: str, email: str, password: str) -> User | None:
    existing = await session.execute(select(User).where(User.email == email))
    if existing.scalar_one_or_none():
        return None
    user = User(username=username, email=email, hashed_password=hash_password(password))
    session.add(user)
    await session.flush()
    wallet = Wallet(user_id=user.id, balance=settings.initial_wallet_balance)
    session.add(wallet)
    await session.commit()
    await session.refresh(user)
    return user
async def authenticate_user(session: AsyncSession, email: str, password: str) -> User | None:
    result = await session.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user