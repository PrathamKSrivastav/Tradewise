# gateway/app/exam/schemas.py
from pydantic import BaseModel
from typing import Literal


class ExamQuestion(BaseModel):
    id: int
    question: str
    options: list[str]
    difficulty: Literal["easy", "medium", "hard"]


class StartExamRequest(BaseModel):
    userId: int
    seeds: list[dict]  # all quizSeed[] objects from frontend, across all levels


class StartExamResponse(BaseModel):
    sessionId: str
    questions: list[ExamQuestion]
    attemptsUsed: int
    attemptsAllowed: int
    cooldownUntil: str | None  # ISO datetime if on cooldown


class SubmitExamRequest(BaseModel):
    sessionId: str
    userId: int
    answers: list[int]


class SubmitExamResponse(BaseModel):
    score: int
    passed: bool
    correctCount: int
    totalQuestions: int
    xpEarned: int
    newBadges: list[str]
    certificateUrl: str | None
    attemptsUsed: int
    attemptsAllowed: int
    cooldownUntil: str | None


class ExamStatusResponse(BaseModel):
    attemptsUsed: int
    attemptsAllowed: int
    cooldownUntil: str | None
    bestScore: int | None
    passed: bool
    certificateUrl: str | None
