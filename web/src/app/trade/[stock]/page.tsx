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

const TIMEFRAMES: { label: string; desc: string }[] = [
  { label: "1m",  desc: "Scalping · micro moves" },
  { label: "5m",  desc: "Short-term momentum" },
  { label: "15m", desc: "Intraday setups" },
  { label: "1h",  desc: "Swing entry signals" },
  { label: "1D",  desc: "Trend confirmation" },
  { label: "1W",  desc: "Low-volatility overview" },
]

export default function TradePage() {
  const { isAuthed, isHydrated } = useAuth()
  const { refresh } = useWallet()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const labId = searchParams.get("lab")
  const symbol = (params.stock as string).toUpperCase()
  const { candles, lastPrice } = useMarketSocket(symbol)
  const [tf, setTf] = useState("1m")
  const [mobileTab, setMobileTab] = useState<"chart" | "positions" | "history">("chart")
  const [showDrawer, setShowDrawer] = useState(false)

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

  useEffect(() => { 
    if (isHydrated && !isAuthed) router.push("/login") 
  }, [isAuthed, isHydrated])

  if (!isHydrated || !isAuthed) return null

  const meta = STOCK_META[symbol] ?? { name: symbol, risk: "LOW" }
  const prevClose = candles.length > 1 ? candles[candles.length - 2].close : null
  const change = prevClose ? ((lastPrice - prevClose) / prevClose) * 100 : 0
  const isUp = change >= 0

  const lastCandle = candles[candles.length - 1]

  return (
    <>
      <AppNav />
      <div className="pt-14 h-screen flex flex-col bg-canvas overflow-hidden">
        {/* Header - Stays sticky on top */}
        <div className="h-12 lg:h-12 border-b border-stroke1 bg-canvas flex items-center px-4 gap-4 flex-none z-20">
          <Link href="/" className="flex items-center gap-1.5 text-[11px] text-ink3 hover:text-ink transition uppercase font-bold tracking-wider">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="hidden sm:inline">Back</span>
          </Link>
          <div className="w-px h-3 bg-stroke2 hidden sm:block" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-3">
            <div className="text-[13px] sm:text-[14px] font-bold tracking-tight leading-none sm:leading-normal">{meta.name}</div>
            <div className="sm:block transform scale-75 sm:scale-100 origin-left mt-0.5 sm:mt-0">
              <RiskBadge level={meta.risk} />
            </div>
          </div>
          {lastPrice > 0 && (
            <div className="ml-auto flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-2 text-right">
              <div className="mono text-[16px] sm:text-[18px] font-bold num leading-none">₹{lastPrice.toLocaleString("en-IN")}</div>
              <div className={clsx("mono text-[10px] sm:text-[11px] num font-bold", isUp ? "text-emerald-400" : "text-rose-400")}>
                {isUp ? "+" : ""}{change.toFixed(2)}%
              </div>
            </div>
          )}
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden border-b border-stroke1 bg-elev1 flex-none">
          {(["chart", "positions", "history"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={clsx(
                "flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all relative",
                mobileTab === tab ? "text-indigo-400" : "text-ink3"
              )}
            >
              {tab}
              {mobileTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />}
            </button>
          ))}
        </div>

        {/* Desktop OHLC ribbon - Hidden on mobile to save space */}
        {lastCandle && (
          <div className="hidden lg:flex h-8 border-b border-stroke1 bg-elev1 items-center px-4 gap-6 flex-none">
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

        {/* Content Area */}
        <div className="flex-1 flex min-h-0 relative">
          {/* Main Column */}
          <div className={clsx(
            "flex-1 flex flex-col min-w-0 border-r border-stroke1",
            mobileTab !== "chart" && "hidden lg:flex"
          )}>
            {/* Timeframe selector */}
            <div className="flex-none border-b border-stroke1 bg-canvas/60">
              <div className="flex items-center gap-0.5 px-3 pt-2 pb-1 overflow-x-auto scrollbar-none">
                {TIMEFRAMES.map(({ label, desc }) => {
                  const active = tf === label
                  return (
                    <button
                      key={label}
                      onClick={() => setTf(label)}
                      title={desc}
                      className={clsx(
                        "flex flex-col items-center px-2.5 py-1.5 rounded-lg transition-all flex-none min-w-[44px]",
                        active
                          ? "bg-indigo-500/15 ring-1 ring-indigo-500/30"
                          : "hover:bg-white/5"
                      )}
                    >
                      <span className={clsx("text-[12px] font-bold tabular-nums leading-none", active ? "text-indigo-300" : "text-ink2")}>{label}</span>
                    </button>
                  )
                })}
              </div>
              {/* Active timeframe description strip */}
              <div className="px-3 pb-2 flex items-center gap-1.5 min-h-[18px]">
                <div className="w-1 h-1 rounded-full bg-indigo-400 flex-none" />
                <span className="text-[10.5px] text-indigo-300/70 font-medium leading-none">
                  {TIMEFRAMES.find(t => t.label === tf)?.desc}
                </span>
              </div>
            </div>

            <div className="flex-1 relative chart-grid overflow-hidden bg-black/20">
              <CandlestickChart candles={displayCandles} symbol={symbol} />
              {labId && <LabOverlay lessonId={labId} candles={displayCandles} symbol={symbol} />}
            </div>
            <div className="flex-none bg-canvas border-t border-stroke1">
              <RiskMetricsPanel symbol={symbol} candles={displayCandles} />
            </div>
            <div className="h-[140px] hidden lg:block flex-none border-t border-stroke1 overflow-auto scrollbar-none bg-canvas/50">
              <TradeHistory />
            </div>
          </div>

          {/* Positions (Mobile View) */}
          <div className={clsx(
            "flex-1 lg:hidden bg-canvas overflow-y-auto",
            mobileTab !== "positions" && "hidden"
          )}>
            <PositionsTable />
          </div>

          {/* History (Mobile View) */}
          <div className={clsx(
            "flex-1 lg:hidden bg-canvas overflow-y-auto",
            mobileTab !== "history" && "hidden"
          )}>
            <TradeHistory />
          </div>

          {/* Sidebar (Desktop) */}
          <div className="hidden lg:flex w-[320px] flex-none flex-col bg-canvas overflow-hidden">
            <div className="flex-none border-b border-stroke1">
              <TradePanel symbol={symbol} onTradeSuccess={refresh} />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none">
              <PositionsTable />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="lg:hidden h-16 flex-none border-t border-stroke1 bg-canvas/95 backdrop-blur-md px-4 flex items-center gap-3 z-30">
          <button
            onClick={() => { setShowDrawer(true) }}
            className="flex-1 h-11 rounded-xl bg-indigo-500 text-white font-black text-[13px] uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-transform"
          >
            BUY / SELL
          </button>
        </div>

        {/* Mobile Order Drawer Overlay */}
        {showDrawer && (
          <>
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setShowDrawer(false)} />
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d1120] rounded-t-3xl border-t border-stroke1 max-h-[85vh] overflow-y-auto lg:hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-center p-3">
                <div className="w-12 h-1.5 rounded-full bg-white/10" />
              </div>
              <div className="px-2 pb-8">
                <TradePanel symbol={symbol} onTradeSuccess={() => { refresh(); setShowDrawer(false); }} />
              </div>
            </div>
          </>
        )}

        <ChatWidget mode="simulator" symbol={symbol} candles={candles} />
      </div>
    </>
  )
}
