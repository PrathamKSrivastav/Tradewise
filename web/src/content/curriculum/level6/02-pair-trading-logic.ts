import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l6-02-pair-trading",
  level: 6,
  order: 2,
  title: "Pair Trading Logic",
  subtitle: "Relative value trading using correlated stock pairs",
  xpReward: 32,
  body: `## The Highway Analogy

Imagine a highway and a parallel service road running alongside it for miles. When the highway rises, so does the service road. When it dips, so does the service road. They behave identically for the entire length — except at one spot where a tree forced the service road to briefly deviate before rejoining.

This is the essence of pair trading:
1. **Entities** — two roads (or two stocks)
2. **Relationship** — they move in parallel
3. **Anomaly** — a local event briefly breaks the parallel
4. **Expectation** — the anomaly is short-lived and the relationship reverts

---

## The HDFC Bank & ICICI Bank Example

HDFC Bank and ICICI Bank are nearly identical in business:
- Both are private sector banks
- Both have similar banking products and client base
- Both are regulated by RBI under the same rules
- Both are affected by RBI interest rate changes identically

Because their businesses are so alike, **their stock price movements should be similar**. If HDFC moves up X%, ICICI is expected to move up proportionally.

When this doesn't happen — when one moves but the other doesn't — it creates a **price anomaly and a trading opportunity**.

---

## What Causes Anomalies?

A price anomaly is triggered by a **local event** — one that affects only one of the two stocks:
- One bank announces quarterly results (impacts it more than the other)
- A top executive resigns at one bank
- Excessive speculation in one stock
- A news event specific to one company

The other stock continues trading normally. The relationship between prices temporarily deviates.

---

## How to Trade the Anomaly

The pair trading rule:
- **Buy the undervalued stock** (the one that didn't move or moved less)
- **Sell the overvalued stock** (the one that moved more than expected)

The expectation is that the relationship will **revert to its historical norm** — the undervalued stock will catch up and/or the overvalued stock will correct. When reversion happens, you close both legs and capture the profit.

This is called **Relative Value Trading** — profiting from the differential between two related assets, not from the direction of either asset alone.

---

## Key Terms

| Term | Meaning |
|---|---|
| **Spread** | Closing price of Stock 1 − Closing price of Stock 2 |
| **Pair** | Two stocks with a quantifiable, stable price relationship |
| **Anomaly** | When the spread deviates beyond its historical range |
| **Reversion** | The spread returning to its historical mean |

---

## History of Pair Trading

The first pair trade was executed at **Morgan Stanley in the early 1980s** by a trader named **Gerry Bamberger**. He kept the technique proprietary for years. Another Morgan Stanley trader, **Nunzio Tartaglia**, later popularised it on Wall Street. The hedge fund **DE Shaw** adopted pair trading as a core strategy in its early days.

---

## Is Pair Trading Market Neutral?

A common misconception: pair trading is NOT fully market neutral. Market neutral requires being **long and short on the same underlying simultaneously** (like a calendar spread). In pair trading, you are long and short on **two different stocks**.

If the broader market crashes, both stocks might fall — your long position loses even if your short makes money. The net exposure to market direction is reduced but not eliminated.

For this reason, pair trading is more precisely called **Statistical Arbitrage**.

---

## The Two Methods

There are two ways to quantify the relationship:
1. **Correlation-based method** — uses price spreads and ratios; simpler entry point
2. **Linear Regression method** — uses statistical regression; more robust for determining the true relationship

Both involve:
1. Identifying which two stocks are related
2. Quantifying the relationship statistically
3. Tracking the relationship daily
4. Identifying when it deviates beyond acceptable limits`,

  keyTerms: [
    {
      term: "Pair Trading",
      definition: "A trading strategy that buys the undervalued stock and sells the overvalued stock from a correlated pair, profiting when the price relationship reverts to its historical norm.",
    },
    {
      term: "Spread (Pair Trading)",
      definition: "The difference between the closing prices of two correlated stocks (Stock 1 − Stock 2). A trading signal triggers when the spread moves beyond its historical range.",
    },
    {
      term: "Relative Value Trading",
      definition: "Trading the price differential between two related assets rather than betting on direction. Also called Statistical Arbitrage.",
    },
    {
      term: "Price Anomaly",
      definition: "A temporary deviation in the price relationship between two correlated stocks, caused by a local event affecting only one stock.",
    },
    {
      term: "Reversion to Mean",
      definition: "The expectation that when a price anomaly occurs between two correlated stocks, the spread will return to its historical average — allowing the pair trade to profit.",
    },
  ],

  facts: [
    {
      statement: "Pair trading was first developed at Morgan Stanley in the early 1980s by Gerry Bamberger and later popularised by Nunzio Tartaglia. DE Shaw adopted it as a core strategy.",
      citation: "Varsity Module 10, Ch. 2.1",
    },
    {
      statement: "Pair trading is NOT market neutral — it is long and short on two different stocks, not the same underlying. True market neutrality requires long and short on the same underlying simultaneously.",
      citation: "Varsity Module 10, Ch. 2.2",
    },
    {
      statement: "In pair trading, you buy the undervalued security and sell the overvalued one, profiting when the relationship reverts to its mean. This is called Relative Value or Statistical Arbitrage.",
      citation: "Varsity Module 10, Ch. 2.2",
    },
    {
      statement: "A price anomaly in pair trading is a local event — one that affects only 1 of the 2 stocks. Examples: one company announcing results, a resignation, or stock-specific speculation.",
      citation: "Varsity Module 10, Ch. 2.1",
    },
  ],

  quizSeed: [
    {
      id: "l6-02-q1",
      question: "In pair trading, when a price anomaly occurs, what is the correct action?",
      options: [
        "Buy both stocks and wait for the market to recover",
        "Sell both stocks to lock in gains",
        "Buy the undervalued stock and sell the overvalued stock",
        "Wait for the anomaly to resolve before entering",
      ],
      correct: 2,
      explanation: "Pair trading exploits anomalies by buying the undervalued stock (the one that underperformed) and selling the overvalued stock (the one that overperformed). Profit comes when the relationship reverts to the mean.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 2.1",
    },
    {
      id: "l6-02-q2",
      question: "Why is pair trading called 'Relative Value Trading' rather than directional trading?",
      options: [
        "Because you only trade stocks with high relative volume",
        "Because profit comes from the price differential between two related stocks, not their direction",
        "Because you only take trades relative to index performance",
        "Because you measure value using P/E ratios",
      ],
      correct: 1,
      explanation: "Profit in pair trading comes from the relationship between two stocks converging back to its mean — not from the direction either stock moves. You can profit even if both stocks fall, if the spread reverts.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 2.2",
    },
    {
      id: "l6-02-q3",
      question: "Is pair trading truly market neutral?",
      options: [
        "Yes — being long one stock and short another completely cancels market risk",
        "No — you are long and short on two different stocks, so residual market exposure remains",
        "Yes — because both stocks are from the same sector",
        "No — pair trading requires delta hedging to become market neutral",
      ],
      correct: 1,
      explanation: "True market neutrality requires being long and short the same underlying simultaneously. In pair trading, the two legs are different stocks — a broad market crash can affect both. Pair trading reduces but does not eliminate directional risk.",
      difficulty: "hard",
      citation: "Varsity Module 10, Ch. 2.2",
    },
    {
      id: "l6-02-q4",
      question: "HDFC Bank and ICICI Bank are considered a valid pair because:",
      options: [
        "Both are government-owned banks",
        "Both are in the Nifty 50 index",
        "Both have highly similar business models, client base, regulatory constraints, and revenue drivers",
        "Both have identical stock prices",
      ],
      correct: 2,
      explanation: "A valid pair needs a fundamental business reason for the relationship. HDFC and ICICI are both private sector banks with similar products, clients, regulatory constraints, and macro drivers — making their price movements structurally linked.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 2.1",
    },
    {
      id: "l6-02-q5",
      question: "Who first developed pair trading as a systematic strategy?",
      options: [
        "Warren Buffett at Berkshire Hathaway in the 1970s",
        "Gerry Bamberger at Morgan Stanley in the early 1980s",
        "George Soros at Quantum Fund in the 1990s",
        "John Kelly at AT&T Bell Labs in the 1950s",
      ],
      correct: 1,
      explanation: "Gerry Bamberger at Morgan Stanley developed pair trading in the early 1980s. Nunzio Tartaglia later popularised it, and DE Shaw adopted it as a core hedge fund strategy.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 2.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 10 — Trading Systems (zerodha.com/varsity)",
}

export default lesson
