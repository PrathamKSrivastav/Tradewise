import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l3-07-volume-trade-setup",
  level: 3,
  order: 7,
  title: "Volume Analysis & Building a Trade Setup",
  subtitle: "Using volume to confirm signals and assembling the complete TA checklist",
  xpReward: 30,
  body: `## Why Volume Matters

Volume represents the total number of shares bought and sold in a given period. It tells you how many market participants are behind a price move. **Volume confirms price — without it, price signals are incomplete.**

Key point: Volume counts each matched transaction once. 100 shares bought and 100 shares sold = **100 shares of volume** (not 200).

## Measuring Volume

Compare today's volume against the **10-day average volume**:
- **High volume**: Today > 10-day average → significant institutional activity
- **Low volume**: Today < 10-day average → subdued participation
- **Average volume**: Today ≈ 10-day average

A moving average line on the volume bars instantly shows the 10-day average.

## Volume-Price Table

| Price | Volume | Expectation |
|---|---|---|
| Increases | Increases | **Bullish** — institutional buying, strong uptrend |
| Increases | Decreases | Caution — weak hands buying, trend may be exhausting |
| Decreases | Increases | **Bearish** — institutional selling, strong downtrend |
| Decreases | Decreases | Caution — weak hands selling, trend may be exhausting |

### Why Institutional Volume Matters

Institutions like LIC or mutual funds cannot quietly buy 500,000 shares — their activity shows up in volume. When price rises on high volume, it means large players are behind the move — bullish. When price rises on low volume, only retail (weak hands) are buying — likely not sustainable.

## Cummins India Volume Example

At 2:55 PM on 5 Aug 2014: Cummins India volume = 12,72,737 shares.
At 3:30 PM (market close): volume = 13,49,736 shares.
Volume figures shown during the day are **cumulative** — the total traded from 9:15 AM to that moment.

---

## The Complete TA Checklist

Before placing any trade, verify all four points:

### 1. Recognizable Candlestick Pattern
A single or multi-candle pattern must be present — Marubozu, Hammer, Engulfing, Morning Star, etc.

### 2. S&R Confirmation
- For a **long trade**: the pattern's stoploss (candle low) should be near a support level
- For a **short trade**: the pattern's entry should be near a resistance level

### 3. Volume Confirmation
- Both the signal candle and the entry candle should show above-average volume
- Low volume = hesitate; high volume = confidence

### 4. Indicator Confirmation (Optional but Additive)
- RSI oversold + bullish candle at support = high-confidence long
- MACD crossover in the right direction = additional confidence
- If indicators confirm → **increase position size**
- If indicators don't confirm → trade with smaller size, don't skip

### Example: Karnataka Bank
1. ✓ Bullish Hammer pattern
2. ✓ Hammer's low coincides with support
3. ✓ Above-average volume on the hammer day
4. ✓ MACD crossover (signal line > MACD line)
→ All four points confirmed → trade with full position size.

---

## Trade Design Summary

Every TA-based trade must have three elements defined **before** entry:

| Element | Source |
|---|---|
| **Entry** | Closing price of the signal candle (or next day open for risk-averse) |
| **Stoploss** | Low of candle for long; high for short |
| **Target** | Nearest S&R level in the direction of the trade |

A trade without all three elements pre-defined is speculation, not analysis.`,

  keyTerms: [
    {
      term: "Volume",
      definition: "The total number of shares traded in a period. Each matched transaction is counted once. Volume confirms whether a price move has institutional backing.",
    },
    {
      term: "High Volume",
      definition: "Today's volume exceeds the 10-day average — signals institutional (large-player) activity, lending credibility to the price move.",
    },
    {
      term: "Weak Hands",
      definition: "Retail participants who buy into a trend late without institutional support. Price rising on low volume = weak hands buying — a cautionary sign.",
    },
    {
      term: "TA Checklist",
      definition: "A four-point verification before any trade: (1) candlestick pattern, (2) S&R confirmation, (3) volume confirmation, (4) indicator confirmation.",
    },
  ],

  facts: [
    {
      statement: "Volume = number of shares exchanged (not buy + sell). 100 bought and 100 sold = 100 volume.",
      citation: "Varsity Module 2, Ch. 12",
    },
    {
      statement: "High volume rule: today's volume > 10-day average. Low volume: today < 10-day average. Use a 10-day moving average on volume bars.",
      citation: "Varsity Module 2, Ch. 12.1",
    },
    {
      statement: "Volume-price table: price up + volume up = bullish; price up + volume down = caution; price down + volume up = bearish; price down + volume down = caution.",
      citation: "Varsity Module 2, Ch. 12.1",
    },
    {
      statement: "Cummins India volume example (5 Aug 2014): 12,72,737 shares at 2:55 PM; 13,49,736 shares at market close (3:30 PM) — volume figures are cumulative.",
      citation: "Varsity Module 2, Ch. 12",
    },
    {
      statement: "Complete TA checklist: (1) candlestick pattern, (2) S&R match with stoploss, (3) above-average volume, (4) indicator confirmation — if indicator absent, reduce size but still trade.",
      citation: "Varsity Module 2, Ch. 15.4",
    },
  ],

  quizSeed: [
    {
      id: "l3-07-q1",
      question: "100 shares are bought and 100 shares are sold at the same price. What is the volume recorded?",
      options: ["50 shares", "100 shares", "200 shares", "Zero"],
      correct: 1,
      explanation: "Volume counts matched transactions once. 100 bought + 100 sold = 100 shares of volume (not 200).",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 12",
    },
    {
      id: "l3-07-q2",
      question: "Price is increasing with decreasing volume. What does the volume-price table tell us?",
      options: [
        "Strongly bullish — increase position",
        "Caution — weak hands buying; trend may be exhausting",
        "Strongly bearish — consider shorting",
        "No significance — ignore volume",
      ],
      correct: 1,
      explanation: "Price up + volume down means only weak (retail) hands are buying without institutional support. The trend may not sustain — exercise caution.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 12.1",
    },
    {
      id: "l3-07-q3",
      question: "The reference for comparing 'high' vs 'low' volume in TA is:",
      options: [
        "Yesterday's volume",
        "Last week's total volume",
        "The 10-day average volume",
        "The 52-week average volume",
      ],
      correct: 2,
      explanation: "Traders compare today's volume against the 10-day average. High volume = today > 10-day average; low volume = today < 10-day average.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 12.1",
    },
    {
      id: "l3-07-q4",
      question: "In the TA checklist, if the first three conditions are met but the indicator does NOT confirm, you should:",
      options: [
        "Cancel the trade",
        "Take the trade at full position size",
        "Take the trade at a reduced position size",
        "Wait one more day for confirmation",
      ],
      correct: 2,
      explanation: "Indicators are supplementary. If they don't confirm but the first three points (candlestick, S&R, volume) are met, trade with a smaller size.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 15.4",
    },
    {
      id: "l3-07-q5",
      question: "Which three elements must be defined BEFORE entering a TA-based trade?",
      options: [
        "Entry, target, and holding period",
        "Entry, stoploss, and target",
        "Entry, volume, and RSI reading",
        "Stoploss, trailing stop, and target",
      ],
      correct: 1,
      explanation: "Every trade must have entry (signal candle close), stoploss (candle low/high), and target (nearest S&R level) defined before execution.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 15.4",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 2 — Technical Analysis (zerodha.com/varsity)",
}

export default lesson
