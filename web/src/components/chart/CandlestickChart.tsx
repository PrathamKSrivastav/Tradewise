// web/src/components/chart/CandlestickChart.tsx
"use client"
import { useEffect, useRef, useState } from "react"
import { createChart, ColorType, CrosshairMode, IChartApi, ISeriesApi } from "lightweight-charts"
import type { Candle } from "@/lib/types"
import { calculateSMA, calculateEMA, calculateBollingerBands, calculateRSI, calculateMACD } from "../../lib/indicators"
import { ChartControls, IndicatorType } from "./ChartControls"

interface Props {
  candles: Candle[]
  symbol: string
}

export function CandlestickChart({ candles, symbol }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const indicatorsRef = useRef<Map<string, ISeriesApi<any>>>(new Map())
  const [activeIndicators, setActiveIndicators] = useState<IndicatorType[]>([])

  const [currentTime, setCurrentTime] = useState<string>("")

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("en-IN", { hour12: false }) + " " + now.toLocaleDateString("en-IN", { day: '2-digit', month: 'short' }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 1. Initialize Chart
  useEffect(() => {
    if (!containerRef.current) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0a0a0f" },
        textColor: "rgba(255,255,255,0.5)",
        fontFamily: "monospace",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.04)" },
        horzLines: { color: "rgba(255,255,255,0.04)" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "rgba(255,255,255,0.08)" },
      leftPriceScale: {
        borderColor: "rgba(255,255,255,0.08)",
        visible: true,
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
        timeVisible: true,
        secondsVisible: true,
      },
      width: containerRef.current.clientWidth,
      height: 450,
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

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
      indicatorsRef.current.clear()
    }
  }, [])

  // 2. Handle Data Updates (Using proven setData approach from hash 5937c41)
  useEffect(() => {
    if (!seriesRef.current || !chartRef.current || candles.length === 0) return

    // Sanitization & Deduplication (by second-timestamp)
    const seen = new Map<number, any>()
    for (const c of candles) {
      if (!c || !c.timestamp) continue
      const t = c.timestamp > 1e11 ? Math.floor(c.timestamp / 1000) : c.timestamp
      const o = Number(c.open), h = Number(c.high), l = Number(c.low), cl = Number(c.close);

      if (isNaN(o) || isNaN(h) || isNaN(l) || isNaN(cl)) continue;

      seen.set(t, {
        time: t as any,
        open: o,
        high: h,
        low: l,
        close: cl,
      })
    }

    const sortedData = Array.from(seen.values())
      .sort((a, b) => (a.time as number) - (b.time as number))

    if (sortedData.length === 0) return

    try {
      seriesRef.current.setData(sortedData)
    } catch (err) {
      console.warn("Chart series.setData error:", err)
    }

    const closePrices = sortedData.map(d => d.close)
    const times = sortedData.map(d => d.time)

    // Manage Indicator Series
    const currentMap = indicatorsRef.current
    const chart = chartRef.current

    const syncLine = (id: string, color: string, values: (number | null)[], title?: string, priceScaleId: string = 'right') => {
      try {
        let s = currentMap.get(id)
        if (!s) {
          s = chart!.addLineSeries({ color, lineWidth: 1.5, title, priceScaleId })
          currentMap.set(id, s)
        }
        const lineData = values
          .map((v, i) => v !== null && !isNaN(v) ? { time: times[i], value: v } : null)
          .filter((d): d is { time: any; value: number } => d !== null)
        s.setData(lineData)
      } catch (err) {
        console.error(`Indicator sync error (${id}):`, err)
      }
    }

    const syncHistogram = (id: string, values: (number | null)[], priceScaleId: string = 'left') => {
      try {
        let s = currentMap.get(id)
        if (!s) {
          s = chart!.addHistogramSeries({ priceScaleId })
          currentMap.set(id, s)
        }
        const histData = values
          .map((v, i) => {
            if (v === null || isNaN(v)) return null;
            return {
              time: times[i],
              value: v,
              color: v >= 0 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)'
            }
          })
          .filter((d): d is any => d !== null)
        s.setData(histData)
      } catch (err) {
        console.error(`Histogram sync error (${id}):`, err)
      }
    }

    const removeIndicator = (id: string) => {
      const s = currentMap.get(id)
      if (s) {
        try { chart?.removeSeries(s) } catch (e) {}
        currentMap.delete(id)
      }
    }

    // SMA 20
    if (activeIndicators.includes('SMA20') && closePrices.length >= 20) {
      syncLine('SMA20', '#3b82f6', calculateSMA(closePrices, 20), 'SMA 20')
    } else removeIndicator('SMA20')

    // SMA 50
    if (activeIndicators.includes('SMA50') && closePrices.length >= 50) {
      syncLine('SMA50', '#f59e0b', calculateSMA(closePrices, 50), 'SMA 50')
    } else removeIndicator('SMA50')

    // EMA 9
    if (activeIndicators.includes('EMA9') && closePrices.length >= 9) {
      syncLine('EMA9', '#8b5cf6', calculateEMA(closePrices, 9), 'EMA 9')
    } else removeIndicator('EMA9')

    // Bollinger Bands
    if (activeIndicators.includes('BB') && closePrices.length >= 20) {
      const { upper, lower } = calculateBollingerBands(closePrices, 20, 2)
      syncLine('BB_U', 'rgba(255,255,255,0.15)', upper)
      syncLine('BB_L', 'rgba(255,255,255,0.15)', lower)
    } else {
      removeIndicator('BB_U'); removeIndicator('BB_L')
    }

    // RSI
    if (activeIndicators.includes('RSI') && closePrices.length >= 14) {
      const rsi = calculateRSI(closePrices, 14)
      syncLine('RSI', '#10b981', rsi, 'RSI', 'left')
    } else removeIndicator('RSI')

    // MACD
    if (activeIndicators.includes('MACD') && closePrices.length >= 26) {
      const { macdLine, signalLine, histogram } = calculateMACD(closePrices, 12, 26, 9)
      syncLine('MACD_LINE', '#ec4899', macdLine, 'MACD', 'left')
      syncLine('MACD_SIGNAL', '#6366f1', signalLine, 'Signal', 'left')
      syncHistogram('MACD_HIST', histogram, 'left')
    } else {
      removeIndicator('MACD_LINE'); removeIndicator('MACD_SIGNAL'); removeIndicator('MACD_HIST')
    }

  }, [candles, activeIndicators])

  const toggleIndicator = (id: IndicatorType) => {
    setActiveIndicators(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  // Determine label for display
  const getIntervalLabel = () => {
    if (candles.length < 2) return "1MIN";
    const diff = Math.abs(candles[1].timestamp - candles[0].timestamp) / 60000;
    if (diff >= 1440) return "1DAY";
    if (diff >= 60) return `${Math.round(diff/60)}HOUR`;
    return `${Math.round(diff)}MIN`;
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/8 bg-[#0a0a0f]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/8">
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-white/40 tracking-widest uppercase">{symbol} · {getIntervalLabel()}</span>
          <ChartControls activeIndicators={activeIndicators} onToggle={toggleIndicator} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/40 border-r border-white/10 pr-3">{currentTime}</span>
          <span className="text-xs text-white/30">{candles.length} candles</span>
        </div>
      </div>
      <div ref={containerRef} className="w-full" />
    </div>
  )
}
