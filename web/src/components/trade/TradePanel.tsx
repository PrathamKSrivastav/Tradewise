// web/src/components/trade/TradePanel.tsx
"use client"
import { useState } from "react"
import { useUserStore } from "../../store/userStore"
import { useMarketStore } from "../../store/marketStore"
import { placeTrade } from "../../lib/api"
import clsx from "clsx"

interface Props {
  symbol: string
  onTradeSuccess: () => void
}

const ORDER_TYPES = ["Market", "Limit", "Stop"]

export function TradePanel({ symbol, onTradeSuccess }: Props) {
  const { token, wallet } = useUserStore()
  const { lastPrice } = useMarketStore()
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [orderType, setOrderType] = useState("Market")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const price = lastPrice[symbol] ?? 0
  const total = Number((price * quantity).toFixed(2))
  const balance = wallet?.balance ?? 0
  const maxQty = price > 0 ? Math.floor(balance / price) : 0

  const setPercent = (pct: number) => {
    if (price === 0 || balance === 0) return
    setQuantity(Math.max(1, Math.floor((balance * pct) / price)))
  }

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
    <div className="p-4 flex flex-col gap-4">
      {/* BUY / SELL toggle */}
      <div className="grid grid-cols-2 gap-0.5 p-0.5 rounded-btn bg-black/30 ring-1 ring-stroke1">
        <button
          onClick={() => setSide("buy")}
          className={clsx(
            "h-9 rounded-[6px] text-[13px] font-bold transition",
            side === "buy" ? "bg-emerald-500 text-[#062a1a]" : "text-ink3 hover:text-ink2"
          )}
        >BUY</button>
        <button
          onClick={() => setSide("sell")}
          className={clsx(
            "h-9 rounded-[6px] text-[13px] font-bold transition",
            side === "sell" ? "bg-rose-500 text-white" : "text-ink3 hover:text-ink2"
          )}
        >SELL</button>
      </div>

      {/* Order type */}
      <div className="flex gap-1">
        {ORDER_TYPES.map(t => (
          <button key={t} onClick={() => setOrderType(t)} className={clsx(
            "flex-1 h-7 rounded-btn text-[11px] font-medium transition",
            orderType === t ? "bg-white/8 text-ink ring-1 ring-stroke2" : "text-ink3 hover:text-ink2"
          )}>{t}</button>
        ))}
      </div>

      {/* Market price display */}
      <div className="flex items-center justify-between bg-white/4 rounded-btn px-3 py-2">
        <span className="text-[11px] text-ink3 font-semibold tracking-[0.1em]">MARKET PRICE</span>
        <span className="mono text-[14px] num text-ink font-semibold">
          {price > 0 ? `₹${price.toLocaleString("en-IN")}` : "—"}
        </span>
      </div>

      {/* Quantity */}
      <div>
        <div className="text-[11px] text-ink3 font-semibold tracking-[0.1em] mb-1.5">QUANTITY</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-8 h-8 rounded-btn bg-white/6 hover:bg-white/10 text-ink font-bold text-lg transition flex items-center justify-center"
          >−</button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
            className="flex-1 bg-black/30 ring-1 ring-stroke1 rounded-btn px-3 py-1.5 text-center mono text-[14px] text-ink focus:outline-none focus:ring-indigo-500/50"
          />
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-8 h-8 rounded-btn bg-white/6 hover:bg-white/10 text-ink font-bold text-lg transition flex items-center justify-center"
          >+</button>
        </div>
        {/* % presets */}
        <div className="flex gap-1.5 mt-2">
          {[{ label: "10%", pct: 0.1 }, { label: "25%", pct: 0.25 }, { label: "50%", pct: 0.5 }, { label: "MAX", pct: 1 }].map(({ label, pct }) => (
            <button key={label} onClick={() => setPercent(pct)}
              className="flex-1 h-6 rounded-btn text-[10.5px] font-semibold bg-white/4 hover:bg-white/8 text-ink3 hover:text-ink2 transition">
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Order summary */}
      <div className="space-y-1.5 bg-white/3 rounded-btn px-3 py-2.5">
        <div className="flex justify-between text-[12px]">
          <span className="text-ink3">Est. total</span>
          <span className="mono num text-ink font-semibold">{price > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-ink3">Available</span>
          <span className="mono num text-ink2">₹{balance.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-ink3">Max qty</span>
          <span className="mono num text-ink2">{maxQty}</span>
        </div>
      </div>

      {error && <p className="text-[12px] text-rose-400 bg-rose-500/10 rounded-btn px-3 py-2">{error}</p>}
      {success && <p className="text-[12px] text-emerald-400 bg-emerald-500/10 rounded-btn px-3 py-2">{success}</p>}

      <button
        onClick={handleTrade}
        disabled={loading || price === 0}
        className={clsx(
          "h-11 w-full rounded-btn text-[14px] font-bold transition disabled:opacity-40",
          side === "buy"
            ? "bg-emerald-500 hover:bg-emerald-500/90 text-[#062a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
            : "bg-rose-500 hover:bg-rose-500/90 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
        )}
      >
        {loading ? "…" : `${side === "buy" ? "Buy" : "Sell"} ${quantity} × ${symbol}`}
      </button>
    </div>
  )
}
