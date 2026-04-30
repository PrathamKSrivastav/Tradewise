// web/src/components/trade/TradeHistory.tsx
"use client"
import { useEffect, useState } from "react"
import { useUserStore } from "../../store/userStore"
import { fetchTradeHistory } from "../../lib/api"
import { Card } from "../../components/ui/Card"
import type { Trade } from "../../lib/types"
export function TradeHistory() {
  const { token } = useUserStore()
  const [trades, setTrades] = useState<Trade[]>([])
  useEffect(() => {
    if (!token) return
    fetchTradeHistory(token).then(setTrades).catch(() => {})
  }, [token])
  if (trades.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-xs font-mono text-white/40 tracking-widest mb-3">TRADE HISTORY</p>
        <p className="text-sm text-white/25 text-center py-4">No trades yet</p>
      </Card>
    )
  }
  return (
    <Card className="p-4">
      <p className="text-xs font-mono text-white/40 tracking-widest mb-3">TRADE HISTORY</p>
      <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
        {trades.map((t) => (
          <div key={t.trade_id} className="flex items-center justify-between bg-white/4 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                t.side === "buy" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              }`}>
                {t.side.toUpperCase()}
              </span>
              <span className="text-xs text-white/70">{t.symbol}</span>
              <span className="text-xs text-white/30">×{t.quantity}</span>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono text-white">₹{t.price.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-white/30">
                {new Date(t.timestamp * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}