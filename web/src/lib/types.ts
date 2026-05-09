// web/src/lib/types.ts
export interface Candle {
  symbol: string
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}
export interface Stock {
  symbol: string
  name: string
  risk_label: "LOW" | "MEDIUM" | "HIGH" | "EXTREME"
  base_price: number
}
export interface User {
  user_id: number
  username: string
  access_token: string
}
export interface Wallet {
  user_id: number
  balance: number
  realised_pnl: number
}
export interface Position {
  symbol: string
  quantity: number
  avg_buy_price: number
  current_price?: number
  unrealised_pnl?: number
}
export interface Trade {
  trade_id: number
  symbol: string
  side: "buy" | "sell"
  quantity: number
  price: number
  total: number
  wallet_balance: number
  timestamp: number
}
export interface LeaderboardEntry {
  rank: number
  user_id: number
  username: string
  wallet_balance: number
  realised_pnl: number
  net_worth: number
}
export interface TradeRequest {
  symbol: string
  side: "buy" | "sell"
  quantity: number
}

// Academy
export interface UserProgress {
  totalXP: number
  currentLevel: number
  currentStreak: number
  streakMultiplier: number
  unlockedLevels: number[]
  badges: string[]
  completedLessons: string[]
}

export interface BadgeInfo {
  id: string
  label: string
  description: string
  earnedAt?: string
}

export interface BadgesResponse {
  earned: BadgeInfo[]
  locked: BadgeInfo[]
}

export interface QuizQuestion {
  id: number
  questionId?: string
  question: string
  options: [string, string, string, string]
  difficulty?: "easy" | "medium" | "hard"
}

export interface GenerateQuizResponse {
  sessionId: string
  questions: QuizQuestion[]
}

export interface SubmitQuizResponse {
  score: number
  passed: boolean
  xpEarned: number
  newBadges: string[]
  correctCount: number
  totalQuestions: number
  streakMultiplier: number
}

export interface ExamStatusResponse {
  attemptsUsed: number
  attemptsAllowed: number
  cooldownUntil: string | null
  bestScore: number | null
  passed: boolean
  certificateUrl: string | null
}

export interface StartExamResponse {
  sessionId: string
  questions: QuizQuestion[]
  attemptsUsed: number
  attemptsAllowed: number
  cooldownUntil: string | null
}

export interface SubmitExamResponse {
  score: number
  passed: boolean
  correctCount: number
  totalQuestions: number
  xpEarned: number
  newBadges: string[]
  certificateUrl: string | null
  attemptsUsed: number
  attemptsAllowed: number
  cooldownUntil: string | null
}