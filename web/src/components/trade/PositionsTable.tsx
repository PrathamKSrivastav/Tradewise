// web/src/components/trade/PositionsTable.tsx
"use client"
import { useUserStore } from "../../store/userStore"
import { Card } from "../../components/ui/Card"
export function PositionsTable() {
  const { positions } = useUserStore()
  if (positions.length === 0) {
    return (
      <Card className="p-4">
        <p className="text-xs font-mono text-white/40 tracking-widest mb-3">OPEN POSITIONS</p>
        <p className="text-sm text-white/25 text-center py-4">No open positions</p>
      </Card>
    )
  }
  return (
    <Card className="p-4">
      <p className="text-xs font-mono text-white/40 tracking-widest mb-3">OPEN POSITIONS</p>
      <div className="flex flex-col gap-2">
        {positions.map((p) => {
          const pnl = p.unrealised_pnl ?? 0
          const isProfit = pnl >= 0
          return (
            <div key={p.symbol} className="flex items-center justify-between bg-white/4 rounded-lg px-3 py-2.5">
              <div>
                <p className="text-sm font-semibold text-white">{p.symbol}</p>
                <p className="text-xs text-white/40">
                  {p.quantity} × avg ₹{p.avg_buy_price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40">
                  {p.current_price ? `₹${p.current_price.toLocaleString("en-IN")}` : "—"}
                </p>
                <p className={`text-sm font-mono font-bold ${isProfit ? "text-emerald-400" : "text-red-400"}`}>
                  {isProfit ? "+" : ""}₹{pnl.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}