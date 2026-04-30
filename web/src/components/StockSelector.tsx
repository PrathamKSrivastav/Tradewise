// web/src/components/StockSelector.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchStocks } from "../lib/api"
import { useAuth } from "../hooks/useAuth"
import { RiskBadge } from "../components/ui/RiskBadge"
import { Card } from "../components/ui/Card"
import type { Stock } from "../lib/types"
const sparkColors: Record<string, string> = {
  LOW: "#10b981", MEDIUM: "#f59e0b", HIGH: "#f97316", EXTREME: "#ef4444",
}
export function StockSelector() {
  const [stocks, setStocks] = useState<Stock[]>([])
  const { token } = useAuth()
  const router = useRouter()
  useEffect(() => {
    fetchStocks().then(setStocks).catch(() => {})
  }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stocks.map((s) => (
        <button
          key={s.symbol}
          onClick={() => router.push(`/trade/${s.symbol}`)}
          className="text-left group focus:outline-none"
        >
          <Card className="p-5 hover:border-white/20 hover:bg-white/6 transition-all duration-200 cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-mono text-white/40 mb-1">{s.symbol}</p>
                <p className="text-white font-semibold text-sm leading-tight">{s.name}</p>
              </div>
              <RiskBadge level={s.risk_label} />
            </div>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-mono font-bold text-white">
                ₹{s.base_price.toLocaleString("en-IN")}
              </p>
              <span
                className="text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ color: sparkColors[s.risk_label] }}
              >
                SELECT →
              </span>
            </div>
          </Card>
        </button>
      ))}
    </div>
  )
}