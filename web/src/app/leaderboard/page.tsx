// web/src/app/leaderboard/page.tsx
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
  const tones = ["bg-indigo-500/30 text-indigo-300","bg-amber-500/25 text-amber-300","bg-emerald-400/25 text-emerald-300","bg-rose-400/25 text-rose-300","bg-sky-400/25 text-sky-300","bg-fuchsia-400/25 text-fuchsia-300"]
  const i = (name.charCodeAt(0) + (name.charCodeAt(1) || 0)) % tones.length
  return (
    <div className={clsx("grid place-items-center rounded-full ring-1 ring-stroke1 font-semibold flex-none", tones[i])}
         style={{ width: size, height: size, fontSize: Math.max(9, size * 0.38) }}>
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
  // Podium order: 2nd, 1st, 3rd
  const podium = [top3[1], top3[0], top3[2]].filter(Boolean)

  const podiumStyle = (rank: number) =>
    rank === 1 ? { ring: "ring-amber-400/40", bg: "bg-amber-400/10", medal: "text-amber-400", height: "h-[180px]", label: "🥇 1st" } :
    rank === 2 ? { ring: "ring-stroke3",      bg: "bg-white/6",      medal: "text-ink",      height: "h-[150px]", label: "🥈 2nd" } :
                 { ring: "ring-orange-300/30", bg: "bg-orange-300/8", medal: "text-orange-300",height: "h-[130px]", label: "🥉 3rd" }

  return (
    <AppLayout>
      <div className="px-6 py-6 overflow-auto scrollbar-none">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/" className="text-[12.5px] text-ink2 hover:text-ink flex items-center gap-1.5 mb-2">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back to dashboard
              </Link>
              <h1 className="text-[32px] font-semibold tracking-[-0.02em]">Leaderboard</h1>
              <div className="text-[13px] text-ink2 mt-1">Top traders · real-time P&L rankings</div>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-btn bg-white/4 ring-1 ring-stroke1">
              {["Day","Week","Month","All-time"].map((t) => (
                <button key={t} onClick={() => setPeriod(t)} className={clsx(
                  "h-8 px-3 rounded-[6px] text-[12px] font-medium transition",
                  period === t ? "bg-white/8 text-ink ring-1 ring-stroke2" : "text-ink3 hover:text-ink2",
                )}>{t}</button>
              ))}
            </div>
          </div>

          {/* Podium */}
          {top3.length >= 2 && (
            <div className="flex flex-col lg:flex-row gap-4 mb-8 items-stretch lg:items-end">
              {/* On mobile, show 1st, then 2nd, then 3rd. On desktop, show 2nd, 1st, 3rd. */}
              {(typeof window !== 'undefined' && window.innerWidth < 1024 ? top3 : podium).map(r => {
                if (!r) return null
                const s = podiumStyle(r.rank)
                return (
                  <div key={r.rank} className={clsx(
                    "rounded-3xl ring-1 p-5 flex flex-col items-center text-center justify-center transition-all duration-500 hover:scale-[1.02]",
                    s.height, s.bg, s.ring,
                    "flex-1"
                  )}>
                    <div className={clsx("text-[10px] font-black tracking-[0.2em] uppercase mb-4", s.medal)}>{s.label}</div>
                    <Avatar name={r.username} size={r.rank === 1 ? 64 : 48} />
                    <div className="text-[16px] font-black mt-3 text-white">{r.username}</div>
                    <div className="mono text-[18px] font-bold num text-white/90 mt-1">₹{(r.wallet_balance / 100000).toFixed(2)}L</div>
                    <div className={clsx("mono text-[12px] num font-black px-2 py-0.5 rounded-full mt-2", r.realised_pnl >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>
                      {r.realised_pnl >= 0 ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Table */}
          <div className="bg-elev1 ring-1 ring-stroke1 rounded-3xl p-2 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-[50px_1fr_100px] lg:grid-cols-[60px_1fr_140px_140px_140px] px-4 py-4 text-[10px] font-black text-ink3 uppercase tracking-[0.2em] opacity-60">
              <div>Rank</div>
              <div>Trader</div>
              <div className="text-right">Net worth</div>
              <div className="text-right hidden lg:block">Total P&amp;L</div>
              <div className="text-right hidden lg:block">Status</div>
            </div>
            <div className="divide-y divide-white/5">
              {(rest.length > 0 ? rest : entries).map((r, i) => {
                const isMe = r.user_id === user_id
                const isProfit = r.realised_pnl >= 0
                const deltas = [+1, -1, +2, 0, -2, +3, +1]
                const d = deltas[i % deltas.length]
                return (
                  <div key={r.user_id} className={clsx(
                    "grid grid-cols-[50px_1fr_100px] lg:grid-cols-[60px_1fr_140px_140px_140px] items-center px-4 py-4 transition-colors",
                    isMe ? "bg-indigo-500/10" : "hover:bg-white/[0.02]",
                  )}>
                    <div className="mono text-[14px] font-bold text-ink3">#{r.rank}</div>
                    <div className="flex items-center gap-3">
                      <Avatar name={r.username} size={32} />
                      <div className="min-w-0">
                        <div className={clsx("text-[14px] truncate", isMe ? "text-indigo-300 font-black" : "text-ink font-bold")}>
                          {r.username}
                        </div>
                        {isMe && <div className="text-[9px] font-black uppercase text-indigo-500 tracking-tighter">Current User</div>}
                      </div>
                    </div>
                    <div className="text-right mono text-[14px] font-bold text-white">₹{(r.wallet_balance / 100000).toFixed(1)}L</div>
                    <div className={clsx("text-right mono text-[14px] font-black hidden lg:block", isProfit ? "text-emerald-400" : "text-rose-400")}>
                      {isProfit ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                    </div>
                    <div className="text-right hidden lg:block">
                      <span className={clsx("mono text-[12px] font-bold", d > 0 ? "text-emerald-400" : d < 0 ? "text-rose-400" : "text-ink3 opacity-40")}>
                        {d > 0 ? `▲ ${d}` : d < 0 ? `▼ ${-d}` : "STABLE"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
