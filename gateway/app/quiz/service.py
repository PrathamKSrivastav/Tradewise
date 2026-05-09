# gateway/app/quiz/service.py
import json
import random
import uuid
from typing import Any
from groq import AsyncGroq
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.config import settings
from app.db.models import User, QuizHistory
from app.quiz.schemas import QuizQuestion
from app.xp.service import award_xp
from app.badges.service import check_badges

_client: AsyncGroq | None = None

# In-memory session store: sessionId -> {lessonId, questions, answers_key}
_sessions: dict[str, dict[str, Any]] = {}


def _get_client() -> AsyncGroq:
    global _client
    if _client is None:
        _client = AsyncGroq(api_key=settings.groq_api_key)
    return _client


GENERATE_PROMPT = """You are a quiz generator for FinSim, a financial education platform for Indian retail investors.

Given these quiz seeds from a lesson, select {count} questions that match difficulty level "{difficulty}".
If there aren't enough seeds at that difficulty, use adjacent difficulty levels.

Return ONLY a valid JSON array with this exact structure — no markdown, no explanation:
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

Quiz seeds:
{seeds}
"""


async def generate_quiz(
    lesson_id: str,
    user_id: int,
    quiz_seeds: list[dict],
    difficulty: str,
    db: AsyncSession,
) -> dict:
    # Determine adaptive difficulty from last quiz score
    result = await db.execute(
        select(QuizHistory)
        .where(QuizHistory.user_id == user_id, QuizHistory.lesson_id == lesson_id)
        .order_by(QuizHistory.last_attempt_at.desc())
        .limit(1)
    )
    last = result.scalar_one_or_none()
    if last:
        if last.score > 80:
            difficulty = 'hard'
        elif last.score < 60:
            difficulty = 'easy'

    count = min(10, len(quiz_seeds))
    seeds_json = json.dumps(quiz_seeds, indent=2)

    client = _get_client()
    response = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_completion_tokens=8192,
        temperature=1,
        top_p=1,
        messages=[{
            "role": "user",
            "content": GENERATE_PROMPT.format(count=count, difficulty=difficulty, seeds=seeds_json),
        }],
    )

    raw = response.choices[0].message.content.strip()
    questions_data = json.loads(raw)

    # Shuffle options so the correct answer isn't always in a fixed position
    questions: list[QuizQuestion] = []
    answers_key: list[int] = []
    for i, q in enumerate(questions_data):
        options = q["options"]
        correct_text = options[q["correct"]]
        random.shuffle(options)
        new_correct_idx = options.index(correct_text)
        questions.append(QuizQuestion(
            id=i,
            question=q["question"],
            options=options,
            difficulty=q["difficulty"],
        ))
        answers_key.append(new_correct_idx)

    session_id = str(uuid.uuid4())
    _sessions[session_id] = {
        "lessonId": lesson_id,
        "userId": user_id,
        "answersKey": answers_key,
    }

    return {"sessionId": session_id, "lessonId": lesson_id, "questions": questions}


async def submit_quiz(
    session_id: str,
    lesson_id: str,
    user_id: int,
    lesson_xp_reward: int,
    answers: list[int],
    db: AsyncSession,
) -> dict:
    session = _sessions.get(session_id)
    if not session:
        raise ValueError("Session not found or expired")

    key = session["answersKey"]
    correct_count = sum(1 for i, a in enumerate(answers) if i < len(key) and a == key[i])
    total = len(key)
    score = int((correct_count / total) * 100) if total else 0
    passed = score >= 70

    # Upsert QuizHistory
    existing = await db.execute(
        select(QuizHistory)
        .where(QuizHistory.user_id == user_id, QuizHistory.lesson_id == lesson_id)
    )
    record = existing.scalar_one_or_none()
    if record:
        await db.execute(
            update(QuizHistory)
            .where(QuizHistory.user_id == user_id, QuizHistory.lesson_id == lesson_id)
            .values(score=score, attempts=record.attempts + 1)
        )
    else:
        db.add(QuizHistory(user_id=user_id, lesson_id=lesson_id, score=score, attempts=1))
    await db.commit()

    # Mark lesson complete and award XP only on pass
    xp_earned = 0
    new_badges: list[str] = []
    if passed:
        user_result = await db.execute(select(User).where(User.id == user_id))
        user = user_result.scalar_one_or_none()
        if user and lesson_id not in (user.completed_lessons or []):
            new_completed = list(user.completed_lessons or []) + [lesson_id]
            await db.execute(
                update(User).where(User.id == user_id).values(completed_lessons=new_completed)
            )
            await db.commit()

            xp_result = await award_xp(user_id, lesson_xp_reward, score, db)
            xp_earned = xp_result["xpEarned"]
            new_badges = await check_badges(xp_result["user"], db)

    multiplier_result = await db.execute(select(User.streak_multiplier).where(User.id == user_id))
    multiplier = float(multiplier_result.scalar_one_or_none() or 1.0)

    _sessions.pop(session_id, None)

    return {
        "score": score,
        "passed": passed,
        "xpEarned": xp_earned,
        "streakMultiplier": multiplier,
        "correctCount": correct_count,
        "totalQuestions": total,
        "newBadges": new_badges,
    }
