import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l3-06-bollinger-fibonacci",
  level: 3,
  order: 6,
  title: "Bollinger Bands & Fibonacci Retracements",
  subtitle: "Volatility-based and mathematical tools for price targets",
  xpReward: 28,
  body: `## Bollinger Bands (BB)

Introduced by John Bollinger in the 1980s, Bollinger Bands are a volatility indicator with three components:

1. **Middle band** — 20-day Simple Moving Average (SMA) of closing prices
2. **Upper band** — Middle band + 2 standard deviations (+2 SD)
3. **Lower band** — Middle band − 2 standard deviations (−2 SD)

### What is Standard Deviation?

Standard deviation (SD) measures how much a variable varies from its average. In finance, it represents **volatility**. A stock with 12% SD is said to have 12% volatility.

### Example

- 20-day SMA = 7800; SD = 75 (0.96%)
- Upper band = 7800 + (75 × 2) = **7950**
- Lower band = 7800 − (75 × 2) = **7650**

### How to Trade with BB

- **Price at upper band (7950)** → expensive vs. average → **Short** with target of middle band (7800)
- **Price at lower band (7650)** → cheap vs. average → **Buy** with target of middle band (7800)

### Envelope Expansion — When BB Fails

When price sticks to the upper band and keeps rising, the bands expand (upper band moves higher). This is **envelope expansion** — a sign of strong momentum. BB fails in trending markets. **BB works best in sideways markets, fails in trending markets** — the opposite of moving averages.

### The TA Checklist

Use indicators to *confirm* decisions, not make them:
1. Recognizable candlestick pattern ✓
2. S&R confirms (stoploss around S&R) ✓
3. Volumes above average ✓
4. Indicator confirms → **increase position size**; doesn't confirm → proceed with smaller size

Example: Karnataka Bank shows a Bullish Hammer + support level + above-average volume + MACD crossover → all four checklist points met → confident trade setup.

---

## Fibonacci Retracements

The Fibonacci series originates in ancient Indian mathematics. The sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...

Each number is the sum of the two before it. The key mathematical properties:
- Any number ÷ next number ≈ **0.618** (the Golden Ratio)
- Any number ÷ number two places ahead ≈ **0.382**
- Any number ÷ number three places ahead ≈ **0.236**

### Fibonacci Retracement Levels

When a stock moves from point A (low) to point B (high) and then starts to retrace, Fibonacci levels predict where the retracement is likely to pause and reverse:

| Level | Description |
|---|---|
| **23.6%** | Shallow retracement — strong trend |
| **38.2%** | Moderate retracement |
| **50.0%** | Midpoint (not a Fibonacci number but widely watched) |
| **61.8%** | Deep retracement — most significant level (Golden Ratio) |

### How to Apply

1. Identify a clear up-move (swing low A to swing high B) or down-move
2. Apply the Fibonacci retracement tool from A to B
3. The levels 23.6%, 38.2%, 50%, 61.8% are drawn automatically
4. Enter a buy order near a Fibonacci level when a bullish candlestick forms at that level

The 61.8% retracement (the Golden Ratio) is the strongest level. A bounce from 61.8% after a strong rally is a high-probability long setup — especially if it coincides with a support level.`,

  keyTerms: [
    {
      term: "Bollinger Bands",
      definition: "A volatility indicator with three lines: 20-day SMA (middle), +2 SD (upper), −2 SD (lower). Price at upper band = overbought; at lower band = oversold. Works best in sideways markets.",
    },
    {
      term: "Standard Deviation (SD)",
      definition: "A statistical measure of how much a variable varies from its average. In markets, it represents volatility. Higher SD = wider Bollinger Bands = more volatile stock.",
    },
    {
      term: "Envelope Expansion",
      definition: "When Bollinger Bands widen because price trends strongly — the upper band keeps rising. BB signals fail during envelope expansion.",
    },
    {
      term: "Fibonacci Retracement",
      definition: "A tool that identifies potential support/resistance levels based on Fibonacci ratios (23.6%, 38.2%, 50%, 61.8%) within a prior price swing.",
    },
    {
      term: "Golden Ratio (61.8%)",
      definition: "The most significant Fibonacci level, derived from any Fibonacci number divided by the next. A retracement that holds at 61.8% is a strong bullish signal.",
    },
  ],

  facts: [
    {
      statement: "Bollinger Bands: 20-day SMA as middle band; upper = +2 SD; lower = −2 SD. Example: SMA=7800, SD=75 → upper=7950, lower=7650.",
      citation: "Varsity Module 2, Ch. 15.2",
    },
    {
      statement: "Bollinger Bands work best in sideways markets and fail in trending markets (envelope expansion) — the opposite of moving averages.",
      citation: "Varsity Module 2, Ch. 15.2",
    },
    {
      statement: "Fibonacci series property: any number divided by the next number ≈ 0.618 (Golden Ratio); divided by two places ahead ≈ 0.382; three places ahead ≈ 0.236.",
      citation: "Varsity Module 2, Ch. 16",
    },
    {
      statement: "Fibonacci retracement levels for trading: 23.6%, 38.2%, 50%, 61.8% — with 61.8% being the strongest support/resistance level.",
      citation: "Varsity Module 2, Ch. 16",
    },
    {
      statement: "TA checklist: (1) candlestick pattern, (2) S&R confirmation, (3) above-average volume, (4) indicator confirmation. If indicator doesn't confirm, reduce position size but still trade.",
      citation: "Varsity Module 2, Ch. 15.4",
    },
  ],

  quizSeed: [
    {
      id: "l3-06-q1",
      question: "Using Bollinger Bands with 20-day SMA = 7800 and SD = 75, what is the upper band?",
      options: ["7875", "7950", "7725", "8000"],
      correct: 1,
      explanation: "Upper band = SMA + (2 × SD) = 7800 + (2 × 75) = 7800 + 150 = 7950.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 15.2",
    },
    {
      id: "l3-06-q2",
      question: "Bollinger Bands work best in which type of market?",
      options: [
        "Strongly trending upmarket",
        "Strongly trending downmarket",
        "Sideways (range-bound) market",
        "High-volatility volatile market",
      ],
      correct: 2,
      explanation: "BB works best in sideways markets where price oscillates between upper and lower bands. In trending markets, envelope expansion causes BB signals to fail.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 15.2",
    },
    {
      id: "l3-06-q3",
      question: "What is 'envelope expansion' in the context of Bollinger Bands?",
      options: [
        "When the bands narrow due to low volatility",
        "When price touches both upper and lower bands in one session",
        "When price trends strongly and bands widen, causing BB signals to fail",
        "When the middle band crosses the upper band",
      ],
      correct: 2,
      explanation: "Envelope expansion occurs when price trends strongly — the bands widen and price sticks to the upper or lower band. BB signals fail during expansion.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 15.2",
    },
    {
      id: "l3-06-q4",
      question: "In Fibonacci retracements, which level is considered the strongest support/resistance?",
      options: ["23.6%", "38.2%", "50.0%", "61.8%"],
      correct: 3,
      explanation: "The 61.8% Fibonacci level (the Golden Ratio) is the most significant. It is derived from dividing any Fibonacci number by the next in the sequence.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 16",
    },
    {
      id: "l3-06-q5",
      question: "Per the TA checklist, if the first three conditions (candlestick, S&R, volume) are met but indicators don't confirm, you should:",
      options: [
        "Skip the trade entirely",
        "Double the position size to average in",
        "Take the trade but with a smaller position size",
        "Wait for the indicator to confirm before trading",
      ],
      correct: 2,
      explanation: "If the first three checklist items confirm but indicators don't, proceed with a smaller position size. Indicators are confirmatory — not mandatory — in the TA checklist.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 15.4",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 2 — Technical Analysis (zerodha.com/varsity)",
}

export default lesson
