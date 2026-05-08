// web/src/lib/api.ts
import type {
  Candle, LeaderboardEntry, Position, Stock, Trade, TradeRequest, Wallet,
  UserProgress, BadgesResponse, GenerateQuizResponse, SubmitQuizResponse,
  ExamStatusResponse, StartExamResponse, SubmitExamResponse,
} from "./types"

const BASE = process.env.NEXT_PUBLIC_GATEWAY_URL ?? "http://localhost:8000"

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`
  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail ?? "request failed")
  }
  return res.json()
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const registerUser = (username: string, email: string, password: string) =>
  request<{ access_token: string; username: string; user_id: number }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  })

export const loginUser = (email: string, password: string) =>
  request<{ access_token: string; username: string; user_id: number }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })

// ── Market ────────────────────────────────────────────────────────────────────
export const fetchStocks = () => request<Stock[]>("/market/stocks")

export const fetchCandles = (symbol: string, token: string, limit = 390) =>
  request<Candle[]>(`/market/candles/${symbol}?limit=${limit}`, {}, token)

// ── Wallet ────────────────────────────────────────────────────────────────────
export const fetchWallet = (token: string) => request<Wallet>("/wallet/", {}, token)

export const resetMyWallet = (token: string) =>
  request<Wallet>("/wallet/reset/me", { method: "POST" }, token)

// ── Trades ────────────────────────────────────────────────────────────────────
export const placeTrade = (body: TradeRequest, token: string) =>
  request<Trade>("/trade/", { method: "POST", body: JSON.stringify(body) }, token)

export const fetchPositions = (token: string) => request<Position[]>("/trade/positions", {}, token)

export const fetchTradeHistory = (token: string) => request<Trade[]>("/trade/history", {}, token)

// ── Leaderboard ───────────────────────────────────────────────────────────────
export const fetchLeaderboard = (token: string, limit = 20) =>
  request<LeaderboardEntry[]>(`/api/leaderboard/trader?limit=${limit}`, {}, token)

// ── XP / Progress ─────────────────────────────────────────────────────────────
export const fetchUserProgress = (token: string, userId: number) =>
  request<UserProgress>(`/api/xp/${userId}`, {}, token)

export const awardXP = (
  token: string,
  userId: number,
  lessonId: string,
  lessonXpReward: number,
  score: number,
) =>
  request<UserProgress>("/api/xp/award", {
    method: "POST",
    body: JSON.stringify({ userId, lessonId, lessonXpReward, score }),
  }, token)

// ── Badges ────────────────────────────────────────────────────────────────────
export const fetchBadges = (token: string, userId: number) =>
  request<BadgesResponse>(`/api/badges/${userId}`, {}, token)

// ── Quiz ──────────────────────────────────────────────────────────────────────
export const generateQuiz = (
  token: string,
  userId: number,
  lessonId: string,
  seeds: unknown[] = [],
  difficulty: "easy" | "medium" | "hard" = "medium",
) =>
  request<GenerateQuizResponse>(
    "/api/quiz/generate-with-seeds",
    {
      method: "POST",
      body: JSON.stringify({ lessonId, userId, difficulty, seeds }),
    },
    token,
  )

export const submitQuiz = (
  token: string,
  userId: number,
  sessionId: string,
  answers: number[],
  lessonId: string,
) =>
  request<SubmitQuizResponse>(
    "/api/quiz/submit",
    { method: "POST", body: JSON.stringify({ sessionId, lessonId, userId, answers }) },
    token,
  )

// ── Exam ──────────────────────────────────────────────────────────────────────
export const fetchExamStatus = (token: string, userId: number) =>
  request<ExamStatusResponse>(`/api/exam/status/${userId}`, {}, token)

export const startExam = (token: string, userId: number, seeds: unknown[]) =>
  request<StartExamResponse>("/api/exam/start", {
    method: "POST",
    body: JSON.stringify({ userId, seeds }),
  }, token)

export const submitExam = (token: string, sessionId: string, userId: number, answers: number[]) =>
  request<SubmitExamResponse>("/api/exam/submit", {
    method: "POST",
    body: JSON.stringify({ sessionId, userId, answers }),
  }, token)

// ── Certificate ───────────────────────────────────────────────────────────────
export const fetchCertificate = (token: string, userId: number) =>
  request<{ certificateUrl: string; score: number; issuedAt: string }>(
    `/api/certificate/${userId}`, {}, token,
  )
