import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l3-03-support-resistance",
  level: 3,
  order: 3,
  title: "Support & Resistance",
  subtitle: "Identifying price levels to set targets and manage trades",
  xpReward: 28,
  body: `## What are Support and Resistance?

Support and Resistance (S&R) are specific price points on a chart that attract maximum buying or selling activity. They are the cornerstone of setting trade targets.

- **Resistance**: A price level above the current market price where sellers are expected to be concentrated. When price rises to resistance, supply pressure tends to push it back down. Resistance acts as a trigger to sell.
- **Support**: A price level below the current market price where buyers are expected to be concentrated. When price falls to support, demand tends to bounce it higher. Support acts as a trigger to buy.

## How to Identify S&R

The identification process is the same for both. Look at a chart and identify price zones where the stock has repeatedly stalled, reversed, or consolidated. The more times a price level has been tested and held, the stronger that S&R level.

**Rule**: If the current market price is below the identified level, it is resistance. If current price is above the identified level, it is support.

## Practical Example — Ambuja Cements

Resistance at ₹215: The stock is currently trading at ₹206.75. A bullish Marubozu forms at ₹206 with a low of ₹202.

Complete trade setup:
- **Entry**: ₹206
- **Stoploss**: ₹202 (low of Marubozu)
- **Target**: ₹215 (resistance level)

Why 215 as target? Because:
1. Resistance at 215 implies excess supply
2. Excess supply creates selling pressure
3. Selling pressure tends to push price lower

## Practical Example — Cipla

Support at ₹435: The stock has bounced from this level multiple times. A trader in a short position would use ₹435 as a target to exit.

## S&R Role Reversal

A key concept: when a resistance level is broken convincingly, it often flips into support. Similarly, when support is broken, it often flips into resistance. This is called role reversal and helps identify new trade setups.

## Using S&R with Candlestick Patterns

S&R becomes most powerful when combined with candlestick patterns:
- A Bullish Engulfing forming exactly at a support level = double confirmation to buy
- An RSI reading of <30 at a support level = triple confirmation

The more confluence (multiple signals pointing the same way), the higher the probability of the trade working.

## Practical Tips

- Do not expect price to reverse exactly at the S&R level. Allow for a small margin (±0.5%).
- S&R levels are more reliable on higher timeframes (weekly/daily vs 5-minute).
- Volume should increase as price approaches S&R — confirms the level's significance.`,

  keyTerms: [
    {
      term: "Resistance",
      definition: "A price level above the current market price where sellers are concentrated. Price tends to stall or reverse at resistance.",
    },
    {
      term: "Support",
      definition: "A price level below the current market price where buyers are concentrated. Price tends to bounce from support.",
    },
    {
      term: "Role Reversal",
      definition: "When a broken resistance becomes new support, or a broken support becomes new resistance. Common and reliable signal for new trade entries.",
    },
    {
      term: "Confluence",
      definition: "Multiple independent signals (e.g., support level + bullish candlestick + low RSI) all pointing in the same direction, increasing the probability of a trade working.",
    },
  ],

  facts: [
    {
      statement: "Support is a price level where maximum buying is expected (below current price); resistance is a price level where maximum selling is expected (above current price).",
      citation: "Varsity Module 2, Ch. 11",
    },
    {
      statement: "Ambuja Cements example: resistance at ₹215, current price ₹206.75 — trade entry ₹206, stoploss ₹202, target ₹215.",
      citation: "Varsity Module 2, Ch. 11.1",
    },
    {
      statement: "Cipla support example: horizontal line coinciding at ₹435 — price has bounced from this level multiple times.",
      citation: "Varsity Module 2, Ch. 11.2",
    },
    {
      statement: "S&R identification rule: if current market price is below the identified level it is resistance; if price is above the identified level it is support.",
      citation: "Varsity Module 2, Ch. 11",
    },
  ],

  quizSeed: [
    {
      id: "l3-03-q1",
      question: "A resistance level is always:",
      options: [
        "Below the current market price",
        "Equal to the current market price",
        "Above the current market price",
        "The same as the 52-week high",
      ],
      correct: 2,
      explanation: "Resistance is always above the current market price — it is the level where sellers are concentrated and expected to push price back down.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 11.1",
    },
    {
      id: "l3-03-q2",
      question: "In the Ambuja Cements example, what is the target for the bullish Marubozu trade at ₹206?",
      options: ["₹202", "₹210", "₹215", "₹220"],
      correct: 2,
      explanation: "The resistance level at ₹215 is used as the target. Trade setup: Entry ₹206, Stoploss ₹202, Target ₹215.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 11.1",
    },
    {
      id: "l3-03-q3",
      question: "What is 'role reversal' in the context of S&R?",
      options: [
        "When a bullish trader switches to a bearish view",
        "When a broken resistance becomes new support (or vice versa)",
        "When the RSI crosses from overbought to oversold",
        "When a moving average crossover occurs",
      ],
      correct: 1,
      explanation: "Role reversal: once a resistance level is convincingly broken, it typically becomes a new support level, and vice versa.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 11",
    },
    {
      id: "l3-03-q4",
      question: "What does 'confluence' mean when applied to trading decisions?",
      options: [
        "Using only one indicator to confirm a trade",
        "Multiple independent signals all pointing in the same direction",
        "The convergence of two moving averages",
        "A pattern that appears at the close of the trading session",
      ],
      correct: 1,
      explanation: "Confluence means multiple signals — e.g., a support level + bullish candlestick + low RSI — all confirming the same trade direction, improving probability.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 14",
    },
    {
      id: "l3-03-q5",
      question: "S&R levels are generally more reliable on:",
      options: [
        "1-minute intraday charts",
        "5-minute charts",
        "Higher timeframes like daily or weekly charts",
        "All timeframes equally",
      ],
      correct: 2,
      explanation: "S&R levels identified on higher timeframes (daily, weekly) carry more significance because they reflect the activity of a larger number of participants over a longer period.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 11",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 2 — Technical Analysis (zerodha.com/varsity)",
}

export default lesson
