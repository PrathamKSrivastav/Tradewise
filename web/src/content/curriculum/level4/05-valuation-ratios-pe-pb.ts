import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l4-05-valuation-ratios",
  level: 4,
  order: 5,
  title: "Valuation Ratios: PE, PB, and EPS",
  subtitle: "How to tell if a stock is cheap or expensive",
  xpReward: 30,
  body: `## What is Valuation?

Valuation is the estimate of the **worth** of something. In the context of stocks, valuation ratios help determine if a stock is cheap (undervalued) or expensive (overvalued) relative to its earnings, book value, or sales.

Valuation ratios use inputs from both the P&L statement and the Balance Sheet.

---

## EPS — Earnings Per Share

EPS = PAT ÷ Total Outstanding Shares

EPS measures profitability **per share**. It is one of the most frequently tracked metrics in financial analysis.

**Example**: Company with 1,000 shares and ₹2,00,000 profit:
EPS = 2,00,000 ÷ 1,000 = **₹200 per share**

Higher EPS = better for shareholders. Consistent EPS growth is a strong positive signal.

---

## P/E Ratio — Price to Earnings

P/E = Current Market Price ÷ EPS

P/E measures the **market's willingness to pay** for each rupee of the company's earnings.

**ARBL Example**:
- PAT = ₹367 Crs; Shares = 17.081 Crs
- EPS = 367 / 17.081 = **₹21.49**
- Market Price = ₹661
- P/E = 661 / 21.49 = **30.76x**

Meaning: investors are willing to pay ₹30.76 for every ₹1 of ARBL's earnings.

If price rises to ₹750 while EPS stays at ₹21.49:
New P/E = 750 / 21.49 = **34.9x** — the stock became more expensive.

### What is a Good P/E?

| P/E Level | Interpretation |
|---|---|
| < 15x | Potentially undervalued |
| 15–22x | Reasonable / fair value |
| 22–30x | Somewhat expensive |
| > 30x | Very expensive |

**Rule of thumb**: Do not buy stocks trading above 25–30x earnings regardless of company quality.

### Index P/E Valuation (Nifty 50)

The NSE publishes Nifty P/E daily. Historical observations:
- **Peak**: 28x (early 2008) — followed by major market crash
- **Bottom**: ~11x (late 2008 / early 2009) — lowest in recent history
- **Normal range**: 16x to 20x, with average of 18x
- **Caution above**: 22x
- **Best time to buy**: around 16x or below

---

## P/B Ratio — Price to Book Value

Book Value = (Total Assets − Total Liabilities) ÷ Total Shares

It represents the net asset value per share — what you'd get per share if the company were liquidated.

P/B = Current Market Price ÷ Book Value Per Share

- P/B < 1: stock trading below net assets — potentially cheap (or in distress)
- P/B 1–3: reasonable for most sectors
- P/B > 5: expensive — need strong earnings growth to justify

---

## P/S Ratio — Price to Sales

P/S = Market Cap ÷ Total Revenue

Useful when a company is not yet profitable (no earnings to compute P/E). A company with higher profit margins deserves a higher P/S multiple.

---

## Key Warnings on P/E

1. **Earnings can be manipulated** — always cross-check with cash flows
2. Watch for **frequent accounting policy changes** — boosts earnings artificially
3. Provision for lesser depreciation can inflate EPS
4. Prefer to use **trailing P/E** (last 12 months) over forward P/E

---

## Putting It Together

An ideal stock has:
- Low P/E relative to sector peers
- Consistent EPS growth over 3–5 years
- ROE > 18%, low debt
- P/B close to 1–2x for value plays`,

  keyTerms: [
    {
      term: "P/E Ratio (Price to Earnings)",
      definition: "Current market price divided by EPS. Measures how much investors pay per rupee of earnings. ARBL example: ₹661 / ₹21.49 = 30.76x. Avoid stocks above 25–30x.",
    },
    {
      term: "Book Value",
      definition: "Net assets per share = (Total Assets − Total Liabilities) ÷ Total Shares. What each shareholder would receive if the company were liquidated.",
    },
    {
      term: "P/B Ratio (Price to Book)",
      definition: "Market price divided by book value per share. P/B < 1 may indicate undervaluation (or distress); P/B > 5 is expensive without strong earnings growth.",
    },
    {
      term: "Index P/E",
      definition: "The P/E ratio of the entire Nifty 50 or Sensex index, published by NSE daily. Normal range for Nifty: 16–20x. Caution above 22x; best buying below 16x.",
    },
    {
      term: "EPS (Earnings Per Share)",
      definition: "PAT divided by total outstanding shares. The per-share profit of the company. ARBL FY14: ₹367 Crs / 17.081 Crs shares = ₹21.49.",
    },
  ],

  facts: [
    {
      statement: "ARBL FY14: EPS = ₹21.49; Market Price = ₹661; P/E = 30.76x. If price rises to ₹750 with same EPS, P/E rises to 34.9x.",
      citation: "Varsity Module 3, Ch. 11.1",
    },
    {
      statement: "Rule: Do not buy stocks trading at above 25x or at most 30x earnings, irrespective of the company or sector.",
      citation: "Varsity Module 3, Ch. 11.1",
    },
    {
      statement: "Nifty 50 P/E historical data: peak 28x (early 2008), bottom ~11x (late 2008/early 2009), normal range 16–20x with average 18x. Caution above 22x.",
      citation: "Varsity Module 3, Ch. 11.2",
    },
    {
      statement: "NSE publishes Nifty P/E, P/B, and Dividend Yield on a daily basis (updated ~6 PM). Accessible via Products > Indices > Historical Data on NSE website.",
      citation: "Varsity Module 3, Ch. 11.2",
    },
    {
      statement: "P/E denominator (earnings) can be manipulated via accounting policy changes or reduced depreciation provisions — always cross-check against cash flows.",
      citation: "Varsity Module 3, Ch. 11.1",
    },
  ],

  quizSeed: [
    {
      id: "l4-05-q1",
      question: "ARBL has PAT = ₹367 Crs, shares = 17.081 Crs, and market price = ₹661. What is the P/E ratio?",
      options: ["21.49x", "25.0x", "30.76x", "34.9x"],
      correct: 2,
      explanation: "EPS = 367/17.081 = ₹21.49. P/E = 661/21.49 = 30.76x.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 11.1",
    },
    {
      id: "l4-05-q2",
      question: "Historically, the Nifty 50 P/E has peaked at approximately 28x. What happened next?",
      options: [
        "The market continued to rally for 2 more years",
        "A major market crash followed",
        "The index P/E stabilised at 28x",
        "The Sensex de-coupled from the Nifty",
      ],
      correct: 1,
      explanation: "The Nifty peaked at ~28x P/E in early 2008 — what followed was a major market crash. This illustrates the importance of monitoring index valuations.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 11.2",
    },
    {
      id: "l4-05-q3",
      question: "According to the Nifty P/E framework, when is historically the best time to invest?",
      options: [
        "When Nifty P/E is above 25x",
        "When Nifty P/E is around 16x or below",
        "When Nifty P/E equals its 18x long-term average",
        "When Nifty P/E is rising rapidly",
      ],
      correct: 1,
      explanation: "Historically, the best time to invest is when Nifty P/E is around 16x or below — the market is near its valuation floor and risk-reward is favourable.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 11.2",
    },
    {
      id: "l4-05-q4",
      question: "Why is the P/E ratio potentially unreliable on its own?",
      options: [
        "P/E is too complex to calculate",
        "It only applies to large-cap stocks",
        "The earnings (denominator) can be manipulated through accounting policies",
        "P/E ignores dividend yield",
      ],
      correct: 2,
      explanation: "Earnings (the P/E denominator) can be inflated by reducing depreciation or changing accounting policies. Always cross-check P/E against cash flow from operations.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 11.1",
    },
    {
      id: "l4-05-q5",
      question: "A P/B ratio below 1 indicates:",
      options: [
        "The stock is definitely a great buy",
        "The company is highly profitable",
        "The stock is trading below its net asset value — possibly undervalued or distressed",
        "The company has no debt",
      ],
      correct: 2,
      explanation: "P/B < 1 means the stock is trading below book value (net assets per share). It may signal undervaluation — but also possible financial distress. Investigate further.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 11",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 3 — Fundamental Analysis (zerodha.com/varsity)",
}

export default lesson
