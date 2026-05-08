# gateway/app/quiz/schemas.py
from pydantic import BaseModel
from typing import Literal


class QuizQuestion(BaseModel):
    id: int
    question: str
    options: list[str]
    difficulty: Literal['easy', 'medium', 'hard']


class GenerateRequest(BaseModel):
    lessonId: str
    userId: int
    difficulty: Literal['easy', 'medium', 'hard'] = 'medium'
    seeds: list[dict] = []


class GenerateResponse(BaseModel):
    sessionId: str
    lessonId: str
    questions: list[QuizQuestion]


class SubmitRequest(BaseModel):
    sessionId: str
    lessonId: str
    userId: int
    answers: list[int]  # index 0-3 for each question


class SubmitResponse(BaseModel):
    score: int           # 0-100
    passed: bool
    xpEarned: int
    streakMultiplier: float
    correctCount: int
    totalQuestions: int
    newBadges: list[str]
