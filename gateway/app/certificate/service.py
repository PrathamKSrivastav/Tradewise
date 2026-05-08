# gateway/app/certificate/service.py
import io
import os
from datetime import datetime, timezone

import cloudinary
import cloudinary.uploader
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import update

from app.config import settings
from app.db.models import Certificate, User


def _configure_cloudinary() -> None:
    cloudinary.config(
        cloud_name=settings.cloudinary_cloud_name,
        api_key=settings.cloudinary_api_key,
        api_secret=settings.cloudinary_api_secret,
        secure=True,
    )


def _build_pdf(username: str, score: int, issued_at: datetime) -> bytes:
    buf = io.BytesIO()
    w, h = landscape(A4)
    c = canvas.Canvas(buf, pagesize=(w, h))

    # Background — deep navy
    c.setFillColor(colors.HexColor("#0f172a"))
    c.rect(0, 0, w, h, fill=True, stroke=False)

    # Gold border
    c.setStrokeColor(colors.HexColor("#f59e0b"))
    c.setLineWidth(4)
    c.rect(12 * mm, 12 * mm, w - 24 * mm, h - 24 * mm, fill=False, stroke=True)

    # Inner thin border
    c.setStrokeColor(colors.HexColor("#fbbf24"))
    c.setLineWidth(1)
    c.rect(16 * mm, 16 * mm, w - 32 * mm, h - 32 * mm, fill=False, stroke=True)

    # Header — FinSim branding
    c.setFillColor(colors.HexColor("#f59e0b"))
    c.setFont("Helvetica-Bold", 14)
    c.drawCentredString(w / 2, h - 40 * mm, "FINSIM ACADEMY")

    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, h - 48 * mm, "AI-Guided Financial Learning Platform")

    # Divider
    c.setStrokeColor(colors.HexColor("#334155"))
    c.setLineWidth(0.5)
    c.line(40 * mm, h - 54 * mm, w - 40 * mm, h - 54 * mm)

    # Certificate of Completion
    c.setFillColor(colors.white)
    c.setFont("Helvetica", 11)
    c.drawCentredString(w / 2, h - 68 * mm, "CERTIFICATE OF COMPLETION")

    # Recipient
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 10)
    c.drawCentredString(w / 2, h - 82 * mm, "This is to certify that")

    c.setFillColor(colors.white)
    c.setFont("Helvetica-Bold", 26)
    c.drawCentredString(w / 2, h - 100 * mm, username)

    # Underline name
    name_width = c.stringWidth(username, "Helvetica-Bold", 26)
    line_x = (w - name_width) / 2
    c.setStrokeColor(colors.HexColor("#f59e0b"))
    c.setLineWidth(1)
    c.line(line_x, h - 103 * mm, line_x + name_width, h - 103 * mm)

    # Achievement text
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 10)
    c.drawCentredString(w / 2, h - 116 * mm, "has successfully completed the FinSim Academy Final Examination")

    c.setFillColor(colors.HexColor("#e2e8f0"))
    c.setFont("Helvetica", 10)
    c.drawCentredString(w / 2, h - 124 * mm, "covering Financial Basics, Stock Markets, Technical & Fundamental Analysis,")
    c.drawCentredString(w / 2, h - 131 * mm, "Risk Management, Trading Systems, Derivatives, and Market Taxation")

    # Score badge
    c.setFillColor(colors.HexColor("#1e3a5f"))
    c.roundRect(w / 2 - 35 * mm, h - 158 * mm, 70 * mm, 20 * mm, 5 * mm, fill=True, stroke=False)
    c.setFillColor(colors.HexColor("#f59e0b"))
    c.setFont("Helvetica-Bold", 11)
    c.drawCentredString(w / 2, h - 147 * mm, f"Final Score: {score}%")
    c.setFillColor(colors.HexColor("#94a3b8"))
    c.setFont("Helvetica", 8)
    c.drawCentredString(w / 2, h - 153 * mm, "Pass Threshold: 75%")

    # Date + signature line
    date_str = issued_at.strftime("%d %B %Y")
    c.setFillColor(colors.HexColor("#64748b"))
    c.setFont("Helvetica", 9)
    c.drawCentredString(w / 2, h - 170 * mm, f"Issued on {date_str}")

    c.setStrokeColor(colors.HexColor("#334155"))
    c.setLineWidth(0.5)
    c.line(40 * mm, h - 182 * mm, w - 40 * mm, h - 182 * mm)

    c.setFillColor(colors.HexColor("#475569"))
    c.setFont("Helvetica", 7)
    c.drawCentredString(
        w / 2,
        h - 188 * mm,
        "FinSim Academy · Certificate ID: FSA-" + str(hash(username + date_str))[-8:].upper(),
    )

    c.save()
    return buf.getvalue()


async def generate_certificate(
    username: str,
    score: int,
    user_id: int,
    db: AsyncSession,
) -> str:
    _configure_cloudinary()
    issued_at = datetime.now(timezone.utc)

    pdf_bytes = _build_pdf(username, score, issued_at)

    # Upload to Cloudinary
    upload_result = cloudinary.uploader.upload(
        pdf_bytes,
        resource_type="raw",
        folder="finsim/certificates",
        public_id=f"cert_user_{user_id}",
        overwrite=True,
        format="pdf",
    )
    cert_url = upload_result["secure_url"]

    # Persist to DB
    db.add(Certificate(
        user_id=user_id,
        score=score,
        issued_at=issued_at,
        certificate_url=cert_url,
    ))
    await db.execute(
        update(User).where(User.id == user_id).values(certificate_url=cert_url)
    )
    await db.commit()

    return cert_url
