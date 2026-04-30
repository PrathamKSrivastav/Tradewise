// web/src/components/chart/CandlestickChart.tsx
"use client"
import { useEffect, useRef } from "react"
import { createChart, ColorType, CrosshairMode } from "lightweight-charts"
import type { Candle } from "@/lib/types"
interface Props {
  candles: Candle[]
  symbol: string
}
export function CandlestickChart({ candles, symbol }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null)
  const seriesRef = useRef<any>(null)
  useEffect(() => {
    if (!containerRef.current) return
    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255,255,255,0.5)",
        fontFamily: "monospace",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)" },
        horzLines: { color: "rgba(255,255,255,0.04)" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
        timeVisible: true,
        secondsVisible: false,
      },
      width: containerRef.current.clientWidth,
      height: 380,
    })
    const series = chart.addCandlestickSeries({
      upColor: "#10b981",
      downColor: "#ef4444",
      borderUpColor: "#10b981",
      borderDownColor: "#ef4444",
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    })
    chartRef.current = chart
    seriesRef.current = series
    const ro = new ResizeObserver(() => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth })
    })
    ro.observe(containerRef.current)
    return () => { ro.disconnect(); chart.remove() }
  }, [])
  useEffect(() => {
    if (!seriesRef.current || candles.length === 0) return
    // deduplicate by timestamp (keep last), then sort ascending
    const seen = new Map<number, Candle>()
    for (const c of candles) seen.set(c.timestamp, c)
    const sorted = Array.from(seen.values()).sort((a, b) => a.timestamp - b.timestamp)
    const data = sorted.map((c) => ({
      time: c.timestamp as any,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }))
    seriesRef.current.setData(data)
    chartRef.current?.timeScale().fitContent()
  }, [candles])
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0f]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8">
        <span className="text-xs font-mono text-white/40 tracking-widest">{symbol} · 1MIN</span>
        <span className="text-xs text-white/30">{candles.length} candles</span>
      </div>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}