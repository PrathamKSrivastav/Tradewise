// web/src/components/StockSelector.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchStocks } from "../lib/api"
import type { Stock } from "../lib/types"
import clsx from "clsx"

const TIER_ORDER = ["LOW", "MEDIUM", "HIGH", "EXTREME"]

const TIER_CFG: Record<string, {
  title: string
  blurb: string
  dot: string
  bar: string
  badge: string
  spark: string
  glow: string
  ring: string
  gradient: string
}> = {
  LOW: {
    title: "Stable", blurb: "Blue chips · low volatility",
    dot: "bg-emerald-400",
    bar: "bg-emerald-500",
    badge: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
    spark: "text-emerald-400",
    glow: "hover:shadow-emerald-500/10",
    ring: "hover:ring-emerald-500/25",
    gradient: "hover:bg-gradient-to-br hover:from-emerald-500/5 hover:to-transparent",
  },
  MEDIUM: {
    title: "Growth", blurb: "Compounding leaders",
    dot: "bg-sky-400",
    bar: "bg-sky-500",
    badge: "bg-sky-500/15 text-sky-400 ring-sky-500/30",
    spark: "text-sky-400",
    glow: "hover:shadow-sky-500/10",
    ring: "hover:ring-sky-500/25",
    gradient: "hover:bg-gradient-to-br hover:from-sky-500/5 hover:to-transparent",
  },
  HIGH: {
    title: "Swing", blurb: "Higher beta opportunities",
    dot: "bg-amber-400",
    bar: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-400 ring-amber-500/30",
    spark: "text-amber-400",
    glow: "hover:shadow-amber-500/10",
    ring: "hover:ring-amber-500/25",
    gradient: "hover:bg-gradient-to-br hover:from-amber-500/5 hover:to-transparent",
  },
  EXTREME: {
    title: "Speculative", blurb: "Extreme volatility · learners caution",
    dot: "bg-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-500/15 text-rose-400 ring-rose-500/30",
    spark: "text-rose-400",
    glow: "hover:shadow-rose-500/10",
    ring: "hover:ring-rose-500/25",
    gradient: "hover:bg-gradient-to-br hover:from-rose-500/5 hover:to-transparent",
  },
}

const RISK_METRICS: Record<string, { vol: string; beta: string }> = {
  LOW: { vol: "1.5%", beta: "0.85" },
  MEDIUM: { vol: "3.2%", beta: "1.10" },
  HIGH: { vol: "5.4%", beta: "1.45" },
  EXTREME: { vol: "9.1%", beta: "2.10" },
}

// Smooth SVG sparkline with gradient fill
function Sparkline({ colorClass, up }: { colorClass: string; up: boolean }) {
  const heights = up
    ? [0.45, 0.5, 0.42, 0.58, 0.52, 0.61, 0.56, 0.68, 0.63, 0.72, 0.78, 0.86]
    : [0.72, 0.65, 0.7, 0.58, 0.62, 0.5, 0.54, 0.42, 0.46, 0.38, 0.32, 0.28]
  const W = 200; const H = 48
  const xs = heights.map((_, i) => (i / (heights.length - 1)) * W)
  const ys = heights.map(v => H - v * H)

  // Cubic bezier path for smooth curve
  const linePts = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ")
  const fillPts = `${linePts} L${W},${H} L0,${H} Z`

  const gradId = `spark-${colorClass.replace(/[^a-z]/g, "")}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
          <stop offset="85%" stopColor="currentColor" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <g className={colorClass}>
        <path d={fillPts} fill={`url(#${gradId})`} />
        <path d={linePts} fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" />
        {/* End dot */}
        <circle cx={xs[xs.length - 1].toFixed(1)} cy={ys[ys.length - 1].toFixed(1)} r="2.5" fill="currentColor" />
      </g>
    </svg>
  )
}

export function StockSelector() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchStocks().then(setStocks).catch(() => {})
  }, [])

  const tiers = TIER_ORDER.filter(t => stocks.some(s => s.risk_label === t))

  return (
    <div className="space-y-6">
      {tiers.map(tier => {
        const cfg = TIER_CFG[tier]
        const tierStocks = stocks.filter(s => s.risk_label === tier)

        return (
          <div key={tier}>
            {/* Tier header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={clsx("w-1.5 h-1.5 rounded-full flex-none", cfg.dot)} />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink2">{cfg.title}</span>
                <span className="hidden sm:inline text-[11.5px] text-ink3">{cfg.blurb}</span>
              </div>
              <span className="text-[10.5px] text-ink3 tabular-nums">
                {tierStocks.length} {tierStocks.length === 1 ? "market" : "markets"}
              </span>
            </div>

            {/* Cards */}
            <div className={clsx("grid gap-3", tierStocks.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
              {tierStocks.map(s => (
                <button
                  key={s.symbol}
                  onClick={() => router.push(`/trade/${s.symbol}`)}
                  className={clsx(
                    "group text-left rounded-xl ring-1 ring-stroke1 bg-elev1 overflow-hidden",
                    "transition-all duration-200 cursor-pointer",
                    "hover:shadow-lg hover:-translate-y-0.5",
                    cfg.glow, cfg.ring, cfg.gradient
                  )}
                >
                  {/* Colored accent bar */}
                  <div className={clsx("h-[3px] w-full", cfg.bar)} />

                  <div className="p-4 pt-3.5">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-[10px] text-ink3 font-bold tracking-[0.2em] mono mb-0.5">{s.symbol}</div>
                        <div className="text-[14px] font-semibold text-ink leading-snug">{s.name}</div>
                      </div>
                      <span className={clsx(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ring-1 flex-none",
                        cfg.badge
                      )}>
                        {tier}
                      </span>
                    </div>

                    {/* Sparkline */}
                    <div className="rounded-md overflow-hidden -mx-1">
                      <Sparkline colorClass={cfg.spark} up={tier !== "EXTREME"} />
                    </div>

                    {/* Risk metrics */}
                    <div className="flex gap-4 mt-3 text-[10px] font-bold tracking-wider text-ink3 uppercase">
                      <div>Vol: <span className="text-ink">{RISK_METRICS[tier].vol}</span></div>
                      <div>Beta: <span className="text-ink">{RISK_METRICS[tier].beta}</span></div>
                    </div>

                    {/* Footer row */}
                    <div className="flex items-end justify-between mt-3 pt-3 border-t border-stroke1">
                      <div>
                        <div className="text-[9px] font-bold tracking-[0.16em] text-ink3 uppercase mb-0.5">Price</div>
                        <div className="mono text-[15px] font-semibold text-ink num">
                          ₹{s.base_price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[12px] font-semibold text-ink3 group-hover:text-indigo-400 transition-colors">
                        Trade
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
