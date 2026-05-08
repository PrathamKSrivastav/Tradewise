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
            <div className="grid grid-cols-3 gap-4 mb-5">
              {podium.map(r => {
                if (!r) return <div key="empty" />
                const s = podiumStyle(r.rank)
                return (
                  <div key={r.rank} className={clsx("rounded-card ring-1 p-5 flex flex-col items-center text-center justify-end", s.height, s.bg, s.ring)}>
                    <div className={clsx("text-[10px] font-semibold tracking-[0.18em] uppercase mb-3", s.medal)}>{s.label}</div>
                    <Avatar name={r.username} size={48} />
                    <div className="text-[14px] font-semibold mt-2.5">{r.username}</div>
                    <div className="mono text-[16px] num mt-1">₹{(r.wallet_balance / 100000).toFixed(2)}L</div>
                    <div className={clsx("mono text-[11px] num mt-0.5", r.realised_pnl >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      {r.realised_pnl >= 0 ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Table */}
          <div className="bg-elev1 ring-1 ring-stroke1 rounded-card p-1.5">
            <div className="grid grid-cols-[60px_1fr_140px_140px_140px] px-4 py-3 text-[10.5px] text-ink3 font-semibold tracking-[0.14em] uppercase">
              <div>Rank</div><div>Trader</div>
              <div className="text-right">Net worth</div>
              <div className="text-right">P&amp;L</div>
              <div className="text-right">Δ Rank</div>
            </div>
            {(rest.length > 0 ? rest : entries).map((r, i) => {
              const isMe = r.user_id === user_id
              const isProfit = r.realised_pnl >= 0
              const deltas = [+1, -1, +2, 0, -2, +3, +1]
              const d = deltas[i % deltas.length]
              return (
                <div key={r.user_id} className={clsx(
                  "grid grid-cols-[60px_1fr_140px_140px_140px] items-center px-4 py-3 rounded-btn",
                  isMe && "bg-indigo-500/10 ring-1 ring-indigo-500/30",
                )}>
                  <div className="mono text-[13px] num text-ink2">#{r.rank}</div>
                  <div className="flex items-center gap-3">
                    <Avatar name={r.username} size={30} />
                    <div>
                      <div className={clsx("text-[13.5px]", isMe ? "text-indigo-300 font-semibold" : "text-ink")}>
                        {r.username}
                        {isMe && <span className="ml-1.5 text-[10px] text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-500/15">you</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right mono text-[13px] num text-ink">₹{(r.wallet_balance / 100000).toFixed(2)}L</div>
                  <div className={clsx("text-right mono text-[13px] num", isProfit ? "text-emerald-400" : "text-rose-400")}>
                    {isProfit ? "+" : ""}₹{r.realised_pnl.toLocaleString("en-IN")}
                  </div>
                  <div className="text-right">
                    <span className={clsx("mono text-[12px] num", d > 0 ? "text-emerald-400" : d < 0 ? "text-rose-400" : "text-ink3")}>
                      {d > 0 ? `▲ ${d}` : d < 0 ? `▼ ${-d}` : "—"}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
