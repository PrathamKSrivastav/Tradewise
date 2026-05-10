# gateway/app/quiz/service.py
import json
import random
import uuid
import logging
from typing import Any
from groq import AsyncGroq
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.config import settings
from app.db.models import User, QuizHistory
from app.quiz.schemas import QuizQuestion
from app.xp.service import award_xp
from app.badges.service import check_badges

# Configure logging to both console and file for easier debugging
logger = logging.getLogger(__name__)
file_handler = logging.FileHandler("quiz_service.log")
file_handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(name)s — %(message)s"))
logger.addHandler(file_handler)
logger.setLevel(logging.INFO)

_client: AsyncGroq | None = None

# In-memory session store: sessionId -> {lessonId, questions, answers_key}
_sessions: dict[str, dict[str, Any]] = {}


def _get_client() -> AsyncGroq:
    global _client
    if _client is None:
        if not settings.groq_api_key:
            logger.error("GROQ_API_KEY is not set in settings")
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
    logger.info(f"Generating quiz for lesson={lesson_id}, user={user_id}, difficulty={difficulty}, seed_count={len(quiz_seeds)}")
    
    if not quiz_seeds:
        logger.warning(f"No seeds provided for lesson {lesson_id}")
        raise ValueError("Cannot generate quiz: No seeds provided")

    # Determine adaptive difficulty from last quiz score
    try:
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
            logger.info(f"Adaptive difficulty applied: {difficulty} (last score: {last.score})")
    except Exception as e:
        logger.error(f"Error fetching quiz history: {e}")
        # Continue with provided difficulty

    count = min(10, len(quiz_seeds))
    seeds_json = json.dumps(quiz_seeds, indent=2)

    try:
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
        logger.info(f"Groq raw response: {raw}")

        # Robust JSON extraction
        if "```json" in raw:
            raw = raw.split("```json")[1].split("```")[0].strip()
        elif "```" in raw:
            raw = raw.split("```")[1].split("```")[0].strip()
        
        try:
            questions_data = json.loads(raw)
        except json.JSONDecodeError as e:
            logger.error(f"Failed to decode JSON from Groq: {e}. Raw content: {raw}")
            raise ValueError(f"AI returned invalid JSON: {str(e)}")
        
        if not isinstance(questions_data, list):
            # Sometimes LLM wraps the list in an object
            if isinstance(questions_data, dict):
                for key in ["questions", "quiz", "data"]:
                    if key in questions_data and isinstance(questions_data[key], list):
                        questions_data = questions_data[key]
                        break
            
            if not isinstance(questions_data, list):
                logger.error(f"Expected list from LLM, got {type(questions_data)}")
                raise ValueError("Invalid quiz format received from AI (expected a list)")

        # Shuffle options so the correct answer isn't always in a fixed position
        questions: list[QuizQuestion] = []
        answers_key: list[int] = []
        for i, q in enumerate(questions_data):
            try:
                if not isinstance(q, dict):
                    continue
                    
                question_text = q.get("question", "No question provided")
                options = q.get("options", [])
                correct_idx = q.get("correct", 0)
                
                if not options or not isinstance(options, list):
                    logger.warning(f"Question {i} has no options")
                    continue
                    
                if not isinstance(correct_idx, int) or correct_idx >= len(options):
                    logger.warning(f"Correct index {correct_idx} out of range or not int for options {options}")
                    correct_idx = 0
                    
                correct_text = options[correct_idx]
                # Create a copy of options to shuffle
                shuffled_options = list(options)
                random.shuffle(shuffled_options)
                new_correct_idx = shuffled_options.index(correct_text)
                
                # Ensure difficulty is valid for Pydantic model
                q_diff = str(q.get("difficulty", difficulty)).lower()
                if q_diff not in ['easy', 'medium', 'hard']:
                    q_diff = difficulty
                    
                questions.append(QuizQuestion(
                    id=i,
                    question=question_text,
                    options=shuffled_options,
                    difficulty=q_diff,
                ))
                answers_key.append(new_correct_idx)
            except Exception as item_err:
                logger.warning(f"Skipping malformed quiz item {i}: {item_err}")

        if not questions:
            raise ValueError("AI failed to generate any valid quiz questions")

        session_id = str(uuid.uuid4())
        _sessions[session_id] = {
            "lessonId": lesson_id,
            "userId": user_id,
            "answersKey": answers_key,
        }

        logger.info(f"Quiz generated successfully: sessionId={session_id}, questions={len(questions)}")
        return {"sessionId": session_id, "lessonId": lesson_id, "questions": questions}

    except Exception as e:
        logger.error(f"Error in generate_quiz: {e}", exc_info=True)
        raise e


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

            # Award bonus XP for each newly earned badge
            BADGE_XP = 10
            if new_badges:
                badge_bonus = len(new_badges) * BADGE_XP
                await db.execute(
                    update(User)
                    .where(User.id == user_id)
                    .values(total_xp=User.total_xp + badge_bonus)
                )
                await db.commit()
                xp_earned += badge_bonus

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
