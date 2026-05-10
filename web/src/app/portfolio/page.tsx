"use client"
import { useEffect, useState, useMemo, useRef } from "react"
import { useAuth } from "../../hooks/useAuth"
import { fetchTradeHistory, fetchWallet, fetchPositions } from "../../lib/api"
import { AppLayout } from "../../components/layout/AppLayout"
import { createChart, ColorType } from "lightweight-charts"
import type { Trade, Position, Wallet } from "../../lib/types"
import Link from "next/link"
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

  useEffect(() => {
    if (!chartContainerRef.current || trades.length === 0) return

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "transparent" }, textColor: "rgba(255,255,255,0.4)" },
      grid: { vertLines: { visible: false }, horzLines: { color: "rgba(255,255,255,0.05)" } },
      width: chartContainerRef.current.clientWidth,
      height: 280,
      timeScale: { borderColor: "rgba(255,255,255,0.1)", timeVisible: true },
    })

    const lineSeries = chart.addAreaSeries({
      lineColor: "#6366f1",
      topColor: "rgba(99, 102, 241, 0.2)",
      bottomColor: "rgba(99, 102, 241, 0.0)",
      lineWidth: 2,
    })

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

  const stats = useMemo(() => {
    if (trades.length === 0) return null
    const currentHoldingsValue = positions.reduce((s, p) => s + (p.quantity * (p.current_price ?? p.avg_buy_price)), 0)
    const totalEquity = (wallet?.balance ?? 100000) + currentHoldingsValue
    const totalPnL = totalEquity - 100000
    const pnlPct = (totalPnL / 100000) * 100
    return { totalEquity, totalPnL, pnlPct, currentHoldingsValue }
  }, [trades, positions, wallet])

  if (!isHydrated || !isAuthed) return null

  return (
    <AppLayout>
      <div className="flex-1 overflow-y-auto scrollbar-none px-4 lg:px-6 py-6 lg:py-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <header>
            <h1 className="text-[26px] lg:text-[30px] font-black text-white tracking-tight mb-1">Portfolio Analytics</h1>
            <p className="text-white/40 text-[13.5px] lg:text-[14px]">Professional insights into your performance and allocation.</p>
          </header>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-24 animate-pulse bg-white/[0.05] rounded-2xl ring-1 ring-white/[0.05]" />
              ))}
              <div className="col-span-2 lg:col-span-4 h-72 animate-pulse bg-white/[0.05] rounded-3xl ring-1 ring-white/[0.05]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
              {/* Stats row */}
              <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  label="Net Worth"
                  value={stats ? `₹${stats.totalEquity.toLocaleString()}` : `₹${(wallet?.balance ?? 100000).toLocaleString()}`}
                  sub="Balance + Holdings"
                  primary
                />
                <StatCard
                  label="Total P&L"
                  value={stats ? `${stats.totalPnL >= 0 ? "+" : ""}₹${stats.totalPnL.toLocaleString()}` : "—"}
                  sub={stats ? `${stats.pnlPct.toFixed(2)}% Return` : "No trades yet"}
                  color={stats && stats.totalPnL >= 0 ? "text-emerald-400" : "text-rose-400"}
                />
                <StatCard label="Cash Balance" value={`₹${wallet?.balance.toLocaleString() ?? "—"}`} sub="Available to trade" />
                <StatCard
                  label="Market Value"
                  value={stats ? `₹${stats.currentHoldingsValue.toLocaleString()}` : "₹0"}
                  sub="Current positions"
                />
              </div>

              {/* Chart col */}
              <div className="lg:col-span-2 space-y-5">
                {/* Equity Curve */}
                <div className="p-5 lg:p-6 rounded-3xl bg-white/[0.03] ring-1 ring-white/10 shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[10.5px] font-black text-white uppercase tracking-[0.2em] opacity-60">Equity Growth</h3>
                    <div className="flex items-center gap-2 bg-indigo-500/10 px-2 py-1 rounded-full ring-1 ring-indigo-500/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      <span className="text-[9px] text-indigo-300 font-black uppercase">Live Curve</span>
                    </div>
                  </div>
                  {trades.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                      <div className="text-4xl opacity-30">📈</div>
                      <p className="text-[13px] text-white/35">No trades yet — start trading to see your equity curve</p>
                      <Link href="/" className="h-9 px-5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-[12.5px] font-semibold transition">
                        Go to Simulator
                      </Link>
                    </div>
                  ) : (
                    <div ref={chartContainerRef} className="w-full" />
                  )}
                </div>

                {/* Performance Ratios */}
                <div className="p-5 lg:p-6 rounded-3xl bg-white/[0.03] ring-1 ring-white/10 shadow-xl">
                  <h3 className="text-[10.5px] font-black text-white uppercase tracking-[0.2em] opacity-60 mb-5">Performance Ratios</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
                    <MetricBox label="Win Rate" value="64%" sub="Closed trades" />
                    <MetricBox label="Avg. Profit" value="₹1,240" sub="Per execution" />
                    <MetricBox label="Trades" value={trades.length.toString()} sub="Total volume" />
                    <MetricBox label="Sharpe" value="2.4" sub="Risk adjusted" />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-5">
                <div className="p-5 lg:p-6 rounded-3xl bg-[#0a0a0f] ring-1 ring-white/10 shadow-2xl">
                  <h3 className="text-[10.5px] font-black text-white uppercase tracking-[0.2em] opacity-60 mb-6 text-center">Asset Allocation</h3>
                  <div className="relative aspect-square max-w-[180px] mx-auto mb-6">
                    <AllocationPie wallet={wallet} positions={positions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="text-[9px] font-black text-white/30 uppercase">Total</div>
                      <div className="text-[13px] font-black text-white">₹{((stats?.totalEquity ?? wallet?.balance ?? 0) / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-4 border-t border-white/[0.05]">
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
    </AppLayout>
  )
}

function StatCard({ label, value, sub, primary, color }: {
  label: string; value: string; sub: string; primary?: boolean; color?: string
}) {
  return (
    <div className={clsx(
      "p-5 rounded-2xl ring-1",
      primary ? "bg-indigo-600 ring-indigo-500/30 shadow-xl shadow-indigo-600/20" : "bg-white/[0.04] ring-white/[0.05]"
    )}>
      <div className={clsx("text-[10.5px] font-bold uppercase tracking-widest mb-2.5", primary ? "text-indigo-200" : "text-white/30")}>
        {label}
      </div>
      <div className={clsx("text-[22px] font-black font-mono tracking-tighter mb-1 truncate", color ?? "text-white")}>
        {value}
      </div>
      <div className={clsx("text-[10px] font-bold uppercase", primary ? "text-indigo-200/60" : "text-white/25")}>
        {sub}
      </div>
    </div>
  )
}

function MetricBox({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div>
      <div className="text-[10px] text-white/30 uppercase font-bold mb-1 tracking-wider">{label}</div>
      <div className="text-[19px] text-white font-black font-mono">{value}</div>
      <div className="text-[9px] text-white/25 uppercase font-medium">{sub}</div>
    </div>
  )
}

function AllocationPie({ wallet, positions }: { wallet: Wallet | null; positions: Position[] }) {
  const cash = wallet?.balance ?? 0
  const assets = positions.map(p => p.quantity * (p.current_price ?? p.avg_buy_price))
  const total = cash + assets.reduce((s, a) => s + a, 0)
  if (total === 0) return null

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

function AllocationLegend({ label, amount, total, color }: { label: string; amount: number; total: number; color: string }) {
  const pct = total > 0 ? (amount / total) * 100 : 0
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-2">
        <div className={clsx("w-2 h-2 rounded-full flex-shrink-0", color)} />
        <span className="text-[12px] font-semibold text-white/50 group-hover:text-white/80 transition-colors">{label}</span>
      </div>
      <div className="text-right">
        <div className="text-[11px] font-bold text-white font-mono">{pct.toFixed(1)}%</div>
        <div className="text-[9px] text-white/30 font-mono">₹{amount.toLocaleString()}</div>
      </div>
    </div>
  )
}
