import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l6-04-calendar-spreads",
  level: 6,
  order: 4,
  title: "Calendar Spreads",
  subtitle: "Low-risk intraday arbitrage between near-month and next-month futures",
  xpReward: 32,
  body: `## What is a Calendar Spread?

A calendar spread (also called a time spread) involves simultaneously buying and selling futures contracts of the **same underlying stock** but with **different expiry dates**.

**Classic Example:**
- Buy TCS Futures expiring 28 June 2018 @ ₹1,846
- Sell TCS Futures expiring 28 July 2018 @ ₹1,851
- Spread captured = ₹5

Because you are long and short on the **same underlying**, calendar spreads are genuinely market neutral (unlike pair trading). If TCS moves up or down, both legs move together — your P&L comes purely from the price differential between expiries.

---

## Why a Price Difference Exists Between Expiries

The near-month futures price is **always higher** than the current-month price under normal conditions. This is because of the **cost of carry** — the theoretical interest cost of holding the position until the next expiry.

All else equal:
- Near month futures > Current month futures (by cost of carry)
- The difference between them reflects the time value until expiry

When this difference deviates from its historical mean, a calendar spread opportunity arises.

---

## Statistical Calendar Spread: The SBIN Example

Instead of manually estimating fair value, the statistical approach uses historical data to identify when the spread is abnormally wide or narrow.

**Setup Steps:**

### Step 1: Download Data
Get 200 days of closing prices for both the near-month and current-month futures contracts of the same stock (e.g., SBIN).

### Step 2: Calculate the Daily Spread
**Spread = Near Month Price − Current Month Price**

(Always near month minus current month, because near month is typically higher due to cost of carry.)

### Step 3: Calculate Mean and Standard Deviation
For SBIN (200 trading days):
- **Mean = 1.227** (this is the typical daily spread)
- **Standard Deviation = 0.4935**

### Step 4: Define the Trading Range
- **Upper range** = 1.227 + 0.4935 = **1.7205**
- **Lower range** = 1.227 − 0.4935 = **0.7335**

When the spread is within this range, no opportunity. When it moves beyond, trade is triggered.

---

## Trade Rules

| Spread Condition | Action |
|---|---|
| Spread > 1.7205 (upper range) | **Sell spread** — sell near month, buy current month |
| Spread < 0.7335 (lower range) | **Buy spread** — buy near month, sell current month |
| Spread reverts to mean (1.227) | **Close the trade** |

**Memory tip**: Sell spread = sell near month. Buy spread = buy near month.

---

## SBIN Historical Results

Over 200 trading days, SBIN generated these sell-spread opportunities:

| Signal Date | Spread at Signal | Close Date | Spread at Close | P&L |
|---|---|---|---|---|
| 31 Aug 2017 | 2.45 | 1 Sep 2017 | 1.35 | +1.10 |
| 28 Sep 2017 | 2.60 | 29 Sep 2017 | 1.15 | +1.45 |
| 30 Nov 2017 | 2.35 | 1 Dec 2017 | 1.55 | +0.80 |

All three trades closed within **1 day** — calendar spreads are typically very short-duration trades.

---

## Risk Profile

- **Risk**: Very low — same underlying, same direction, just different expiries
- **Reward**: Small — typically ₹0.5 to ₹2 per unit
- **Leverage**: Suitable for higher leverage due to low directional risk
- **Duration**: Often intraday or 1-2 days

Calendar spreads are not get-rich-quick trades. They are consistent, low-risk strategies that work best for traders comfortable with small, frequent gains rather than large directional bets.

---

## Calendar Spread vs Pair Trading

| Feature | Calendar Spread | Pair Trading |
|---|---|---|
| Underlying | Same stock, different expiry | Two different correlated stocks |
| Market neutral? | Yes — truly market neutral | No — residual directional exposure |
| Risk | Very low | Low to medium |
| Return | Small | Moderate |
| Duration | Intraday to 1-2 days | Days to weeks |`,

  keyTerms: [
    {
      term: "Calendar Spread",
      definition: "Simultaneously buying and selling futures of the same underlying stock but with different expiry dates. Truly market neutral because both legs move with the same underlying.",
    },
    {
      term: "Cost of Carry",
      definition: "The theoretical interest cost of holding a futures position until a later expiry. Explains why near-month futures prices are always slightly higher than current-month prices under normal conditions.",
    },
    {
      term: "Spread (Calendar Spread)",
      definition: "Near month futures price minus current month futures price. For SBIN example: historical mean = 1.227, SD = 0.4935, upper range = 1.7205, lower range = 0.7335.",
    },
    {
      term: "Sell Spread",
      definition: "When the spread rises above the upper range — sell the near-month contract and buy the current-month contract. Profit when spread reverts to mean.",
    },
    {
      term: "Buy Spread",
      definition: "When the spread falls below the lower range — buy the near-month contract and sell the current-month contract. Profit when spread reverts to mean.",
    },
  ],

  facts: [
    {
      statement: "Calendar spread: Buy TCS June Futures @ ₹1,846 + Sell TCS July Futures @ ₹1,851. Market neutral because both legs are the same underlying — unlike pair trading which uses two different stocks.",
      citation: "Varsity Module 10, Ch. 15.1",
    },
    {
      statement: "SBIN calendar spread (200 trading days): Mean spread = 1.227, SD = 0.4935. Upper range = 1.7205 (sell signal), Lower range = 0.7335 (buy signal).",
      citation: "Varsity Module 10, Ch. 15.3",
    },
    {
      statement: "SBIN historical sell spread trades: 31 Aug 2017 (spread 2.45 → 1.35, P&L +1.10), 28 Sep 2017 (spread 2.60 → 1.15, P&L +1.45), 30 Nov 2017 (spread 2.35 → 1.55, P&L +0.80). All closed within 1 day.",
      citation: "Varsity Module 10, Ch. 15.4",
    },
    {
      statement: "Calendar spreads are low-risk and low-reward. Because directional risk is near zero, higher leverage is appropriate. Most trades close intraday or within 1–2 days.",
      citation: "Varsity Module 10, Ch. 15.2",
    },
  ],

  quizSeed: [
    {
      id: "l6-04-q1",
      question: "A calendar spread is market neutral because:",
      options: [
        "Both legs involve different underlying stocks that are highly correlated",
        "Both legs are the same underlying asset but with different expiry dates",
        "The trade uses delta-hedged options",
        "The buy and sell quantities are adjusted by regression beta",
      ],
      correct: 1,
      explanation: "Calendar spreads buy and sell the same underlying (e.g., SBIN Futures) but with different expiries. Any price move in the underlying affects both legs equally, making it truly market neutral.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 15.1",
    },
    {
      id: "l6-04-q2",
      question: "SBIN calendar spread has mean = 1.227 and SD = 0.4935. The current spread is 2.45. What should you do?",
      options: [
        "Buy the spread — spread is below lower range",
        "No trade — spread is within normal range",
        "Sell the spread — spread is above upper range (1.7205)",
        "Close existing position — spread has reverted to mean",
      ],
      correct: 2,
      explanation: "Upper range = 1.227 + 0.4935 = 1.7205. Current spread 2.45 > 1.7205 → sell spread signal. Sell the near-month contract and buy the current-month contract, expecting reversion to 1.227.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 15.4",
    },
    {
      id: "l6-04-q3",
      question: "Why is the near-month futures price typically higher than the current-month price?",
      options: [
        "Near-month contracts have higher liquidity",
        "Cost of carry — the interest cost of holding the position to a further expiry",
        "Near-month contracts are more risky",
        "The exchange adds a premium for longer settlement",
      ],
      correct: 1,
      explanation: "Cost of carry is the theoretical interest cost embedded in futures pricing. All else equal, a contract expiring later carries more time value → near-month futures > current-month futures.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 15.1",
    },
    {
      id: "l6-04-q4",
      question: "When do you close a calendar spread position?",
      options: [
        "At the end of every month regardless of spread",
        "When the spread widens beyond 2 standard deviations",
        "When the spread reverts to its historical mean",
        "When one contract expires",
      ],
      correct: 2,
      explanation: "A calendar spread trade is closed when the spread reverts to its historical mean. The entry was at an extreme (beyond ±1 SD), and profit is captured as the spread normalises.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 15.2",
    },
    {
      id: "l6-04-q5",
      question: "How does a calendar spread differ from pair trading?",
      options: [
        "Calendar spreads use options, pair trading uses equities",
        "Calendar spreads trade the same underlying at different expiries; pair trading trades two different correlated stocks",
        "Calendar spreads are long-only; pair trading is long-short",
        "There is no difference — both are statistical arbitrage",
      ],
      correct: 1,
      explanation: "Calendar spreads: same underlying, different expiry → truly market neutral. Pair trading: two different (but correlated) stocks → residual directional exposure remains. Calendar spreads have lower risk but smaller returns.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 15.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 10 — Trading Systems (zerodha.com/varsity)",
}

export default lesson
