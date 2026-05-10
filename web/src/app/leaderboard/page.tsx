"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../hooks/useAuth"
import { AppLayout } from "../../components/layout/AppLayout"
import { fetchLeaderboard } from "../../lib/api"
import { useUserStore } from "../../store/userStore"
import type { LeaderboardEntry } from "../../lib/types"
import clsx from "clsx"

function Avatar({ name, size = 30 }: { name: string; size?: number }) {
  const initials = name.split(/[_.\s]/).map((s: string) => s[0]).slice(0, 2).join("").toUpperCase()
  const tones = [
    "bg-indigo-500/30 text-indigo-300",
    "bg-amber-500/25 text-amber-300",
    "bg-emerald-400/25 text-emerald-300",
    "bg-rose-400/25 text-rose-300",
    "bg-sky-400/25 text-sky-300",
    "bg-fuchsia-400/25 text-fuchsia-300",
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

export default function LeaderboardPage() {
  const { isAuthed } = useAuth()
  const router = useRouter()
  const { token, user_id } = useUserStore()
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [period, setPeriod] = useState("Week")

  useEffect(() => { if (!isAuthed) router.push("/login") }, [isAuthed])

  useEffect(() => {
    if (!token) return
    fetchLeaderboard(token).then(setEntries).catch(() => {})
  }, [token])

  if (!isAuthed) return null

  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3)

  const podiumStyle = (rank: number) =>
    rank === 1
      ? { ring: "ring-amber-400/40", bg: "bg-amber-400/10", medal: "text-amber-400", minH: "lg:min-h-[160px]", label: "🥇 1st", order: "lg:order-2" }
      : rank === 2
      ? { ring: "ring-stroke3", bg: "bg-white/[0.06]", medal: "text-white/60", minH: "lg:min-h-[130px]", label: "🥈 2nd", order: "lg:order-1" }
      : { ring: "ring-orange-300/30", bg: "bg-orange-300/[0.08]", medal: "text-orange-300", minH: "lg:min-h-[130px]", label: "🥉 3rd", order: "lg:order-3" }

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-6 overflow-auto scrollbar-none flex-1">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <Link href="/" className="text-[12px] text-white/40 hover:text-white/70 flex items-center gap-1.5 mb-2 transition">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back to dashboard
              </Link>
              <h1 className="text-[28px] lg:text-[32px] font-semibold tracking-[-0.02em] text-white">Leaderboard</h1>
              <div className="text-[13px] text-white/40 mt-0.5">Top traders · real-time P&L rankings</div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.04] ring-1 ring-stroke1">
                {["Day", "Week", "Month", "All-time"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setPeriod(t)}
                    className={clsx(
                      "h-8 px-3 rounded-md text-[12px] font-medium transition",
                      period === t ? "bg-white/[0.08] text-white ring-1 ring-stroke2" : "text-white/35 hover:text-white/60"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-white/25 italic px-1">Period filter coming soon</span>
            </div>
          </div>

          {/* Empty state */}
          {entries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="text-5xl opacity-30">🏆</div>
              <p className="text-[15px] text-white/40">No traders yet. Be the first to make a trade!</p>
              <Link href="/" className="h-10 px-6 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-[13px] font-semibold transition">
                Go to Simulator
              </Link>
            </div>
          )}

          {/* Podium */}
          {top3.length >= 2 && (
            <div className="flex flex-col lg:flex-row gap-4 mb-8 items-stretch">
              {top3.map(r => {
                if (!r) return null
                const s = podiumStyle(r.rank)
                return (
                  <div
                    key={r.rank}
                    className={clsx(
                      "rounded-3xl ring-1 p-5 flex flex-col items-center text-center justify-center transition-all duration-300 hover:scale-[1.02] flex-1",
                      s.minH, s.bg, s.ring, s.order
                    )}
                  >
                    <div className={clsx("text-[10px] font-black tracking-[0.2em] uppercase mb-4", s.medal)}>{s.label}</div>
                    <Avatar name={r.username} size={r.rank === 1 ? 64 : 48} />
                    <div className="text-[15px] font-black mt-3 text-white">{r.username}</div>
                    <div className="font-mono text-[17px] font-bold text-white/90 mt-1">₹{(r.wallet_balance / 100000).toFixed(2)}L</div>
                    <div className={clsx(
                      "font-mono text-[12px] font-black px-2 py-0.5 rounded-full mt-2",
                      r.realised_pnl >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                    )}>
                      {r.realised_pnl >= 0 ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Table */}
          {entries.length > 0 && (
            <div className="bg-elev1 ring-1 ring-stroke1 rounded-3xl p-2 shadow-2xl overflow-hidden">
              <div className="grid grid-cols-[50px_1fr_110px] lg:grid-cols-[60px_1fr_140px_140px_120px] px-4 py-3 text-[10px] font-black text-white/25 uppercase tracking-[0.2em]">
                <div>Rank</div>
                <div>Trader</div>
                <div className="text-right">Net worth</div>
                <div className="text-right hidden lg:block">Total P&L</div>
                <div className="text-right hidden lg:block">P&L %</div>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {(rest.length > 0 ? rest : entries).map(r => {
                  const isMe = r.user_id === user_id
                  const isProfit = r.realised_pnl >= 0
                  const pnlPct = ((r.realised_pnl / 100000) * 100).toFixed(2)
                  return (
                    <div
                      key={r.user_id}
                      className={clsx(
                        "grid grid-cols-[50px_1fr_110px] lg:grid-cols-[60px_1fr_140px_140px_120px] items-center px-4 py-3.5 transition-colors",
                        isMe ? "bg-indigo-500/10" : "hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="font-mono text-[13.5px] font-bold text-white/35">#{r.rank}</div>
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={r.username} size={32} />
                        <div className="min-w-0">
                          <div className={clsx("text-[13.5px] truncate", isMe ? "text-indigo-300 font-black" : "text-white font-semibold")}>
                            {r.username}
                          </div>
                          {isMe && <div className="text-[9px] font-black uppercase text-indigo-500 tracking-tighter">You</div>}
                        </div>
                      </div>
                      <div className="text-right font-mono text-[13.5px] font-bold text-white">
                        ₹{(r.wallet_balance / 100000).toFixed(1)}L
                      </div>
                      <div className={clsx("text-right font-mono text-[13.5px] font-black hidden lg:block", isProfit ? "text-emerald-400" : "text-rose-400")}>
                        {isProfit ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                      </div>
                      <div className={clsx("text-right font-mono text-[12.5px] font-bold hidden lg:block", isProfit ? "text-emerald-400" : "text-rose-400")}>
                        {isProfit ? "+" : ""}{pnlPct}%
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
