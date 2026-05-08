// web/src/components/StockSelector.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchStocks } from "../lib/api"
import { RiskBadge } from "../components/ui/RiskBadge"
import type { Stock } from "../lib/types"
import clsx from "clsx"

const TIER_ORDER = ["LOW", "MEDIUM", "HIGH", "EXTREME"]
const TIER_LABELS: Record<string, { title: string; blurb: string }> = {
  LOW:      { title: "Stable",      blurb: "Blue chips · low volatility" },
  MEDIUM:   { title: "Growth",      blurb: "Compounding leaders" },
  HIGH:     { title: "Swing",       blurb: "Higher beta opportunities" },
  EXTREME:  { title: "Speculative", blurb: "Extreme volatility · learners caution" },
}

function Spark({ up }: { up: boolean }) {
  // Simple decorative sparkline placeholder
  return (
    <div className={clsx("h-8 flex items-end gap-px", up ? "text-emerald-400" : "text-rose-400")}>
      {[0.4, 0.5, 0.45, 0.6, 0.55, 0.65, 0.6, 0.7, 0.65, 0.75, 0.7, up ? 0.85 : 0.3].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm opacity-60"
          style={{ height: `${h * 100}%`, background: "currentColor" }}
        />
      ))}
    </div>
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
    <div className="space-y-5">
      {tiers.map(tier => {
        const tierStocks = stocks.filter(s => s.risk_label === tier)
        const meta = TIER_LABELS[tier]
        return (
          <div key={tier}>
            <div className="flex items-baseline justify-between mb-2.5">
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink3">{meta.title}</span>
                <span className="text-[12px] text-ink3">{meta.blurb}</span>
              </div>
              <span className="text-[11px] text-ink3 mono">{tierStocks.length} markets</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {tierStocks.map(s => (
                <button
                  key={s.symbol}
                  onClick={() => router.push(`/trade/${s.symbol}`)}
                  className="group text-left p-4 rounded-card bg-elev1 hover:bg-elev2 ring-1 ring-stroke1 hover:ring-stroke2 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[11px] text-ink3 font-semibold tracking-[0.14em] mono mb-1">{s.symbol}</div>
                      <div className="text-[14.5px] font-semibold tracking-[-0.01em] text-ink leading-tight">{s.name}</div>
                    </div>
                    <RiskBadge level={s.risk_label} />
                  </div>
                  <Spark up />
                  <div className="flex items-end justify-between mt-3 pt-3 border-t border-stroke1">
                    <div>
                      <div className="text-[10px] text-ink3 font-semibold tracking-[0.12em] mb-0.5">PRICE</div>
                      <div className="mono text-[16px] text-ink num">
                        ₹{s.base_price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <span className="text-[12px] text-ink3 group-hover:text-indigo-400 mono transition-colors">Trade →</span>
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
