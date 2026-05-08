import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l5-01-types-of-risk",
  level: 5,
  order: 1,
  title: "Understanding Risk",
  subtitle: "Systematic vs unsystematic risk, and why money management is 80% of trading success",
  xpReward: 28,
  body: `## Why Risk Management?

Mark Douglas, in his book *The Disciplined Trader*, says: **"Successful trading is 80% money management and 20% strategy."**

For every rupee a trader makes, another trader loses that same rupee. The group that consistently makes money is small — and the difference between winners and losers is their understanding of risk and money management.

## What is Risk?

The layman definition: risk is the **probability of losing money** when you transact in markets.

At a high level, risk breaks into two types:

---

## 1. Systematic Risk (Market Risk)

Risk that affects **all companies in the market** simultaneously. Cannot be avoided by diversification.

Examples:
- A government policy change that affects all sectors
- A global recession reducing demand across industries
- Rising interest rates impacting all businesses

Systematic risk is also called **undiversifiable risk** — you cannot escape it by owning more stocks.

---

## 2. Unsystematic Risk (Company-Specific Risk)

Risk that is **specific to one company or industry**. Can be reduced by diversification.

Examples:
- HCL Technologies' revenue declining (only HCL is affected, not Wipro or Mindtree)
- A management scandal in one company (e.g., the Satyam scam, January 2009)
- A single company losing a major contract

The **Satyam example**: On 7 January 2009, Satyam Computers disclosed years of accounting fraud — book cooking, inflated numbers, internal party transactions. Satyam's stock crashed but its competitors (Infosys, TCS, Wipro) were not affected. This is classic unsystematic risk.

---

## Diversification Reduces Unsystematic Risk

By owning stocks across multiple companies and sectors, unsystematic risk averages out. If one company collapses, the impact on your portfolio is limited.

However, diversification does **not** protect you from systematic risk — when the whole market crashes, even diversified portfolios fall.

---

## The Two Dimensions of Risk Management

1. **Understanding your risk** — know the types of risk you face in each position
2. **Position sizing** — controlling how much capital you expose to each trade

The biggest mistake traders make: exposing too much capital to a single trade. Even a "perfect" trade setup can go wrong, and if you've bet your entire capital, one loss can be catastrophic.

---

## Risk Appetite: Investor vs Trader

- **Long-term investor**: primary risk is unsystematic (company-specific). Managed by selecting quality businesses and holding through short-term price fluctuations.
- **Active trader**: primary risk is systematic and position-level risk. Managed through stop losses, position sizing, and hedging.`,

  keyTerms: [
    {
      term: "Systematic Risk",
      definition: "Market-wide risk that affects all companies simultaneously — recessions, interest rate changes, global crises. Cannot be diversified away.",
    },
    {
      term: "Unsystematic Risk",
      definition: "Company-specific or industry-specific risk — management fraud, revenue decline, competitive pressure. Can be reduced through diversification.",
    },
    {
      term: "Diversification",
      definition: "Spreading investments across multiple companies, sectors, and asset classes to reduce unsystematic risk. Does not eliminate systematic risk.",
    },
    {
      term: "Money Management",
      definition: "The discipline of controlling capital exposure, position sizing, and risk per trade. Mark Douglas: 'Successful trading is 80% money management and 20% strategy.'",
    },
  ],

  facts: [
    {
      statement: "Mark Douglas in 'The Disciplined Trader': successful trading is 80% money management and 20% strategy.",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      statement: "Risk is broken into systematic (affects all companies, cannot be diversified) and unsystematic (company-specific, can be reduced by diversification).",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      statement: "Satyam scam (7 January 2009): Satyam Computers disclosed years of accounting fraud — only Satyam's stock crashed; competitors Infosys, TCS, Wipro were unaffected. Classic unsystematic risk.",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      statement: "Diversification reduces unsystematic risk but cannot protect against systematic risk (whole-market crashes).",
      citation: "Varsity Module 9, Ch. 2.1",
    },
  ],

  quizSeed: [
    {
      id: "l5-01-q1",
      question: "According to Mark Douglas, what percentage of trading success comes from money management?",
      options: ["20%", "50%", "80%", "100%"],
      correct: 2,
      explanation: "Mark Douglas in 'The Disciplined Trader': successful trading is 80% money management and 20% strategy.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      id: "l5-01-q2",
      question: "The Satyam accounting scandal in January 2009 is an example of:",
      options: [
        "Systematic risk",
        "Unsystematic risk",
        "Market risk",
        "Liquidity risk",
      ],
      correct: 1,
      explanation: "Only Satyam crashed — its competitors (Infosys, TCS, Wipro) were unaffected. This is unsystematic (company-specific) risk.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      id: "l5-01-q3",
      question: "Which type of risk CANNOT be reduced through diversification?",
      options: [
        "Management fraud in a single company",
        "Revenue decline in one sector",
        "Systematic (market-wide) risk",
        "Unsystematic company-specific risk",
      ],
      correct: 2,
      explanation: "Systematic risk affects all companies simultaneously (recessions, interest rate changes). No amount of diversification can protect you from a market-wide event.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      id: "l5-01-q4",
      question: "A government policy raising taxes on all banks equally is best classified as:",
      options: [
        "Unsystematic risk specific to each bank",
        "Systematic risk affecting the entire banking sector",
        "Liquidity risk",
        "Credit risk specific to borrowers",
      ],
      correct: 1,
      explanation: "A policy affecting all banks equally is systematic (sector-wide or market-wide) risk — it cannot be avoided by holding stocks in different banks.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 2.1",
    },
    {
      id: "l5-01-q5",
      question: "Diversification is effective at reducing which type of risk?",
      options: [
        "Systematic market risk",
        "Recession risk",
        "Unsystematic company-specific risk",
        "Interest rate risk",
      ],
      correct: 2,
      explanation: "Diversification across multiple companies and sectors reduces unsystematic (company-specific) risk. If one company fails, its impact on the portfolio is limited.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 2.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 9 — Risk Management & Trading Psychology (zerodha.com/varsity)",
}

export default lesson
