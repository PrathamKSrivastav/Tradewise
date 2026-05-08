import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l6-05-momentum-portfolio",
  level: 6,
  order: 5,
  title: "Momentum Portfolio Strategy",
  subtitle: "Systematically selecting and rebalancing the highest-momentum stocks",
  xpReward: 33,
  body: `## What is Momentum?

Momentum is the **rate of change of return**. A stock with strong momentum has been generating higher returns than its peers over a defined timeframe.

Momentum can be measured on any timeframe — minute-by-minute for high-frequency traders, daily, weekly, monthly, or yearly for swing/position traders.

---

## The Momentum Portfolio Concept

Instead of trading a single stock, a momentum portfolio holds **10–15 stocks** simultaneously — all selected because they have exhibited the highest momentum in a universe of stocks.

Advantages:
- Diversification reduces single-stock risk
- Systematic rule-based selection removes emotion
- Rebalancing forces you to cut underperformers and add new leaders

---

## Step-by-Step: Building a Momentum Portfolio

### Step 1: Define Your Tracking Universe

The tracking universe is the pool of stocks from which you select your portfolio. Recommended options:
- **Nifty 50** — 50 large-cap stocks (simple and liquid)
- **BSE 500** — 500 stocks (broader opportunity set)
- **Custom universe** — filtered by market cap (>₹1,000 Cr), price range, sector, etc.

From personal experience: have **at least 150–200 stocks** in the tracking universe to build a 12–15 stock momentum portfolio.

### Step 2: Set Up Clean Historical Data

Download **1 year of daily closing prices** for every stock in the tracking universe.

Important: Data must be **clean and adjusted** for corporate actions — bonus issues, stock splits, special dividends. Dirty data produces false signals.

The data window is a rolling 12 months — updated daily.

### Step 3: Calculate 1-Year Returns

For each stock in the universe:

**Return = [Ending Price / Starting Price] − 1**

Example (ABB Ltd):
- Ending price: ₹1,244.55
- Starting price: ₹1,435.55
- Return = [1244.55 / 1435.55] − 1 = **−13.31%**

You now have a return figure for every stock in the universe.

### Step 4: Rank Stocks by Return

Sort all stocks from **highest return to lowest return**. Assign rank 1 to the best performer.

Example rankings:
1. Asian Paints: +25.87%
2. HDFC Bank: +18.40%
3. Biocon: +15.20%
4. ACC: +8.40%
5. Ultratech: +4.10%
...
10. Infosys: −35.98%

The ranking tells you objectively who has momentum and who doesn't.

### Step 5: Build the Portfolio

**Select the top 12 (or 15) ranked stocks.** These are your momentum portfolio holdings.

The logic: if a stock has generated strong returns over the past 12 months, momentum is expected to continue into the 13th month.

**Capital allocation** — equal weighting is the simplest and most common approach:
- ₹2,00,000 capital ÷ 12 stocks = ₹16,666 per stock

### Step 6: Monthly Rebalancing

At the **end of every month**:
1. Re-run the ranking engine using the latest 12 months of data
2. Identify the new top 12 stocks
3. Sell stocks that have dropped out of the top 12
4. Buy the new entrants

Typically, only a handful of stocks change every month — you're not turning over the entire portfolio.

---

## Variations

You don't have to use 12-month returns:
- **Monthly returns, hold 1 month** — more frequent rebalancing, captures shorter momentum
- **Fortnightly returns, hold 2 weeks**
- **Fundamental momentum** — rank by EPS growth, EBITDA margin growth, or revenue growth quarter-on-quarter

---

## Word of Caution

Price-based momentum strategies have a critical weakness:

| Market Condition | Momentum Portfolio Performance |
|---|---|
| **Bull market (uptrend)** | Excellent — often beats the index |
| **Sideways market** | Poor — frequent false signals |
| **Bear market (downtrend)** | Bleeds harder than the market itself |

Momentum portfolios amplify both gains and losses. In 2009–2010, momentum strategies performed very well. In 2011, they severely underperformed. Always backtest across multiple market cycles before deploying capital.

---

## Summary: The 6-Step Momentum System

1. Define a tracking universe (Nifty 50 or BSE 500)
2. Download 1 year of clean, adjusted closing prices
3. Calculate 1-year return for each stock: [End/Start] − 1
4. Rank stocks from highest to lowest return
5. Buy the top 12–15 stocks with equal capital allocation
6. Rebalance at end of every month`,

  keyTerms: [
    {
      term: "Momentum",
      definition: "The rate of change of return. A stock with high momentum has generated higher returns than peers over a defined period. Momentum strategies buy the fastest-rising stocks and rebalance periodically.",
    },
    {
      term: "Tracking Universe",
      definition: "The pool of stocks from which a momentum portfolio is constructed. Nifty 50 or BSE 500 are common choices. Should have at least 150–200 stocks to build a 12–15 stock portfolio.",
    },
    {
      term: "1-Year Return",
      definition: "Return = [Ending Price / Starting Price] − 1. Calculated for every stock in the tracking universe to rank momentum. ABB example: (1244.55/1435.55) − 1 = −13.31%.",
    },
    {
      term: "Monthly Rebalancing",
      definition: "Re-ranking the tracking universe at month-end and adjusting the portfolio — selling stocks that left the top 12 and buying new entrants. Keeps the portfolio aligned with current momentum leaders.",
    },
    {
      term: "Equal Weighting",
      definition: "Allocating the same rupee amount to each stock in the portfolio. ₹2,00,000 ÷ 12 stocks = ₹16,666 per stock. Simple, transparent, and effective as a baseline allocation method.",
    },
  ],

  facts: [
    {
      statement: "Momentum portfolio step-by-step: define tracking universe (BSE 500) → clean 1yr data → calculate returns ([End/Start]−1) → rank highest to lowest → buy top 12–15 → rebalance monthly.",
      citation: "Varsity Module 10, Ch. 16.3",
    },
    {
      statement: "Return formula example: ABB Ltd — Ending ₹1,244.55, Starting ₹1,435.55 → Return = (1244.55/1435.55)−1 = −13.31%. Asian Paints topped the universe at +25.87%.",
      citation: "Varsity Module 10, Ch. 16.3",
    },
    {
      statement: "Tracking universe recommendation: at least 150–200 stocks if building a 12–15 stock momentum portfolio. BSE 500 is a good starting point; custom filters can use market cap >₹1,000 Cr.",
      citation: "Varsity Module 10, Ch. 16.3",
    },
    {
      statement: "Price-based momentum works best in uptrending markets. In sideways markets it performs poorly; in bear markets it bleeds heavier than the index. The strategy had great runs in 2009–2010 but took bad hits in 2011.",
      citation: "Varsity Module 10, Ch. 16.5",
    },
  ],

  quizSeed: [
    {
      id: "l6-05-q1",
      question: "In the momentum portfolio strategy, how is momentum measured?",
      options: [
        "By the number of consecutive up days in a stock",
        "By the 1-year return: [Ending Price / Starting Price] − 1",
        "By the RSI value on the last trading day of the month",
        "By the stock's P/E ratio relative to its sector average",
      ],
      correct: 1,
      explanation: "Momentum is measured as the 1-year return using the formula: [Ending Price / Starting Price] − 1. Stocks are then ranked from highest to lowest return, and the top 12–15 are selected for the portfolio.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 16.3",
    },
    {
      id: "l6-05-q2",
      question: "A trader has ₹2,00,000 and builds an equally weighted momentum portfolio of 12 stocks. How much goes into each stock?",
      options: ["₹10,000", "₹12,500", "₹16,667", "₹20,000"],
      correct: 2,
      explanation: "Equal weighting: ₹2,00,000 ÷ 12 = ₹16,667 per stock. Equal weighting is the recommended baseline approach — each stock gets the same rupee allocation regardless of its rank.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 16.3",
    },
    {
      id: "l6-05-q3",
      question: "Why must historical closing price data be adjusted for corporate actions?",
      options: [
        "Corporate actions change the stock's sector classification",
        "Bonus issues and splits create artificial price jumps that distort return calculations",
        "SEBI requires adjusted data for all trading strategies",
        "Unadjusted data overstates the company's earnings",
      ],
      correct: 1,
      explanation: "A 2-for-1 bonus issue halves the stock price overnight, making it look like a 50% loss. Using unadjusted data would cause false momentum signals. Clean, adjusted data ensures return calculations reflect true price performance.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 16.3",
    },
    {
      id: "l6-05-q4",
      question: "When does a momentum portfolio perform worst?",
      options: [
        "During bull markets with sustained uptrends",
        "When interest rates are low",
        "During bear markets and sideways markets — it bleeds harder than the index",
        "During high-volume earnings seasons",
      ],
      correct: 2,
      explanation: "Price-based momentum strategies amplify returns in trending markets but perform poorly in sideways markets and bleed heavier than the index in bear markets. The strategy had great runs in 2009–10 but took bad hits in 2011.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 16.5",
    },
    {
      id: "l6-05-q5",
      question: "What is the recommended minimum size for the tracking universe when building a 12-stock momentum portfolio?",
      options: ["30 stocks", "50 stocks", "100 stocks", "150–200 stocks"],
      correct: 3,
      explanation: "Having at least 150–200 stocks in the tracking universe ensures the top 12–15 selections are truly high-momentum stocks. With too small a universe (e.g., Nifty 50), the ranking has insufficient data to be meaningful.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 16.3",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 10 — Trading Systems (zerodha.com/varsity)",
}

export default lesson
