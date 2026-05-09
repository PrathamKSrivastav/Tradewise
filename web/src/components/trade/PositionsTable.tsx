// web/src/components/trade/PositionsTable.tsx
"use client"
import { useUserStore } from "../../store/userStore"
import { Card } from "../../components/ui/Card"
export function PositionsTable() {
  const { positions } = useUserStore()
  if (positions.length === 0) {
    return (
      <div className="p-3">
        <p className="text-[9px] font-black text-ink3 uppercase tracking-[0.2em] mb-2">Open Positions</p>
        <p className="text-[11px] text-ink3 text-center py-4 italic opacity-50">No open positions</p>
      </div>
    )
  }
  return (
    <div className="p-3">
      <p className="text-[9px] font-black text-ink3 uppercase tracking-[0.2em] mb-2">Open Positions</p>
      <div className="flex flex-col gap-1.5">
        {positions.map((p) => {
          const pnl = p.unrealised_pnl ?? 0
          const isProfit = pnl >= 0
          return (
            <div key={p.symbol} className="flex items-center justify-between bg-white/4 ring-1 ring-white/5 rounded-lg px-2.5 py-2 transition hover:bg-white/6 group">
              <div>
                <p className="text-[12px] font-black text-white group-hover:text-indigo-400 transition-colors">{p.symbol}</p>
                <p className="text-[9px] font-bold text-ink3 uppercase tracking-tighter">
                  {p.quantity} <span className="opacity-50 tracking-normal mx-0.5">at</span> ₹{p.avg_buy_price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-[12px] font-black mono ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
                  {isProfit ? "+" : ""}₹{pnl.toLocaleString()}
                </p>
                <div className="text-[8px] font-bold text-ink3 uppercase tracking-tighter opacity-50">
                  Unrealised
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  }