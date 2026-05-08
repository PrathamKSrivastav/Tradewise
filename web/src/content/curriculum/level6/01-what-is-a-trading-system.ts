import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l6-01-trading-systems",
  level: 6,
  order: 1,
  title: "What is a Trading System?",
  subtitle: "Building a rule-based, quantifiable approach to markets",
  xpReward: 30,
  body: `## What is a Trading System?

Any approach to trading that can be **defined as a process** and **quantified** is a trading system. Approaches you can't define — "my gut says so," "my broker told me," "the TV analyst recommended it" — are NOT trading systems.

A trading system has:
1. **Logic** — the core idea behind the strategy
2. **Input parameters** — what data it uses
3. **Interpreting the output** — how to read the signal
4. **Entry and exit rules** — precise conditions for buying and selling

The advantage: you only define the logic once, then follow the system mechanically. This removes emotion and bias from trade execution.

---

## Why Systems Beat Discretion

A trading system example from Oct 2017: PSU bank stocks rose 27.75% when the Finance Ministry announced ₹2,10,000 Crs of capital infusion. Bank Nifty rose only 3%, despite PSU banks being only ~10% of Bank Nifty.

**Systematic deduction**: PSU banks < 10% of Bank Nifty → a 27% move in PSUs should move Bank Nifty only ~2.7%, not cause extreme volatility → Bank Nifty options are overpriced → write a short strangle to collect premium.

This is systematic thinking — objective, quantifiable, backtestable.

---

## Building a Trading System: The Components

### 1. Universe of Stocks / Index
Define which instruments you will trade. Examples:
- Nifty 50 stocks only
- Mid-cap index components
- A specific sector (Bank Nifty)

### 2. Entry Rules
Precise conditions that trigger a buy or sell:
- "Buy when 50-day EMA crosses above 100-day EMA"
- "Short when RSI crosses above 70 after being < 50"
- "Buy at support when a Hammer candlestick forms"

### 3. Exit Rules
When to close the trade:
- Target: nearest S&R level
- Stop loss: below the signal candle's low
- Time stop: exit after N days if target/SL not hit

### 4. Position Sizing Rules
How much capital to deploy per trade:
- Fixed % risk per trade (1–3%)
- Kelly criterion scaled within max cap

### 5. Risk Management Rules
Overall portfolio constraints:
- Max 3 open positions at once
- Stop trading if monthly loss exceeds 5%
- Reduce position size after 3 consecutive losses

---

## Backtesting: Does Your System Work?

Backtesting means applying your system's rules to **historical price data** to see how it would have performed. It answers:
- What is the win rate?
- What is the average win and average loss?
- What is the maximum drawdown?
- What is the Sharpe Ratio?

**No trading system is complete without backtesting results.**

### Backtesting Pitfalls
1. **Look-ahead bias**: using future data in the calculation
2. **Overfitting**: rules that work on historical data but fail on new data
3. **Survivorship bias**: only testing on stocks that survived (ignoring delisted companies)

---

## Types of Trading Systems

| Type | Description | Timeframe |
|---|---|---|
| **Trend-following** | Buy in uptrend, sell in downtrend | Days to weeks |
| **Mean reversion** | Buy at support, sell at resistance | Hours to days |
| **Momentum** | Buy fastest-rising stocks | Weekly to monthly |
| **Pair trading** | Long one stock, short a correlated one | Days to weeks |

---

## Practical Starting Point

The simplest complete system:
1. Universe: Nifty 50
2. Entry: price crosses above 50-day EMA
3. Exit: price falls below 50-day EMA
4. Position size: 2% risk per trade
5. Stop loss: below the 50-day EMA

Even this simple system, properly backtested and position-sized, will produce consistent results over time.`,

  keyTerms: [
    {
      term: "Trading System",
      definition: "A quantifiable, rule-based approach to trading with defined entry rules, exit rules, position sizing, and risk management. Can be backtested on historical data.",
    },
    {
      term: "Backtesting",
      definition: "Applying a trading system's rules to historical price data to measure its past performance — win rate, average win/loss, drawdown, Sharpe Ratio.",
    },
    {
      term: "Entry Rule",
      definition: "A precise, objective condition that triggers a trade. Example: 'Buy when 50-day EMA crosses above 100-day EMA with above-average volume.'",
    },
    {
      term: "Exit Rule",
      definition: "A precise condition to close a trade — either via target (profit), stop loss (defined risk), or time stop (max holding period).",
    },
    {
      term: "Overfitting",
      definition: "Designing rules that fit historical data perfectly but fail on new data. A backtested system with too many specific parameters is likely overfit.",
    },
  ],

  facts: [
    {
      statement: "A trading system requires: (1) logic, (2) input parameters, (3) interpreting output, (4) entry/exit rules — and must be quantifiable and backtestable.",
      citation: "Varsity Module 10, Ch. 1.1",
    },
    {
      statement: "Bank Nifty Oct 2017 example: PSU banks (10% of Bank Nifty) rose 27.75% → systematic deduction that Bank Nifty options were overpriced → short strangle opportunity.",
      citation: "Varsity Module 10, Ch. 1.1",
    },
    {
      statement: "No trading system is complete without backtesting results. Backtesting reveals win rate, average win/loss, maximum drawdown, and Sharpe Ratio.",
      citation: "Varsity Module 10, Ch. 1.3",
    },
    {
      statement: "Approaches that cannot be defined as a process — gut feel, broker tips, TV analyst calls — are not trading systems and cannot be backtested.",
      citation: "Varsity Module 10, Ch. 1.1",
    },
  ],

  quizSeed: [
    {
      id: "l6-01-q1",
      question: "Which of the following qualifies as a trading system?",
      options: [
        "Buy because your broker recommended it",
        "Buy when a TV analyst says the stock looks good",
        "Buy when 50-day EMA crosses above 100-day EMA on above-average volume",
        "Buy based on your gut feeling about the stock",
      ],
      correct: 2,
      explanation: "Only option 3 is quantifiable and rule-based — it can be defined precisely and backtested on historical data. The others are ad-hoc and not reproducible.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 1.1",
    },
    {
      id: "l6-01-q2",
      question: "What does 'overfitting' mean in the context of a trading system?",
      options: [
        "Using too large a position size",
        "Adding too many stocks to the universe",
        "Creating rules that fit historical data perfectly but fail on new data",
        "Using leverage beyond your risk limit",
      ],
      correct: 2,
      explanation: "Overfitting means the system's rules are too specific to past data — they 'curve fit' the history but fail to generate profits on fresh data.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 1",
    },
    {
      id: "l6-01-q3",
      question: "Which element is NOT required in a complete trading system?",
      options: [
        "Entry rules",
        "Exit rules",
        "A minimum track record of 5 years",
        "Position sizing rules",
      ],
      correct: 2,
      explanation: "A complete trading system requires logic, entry rules, exit rules, and position sizing. A 5-year track record is desirable but not a prerequisite for defining the system.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 1.3",
    },
    {
      id: "l6-01-q4",
      question: "Backtesting reveals which of the following?",
      options: [
        "Future price targets",
        "Win rate, average win/loss, drawdown, and Sharpe Ratio on historical data",
        "The exact number of shares to buy",
        "Whether insider buying has occurred",
      ],
      correct: 1,
      explanation: "Backtesting applies system rules to historical data and reveals: win rate, average gain/loss, maximum drawdown, and Sharpe Ratio.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 1.3",
    },
    {
      id: "l6-01-q5",
      question: "Which trading system type buys fastest-rising stocks and holds them for weeks to months?",
      options: [
        "Mean reversion",
        "Trend following",
        "Momentum",
        "Pair trading",
      ],
      correct: 2,
      explanation: "Momentum strategies identify the fastest-rising stocks (highest rate of return change) and hold them across weekly to monthly timeframes, riding the trend.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 16.2",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 10 — Trading Systems (zerodha.com/varsity)",
}

export default lesson
