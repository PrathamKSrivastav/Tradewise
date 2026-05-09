// web/src/components/trade/TradePanel.tsx
"use client"
import { useState, useEffect, useMemo } from "react"
import { useUserStore } from "../../store/userStore"
import { useMarketStore } from "../../store/marketStore"
import { placeTrade, fetchPendingOrders } from "../../lib/api"
import type { PendingOrder } from "../../lib/types"
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
  const [targetPrice, setTargetPrice] = useState<number>(0)
  
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const marketPrice = lastPrice[symbol] ?? 0

  // Fetch pending orders
  const loadPending = async () => {
    if (!token) return
    try {
      const all = await fetchPendingOrders(token)
      setPendingOrders(all.filter(o => o.symbol === symbol))
    } catch (e) {
      console.error("Failed to load pending orders", e)
    }
  }

  useEffect(() => { loadPending() }, [symbol, token])

  // Logic hint text
  const hintText = useMemo(() => {
    if (orderType === "Market") return `Order will execute immediately at the best available price (~₹${marketPrice.toLocaleString()}).`
    if (orderType === "Limit") {
      return side === "buy" 
        ? `Order will only execute if price falls to ₹${targetPrice.toLocaleString()} or lower.`
        : `Order will only execute if price rises to ₹${targetPrice.toLocaleString()} or higher.`
    }
    if (orderType === "Stop") {
      return side === "buy"
        ? `Order triggers a buy if price breaks above ₹${targetPrice.toLocaleString()}.`
        : `Order triggers a sell if price drops below ₹${targetPrice.toLocaleString()}.`
    }
    return ""
  }, [orderType, side, targetPrice, marketPrice])

  const handleOrderTypeChange = (type: string) => {
    setOrderType(type)
    if (targetPrice === 0 || targetPrice === marketPrice) setTargetPrice(marketPrice)
  }

  const applyOffset = (pct: number) => {
    if (marketPrice === 0) return
    const newPrice = marketPrice * (1 + pct)
    setTargetPrice(Number(newPrice.toFixed(2)))
  }

  const effectivePrice = orderType === "Market" ? marketPrice : targetPrice
  const total = Number((effectivePrice * quantity).toFixed(2))
  const balance = wallet?.balance ?? 0
  const maxQty = effectivePrice > 0 ? Math.floor(balance / effectivePrice) : 0

  const handleTrade = async () => {
    if (!token || (orderType === "Market" && marketPrice === 0)) return
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await placeTrade({ 
        symbol, side, quantity, 
        order_type: orderType, 
        target_price: orderType === "Market" ? undefined : targetPrice 
      }, token)
      
      if (orderType === "Market") {
        setSuccess(`${side.toUpperCase()} order executed.`)
      } else {
        setSuccess(`${orderType} ${side} order placed at ₹${targetPrice.toLocaleString()}.`)
      }
      onTradeSuccess()
      loadPending()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-3 flex flex-col gap-3 flex-1 overflow-y-auto scrollbar-none">
        {/* Side Picker */}
        <div className="flex p-0.5 rounded-pill bg-black/40 ring-1 ring-white/5">
          {(["buy", "sell"] as const).map(s => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={clsx(
                "flex-1 h-7 rounded-pill text-[10px] font-black uppercase tracking-widest transition-all",
                side === s 
                  ? (s === "buy" ? "bg-emerald-500 text-[#062a1a]" : "bg-rose-500 text-white shadow-lg shadow-rose-500/20")
                  : "text-ink3 hover:text-ink2"
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Type Tabs */}
        <div className="flex border-b border-white/5">
          {ORDER_TYPES.map(t => (
            <button
              key={t}
              onClick={() => handleOrderTypeChange(t)}
              className={clsx(
                "flex-1 pb-1.5 text-[10px] font-bold uppercase tracking-widest transition-all relative",
                orderType === t ? "text-indigo-400" : "text-ink3 hover:text-ink2"
              )}
            >
              {t}
              {orderType === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
            </button>
          ))}
        </div>

        {/* Price Section */}
        <div className="space-y-2">
          {orderType === "Market" ? (
            <div className="p-2 rounded-lg bg-white/4 ring-1 ring-white/5 flex justify-between items-center">
              <span className="text-[9px] font-bold text-ink3 uppercase">Market</span>
              <span className="mono text-[14px] font-bold text-ink text-right">₹{marketPrice.toLocaleString()}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <label className="text-[9px] font-bold text-ink3 uppercase tracking-wider mb-1 block">
                  {orderType} Price (₹)
                </label>
                <div className="relative group">
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={e => setTargetPrice(Number(e.target.value))}
                    className="w-full h-9 bg-black/40 ring-1 ring-white/10 rounded-lg px-3 mono text-[14px] text-ink focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold">
                    {marketPrice > 0 ? (
                      <span className={clsx(targetPrice > marketPrice ? "text-rose-400" : "text-emerald-400")}>
                        {(((targetPrice - marketPrice) / marketPrice) * 100).toFixed(1)}%
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              
              {/* Offsets */}
              <div className="flex gap-1">
                {[-0.02, -0.01, 0.01, 0.02].map(off => (
                  <button
                    key={off}
                    onClick={() => applyOffset(off)}
                    className="flex-1 h-6 rounded-md bg-white/5 hover:bg-white/10 text-[9px] font-bold text-ink3 transition ring-1 ring-white/5"
                  >
                    {off > 0 ? `+${off * 100}%` : `${off * 100}%`}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <p className="text-[10px] text-ink3 leading-tight bg-white/2 p-2 rounded-lg border border-dashed border-white/5 italic">
            {hintText}
          </p>
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-[9px] font-bold text-ink3 uppercase tracking-wider">Qty</label>
            <span className="text-[10px] text-ink3">Max: <span className="text-ink font-bold">{maxQty}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-ink transition ring-1 ring-white/10 flex items-center justify-center font-bold"
            >−</button>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
              className="flex-1 h-9 bg-black/40 ring-1 ring-white/10 rounded-lg px-2 text-center mono text-[14px] text-ink focus:outline-none"
            />
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-ink transition ring-1 ring-white/10 flex items-center justify-center font-bold"
            >+</button>
          </div>
          <div className="flex gap-1">
            {[0.25, 0.5, 0.75, 1].map(p => (
              <button
                key={p}
                onClick={() => setQuantity(Math.max(1, Math.floor((balance * p) / (effectivePrice || 1))))}
                className="flex-1 h-5 rounded bg-white/4 hover:bg-white/8 text-[8px] font-black text-ink3 uppercase transition"
              >
                {p * 100}%
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-3 rounded-lg bg-indigo-500/5 ring-1 ring-indigo-500/10 space-y-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-ink3">Total</span>
            <span className="mono text-[14px] font-black text-ink tracking-tight">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[9px] font-bold uppercase">
            <span className="text-ink3/50 tracking-tighter">Available</span>
            <span className="text-ink2 tracking-tighter">₹{balance.toLocaleString()}</span>
          </div>
        </div>

        {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[12px] font-medium">{error}</div>}
        {success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[12px] font-medium">{success}</div>}

        <button
          onClick={handleTrade}
          disabled={loading || (orderType === "Market" && marketPrice === 0)}
          className={clsx(
            "h-12 w-full rounded-xl text-[14px] font-black uppercase tracking-[0.1em] transition-all shadow-xl disabled:opacity-30",
            side === "buy" 
              ? "bg-emerald-500 hover:bg-emerald-400 text-[#062a1a] shadow-emerald-500/10" 
              : "bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/10"
          )}
        >
          {loading ? "Processing..." : `${side} ${quantity} ${symbol}`}
        </button>
      </div>

      {/* Pending Orders Sidebar Footer */}
      {pendingOrders.length > 0 && (
        <div className="border-t border-white/5 bg-white/2 p-4 max-h-[30%] overflow-y-auto">
          <h4 className="text-[10px] font-black text-ink3 uppercase tracking-[0.2em] mb-3">Pending Orders</h4>
          <div className="space-y-2">
            {pendingOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-2 rounded-lg bg-black/20 ring-1 ring-white/5">
                <div>
                  <div className="text-[11px] font-bold text-ink">
                    <span className={clsx(order.side === "buy" ? "text-emerald-400" : "text-rose-400")}>
                      {order.side.toUpperCase()}
                    </span> {order.quantity} @ ₹{order.target_price.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-ink3 uppercase font-medium">{order.order_type}</div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
