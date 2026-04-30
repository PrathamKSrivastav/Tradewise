# gateway/app/wallet/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.auth.deps import get_current_user, get_admin_user
from app.db.session import get_session
from app.db.models import User
from app.wallet.service import get_wallet, get_pnl, reset_wallet, reset_all_wallets
router = APIRouter(prefix="/wallet", tags=["wallet"])
@router.get("/")
async def my_wallet(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    try:
        wallet = await get_wallet(session, user.id)
        pnl = await get_pnl(session, user.id)
        return {**wallet, **pnl}
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(exc))
@router.post("/reset/me")
async def reset_my_wallet(
    user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    return await reset_wallet(session, user.id)
@router.post("/reset/all")
async def reset_all(
    _: User = Depends(get_admin_user),
    session: AsyncSession = Depends(get_session),
):
    return await reset_all_wallets(session)