// web/src/app/trade/[stock]/page.tsx
"use client"
import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "../../../hooks/useAuth"
import { useWallet } from "../../../hooks/useWallet"
import { useMarketSocket } from "../../../hooks/useMarketSocket"
import { CandlestickChart } from "../../../components/chart/CandlestickChart"
import { TradePanel } from "../../../components/trade/TradePanel"
import { PositionsTable } from "../../../components/trade/PositionsTable"
import { TradeHistory } from "../../../components/trade/TradeHistory"
import { ChatWidget } from "../../../components/chatbot/ChatWidget"
import { RiskBadge } from "../../../components/ui/RiskBadge"
import Link from "next/link"
const RISK: Record<string, string> = {
  STABLE: "LOW", GROWTH: "MEDIUM", SWING: "HIGH", SPECULATIVE: "EXTREME",
}
const NAMES: Record<string, string> = {
  STABLE: "Bharat Infra Ltd",
  GROWTH: "IndiaNext Technologies",
  SWING: "Desh Pharma Corp",
  SPECULATIVE: "RocketEdge Ventures",
}
export default function TradePage() {
  const { isAuthed } = useAuth()
  const { refresh } = useWallet()
  const router = useRouter()
  const params = useParams()
  const symbol = (params.stock as string).toUpperCase()
  const { candles, lastPrice } = useMarketSocket(symbol)
  useEffect(() => {
    if (!isAuthed) router.push("/login")
  }, [isAuthed])
  if (!isAuthed) return null
  const prevClose = candles.length > 1 ? candles[candles.length - 2].close : null
  const change = prevClose ? ((lastPrice - prevClose) / prevClose) * 100 : 0
  const isUp = change >= 0
  return (
    <main className="min-h-screen px-4 py-6 max-w-7xl mx-auto">
      {/* topbar */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="text-white/30 hover:text-white/70 text-sm transition-colors">
          ← Back
        </Link>
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/40">{symbol}</span>
              <RiskBadge level={RISK[symbol] ?? "LOW"} />
            </div>
            <p className="text-sm font-semibold text-white">{NAMES[symbol] ?? symbol}</p>
          </div>
        </div>
        {lastPrice > 0 && (
          <div className="ml-auto text-right">
            <p className="text-xl font-mono font-bold text-white">
              ₹{lastPrice.toLocaleString("en-IN")}
            </p>
            <p className={`text-xs font-mono ${isUp ? "text-emerald-400" : "text-red-400"}`}>
              {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
      {/* main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="xl:col-span-3 flex flex-col gap-4">
          <CandlestickChart candles={candles} symbol={symbol} />
          <TradeHistory />
        </div>
        <div className="flex flex-col gap-4">
          <TradePanel symbol={symbol} onTradeSuccess={refresh} />
          <PositionsTable />
        </div>
      </div>
      <ChatWidget symbol={symbol} candles={candles} />
    </main>
  )
}