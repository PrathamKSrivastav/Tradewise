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
      <div className="p-4">
        <p className="text-[9px] font-black text-ink3 uppercase tracking-[0.2em] mb-2">Trade History</p>
        <p className="text-[11px] text-ink3 text-center py-6 italic opacity-50">No trades yet</p>
      </div>
    )
  }
  return (
    <div className="p-4">
      <p className="text-[9px] font-black text-ink3 uppercase tracking-[0.2em] mb-3">Recent Trade History</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {trades.slice(0, 12).map((t) => (
          <div key={t.trade_id} className="flex items-center justify-between bg-white/4 ring-1 ring-white/5 rounded-lg px-3 py-1.5 transition hover:bg-white/6 group">
            <div className="flex items-center gap-2.5">
              <div className={clsx(
                "w-1.5 h-1.5 rounded-full",
                t.side === "buy" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]"
              )} />
              <div>
                <div className="text-[11px] font-black text-ink group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                  {t.side} {t.quantity} {t.symbol}
                </div>
                <div className="text-[8px] text-ink3 font-bold uppercase tracking-tighter opacity-50">
                  {new Date(t.timestamp * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold mono text-ink2">₹{t.price.toLocaleString()}</div>
              <div className="text-[8px] text-ink3 font-bold uppercase tracking-tighter opacity-40">Executed</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  }
  import clsx from "clsx"