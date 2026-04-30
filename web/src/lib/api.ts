// web/src/lib/api.ts
import type { Candle, LeaderboardEntry, Position, Stock, Trade, TradeRequest, Wallet } from "./types"
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
// auth
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
// market
export const fetchStocks = () => request<Stock[]>("/market/stocks")
export const fetchCandles = (symbol: string, token: string, limit = 390) =>
  request<Candle[]>(`/market/candles/${symbol}?limit=${limit}`, {}, token)
// wallet
export const fetchWallet = (token: string) => request<Wallet>("/wallet/", {}, token)
export const resetMyWallet = (token: string) =>
  request<Wallet>("/wallet/reset/me", { method: "POST" }, token)
// trades
export const placeTrade = (body: TradeRequest, token: string) =>
  request<Trade>("/trade/", { method: "POST", body: JSON.stringify(body) }, token)
export const fetchPositions = (token: string) => request<Position[]>("/trade/positions", {}, token)
export const fetchTradeHistory = (token: string) => request<Trade[]>("/trade/history", {}, token)
// leaderboard
export const fetchLeaderboard = (token: string, limit = 20) =>
  request<LeaderboardEntry[]>(`/leaderboard/?limit=${limit}`, {}, token)