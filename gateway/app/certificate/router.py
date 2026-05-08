# gateway/app/certificate/router.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.session import get_session
from app.auth.deps import get_current_user
from app.db.models import User, Certificate
from pydantic import BaseModel

router = APIRouter(prefix="/api/certificate", tags=["certificate"])


class CertificateResponse(BaseModel):
    certificateUrl: str
    score: int
    issuedAt: str


@router.get("/{user_id}", response_model=CertificateResponse)
async def get_certificate(
    user_id: int,
    db: AsyncSession = Depends(get_session),
    _: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Certificate).where(Certificate.user_id == user_id)
    )
    cert = result.scalar_one_or_none()
    if not cert:
        raise HTTPException(status_code=404, detail="No certificate found")
    return CertificateResponse(
        certificateUrl=cert.certificate_url,
        score=cert.score,
        issuedAt=cert.issued_at.isoformat(),
    )
