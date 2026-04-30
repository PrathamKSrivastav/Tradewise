// web/src/components/trade/TradePanel.tsx
"use client"
import { useState } from "react"
import { useUserStore } from "../../store/userStore"
import { useMarketStore } from "../../store/marketStore"
import { placeTrade } from "../../lib/api"
import { Button } from "../../components/ui/Button"
import { Card } from "../../components/ui/Card"
interface Props {
  symbol: string
  onTradeSuccess: () => void
}
export function TradePanel({ symbol, onTradeSuccess }: Props) {
  const { token, wallet } = useUserStore()
  const { lastPrice } = useMarketStore()
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const price = lastPrice[symbol] ?? 0
  const total = Number((price * quantity).toFixed(2))
  const handleTrade = async () => {
    if (!token || price === 0) return
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await placeTrade({ symbol, side, quantity }, token)
      setSuccess(`${side === "buy" ? "Bought" : "Sold"} ${quantity} × ${symbol} @ ₹${res.price.toLocaleString("en-IN")}`)
      onTradeSuccess()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-white/40 tracking-widest">TRADE · {symbol}</p>
        <p className="text-xs text-white/40">
          Balance: <span className="text-white font-mono">₹{wallet?.balance.toLocaleString("en-IN") ?? "—"}</span>
        </p>
      </div>
      {/* side toggle */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setSide("buy")}
          className={`py-2 rounded-lg text-sm font-bold transition-all ${
            side === "buy" ? "bg-emerald-500 text-white" : "bg-white/6 text-white/40 hover:bg-white/10"
          }`}
        >
          BUY
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`py-2 rounded-lg text-sm font-bold transition-all ${
            side === "sell" ? "bg-red-500 text-white" : "bg-white/6 text-white/40 hover:bg-white/10"
          }`}
        >
          SELL
        </button>
      </div>
      {/* price display */}
      <div className="flex items-center justify-between bg-white/4 rounded-lg px-3 py-2">
        <span className="text-xs text-white/40">Market Price</span>
        <span className="font-mono text-white font-bold">
          {price > 0 ? `₹${price.toLocaleString("en-IN")}` : "—"}
        </span>
      </div>
      {/* quantity */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-white/40">Quantity</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/14 text-white font-bold transition-all"
          >
            −
          </button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="flex-1 bg-white/6 border border-white/10 rounded-lg px-3 py-1.5 text-center font-mono text-white text-sm focus:outline-none focus:border-white/30"
          />
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-8 h-8 rounded-lg bg-white/8 hover:bg-white/14 text-white font-bold transition-all"
          >
            +
          </button>
        </div>
      </div>
      {/* order summary */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/40">Order Total</span>
        <span className="font-mono font-bold text-white">
          {price > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}
        </span>
      </div>
      {/* feedback */}
      {error && <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}
      {success && <p className="text-xs text-emerald-400 bg-emerald-500/10 rounded-lg px-3 py-2">{success}</p>}
      {/* submit */}
      <Button
        variant={side === "buy" ? "buy" : "sell"}
        loading={loading}
        disabled={price === 0}
        onClick={handleTrade}
        className="w-full py-3"
      >
        {side === "buy" ? "BUY" : "SELL"} {quantity} × {symbol}
      </Button>
    </Card>
  )
}