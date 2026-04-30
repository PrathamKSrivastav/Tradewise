// web/src/components/Leaderboard.tsx
"use client"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"
import { fetchLeaderboard } from "../lib/api"
import { Card } from "../components/ui/Card"
import type { LeaderboardEntry } from "../lib/types"
const medals = ["🥇", "🥈", "🥉"]
export function Leaderboard() {
  const { token, user_id } = useUserStore()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const refresh = () => {
    if (!token) return
    fetchLeaderboard(token).then(setEntries).catch(() => {})
  }
  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 60_000)
    return () => clearInterval(id)
  }, [token])
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono text-white/40 tracking-widest">LEADERBOARD</p>
        <button onClick={refresh} className="text-[10px] text-white/30 hover:text-white/60 transition-colors">
          REFRESH
        </button>
      </div>
      {entries.length === 0 ? (
        <p className="text-sm text-white/25 text-center py-4">No participants yet</p>
      ) : (
        <div className="flex flex-col gap-1.5">
          {entries.map((e) => {
            const isMe = e.user_id === user_id
            const isProfit = e.realised_pnl >= 0
            return (
              <div
                key={e.user_id}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                  isMe ? "bg-indigo-500/15 border border-indigo-500/30" : "bg-white/4"
                }`}
              >
                <span className="text-sm w-5 text-center">
                  {medals[e.rank - 1] ?? <span className="text-white/30 font-mono text-xs">{e.rank}</span>}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold truncate ${isMe ? "text-indigo-300" : "text-white"}`}>
                    {e.username}{isMe && " (you)"}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono">
                    ₹{e.wallet_balance.toLocaleString("en-IN")}
                  </p>
                </div>
                <p className={`text-sm font-mono font-bold ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                  {isProfit ? "+" : ""}₹{e.realised_pnl.toLocaleString("en-IN")}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}