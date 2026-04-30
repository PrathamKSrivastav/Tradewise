// web/src/lib/chartContext.ts
// serialises visible candles into a compact string for the RAG chatbot prompt
// the chatbot sees exactly what the user sees — no more, no less
import type { Candle } from "./types"
export interface ChartContext {
  symbol: string
  candle_count: number
  latest_close: number
  latest_open: number
  latest_high: number
  latest_low: number
  latest_volume: number
  price_change_pct: number
  candles_summary: string
}
export function buildChartContext(symbol: string, candles: Candle[]): ChartContext | null {
  if (candles.length === 0) return null
  const latest = candles[candles.length - 1]
  const first = candles[0]
  const price_change_pct = Number((((latest.close - first.close) / first.close) * 100).toFixed(2))
  // compact OHLCV summary — last 20 candles only to stay within token budget
  const recent = candles.slice(-20)
  const candles_summary = recent
    .map(c => `t:${c.timestamp} o:${c.open} h:${c.high} l:${c.low} c:${c.close} v:${c.volume}`)
    .join(" | ")
  return {
    symbol,
    candle_count: candles.length,
    latest_close: latest.close,
    latest_open: latest.open,
    latest_high: latest.high,
    latest_low: latest.low,
    latest_volume: latest.volume,
    price_change_pct,
    candles_summary,
  }
}
export function chartContextToPrompt(ctx: ChartContext): string {
  return [
    `Stock: ${ctx.symbol}`,
    `Current price: ₹${ctx.latest_close}`,
    `Session change: ${ctx.price_change_pct}%`,
    `Latest candle — Open: ₹${ctx.latest_open} High: ₹${ctx.latest_high} Low: ₹${ctx.latest_low} Close: ₹${ctx.latest_close} Volume: ${ctx.latest_volume}`,
    `Recent candles (last 20): ${ctx.candles_summary}`,
  ].join("\n")
}