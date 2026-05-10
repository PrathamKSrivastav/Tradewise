// web/src/components/PortfolioSnapshot.tsx
"use client"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/userStore"
import { fetchWallet, fetchPositions } from "../lib/api"
import type { Wallet, Position } from "../lib/types"

const ASSET_COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

const STOCK_DESC: Record<string, string> = {
  Cash:        "liquid reserves",
  STABLE:      "Bharat Infra · Low risk",
  GROWTH:      "IndiaNext Tech · Medium risk",
  SWING:       "Desh Pharma · High risk",
  SPECULATIVE: "RocketEdge · Extreme risk",
}

function DonutChart({ segments }: { segments: { pct: number; color: string }[] }) {
  const R = 36; const C = 50; const stroke = 10
  const circumference = 2 * Math.PI * R
  let offset = 0

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
      {/* Track */}
      <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      {segments.map((s, i) => {
        if (s.pct <= 0) return null
        const dash = s.pct * circumference
        const gap = circumference - dash
        const el = (
          <circle
            key={i}
            cx={C} cy={C} r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset * circumference}
            strokeLinecap="round"
          />
        )
        offset += s.pct
        return el
      })}
    </svg>
  )
}

export function PortfolioSnapshot() {
  const { token } = useUserStore()
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    Promise.all([fetchWallet(token), fetchPositions(token)])
      .then(([w, p]) => { setWallet(w); setPositions(p) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  const cash = wallet?.balance ?? 0
  const holdingsValue = positions.reduce((s, p) => s + p.quantity * (p.current_price ?? p.avg_buy_price), 0)
  const total = cash + holdingsValue || 1

  const segments = [
    { label: "Cash", amount: cash, color: "#6366f1" },
    ...positions.map((p, i) => ({
      label: p.symbol,
      amount: p.quantity * (p.current_price ?? p.avg_buy_price),
      color: ASSET_COLORS[i] ?? "#64748b",
    })),
  ].map(s => ({ ...s, pct: s.amount / total }))

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink3">Asset Allocation</span>
        <span className="text-[10px] text-ink3 mono">₹{(total / 1000).toFixed(1)}K total</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6">
          <div className="w-6 h-6 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Donut + legend */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex-none">
              <DonutChart segments={segments} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-[7px] text-ink3 uppercase font-bold tracking-wide">Total</div>
                <div className="text-[11px] font-bold text-ink mono leading-tight">
                  ₹{(total / 1000).toFixed(0)}K
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              {segments.map(s => (
                <div key={s.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-none" style={{ background: s.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] text-ink2 leading-none truncate">{s.label}</div>
                    {STOCK_DESC[s.label] && (
                      <div className="text-[9.5px] text-ink3 leading-none mt-0.5 truncate">{STOCK_DESC[s.label]}</div>
                    )}
                  </div>
                  <span className="text-[11.5px] font-semibold text-ink mono flex-none">{(s.pct * 100).toFixed(1)}%</span>
                </div>
              ))}
              {positions.length === 0 && (
                <p className="text-[11px] text-ink3 italic">No open positions</p>
              )}
            </div>
          </div>

          {/* Segmented bar */}
          <div>
            <div className="h-1.5 rounded-full overflow-hidden flex gap-0.5">
              {segments.map(s => (
                <div
                  key={s.label}
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.pct * 100}%`, background: s.color }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[9.5px] text-ink3 mono">₹{cash.toLocaleString("en-IN")}</span>
              <span className="text-[9.5px] text-ink3 mono">
                {holdingsValue > 0 ? `₹${holdingsValue.toLocaleString("en-IN")} invested` : "No holdings"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
