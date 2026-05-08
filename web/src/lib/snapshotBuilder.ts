// web/src/lib/snapshotBuilder.ts
// Builds context snapshots for the chatbot — simulator mode and lesson mode.
// The chatbot sees exactly what the user sees — no more, no less.
import type { Candle } from "./types"
import type { LessonObject } from "@/types/lesson"

// ── Simulator snapshot (unchanged from chartContext.ts) ────────────────────────

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

export function buildSimulatorSnapshot(symbol: string, candles: Candle[]): string {
  const ctx = buildChartContext(symbol, candles)
  if (!ctx) return "No chart data available yet."
  return [
    `Stock: ${ctx.symbol}`,
    `Current price: ₹${ctx.latest_close}`,
    `Session change: ${ctx.price_change_pct}%`,
    `Latest candle — Open: ₹${ctx.latest_open} High: ₹${ctx.latest_high} Low: ₹${ctx.latest_low} Close: ₹${ctx.latest_close} Volume: ${ctx.latest_volume}`,
    `Recent candles (last 20): ${ctx.candles_summary}`,
  ].join("\n")
}

// Keep the old name for backwards compatibility with ChatWidget
export function chartContextToPrompt(ctx: ChartContext): string {
  return buildSimulatorSnapshot(ctx.symbol, [])
    .replace("No chart data available yet.", "")
    || [
      `Stock: ${ctx.symbol}`,
      `Current price: ₹${ctx.latest_close}`,
      `Session change: ${ctx.price_change_pct}%`,
      `Latest candle — Open: ₹${ctx.latest_open} High: ₹${ctx.latest_high} Low: ₹${ctx.latest_low} Close: ₹${ctx.latest_close} Volume: ${ctx.latest_volume}`,
      `Recent candles (last 20): ${ctx.candles_summary}`,
    ].join("\n")
}

// ── Lesson snapshot ────────────────────────────────────────────────────────────

export interface LessonSnapshot {
  lessonId: string
  lessonTitle: string
  lessonLevel: number
  visibleSection: string
  keyTermsSummary: string
  factsSummary: string
  lastQuizScore?: number
}

export function buildLessonSnapshot(
  lesson: LessonObject,
  visibleSection: string,
  lastQuizScore?: number,
): LessonSnapshot {
  const keyTermsSummary = lesson.keyTerms
    .map(kt => `${kt.term}: ${kt.definition}`)
    .join("\n")

  // Include only the fact statements (no citations) for the prompt
  const factsSummary = lesson.facts
    .map(f => f.statement)
    .join("\n")

  return {
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    lessonLevel: lesson.level,
    visibleSection,
    keyTermsSummary,
    factsSummary,
    lastQuizScore,
  }
}

export function lessonSnapshotToPrompt(snap: LessonSnapshot): string {
  const lines = [
    `Lesson: "${snap.lessonTitle}" (Level ${snap.lessonLevel})`,
    `Section the user is reading: ${snap.visibleSection || "Introduction"}`,
    `\nKey terms defined in this lesson:\n${snap.keyTermsSummary}`,
    `\nVerified facts from this lesson:\n${snap.factsSummary}`,
  ]
  if (snap.lastQuizScore !== undefined) {
    lines.push(`\nUser's last quiz score on this lesson: ${snap.lastQuizScore}%`)
  }
  return lines.join("\n")
}
