# gateway/app/exam/service.py
import json
import random
import uuid
from datetime import datetime, timezone, timedelta
from typing import Any

from groq import AsyncGroq
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.config import settings
from app.db.models import User, ExamAttempt, Certificate
from app.xp.service import award_xp
from app.badges.service import check_badges
from app.certificate.service import generate_certificate

MAX_ATTEMPTS = 3
COOLDOWN_DAYS = 7
PASS_THRESHOLD = 75      # %
EXAM_QUESTION_COUNT = 60

_client: AsyncGroq | None = None
_sessions: dict[str, dict[str, Any]] = {}


def _get_client() -> AsyncGroq:
    global _client
    if _client is None:
        _client = AsyncGroq(api_key=settings.groq_api_key)
    return _client


EXAM_PROMPT = """You are a final exam generator for FinSim, a financial education platform for Indian retail investors.

Select exactly {count} questions from the provided seed pool. The selection must:
- Cover all 8 levels proportionally (about 7–8 questions per level)
- Mix difficulties: ~30% easy, ~50% medium, ~20% hard
- Prefer questions with clear, unambiguous correct answers

Return ONLY a valid JSON array — no markdown, no explanation:
[
  {{
    "id": 0,
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "correct": 0,
    "explanation": "...",
    "difficulty": "easy|medium|hard"
  }}
]

Seed pool:
{seeds}
"""


async def get_exam_status(user_id: int, db: AsyncSession) -> dict:
    attempts_result = await db.execute(
        select(ExamAttempt)
        .where(ExamAttempt.user_id == user_id)
        .order_by(ExamAttempt.attempted_at.desc())
    )
    attempts = attempts_result.scalars().all()
    attempts_used = len(attempts)
    best_score = max((a.score for a in attempts), default=None)
    passed = any(a.passed for a in attempts)

    cert_result = await db.execute(
        select(Certificate).where(Certificate.user_id == user_id)
    )
    cert = cert_result.scalar_one_or_none()

    cooldown_until = None
    if attempts_used >= MAX_ATTEMPTS:
        latest = attempts[0].attempted_at if attempts else None
        if latest:
            unlock_at = latest + timedelta(days=COOLDOWN_DAYS)
            if unlock_at > datetime.now(timezone.utc):
                cooldown_until = unlock_at.isoformat()

    return {
        "attemptsUsed": attempts_used,
        "attemptsAllowed": MAX_ATTEMPTS,
        "cooldownUntil": cooldown_until,
        "bestScore": best_score,
        "passed": passed,
        "certificateUrl": cert.certificate_url if cert else None,
    }


async def start_exam(user_id: int, seeds: list[dict], db: AsyncSession) -> dict:
    status = await get_exam_status(user_id, db)

    if status["cooldownUntil"] is not None:
        raise ValueError(f"On cooldown until {status['cooldownUntil']}")

    if status["attemptsUsed"] >= MAX_ATTEMPTS and status["cooldownUntil"] is None:
        # Cooldown has passed — reset the window by checking if the last attempt
        # was more than COOLDOWN_DAYS ago (status returns None cooldown when expired)
        pass  # allow: cooldown expired

    count = min(EXAM_QUESTION_COUNT, len(seeds))
    seeds_json = json.dumps(seeds, indent=2)

    client = _get_client()
    message = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_completion_tokens=8192,
        messages=[
            {"role": "system", "content": "You are a precise exam generator. Output only valid JSON arrays."},
            {"role": "user", "content": EXAM_PROMPT.format(count=count, seeds=seeds_json)},
        ],
    )

    raw = message.choices[0].message.content.strip()
    questions_data = json.loads(raw)

    questions = []
    answers_key: list[int] = []
    for i, q in enumerate(questions_data):
        options = list(q["options"])
        correct_text = options[q["correct"]]
        random.shuffle(options)
        new_correct = options.index(correct_text)
        questions.append({
            "id": i,
            "question": q["question"],
            "options": options,
            "difficulty": q["difficulty"],
        })
        answers_key.append(new_correct)

    session_id = str(uuid.uuid4())
    _sessions[session_id] = {
        "userId": user_id,
        "answersKey": answers_key,
        "questionsData": questions_data,
    }

    # Re-fetch updated status for attempt count
    updated_status = await get_exam_status(user_id, db)

    return {
        "sessionId": session_id,
        "questions": questions,
        "attemptsUsed": updated_status["attemptsUsed"],
        "attemptsAllowed": MAX_ATTEMPTS,
        "cooldownUntil": updated_status["cooldownUntil"],
    }


async def submit_exam(session_id: str, user_id: int, answers: list[int], db: AsyncSession) -> dict:
    session = _sessions.get(session_id)
    if not session:
        raise ValueError("Exam session not found or expired")
    if session["userId"] != user_id:
        raise ValueError("Session user mismatch")

    key = session["answersKey"]
    correct_count = sum(1 for i, a in enumerate(answers) if i < len(key) and a == key[i])
    total = len(key)
    score = int((correct_count / total) * 100) if total else 0
    passed = score >= PASS_THRESHOLD

    # Record attempt
    db.add(ExamAttempt(
        user_id=user_id,
        score=score,
        correct_count=correct_count,
        total_questions=total,
        passed=passed,
    ))
    await db.commit()

    xp_earned = 0
    new_badges: list[str] = []
    certificate_url = None

    if passed:
        # Award XP (300 for passing final exam)
        xp_result = await award_xp(user_id, 300, score, db)
        xp_earned = xp_result["xpEarned"]
        new_badges = await check_badges(xp_result["user"], db)

        # Generate certificate if not already issued
        existing_cert = await db.execute(
            select(Certificate).where(Certificate.user_id == user_id)
        )
        if existing_cert.scalar_one_or_none() is None:
            user_result = await db.execute(select(User).where(User.id == user_id))
            user = user_result.scalar_one()
            certificate_url = await generate_certificate(user.username, score, user_id, db)

    _sessions.pop(session_id, None)

    status = await get_exam_status(user_id, db)

    return {
        "score": score,
        "passed": passed,
        "correctCount": correct_count,
        "totalQuestions": total,
        "xpEarned": xp_earned,
        "newBadges": new_badges,
        "certificateUrl": certificate_url or status.get("certificateUrl"),
        "attemptsUsed": status["attemptsUsed"],
        "attemptsAllowed": MAX_ATTEMPTS,
        "cooldownUntil": status["cooldownUntil"],
    }
