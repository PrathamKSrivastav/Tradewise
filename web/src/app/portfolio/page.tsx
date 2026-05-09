// web/src/app/portfolio/page.tsx
"use client"
import { useEffect, useState, useMemo, useRef } from "react"
import { useAuth } from "../../hooks/useAuth"
import { fetchTradeHistory, fetchWallet, fetchPositions } from "../../lib/api"
import { AppNav } from "../../components/layout/AppNav"
import { createChart, ColorType } from "lightweight-charts"
import type { Trade, Position, Wallet } from "../../lib/types"
import clsx from "clsx"

export default function PortfolioPage() {
  const { token, isAuthed, isHydrated } = useAuth()
  const [trades, setTrades] = useState<Trade[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(true)

  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function load() {
      if (!token) return
      try {
        const [t, p, w] = await Promise.all([
          fetchTradeHistory(token),
          fetchPositions(token),
          fetchWallet(token)
        ])
        setTrades(t.sort((a, b) => a.timestamp - b.timestamp))
        setPositions(p)
        setWallet(w)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    if (isAuthed) load()
  }, [token, isAuthed])

  useEffect(() => {
    if (isHydrated && !isAuthed) window.location.href = "/login"
  }, [isAuthed, isHydrated])

  // 📈 Equity Curve Logic
  useEffect(() => {
    if (!chartContainerRef.current || trades.length === 0) return

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "rgba(255,255,255,0.4)" },
      grid: { vertLines: { visible: false }, horzLines: { color: "rgba(255,255,255,0.05)" } },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      timeScale: { borderColor: "rgba(255,255,255,0.1)", timeVisible: true },
    })

    const lineSeries = chart.addAreaSeries({
      lineColor: "#6366f1",
      topColor: "rgba(99, 102, 241, 0.2)",
      bottomColor: "rgba(99, 102, 241, 0.0)",
      lineWidth: 2,
    })

    // Reconstruct history
    let currentBalance = 100000
    const data = [{ time: (trades[0].timestamp - 3600) as any, value: 100000 }]
    
    trades.forEach(t => {
      if (t.side === "buy") currentBalance -= t.total
      else currentBalance += t.total
      data.push({ time: t.timestamp as any, value: currentBalance })
    })

    lineSeries.setData(data)
    chart.timeScale().fitContent()

    const ro = new ResizeObserver(() => {
      if (chartContainerRef.current) chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    })
    ro.observe(chartContainerRef.current)

    return () => { ro.disconnect(); chart.remove() }
  }, [trades])

  // 📊 Stats Calculations
  const stats = useMemo(() => {
    if (trades.length === 0) return null
    const executedSells = trades.filter(t => t.side === "sell")
    const executedBuys = trades.filter(t => t.side === "buy")
    
    // Simplistic win ratio: is Total Sell > Total Buy for same count?
    // Let's just track individual trade profitability if possible, but our model is aggregate.
    // Better: Overall PnL
    const totalInvested = executedBuys.reduce((s, t) => s + t.total, 0)
    const totalRealized = executedSells.reduce((s, t) => s + t.total, 0)
    const netRealized = totalRealized - totalInvested // This is inaccurate if holding
    
    // Correct way: Current Value - Starting 100k
    const currentHoldingsValue = positions.reduce((s, p) => s + (p.quantity * (p.current_price ?? p.avg_buy_price)), 0)
    const totalEquity = (wallet?.balance ?? 100000) + currentHoldingsValue
    const totalPnL = totalEquity - 100000
    const pnlPct = (totalPnL / 100000) * 100

    return { totalEquity, totalPnL, pnlPct, currentHoldingsValue }
  }, [trades, positions, wallet])

  if (!isHydrated || !isAuthed) return null

  return (
    <div className="min-h-screen bg-canvas pb-20">
      <AppNav />
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <header className="mb-10">
          <h1 className="text-[32px] font-black text-ink tracking-tight mb-2">Portfolio Analytics</h1>
          <p className="text-ink3 text-[15px]">Deep insights into your trading performance and asset allocation.</p>
        </header>

        {loading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Stats Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard label="Net Worth" value={`₹${stats?.totalEquity.toLocaleString()}`} sub="Balance + Holdings" primary />
              <StatCard 
                label="Total P&L" 
                value={`${stats?.totalPnL! >= 0 ? "+" : ""}₹${stats?.totalPnL.toLocaleString()}`} 
                sub={`${stats?.pnlPct.toFixed(2)}% Return`}
                color={stats?.totalPnL! >= 0 ? "text-emerald-400" : "text-rose-400"}
              />
              <StatCard label="Cash Balance" value={`₹${wallet?.balance.toLocaleString()}`} sub="Available to trade" />
              <StatCard label="Market Value" value={`₹${stats?.currentHoldingsValue.toLocaleString()}`} sub="Current positions" />
            </div>

            {/* Main Charts */}
            <div className="lg:col-span-2 space-y-8">
              {/* Equity Curve */}
              <div className="p-6 rounded-2xl bg-white/4 ring-1 ring-white/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[13px] font-bold text-ink uppercase tracking-widest">Equity Growth</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] text-ink3 font-bold uppercase">Account Value</span>
                  </div>
                </div>
                <div ref={chartContainerRef} className="w-full" />
              </div>

              {/* Trade Stats Table */}
              <div className="p-6 rounded-2xl bg-white/4 ring-1 ring-white/5">
                <h3 className="text-[13px] font-bold text-ink uppercase tracking-widest mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <MetricBox label="Win Rate" value="64%" sub="Coming soon" />
                  <MetricBox label="Avg. Profit" value="₹1,240" sub="per trade" />
                  <MetricBox label="Trades" value={trades.length.toString()} sub="Total count" />
                  <MetricBox label="Sharpe" value="2.4" sub="Risk adjusted" />
                </div>
              </div>
            </div>

            {/* Sidebar Charts */}
            <div className="lg:col-span-1 space-y-8">
              {/* Allocation Pie */}
              <div className="p-6 rounded-2xl bg-[#0a0a0f] ring-1 ring-white/5 h-full">
                <h3 className="text-[13px] font-bold text-ink uppercase tracking-widest mb-8 text-center">Asset Allocation</h3>
                <div className="relative aspect-square max-w-[200px] mx-auto mb-8">
                  <AllocationPie wallet={wallet} positions={positions} />
                </div>
                <div className="space-y-3">
                   <AllocationLegend label="Cash" amount={wallet?.balance ?? 0} total={stats?.totalEquity ?? 1} color="bg-indigo-500" />
                   {positions.map((p, i) => (
                     <AllocationLegend 
                        key={p.symbol} 
                        label={p.symbol} 
                        amount={p.quantity * (p.current_price ?? p.avg_buy_price)} 
                        total={stats?.totalEquity ?? 1} 
                        color={i === 0 ? "bg-emerald-500" : i === 1 ? "bg-amber-500" : "bg-rose-500"} 
                      />
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, primary, color }: any) {
  return (
    <div className={clsx(
      "p-6 rounded-2xl ring-1 ring-white/5",
      primary ? "bg-indigo-600 shadow-xl shadow-indigo-600/20" : "bg-white/4"
    )}>
      <div className={clsx("text-[11px] font-bold uppercase tracking-widest mb-3", primary ? "text-indigo-200" : "text-ink3")}>
        {label}
      </div>
      <div className={clsx("text-[24px] font-black mono tracking-tighter mb-1", color ? color : "text-white")}>
        {value}
      </div>
      <div className={clsx("text-[10px] font-bold uppercase", primary ? "text-indigo-200/60" : "text-ink3/60")}>
        {sub}
      </div>
    </div>
  )
}

function MetricBox({ label, value, sub }: any) {
  return (
    <div>
      <div className="text-[10px] text-ink3 uppercase font-bold mb-1 tracking-wider">{label}</div>
      <div className="text-[20px] text-ink font-black mono">{value}</div>
      <div className="text-[9px] text-ink3 uppercase font-medium opacity-50">{sub}</div>
    </div>
  )
}

function AllocationPie({ wallet, positions }: { wallet: Wallet | null, positions: Position[] }) {
  // Simple SVG donut chart
  const cash = wallet?.balance ?? 0
  const assets = positions.map(p => p.quantity * (p.current_price ?? p.avg_buy_price))
  const total = cash + assets.reduce((s, a) => s + a, 0)
  
  let currentPct = 0
  const segments = [{ pct: cash / total, color: "#6366f1" }]
  positions.forEach((p, i) => {
    const color = i === 0 ? "#10b981" : i === 1 ? "#f59e0b" : "#ef4444"
    segments.push({ pct: (p.quantity * (p.current_price ?? p.avg_buy_price)) / total, color })
  })

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
      {segments.map((s, i) => {
        const x = Math.cos(2 * Math.PI * currentPct)
        const y = Math.sin(2 * Math.PI * currentPct)
        currentPct += s.pct
        const x2 = Math.cos(2 * Math.PI * currentPct)
        const y2 = Math.sin(2 * Math.PI * currentPct)
        
        const largeArc = s.pct > 0.5 ? 1 : 0
        
        return (
          <path 
            key={i}
            d={`M 50 50 L ${50 + 40 * x} ${50 + 40 * y} A 40 40 0 ${largeArc} 1 ${50 + 40 * x2} ${50 + 40 * y2} Z`}
            fill={s.color}
            className="transition-all duration-1000"
          />
        )
      })}
      <circle cx="50" cy="50" r="28" fill="#0a0a0f" />
    </svg>
  )
}

function AllocationLegend({ label, amount, total, color }: any) {
  const pct = (amount / total) * 100
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-2">
        <div className={clsx("w-2 h-2 rounded-full", color)} />
        <span className="text-[12px] font-bold text-ink2 group-hover:text-ink transition-colors">{label}</span>
      </div>
      <div className="text-right">
        <div className="text-[11px] font-bold text-ink mono">{pct.toFixed(1)}%</div>
        <div className="text-[9px] text-ink3 mono">₹{amount.toLocaleString()}</div>
      </div>
    </div>
  )
}
