import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l3-05-rsi-and-macd",
  level: 3,
  order: 5,
  title: "RSI and MACD",
  subtitle: "Momentum indicators for timing entries and exits",
  xpReward: 30,
  body: `## Technical Indicators

Indicators are independent trading systems developed by successful traders and built on preset logic. They supplement chart analysis (candlesticks, volume, S&R) to arrive at trading decisions.

Indicators are **leading** (signal reversals in advance — prone to false signals) or **lagging** (confirm existing trends after the fact — more reliable but slower).

## Momentum

Momentum is the rate of price change. If a stock moves from ₹100 to ₹115 in 3 days, momentum is high. If the same 15% move takes 3 months, momentum is low. The faster the price moves, the higher the momentum.

---

## RSI — Relative Strength Index

Developed by J. Welles Wilder. RSI is a **leading momentum oscillator** that oscillates between 0 and 100. It measures internal strength — not a comparison between two securities.

**Calculation (14-period default)**:
- Count points gained and points lost over 14 days
- RS = Average Points Gained ÷ Average Points Lost
- RSI = 100 − [100 ÷ (1 + RS)]

**Example** (14 sessions, stock from ₹99):
- Total points gained = 29, total points lost = 10
- Average gained = 29/14 = 2.07; Average lost = 10/14 = 0.714
- RS = 2.07 / 0.714 = 2.8991
- RSI = 100 − [100 / (1 + 2.8991)] = **74.35**

### Interpretation
| RSI Range | Meaning | Action |
|---|---|---|
| 0–30 | Oversold | Look to buy |
| 30–70 | Neutral | Wait for confirmation |
| 70–100 | Overbought | Look to sell/short |

**Cipla example**: RSI at 26.8 (oversold) + Bullish Engulfing pattern = double confirmation to buy. RSI at 81 (overbought) + Bearish Engulfing = double confirmation to sell.

### Advanced RSI Interpretation
- RSI stuck in overbought region for prolonged period → excess positive momentum → look to **buy**, not short (e.g., Eicher Motors: ~100% annual return).
- RSI stuck in oversold region for prolonged period → excess negative momentum → look to **sell**, not buy (e.g., Suzlon Energy: −34% annual return).
- RSI moving above 30 after a long oversold period → possible bottom → go long.
- RSI moving below 70 after a long overbought period → possible top → consider short.

**Note**: RSI is rarely used standalone. Combine with candlestick patterns and S&R for best results.

---

## MACD — Moving Average Convergence and Divergence

Developed by Gerald Appel in the late 1970s. MACD measures convergence and divergence of two EMAs.

**Standard MACD**:
- MACD Line = 12-day EMA − 26-day EMA
- Signal Line = 9-day EMA of the MACD Line
- Histogram = MACD Line − Signal Line

**Example (Nifty data, Feb 2014)**:
On 6 Feb 2014: 12-day EMA = 6153, 26-day EMA = 6198 → MACD = −45
On 10 Feb 2014: MACD = −75 (divergence increasing — bearishness accelerating)

### Interpretation
- **MACD Line crosses above Signal Line** → Bullish crossover → Buy signal
- **MACD Line crosses below Signal Line** → Bearish crossover → Sell signal
- **Histogram above zero and expanding** → Bullish momentum increasing
- **Histogram below zero and expanding** → Bearish momentum increasing

MACD is a momentum-following indicator. It works best in trending markets and generates false signals in choppy/sideways conditions.

---

## Using RSI and MACD Together

Neither indicator is perfect alone. Best practice:
1. Identify trend direction using candlesticks / S&R
2. Use MACD to confirm momentum in that direction
3. Use RSI to confirm overbought/oversold timing
4. Take the trade only when all signals align`,

  keyTerms: [
    {
      term: "RSI (Relative Strength Index)",
      definition: "A leading momentum oscillator (0–100) developed by J. Welles Wilder. Below 30 = oversold (buy signal); above 70 = overbought (sell signal). Default look-back: 14 periods.",
    },
    {
      term: "MACD (Moving Average Convergence Divergence)",
      definition: "A momentum indicator by Gerald Appel. Calculated as 12-day EMA minus 26-day EMA. Bullish when MACD line crosses above its 9-day signal line.",
    },
    {
      term: "Overbought",
      definition: "A condition where RSI exceeds 70, indicating excess positive momentum that may not be sustainable — potential for a pullback.",
    },
    {
      term: "Oversold",
      definition: "A condition where RSI falls below 30, indicating excess negative momentum — potential for a recovery.",
    },
    {
      term: "MACD Histogram",
      definition: "The difference between the MACD line and its signal line. Expanding histogram = accelerating momentum in that direction.",
    },
  ],

  facts: [
    {
      statement: "RSI was developed by J. Welles Wilder using a default 14-period look-back; values 0–30 indicate oversold; 70–100 indicate overbought.",
      citation: "Varsity Module 2, Ch. 14.1",
    },
    {
      statement: "RSI calculation example: 14 sessions, total gains 29 pts, total losses 10 pts → RS = 2.8991 → RSI = 74.35.",
      citation: "Varsity Module 2, Ch. 14.1",
    },
    {
      statement: "Cipla example: RSI at 26.8 coinciding with a Bullish Engulfing pattern gives double confirmation to go long.",
      citation: "Varsity Module 2, Ch. 14.1",
    },
    {
      statement: "MACD was developed by Gerald Appel in the late 1970s; standard MACD = 12-day EMA minus 26-day EMA, with a 9-day signal line.",
      citation: "Varsity Module 2, Ch. 15.1",
    },
    {
      statement: "Nifty MACD example (6 Feb 2014): 12-day EMA = 6153, 26-day EMA = 6198, MACD = −45.",
      citation: "Varsity Module 2, Ch. 15.1",
    },
  ],

  quizSeed: [
    {
      id: "l3-05-q1",
      question: "In the RSI calculation example with 14 sessions (total gains 29, losses 10), what is the RSI value?",
      options: ["26.8", "55.0", "74.35", "81.0"],
      correct: 2,
      explanation: "RS = (29/14) / (10/14) = 2.8991. RSI = 100 − [100/(1+2.8991)] = 74.35.",
      difficulty: "hard",
      citation: "Varsity Module 2, Ch. 14.1",
    },
    {
      id: "l3-05-q2",
      question: "RSI is stuck at 85 for several weeks. What is the correct interpretation?",
      options: [
        "Immediately short the stock",
        "The stock is about to crash",
        "Excess positive momentum — consider buying rather than shorting",
        "RSI is broken and should be ignored",
      ],
      correct: 2,
      explanation: "When RSI is stuck in overbought for a prolonged period, it signals excess positive momentum. Look for buying opportunities in the direction of the trend, not against it.",
      difficulty: "hard",
      citation: "Varsity Module 2, Ch. 14.1",
    },
    {
      id: "l3-05-q3",
      question: "The standard MACD line is calculated as:",
      options: [
        "26-day EMA minus 12-day EMA",
        "12-day EMA minus 26-day EMA",
        "9-day EMA minus 26-day EMA",
        "50-day EMA minus 200-day EMA",
      ],
      correct: 1,
      explanation: "Standard MACD = 12-day EMA − 26-day EMA. A positive value means the shorter EMA is above the longer one, indicating bullish momentum.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 15.1",
    },
    {
      id: "l3-05-q4",
      question: "A MACD bullish crossover occurs when:",
      options: [
        "Price crosses above the 50-day EMA",
        "RSI moves above 70",
        "The MACD line crosses above the Signal line",
        "The histogram turns negative",
      ],
      correct: 2,
      explanation: "A bullish MACD crossover occurs when the MACD line (12-26 EMA) crosses above the 9-day signal line — signalling strengthening upward momentum.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 15.1",
    },
    {
      id: "l3-05-q5",
      question: "What is the key difference between RSI and MACD in terms of indicator type?",
      options: [
        "RSI is lagging; MACD is leading",
        "RSI is leading and oscillates 0–100; MACD is a lagging momentum indicator",
        "Both are leading indicators",
        "Both oscillate between 0 and 100",
      ],
      correct: 1,
      explanation: "RSI is a leading oscillator (0–100); MACD is a lagging momentum indicator based on moving averages. RSI signals reversals in advance; MACD confirms momentum.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 14",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 2 — Technical Analysis (zerodha.com/varsity)",
}

export default lesson
