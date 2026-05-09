// web/src/app/trade/[stock]/page.tsx
"use client"
import { useEffect, useState, useMemo } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../../hooks/useAuth"
import { useWallet } from "../../../hooks/useWallet"
import { useMarketSocket } from "../../../hooks/useMarketSocket"
import { aggregateCandles } from "../../../lib/math"
import { CandlestickChart } from "../../../components/chart/CandlestickChart"
import { LabOverlay } from "../../../components/trade/LabOverlay"
import { TradePanel } from "../../../components/trade/TradePanel"
import { RiskMetricsPanel } from "../../../components/trade/RiskMetricsPanel"
import { PositionsTable } from "../../../components/trade/PositionsTable"
import { TradeHistory } from "../../../components/trade/TradeHistory"
import { ChatWidget } from "../../../components/chatbot/ChatWidget"
import { RiskBadge } from "../../../components/ui/RiskBadge"
import { AppNav } from "../../../components/layout/AppNav"
import clsx from "clsx"

const STOCK_META: Record<string, { name: string; risk: string }> = {
  STABLE:      { name: "Bharat Infra Ltd",       risk: "LOW" },
  GROWTH:      { name: "IndiaNext Technologies",  risk: "MEDIUM" },
  SWING:       { name: "Desh Pharma Corp",        risk: "HIGH" },
  SPECULATIVE: { name: "RocketEdge Ventures",     risk: "EXTREME" },
}

const TIMEFRAMES = ["1m", "5m", "15m", "1h", "1D", "1W"]

export default function TradePage() {
  const { isAuthed } = useAuth()
  const { refresh } = useWallet()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const labId = searchParams.get("lab")
  const symbol = (params.stock as string).toUpperCase()
  const { candles, lastPrice } = useMarketSocket(symbol)
  const [tf, setTf] = useState("1m")

  const tfToMinutes: Record<string, number> = {
    "1m": 1,
    "5m": 5,
    "15m": 15,
    "1h": 60,
    "1D": 390,
    "1W": 1950,
  }

  const displayCandles = useMemo(() => {
    return aggregateCandles(candles, tfToMinutes[tf] ?? 1)
  }, [candles, tf])

  useEffect(() => { if (!isAuthed) router.push("/login") }, [isAuthed])
  if (!isAuthed) return null

  const meta = STOCK_META[symbol] ?? { name: symbol, risk: "LOW" }
  const prevClose = candles.length > 1 ? candles[candles.length - 2].close : null
  const change = prevClose ? ((lastPrice - prevClose) / prevClose) * 100 : 0
  const changeAbs = prevClose ? lastPrice - prevClose : 0
  const isUp = change >= 0

  const lastCandle = candles[candles.length - 1]

  return (
    <>
      <AppNav />
      <div className="pt-14 h-screen flex flex-col bg-canvas overflow-hidden">
        {/* Sub-header - Reduced height to h-12 */}
        <div className="h-12 border-b border-stroke1 bg-canvas/95 backdrop-blur-sm flex items-center px-4 gap-4 flex-none">
          <Link href="/" className="flex items-center gap-1.5 text-[11px] text-ink3 hover:text-ink transition uppercase font-bold tracking-wider">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </Link>
          <div className="w-px h-3 bg-stroke2" />
          <div className="flex items-center gap-3">
            <div className="text-[14px] font-bold tracking-tight">{meta.name}</div>
            <RiskBadge level={meta.risk} />
          </div>
          {lastPrice > 0 && (
            <div className="ml-auto flex items-baseline gap-2">
              <div className="mono text-[18px] font-bold num">₹{lastPrice.toLocaleString("en-IN")}</div>
              <div className={clsx("mono text-[11px] num font-bold", isUp ? "text-emerald-400" : "text-rose-400")}>
                {isUp ? "+" : ""}{change.toFixed(2)}%
              </div>
            </div>
          )}
        </div>

        {/* OHLC ribbon - Reduced height to h-8 */}
        {lastCandle && (
          <div className="h-8 border-b border-stroke1 bg-elev1 flex items-center px-4 gap-6 flex-none">
            {[
              { label: "O", value: lastCandle.open },
              { label: "H", value: lastCandle.high },
              { label: "L", value: lastCandle.low },
              { label: "C", value: lastCandle.close },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-[9px] text-ink3 font-bold tracking-widest">{label}</span>
                <span className="mono text-[11px] num text-ink2">₹{value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex min-h-0">
          {/* Left/Main Section */}
          <div className="flex-1 flex flex-col min-w-0 border-r border-stroke1">
            {/* Chart Area */}
            <div className="flex-1 relative chart-grid overflow-hidden bg-black/20">
              <CandlestickChart candles={displayCandles} symbol={symbol} />
              {labId && <LabOverlay lessonId={labId} candles={displayCandles} symbol={symbol} />}
            </div>

            {/* Risk Metrics - Horizontal */}
            <div className="flex-none bg-canvas border-t border-stroke1">
              <RiskMetricsPanel symbol={symbol} candles={displayCandles} />
            </div>

            {/* Trade History */}
            <div className="h-[140px] flex-none border-t border-stroke1 overflow-auto scrollbar-none bg-canvas/50">
              <TradeHistory />
            </div>
          </div>

          {/* Right Sidebar - 320px */}
          <div className="w-[320px] flex-none flex flex-col bg-canvas overflow-hidden">
            <div className="flex-none overflow-y-auto scrollbar-none border-b border-stroke1">
              <TradePanel symbol={symbol} onTradeSuccess={refresh} />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
              <PositionsTable />
            </div>
          </div>
        </div>

        <ChatWidget mode="simulator" symbol={symbol} candles={candles} />
      </div>
    </>
  )
}
