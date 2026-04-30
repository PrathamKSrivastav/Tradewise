# gateway/app/auth/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel, EmailStr
from app.auth.service import register_user, authenticate_user, create_token
from app.db.session import get_session
router = APIRouter(prefix="/auth", tags=["auth"])
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    user_id: int
@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest, session: AsyncSession = Depends(get_session)):
    user = await register_user(session, body.username, body.email, body.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="email already registered")
    return TokenResponse(
        access_token=create_token(user.id, user.username),
        username=user.username,
        user_id=user.id,
    )
@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, session: AsyncSession = Depends(get_session)):
    user = await authenticate_user(session, body.email, body.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid credentials")
    return TokenResponse(
        access_token=create_token(user.id, user.username),
        username=user.username,
        user_id=user.id,
    )