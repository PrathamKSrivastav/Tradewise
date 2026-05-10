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
      ? { ring: "ring-amber-400/30", bg: "bg-gradient-to-b from-amber-400/10 to-transparent", medal: "text-amber-400", label: "GOLD", order: "lg:order-2", size: 80 }
      : rank === 2
      ? { ring: "ring-slate-300/20", bg: "bg-gradient-to-b from-slate-300/5 to-transparent", medal: "text-slate-300", label: "SILVER", order: "lg:order-1", size: 64 }
      : { ring: "ring-orange-400/20", bg: "bg-gradient-to-b from-orange-400/5 to-transparent", medal: "text-orange-400", label: "BRONZE", order: "lg:order-3", size: 64 }

  return (
    <AppLayout>
      <div className="px-4 lg:px-6 py-6 overflow-auto scrollbar-none flex-1 bg-[#050508]">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-[32px] lg:text-[42px] font-black tracking-tighter text-white mb-2 uppercase">Hall of Fame</h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 text-[11px] font-bold text-white/40 tracking-widest uppercase">
              Global Rankings · Live Updates
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
          {top3.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-6 mb-12 items-end justify-center">
              {top3.map(r => {
                if (!r) return null
                const s = podiumStyle(r.rank)
                return (
                  <div
                    key={r.rank}
                    className={clsx(
                      "rounded-[32px] ring-1 p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 flex-1 w-full lg:max-w-[300px]",
                      s.bg, s.ring, s.order,
                      r.rank === 1 ? "lg:pb-12 lg:pt-10 shadow-2xl shadow-amber-500/5" : "lg:pb-10 lg:pt-8"
                    )}
                  >
                    <div className={clsx("text-[10px] font-black tracking-[0.3em] mb-6", s.medal)}>{s.label}</div>
                    <Avatar name={r.username} size={s.size} />
                    <div className="text-[18px] font-black mt-4 text-white tracking-tight">{r.username}</div>
                    <div className="font-mono text-[20px] font-bold text-white/90 mt-1">₹{(r.wallet_balance / 100000).toFixed(2)}L</div>
                    <div className={clsx(
                      "font-mono text-[12px] font-black px-3 py-1 rounded-full mt-4",
                      r.realised_pnl >= 0 ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20" : "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20"
                    )}>
                      {r.realised_pnl >= 0 ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Table */}
          {entries.length > 0 && (rest.length > 0 || entries.length < 3) && (
            <div className="bg-white/[0.02] ring-1 ring-white/5 rounded-[32px] p-3 shadow-2xl overflow-hidden mb-10">
              <div className="grid grid-cols-[60px_1fr_120px] lg:grid-cols-[80px_1fr_160px_160px_120px] px-6 py-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                <div>Rank</div>
                <div>Trader</div>
                <div className="text-right">Net worth</div>
                <div className="text-right hidden lg:block">Total P&L</div>
                <div className="text-right hidden lg:block">P&L %</div>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {(rest.length > 0 ? rest : entries).map(r => {
                  const isMe = r.user_id === user_id
                  const isProfit = r.realised_pnl >= 0
                  const pnlPct = ((r.realised_pnl / 100000) * 100).toFixed(2)
                  return (
                    <div
                      key={r.user_id}
                      className={clsx(
                        "grid grid-cols-[60px_1fr_120px] lg:grid-cols-[80px_1fr_160px_160px_120px] items-center px-6 py-5 transition-all group",
                        isMe ? "bg-indigo-500/10" : "hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="font-mono text-[14px] font-bold text-white/30 group-hover:text-white/50 transition-colors">#{r.rank}</div>
                      <div className="flex items-center gap-4 min-w-0">
                        <Avatar name={r.username} size={36} />
                        <div className="min-w-0">
                          <div className={clsx("text-[15px] truncate", isMe ? "text-indigo-300 font-black" : "text-white font-semibold")}>
                            {r.username}
                          </div>
                          {isMe && <div className="text-[9px] font-black uppercase text-indigo-400 tracking-widest mt-0.5">You</div>}
                        </div>
                      </div>
                      <div className="text-right font-mono text-[14px] font-bold text-white/90">
                        ₹{(r.wallet_balance / 100000).toFixed(1)}L
                      </div>
                      <div className={clsx("text-right font-mono text-[14px] font-black hidden lg:block", isProfit ? "text-emerald-400" : "text-rose-400")}>
                        {isProfit ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                      </div>
                      <div className={clsx("text-right font-mono text-[13px] font-bold hidden lg:block px-2 py-0.5 rounded-lg ml-auto w-fit", 
                        isProfit ? "bg-emerald-500/5 text-emerald-500" : "bg-rose-500/5 text-rose-500"
                      )}>
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
