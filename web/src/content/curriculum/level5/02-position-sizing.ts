import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l5-02-position-sizing",
  level: 5,
  order: 2,
  title: "Position Sizing",
  subtitle: "How much to risk per trade — the 1–3% rule and equity models",
  xpReward: 30,
  body: `## What is Position Sizing?

Position sizing answers the question: **"How much of my capital should I expose to this trade?"**

The classic rule most traders follow is the **5% rule** — never risk more than 5% of total capital on a single trade. Professional traders typically risk only **1–3% per trade**.

Position sizing made popular by trading educator Van K. Tharp through his books.

---

## Why Position Sizing Matters: The Poker Story

Imagine playing poker with ₹1,000. In the first round, you bet ₹200 and lose. Second round: ₹200 gone. Third round: frustrated, you raise to ₹600 — gone. ₹1,000 lost in 10 minutes.

**What went wrong?**
1. Not assessing the odds before betting
2. No position sizing discipline — bets were irrational and random

When you apply a systematic position sizing strategy (assess odds, bet proportionally), you last longer, win more hands, and compound profits.

**Trading parallel**: blowing a trading account is the equivalent of losing all chips. Position sizing is the difference between surviving long enough to catch the big winning trade vs blowing up on the way there.

---

## Estimating Equity Capital

Before position sizing, you need to know your equity capital. Van Tharp outlines three models:

### 1. Core Equity Model

Deduct capital allocated to each new trade from available equity.

**Example** (₹50,000 capital, 10% rule):
- Trade 1: Expose 10% of ₹50,000 = ₹5,000. Remaining = ₹45,000
- Trade 2: 10% of ₹45,000 = ₹4,500. Remaining = ₹40,500
- Trade 3: 10% of ₹40,500 = ₹4,050. Remaining = ₹36,450

Advantage: simple and conservative. Disadvantage: later trades get smaller allocation even if they are better setups.

### 2. Total Equity Model

Aggregate all cash + margins blocked + P&L across all open positions.

**Example**:
Free cash = ₹50,000 + Trade 1 margin ₹75,000 + P&L +₹2,000 + Trade 2 ₹1,15,000 + P&L +₹7,000 + Trade 3 ₹55,000 + P&L −₹4,000 = **Total Equity = ₹3,00,000**

New position exposure = 10% × ₹3,00,000 = ₹30,000.

Risk: counts unrealised profits, like counting chickens before they hatch.

### 3. Reduced Total Equity Model (Recommended)

Combines core equity (deducts capital in trades) + adds only **locked-in profits** (via trailing stop loss).

**Example** (₹5,00,000 capital, 20% max per trade):
- Buy ACC Futures at ₹1,800, margin = ₹90,000
- Available for next trade: 20% × (5,00,000 − 90,000) = ₹82,000
- ACC rises to ₹1,850 (+50 pts). Lock in 25 pts profit via trailing stop at ₹1,825 = ₹10,000 locked
- New total equity: ₹4,10,000 + ₹10,000 = ₹4,20,000
- New position size: 20% × ₹4,20,000 = ₹84,000

Benefit: forces you to use trailing stop losses and builds capital allocation on confirmed profits only.

---

## Percentage Risk Method

The most practical day-to-day position sizing technique:

**Formula**: Number of lots = Max Risk (₹) ÷ Loss per lot

**Example** — Tata Motors Futures (14 Sep 2017):
- Capital = ₹5,00,000; Max risk = 1.5% = ₹7,500
- Entry = ₹393.65; Stop loss = ₹390; Risk per share = ₹3.65
- Lot size = 1,500; Loss per lot = 3.65 × 1,500 = ₹5,475
- Lots to buy = ₹7,500 ÷ ₹5,475 = 1.36 → **1 lot**
- Target = ₹400; Reward = ₹6.35; Reward:Risk = 6.35/3.65 = **1.74x** (excellent for intraday)

Without position sizing, buying 6 lots would risk ₹32,850 = **6.57% of capital** on one trade. The percentage risk method caps it at 1.5%.

---

## Key Rules

1. **Never risk more than 1–3% of capital on a single trade**
2. Define your stop loss BEFORE entering the trade
3. Let stop loss determine position size — not the other way around
4. Reward:Risk should be at least 1.5:1 before taking a trade`,

  keyTerms: [
    {
      term: "Position Sizing",
      definition: "Determining how much capital to expose to a single trade. Professional traders limit exposure to 1–3% of total capital per trade.",
    },
    {
      term: "Core Equity Model",
      definition: "Deduct capital allocated to each open trade from total equity before calculating the next trade size. Conservative but simple.",
    },
    {
      term: "Reduced Total Equity Model",
      definition: "Deduct open trade capital and add only locked-in profits (trailing stop) to calculate available equity. Recommended approach — forces stop loss discipline.",
    },
    {
      term: "Percentage Risk Method",
      definition: "Position size = Max Risk (in ₹) ÷ Loss per unit (risk per share × lot size). Caps total loss at a defined percentage of capital per trade.",
    },
    {
      term: "Reward:Risk Ratio",
      definition: "Target profit divided by maximum loss. Minimum acceptable: 1.5:1. Tata Motors example: (400−393.65)/(393.65−390) = 6.35/3.65 = 1.74:1.",
    },
  ],

  facts: [
    {
      statement: "Professional traders do not risk more than 1–3% of their capital on any single trade. This forms the core of the percentage risk position sizing technique.",
      citation: "Varsity Module 9, Ch. 14.1",
    },
    {
      statement: "Tata Motors example (14 Sep 2017): Capital ₹5,00,000 at 1.5% risk = ₹7,500 max loss. Entry ₹393.65, SL ₹390, Target ₹400. Reward:Risk = 1.74:1. Buy only 1 lot.",
      citation: "Varsity Module 9, Ch. 14.1",
    },
    {
      statement: "Van Tharp's three equity estimation models: Core Equity (deduct allocated capital), Total Equity (all positions + P&L), Reduced Total Equity (deduct open positions + add locked-in profits only).",
      citation: "Varsity Module 9, Ch. 12.2",
    },
    {
      statement: "Without position sizing, buying 6 lots of Tata Motors Futures would risk ₹32,850 = 6.57% of capital on a single trade — far exceeding the 1–3% professional limit.",
      citation: "Varsity Module 9, Ch. 14.1",
    },
  ],

  quizSeed: [
    {
      id: "l5-02-q1",
      question: "A trader has ₹5,00,000 capital and uses a 1.5% risk rule. What is the maximum loss allowed per trade?",
      options: ["₹5,000", "₹7,500", "₹10,000", "₹25,000"],
      correct: 1,
      explanation: "Max risk = 1.5% × ₹5,00,000 = ₹7,500 per trade.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 14.1",
    },
    {
      id: "l5-02-q2",
      question: "In the Tata Motors example, with max risk = ₹7,500 and loss per lot = ₹5,475, how many lots should be traded?",
      options: ["0 lots", "1 lot", "2 lots", "6 lots"],
      correct: 1,
      explanation: "Lots = ₹7,500 ÷ ₹5,475 = 1.36 → round down to 1 lot. Never round up — that would exceed your risk limit.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 14.1",
    },
    {
      id: "l5-02-q3",
      question: "What is the reward:risk ratio for the Tata Motors trade (Entry ₹393.65, SL ₹390, Target ₹400)?",
      options: ["0.57:1", "1.0:1", "1.74:1", "2.5:1"],
      correct: 2,
      explanation: "Reward = 400 − 393.65 = 6.35. Risk = 393.65 − 390 = 3.65. R:R = 6.35/3.65 = 1.74:1 — excellent for an intraday trade.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 14.1",
    },
    {
      id: "l5-02-q4",
      question: "What is the key advantage of the Reduced Total Equity model over the Total Equity model?",
      options: [
        "It gives larger position sizes for every trade",
        "It only counts locked-in profits, forcing stop loss discipline",
        "It simplifies equity calculation to just free cash",
        "It works better during volatile markets",
      ],
      correct: 1,
      explanation: "The Reduced Total Equity model adds only locked-in profits (via trailing stop), not all unrealised gains. This forces you to use trailing stops and builds position size only on confirmed profits.",
      difficulty: "hard",
      citation: "Varsity Module 9, Ch. 12.2",
    },
    {
      id: "l5-02-q5",
      question: "Professional traders typically limit risk per trade to what percentage of total capital?",
      options: ["5–10%", "3–5%", "1–3%", "10–15%"],
      correct: 2,
      explanation: "Professional traders do not risk more than 1–3% of capital on any single trade. This is the core of the percentage risk position sizing technique.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 14.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 9 — Risk Management & Trading Psychology (zerodha.com/varsity)",
}

export default lesson
