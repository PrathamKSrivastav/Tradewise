import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l3-01-intro-to-ta",
  level: 3,
  order: 1,
  title: "Introduction to Technical Analysis",
  subtitle: "What TA is, its assumptions, and when to use it",
  xpReward: 28,
  body: `## What is Technical Analysis?

Technical Analysis (TA) is a research technique to identify trading opportunities based on the actions of market participants. These actions are visualised through stock charts. Over time, patterns form within charts, and each pattern conveys a trading signal.

Unlike Fundamental Analysis — which evaluates a company's financials to determine its intrinsic value — TA focuses only on price and volume data. The technical analyst asks **how** the price moved, not **why**.

## The Four Core Assumptions of TA

1. **Markets discount everything** — All known and unknown information is already reflected in the current price. Even insider buying activity gets reflected in the price before the news becomes public.

2. **The "how" is more important than the "why"** — The technical analyst tracks price reaction, not the reason behind it.

3. **Price moves in trends** — Major market moves happen in phases over time. The Nifty move from 6400 to 7700 took 11 months — it did not happen overnight. Once a trend is established, price tends to move in that direction.

4. **History tends to repeat itself** — Market participants react to price movements in remarkably similar ways each time. In uptrends, greed drives buying at any price. In downtrends, fear drives selling at any price. This consistency makes historical patterns repeatable.

## When to Use TA vs FA

TA is best used for **short-term trades** lasting from a few minutes to a few weeks. Do not use TA to identify long-term investment opportunities — that is the domain of Fundamental Analysis.

A prudent trader learns both techniques. If you are a fundamental analyst, use TA to calibrate your entry and exit prices on stocks you've already selected.

## Setting Realistic Expectations

TA-based trades aim for **small but consistent profits**, not windfall gains. The trick is identifying frequent short-term opportunities. Risk management is critical — if a trade moves against you, cut losses and move on. Do not hold a loss-making trade hoping to recover.

## TA Across Asset Classes

One of TA's greatest advantages: the same concepts apply to equities, commodities, currencies, and fixed income. Once you learn TA, you can apply it to any asset with historical price and volume data. Indicators like RSI or MACD work identically across all markets.`,

  keyTerms: [
    {
      term: "Technical Analysis (TA)",
      definition: "A research technique that identifies trading opportunities by studying price and volume patterns on stock charts, based on the assumption that all information is already priced in.",
    },
    {
      term: "Trend",
      definition: "A sustained directional move in price — upward (bullish), downward (bearish), or sideways. Price tends to continue in the direction of the trend once established.",
    },
    {
      term: "Markets Discount Everything",
      definition: "The TA assumption that current price already reflects all known and unknown information, including insider activity and future expectations.",
    },
    {
      term: "Leading Indicator",
      definition: "An indicator that signals a potential trend reversal before it happens, but is prone to false signals.",
    },
    {
      term: "Lagging Indicator",
      definition: "An indicator that confirms an existing trend after it has already started — slower but more reliable. Moving averages are a classic example.",
    },
  ],

  facts: [
    {
      statement: "Technical Analysis is based on four assumptions: markets discount everything; how is more important than why; price moves in trends; history tends to repeat itself.",
      citation: "Varsity Module 2, Ch. 2.3",
    },
    {
      statement: "TA can be applied to any asset class — equities, commodities, currencies, fixed income — as long as historical time series (OHLCV) data is available.",
      citation: "Varsity Module 2, Ch. 2.2",
    },
    {
      statement: "TA-based trades typically last from a few minutes to a few weeks, and usually not beyond that.",
      citation: "Varsity Module 2, Ch. 1.3",
    },
    {
      statement: "Indicators are of two types: leading (signals reversal in advance, prone to false signals) and lagging (confirms an ongoing trend after it has started).",
      citation: "Varsity Module 2, Ch. 14",
    },
  ],

  quizSeed: [
    {
      id: "l3-01-q1",
      question: "Which assumption of TA states that even insider buying activity gets reflected in the stock price?",
      options: [
        "Price moves in trends",
        "Markets discount everything",
        "History tends to repeat itself",
        "The how is more important than the why",
      ],
      correct: 1,
      explanation: "The assumption 'markets discount everything' states that all known and unknown information — including insider activity — is already reflected in the current price.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 2.3",
    },
    {
      id: "l3-01-q2",
      question: "TA-based trades are typically held for:",
      options: [
        "A few minutes to a few weeks",
        "3–6 months",
        "1–3 years",
        "Over 5 years",
      ],
      correct: 0,
      explanation: "TA is best used to identify short-term trades lasting from a few minutes to a few weeks.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 1.3",
    },
    {
      id: "l3-01-q3",
      question: "A lagging indicator is best described as one that:",
      options: [
        "Predicts price moves before they happen",
        "Oscillates between fixed bounds like 0 and 100",
        "Confirms an ongoing trend after it has started",
        "Is always more reliable than a leading indicator",
      ],
      correct: 2,
      explanation: "Lagging indicators confirm an existing trend after it has begun. Moving averages are the most popular example.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 14",
    },
    {
      id: "l3-01-q4",
      question: "Which of the following is NOT an assumption of Technical Analysis?",
      options: [
        "Markets discount everything",
        "History tends to repeat itself",
        "Price is always equal to intrinsic value",
        "Price moves in trends",
      ],
      correct: 2,
      explanation: "TA does not care about intrinsic value — that is Fundamental Analysis. The four TA assumptions deal with price discounting information, history repeating, trend continuity, and the primacy of 'how' over 'why'.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 2.3",
    },
    {
      id: "l3-01-q5",
      question: "What is the biggest advantage of TA over Fundamental Analysis when it comes to asset classes?",
      options: [
        "TA gives exact buy and sell prices",
        "TA applies to any asset class with OHLCV data — equities, commodities, forex, etc.",
        "TA works only on Indian markets",
        "TA eliminates all trading risk",
      ],
      correct: 1,
      explanation: "TA is universally applicable. The same indicators like MACD or RSI work identically on equities, commodities, currencies, and fixed income.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 2.2",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 2 — Technical Analysis (zerodha.com/varsity)",
}

export default lesson
