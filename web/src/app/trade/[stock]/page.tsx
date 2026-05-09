// web/src/app/trade/[stock]/page.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter, useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "../../../hooks/useAuth"
import { useWallet } from "../../../hooks/useWallet"
import { useMarketSocket } from "../../../hooks/useMarketSocket"
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
  const [tf, setTf] = useState("1D")

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
      <div className="pt-14 h-screen flex flex-col bg-canvas">
        {/* Sub-header */}
        <div className="h-14 border-b border-stroke1 bg-canvas/95 backdrop-blur-sm flex items-center px-6 gap-4 flex-none">
          <Link href="/" className="flex items-center gap-1.5 text-[12.5px] text-ink2 hover:text-ink transition">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Simulator
          </Link>
          <div className="w-px h-4 bg-stroke2" />
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[11px] text-ink3 font-semibold tracking-[0.14em] mono mb-0.5">{symbol}</div>
              <div className="text-[15px] font-semibold tracking-[-0.01em]">{meta.name}</div>
            </div>
            <RiskBadge level={meta.risk} />
          </div>
          {lastPrice > 0 && (
            <div className="ml-auto flex items-baseline gap-3">
              <div className="mono text-[22px] font-bold num">₹{lastPrice.toLocaleString("en-IN")}</div>
              <div className={clsx("mono text-[13px] num font-medium", isUp ? "text-emerald-400" : "text-rose-400")}>
                {isUp ? "+" : ""}{changeAbs.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                {" "}({isUp ? "+" : ""}{change.toFixed(2)}%)
              </div>
            </div>
          )}
          {/* Timeframe controls */}
          <div className="ml-4 flex items-center gap-0.5 p-0.5 rounded-btn bg-white/4 ring-1 ring-stroke1">
            {TIMEFRAMES.map(t => (
              <button key={t} onClick={() => setTf(t)} className={clsx(
                "h-7 px-2.5 rounded-[5px] text-[11.5px] font-medium mono transition",
                tf === t ? "bg-white/8 text-ink ring-1 ring-stroke2" : "text-ink3 hover:text-ink2"
              )}>{t}</button>
            ))}
          </div>
        </div>

        {/* OHLC ribbon */}
        {lastCandle && (
          <div className="h-9 border-b border-stroke1 bg-elev1 flex items-center px-6 gap-6 flex-none">
            {[
              { label: "O", value: lastCandle.open },
              { label: "H", value: lastCandle.high },
              { label: "L", value: lastCandle.low },
              { label: "C", value: lastCandle.close },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-[10px] text-ink3 font-semibold tracking-[0.12em]">{label}</span>
                <span className="mono text-[12px] num text-ink">₹{value.toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex min-h-0">
          {/* Chart area */}
          <div className="flex-1 border-r border-stroke1 min-w-0 chart-grid relative">
            <CandlestickChart candles={candles} symbol={symbol} />
            {labId && <LabOverlay lessonId={labId} candles={candles} symbol={symbol} />}
          </div>

          {/* Right panel - 320px */}
          <div className="w-[320px] flex-none flex flex-col overflow-auto scrollbar-none">
            <TradePanel symbol={symbol} onTradeSuccess={refresh} />
            <RiskMetricsPanel symbol={symbol} candles={candles} />
            <div className="border-t border-stroke1">
              <PositionsTable />
            </div>
          </div>
        </div>

        {/* Bottom: trade history */}
        <div className="h-[180px] border-t border-stroke1 flex-none overflow-auto scrollbar-none">
          <TradeHistory />
        </div>

        <ChatWidget mode="simulator" symbol={symbol} candles={candles} />
      </div>
    </>
  )
}
