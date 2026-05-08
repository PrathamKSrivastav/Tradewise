import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l5-03-kelly-criterion",
  level: 5,
  order: 3,
  title: "Kelly's Criterion & Trading Expectancy",
  subtitle: "Optimal bet sizing and measuring the long-run edge of your system",
  xpReward: 28,
  body: `## Kelly's Criterion

Proposed by John Kelly in the 1950s while at AT&T's Bell Laboratories to solve telephone noise problems. Later adopted by professional gamblers for optimal bet sizing — and soon made its way into trading and investing.

Kelly's Criterion estimates the **optimal fraction of capital to risk** on a trade, given:
1. Your win probability
2. Your win/loss ratio

### Formula

**Kelly % = W − [(1 − W) / R]**

Where:
- **W** = Win probability = Total winning trades ÷ Total trades
- **R** = Win/Loss ratio = Average gain on winning trades ÷ Average loss on losing trades

### Example — Tata Motors Trading System (10 trades)

6 winners: gains of ₹5,325, ₹2,312, ₹4,891, ₹1,763, ₹8,675, ₹4,231
4 losers: losses of ₹6,897, ₹231, ₹989, ₹1,980

**W** = 6/10 = **0.6** (60% win rate)

**Average gain** = (5325+2312+4891+1763+8675+4231) / 6 = **₹4,532**
**Average loss** = (6897+231+989+1980) / 4 = **₹3,274**

**R** = 4532 / 3274 = **1.384** (average gain > average loss — desirable)

**Kelly %** = 0.6 − [(1 − 0.6) / 1.384] = 0.6 − [0.4 / 1.384] = 0.6 − 0.289 = **31%**

This means: for the 11th Tata Motors trade, Kelly's Criterion suggests exposing 31% of capital.

### Practical Modification

A raw Kelly % of 70% (for a high-accuracy system) would mean risking 70% of capital on one trade. Even with a 70% win rate, there's a **30% chance of losing 70% of capital**. Unacceptable.

**Modified Kelly rule**:
- Set a maximum exposure cap (e.g., 5% of capital)
- Use Kelly % to scale within that cap

Example: Kelly % = 31%, Cap = 5%
Actual exposure = 31% × 5% = **1.55% of capital**

If Kelly % = 60%, exposure = 60% × 5% = **3% of capital**

This keeps you within safe limits while still using Kelly's edge-based scaling.

---

## Trading Expectancy

Expectancy measures the **average profit or loss per trade** across your system. It tells you if your trading system has a positive edge.

**Formula**:
Expectancy = (Win % × Average Win) − (Loss % × Average Loss)

**Example** (from above):
= (0.6 × 4532) − (0.4 × 3274)
= 2719.2 − 1309.6
= **₹1,409.6 per trade (positive)**

A positive expectancy means your system makes money on average. A negative expectancy means you will lose money over time, regardless of how good individual trades look.

### Key Insight

You don't need to win most trades to be profitable. A system with:
- 40% win rate but average win = ₹3,000
- 60% loss rate but average loss = ₹500
- Expectancy = (0.40 × 3000) − (0.60 × 500) = 1200 − 300 = **₹900 per trade (positive)**

This is why letting winners run and cutting losses quickly is the most important rule in trading.

---

## Summary of Risk per Trade

| Approach | Risk per Trade |
|---|---|
| Conservative (beginner) | 0.5–1% of capital |
| Professional standard | 1–3% of capital |
| Kelly-modified cap | Kelly % × max cap (e.g., 5%) |
| Never exceed | 5% of capital on any single trade |`,

  keyTerms: [
    {
      term: "Kelly's Criterion",
      definition: "Kelly % = W − [(1−W)/R]. Estimates the optimal fraction of capital to bet based on win probability (W) and win/loss ratio (R). Proposed by John Kelly in the 1950s.",
    },
    {
      term: "Win Probability (W)",
      definition: "Total winning trades divided by total trades. Tata Motors example: 6 winners / 10 trades = 0.60 (60%).",
    },
    {
      term: "Win/Loss Ratio (R)",
      definition: "Average gain on winning trades divided by average loss on losing trades. A ratio > 1 is desirable (average win > average loss). Tata Motors: 4532/3274 = 1.384.",
    },
    {
      term: "Trading Expectancy",
      definition: "Average profit/loss per trade = (Win% × Avg Win) − (Loss% × Avg Loss). A positive expectancy means the system has an edge. Tata Motors: +₹1,409.6 per trade.",
    },
    {
      term: "Modified Kelly Rule",
      definition: "Kelly % scaled within a maximum capital exposure cap (e.g., 5%). Actual exposure = Kelly% × cap. Prevents over-betting even for high-accuracy systems.",
    },
  ],

  facts: [
    {
      statement: "Kelly's Criterion formula: Kelly % = W − [(1−W)/R], where W = win probability and R = average win / average loss ratio.",
      citation: "Varsity Module 9, Ch. 14.2",
    },
    {
      statement: "Tata Motors 10-trade example: W = 0.6, average gain = ₹4,532, average loss = ₹3,274, R = 1.384, Kelly % = 31%.",
      citation: "Varsity Module 9, Ch. 14.2",
    },
    {
      statement: "Modified Kelly rule: cap maximum exposure at 5%, then scale within it using Kelly %. Kelly 31% × 5% cap = 1.55% actual exposure.",
      citation: "Varsity Module 9, Ch. 14.2",
    },
    {
      statement: "R > 1 is always desirable — it means average winning trades are larger than average losing trades.",
      citation: "Varsity Module 9, Ch. 14.2",
    },
  ],

  quizSeed: [
    {
      id: "l5-03-q1",
      question: "In the Tata Motors example (W=0.6, R=1.384), what is the Kelly %?",
      options: ["20%", "25%", "31%", "60%"],
      correct: 2,
      explanation: "Kelly % = 0.6 − [(1−0.6)/1.384] = 0.6 − [0.4/1.384] = 0.6 − 0.289 = 0.31 = 31%.",
      difficulty: "hard",
      citation: "Varsity Module 9, Ch. 14.2",
    },
    {
      id: "l5-03-q2",
      question: "A trading system has Kelly % = 50% and a maximum capital cap of 5%. What is the actual exposure per trade?",
      options: ["0.5%", "2.5%", "5%", "50%"],
      correct: 1,
      explanation: "Actual exposure = Kelly % × Cap = 50% × 5% = 2.5% of capital.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 14.2",
    },
    {
      id: "l5-03-q3",
      question: "Why is using the raw Kelly % (e.g., 70%) dangerous even for a high-accuracy system?",
      options: [
        "Kelly % is only valid for gamblers, not traders",
        "There is still a 30% chance of losing 70% of capital on a single trade",
        "Kelly % ignores the reward:risk ratio",
        "High accuracy systems always have negative expectancy",
      ],
      correct: 1,
      explanation: "Even a 70% accuracy system still loses 30% of the time. Risking 70% of capital per trade means one bad trade could be catastrophic. Hence Kelly must be capped.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 14.2",
    },
    {
      id: "l5-03-q4",
      question: "A system has 40% win rate, average win = ₹3,000, average loss = ₹500. What is the expectancy per trade?",
      options: ["-₹300", "₹900", "₹1,200", "₹2,500"],
      correct: 1,
      explanation: "Expectancy = (0.40 × 3000) − (0.60 × 500) = 1200 − 300 = ₹900 per trade. Positive expectancy despite only 40% win rate.",
      difficulty: "hard",
      citation: "Varsity Module 9, Ch. 14",
    },
    {
      id: "l5-03-q5",
      question: "What does a Win/Loss ratio (R) greater than 1 indicate?",
      options: [
        "More than 50% of trades are winners",
        "Average winning trade is larger than average losing trade",
        "The system is risk-free",
        "Kelly % will always be above 50%",
      ],
      correct: 1,
      explanation: "R > 1 means average gain on winning trades exceeds average loss on losing trades. This is desirable — you earn more when right than you lose when wrong.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 14.2",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 9 — Risk Management & Trading Psychology (zerodha.com/varsity)",
}

export default lesson
