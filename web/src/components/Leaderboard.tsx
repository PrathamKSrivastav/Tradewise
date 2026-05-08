// web/src/components/Leaderboard.tsx
"use client"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"
import { fetchLeaderboard } from "../lib/api"
import type { LeaderboardEntry } from "../lib/types"
import clsx from "clsx"

interface Props { compact?: boolean }

const MEDAL = {
  1: "text-amber-400 ring-amber-400/40 bg-amber-400/10",
  2: "text-ink ring-stroke3 bg-white/8",
  3: "text-orange-300 ring-orange-300/30 bg-orange-300/8",
}

export function Leaderboard({ compact }: Props) {
  const { token, user_id } = useUserStore()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])

  const refresh = () => {
    if (!token) return
    fetchLeaderboard(token).then(data => setEntries(Array.isArray(data) ? data : [])).catch(() => {})
  }

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, 60_000)
    return () => clearInterval(id)
  }, [token])

  if (entries.length === 0) {
    return <p className="text-[13px] text-ink3 text-center py-8">No participants yet</p>
  }

  return (
    <div>
      {/* Column headers */}
      <div className="grid grid-cols-[28px_1fr_auto] px-3 py-2 text-[10px] text-ink3 font-semibold tracking-[0.12em] uppercase">
        <div>#</div>
        <div>Trader</div>
        <div className="text-right">Net worth</div>
      </div>

      <div className="space-y-0.5">
        {entries.map(e => {
          const isMe = e.user_id === user_id
          const isProfit = e.realised_pnl >= 0
          const medal = MEDAL[e.rank as keyof typeof MEDAL]
          return (
            <div
              key={e.user_id}
              className={clsx(
                "grid grid-cols-[28px_1fr_auto] items-center px-3 rounded-btn",
                compact ? "py-2" : "py-2.5",
                isMe && "bg-indigo-500/10 ring-1 ring-indigo-500/30",
              )}
            >
              <div className={clsx("w-6 h-6 rounded-full grid place-items-center text-[11px] font-semibold ring-1 mono",
                medal || "text-ink3 ring-stroke1 bg-white/4"
              )}>
                {e.rank}
              </div>
              <div className="flex items-center gap-2.5 min-w-0">
                <UserAvatar name={e.username} size={24} />
                <span className={clsx("text-[12.5px] truncate", isMe ? "text-indigo-300 font-semibold" : "text-ink")}>
                  {e.username}{isMe && <span className="ml-1.5 text-[10px] text-indigo-400/80">you</span>}
                </span>
              </div>
              <div className="text-right">
                <div className="mono text-[12.5px] num text-ink">
                  ₹{(e.wallet_balance / 100000).toFixed(2)}L
                </div>
                {!compact && (
                  <div className={clsx("mono text-[11px] num", isProfit ? "text-emerald-400" : "text-rose-400")}>
                    {isProfit ? "+" : ""}₹{e.realised_pnl.toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function UserAvatar({ name, size }: { name: string; size: number }) {
  const initials = name.split(/[_.\s]/).map((s: string) => s[0]).slice(0, 2).join("").toUpperCase()
  const tones = [
    "bg-indigo-500/30 text-indigo-300", "bg-amber-500/25 text-amber-300",
    "bg-emerald-400/25 text-emerald-300", "bg-rose-400/25 text-rose-300",
    "bg-sky-400/25 text-sky-300", "bg-fuchsia-400/25 text-fuchsia-300",
  ]
  const i = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % tones.length
  return (
    <div
      className={clsx("grid place-items-center rounded-full ring-1 ring-stroke1 font-semibold flex-none", tones[i])}
      style={{ width: size, height: size, fontSize: Math.max(9, size * 0.38) }}
    >
      {initials}
    </div>
  )
}
