import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l4-06-dcf-equity-research",
  level: 4,
  order: 6,
  title: "DCF Valuation & Investment Checklist",
  subtitle: "Estimating intrinsic value and the 10-point due diligence framework",
  xpReward: 30,
  body: `## The Three Stages of Equity Research

1. **Understanding the Business** — read annual reports, ask 18 key questions (promoters, products, plants, customers, competitors, entry barriers, subsidiaries, etc.)
2. **Applying the Checklist** — financial screening of 10 quantitative factors
3. **Valuation** — estimate intrinsic value using DCF to determine if the stock is priced right

Stages are **sequential** — do not skip stage 1 even if the numbers look great.

## Stage 1: Understanding the Business (18 Key Questions)

Key questions include:
- What does the company do? Who are its promoters?
- What do they manufacture? Where are their plants?
- Who are their customers and competitors?
- What are the entry barriers? Does it have too many subsidiaries?
- Is the product easily replicated in a cheap-labour country?

Red flags at stage 1 → **stop and find another company**. Don't proceed to the checklist.

Time required: ~15 hours for a thorough understanding.

---

## Stage 2: The 10-Point Checklist (ARBL Example)

| # | Variable | Benchmark | ARBL Performance |
|---|---|---|---|
| 1 | Revenue Growth | CAGR > 15% | 5-yr Revenue CAGR = **18.6%** ✓ |
| 2 | EPS Consistent with PAT | EPS not diluted | Share capital flat at ₹17.08 Crs ✓ |
| 3 | Gross Profit Margin | > 20% | ~28% consistently ✓ |
| 4 | Debt Level | Low leverage | Check D/E trend |
| 5 | Inventory | For mfg companies | Inventory days trend |
| 6 | Sales vs Receivables | Sales not just on credit | Check receivable days |
| 7 | Cash Flow from Operations | Positive | Must verify |
| 8 | Return on Equity | > 25% | Must verify |
| 9 | Business Diversity | 1–2 segments | ARBL: batteries only ✓ |
| 10 | Subsidiaries | Not many | Must verify |

**ARBL Revenue trend**:
FY10: ₹1,481 Crs → FY14: ₹3,482 Crs (5-yr CAGR = 18.6%)

**ARBL PAT trend**:
FY10: ₹167 Crs → FY14: ₹367 Crs (5-yr CAGR = 17%)

**ARBL Gross Profit Margins** (FY10–FY14): 30.7%, 27.9%, 28.7%, 26.7%, 28.0% — all well above 20% threshold.

---

## Stage 3: DCF Valuation

The **Discounted Cash Flow (DCF)** method is the gold standard for estimating the intrinsic value of a business. It is based on the principle that a rupee today is worth more than a rupee tomorrow.

### Core Concept

**Intrinsic Value** = Present Value of all future Free Cash Flows (FCFs)

Since future FCFs are uncertain, we use a **discount rate** (also called the required rate of return) to bring them back to present value.

**PV = FCF₁/(1+r)¹ + FCF₂/(1+r)² + ... + FCFₙ/(1+r)ⁿ + Terminal Value/(1+r)ⁿ**

Where r = discount rate (typically cost of equity = 12–15% for Indian stocks)

### Steps in DCF
1. Project future Free Cash Flows (typically 5–10 years)
2. Estimate a terminal value for cash flows beyond the projection period
3. Discount all FCFs + terminal value to present using the discount rate
4. Divide by shares outstanding to get intrinsic value per share
5. Compare intrinsic value to current market price:
   - **Market price < Intrinsic value** → stock is undervalued → consider buying
   - **Market price > Intrinsic value** → stock is overvalued → expensive

### Margin of Safety

Never buy at exactly the intrinsic value — build in a **margin of safety** (typically 15–30% below intrinsic value). This protects against errors in FCF estimates.

---

## Putting It All Together

A sound investment decision requires all three stages to pass:
1. Business quality + no red flags (Stage 1)
2. Strong financial metrics across 10 checklist items (Stage 2)
3. Stock trading at or below intrinsic value (Stage 3)

A great business at an expensive price is a poor investment. A mediocre business at a cheap price is also risky. The intersection of quality + fair price = investable opportunity.`,

  keyTerms: [
    {
      term: "DCF (Discounted Cash Flow)",
      definition: "A valuation method that estimates intrinsic value by discounting projected future Free Cash Flows back to present value using a required rate of return (discount rate).",
    },
    {
      term: "Intrinsic Value",
      definition: "The 'true' worth of a stock based on fundamental business value. Estimated using DCF. If market price < intrinsic value, the stock is considered undervalued.",
    },
    {
      term: "Margin of Safety",
      definition: "Buying a stock significantly below its intrinsic value (typically 15–30% below) to protect against estimation errors. Popularised by Benjamin Graham and Warren Buffett.",
    },
    {
      term: "Gross Profit Margin (GPM)",
      definition: "Gross Profit / Net Sales × 100. Gross Profit = Net Sales − Cost of Goods Sold. Minimum benchmark: 20%. ARBL maintains ~28%.",
    },
    {
      term: "Terminal Value",
      definition: "In DCF, the estimated value of all cash flows beyond the explicit forecast period, discounted to present. Typically calculated using the Gordon Growth Model.",
    },
  ],

  facts: [
    {
      statement: "ARBL 5-year revenue CAGR (FY10–FY14) = 18.6%; 5-year PAT CAGR = 17.01%. Both above the preferred 15% threshold.",
      citation: "Varsity Module 3, Ch. 13.4",
    },
    {
      statement: "ARBL Gross Profit Margins (FY10–FY14): 30.7%, 27.9%, 28.7%, 26.7%, 28.0% — all above the 20% minimum benchmark.",
      citation: "Varsity Module 3, Ch. 13.4",
    },
    {
      statement: "DCF is the most popular valuation method to identify the intrinsic value of a business. It discounts future free cash flows to present value.",
      citation: "Varsity Module 3, Ch. 12.4",
    },
    {
      statement: "Stage 1 of equity research (understanding the business) takes approximately 15 hours of thorough reading. Red flags at this stage = stop, find another company.",
      citation: "Varsity Module 3, Ch. 13.3",
    },
    {
      statement: "The investment checklist requires ROE > 25%, Gross Profit Margin > 20%, positive operating cash flow, low debt, and consistent EPS growth.",
      citation: "Varsity Module 3, Ch. 12.4",
    },
  ],

  quizSeed: [
    {
      id: "l4-06-q1",
      question: "ARBL's 5-year Revenue CAGR (FY10–FY14) is approximately 18.6%. Does it pass the investment checklist threshold?",
      options: [
        "No — the threshold is CAGR > 25%",
        "Yes — the preferred threshold is CAGR > 15%",
        "Borderline — the threshold is exactly 18%",
        "Cannot tell without comparing to competitors",
      ],
      correct: 1,
      explanation: "The preferred minimum revenue/PAT CAGR for an investable company is 15%. ARBL at 18.6% clearly passes this threshold.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 13.4",
    },
    {
      id: "l4-06-q2",
      question: "ARBL's Gross Profit Margins are consistently around 28%. What does the checklist say about this?",
      options: [
        "It fails — the benchmark is GPM > 40%",
        "It passes — the minimum is GPM > 20%",
        "It is irrelevant for non-FMCG companies",
        "It needs to be compared to 10 years of data",
      ],
      correct: 1,
      explanation: "The checklist mandates a minimum Gross Profit Margin of 20%. ARBL at ~28% passes comfortably, indicating a sustainable competitive advantage.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 13.4",
    },
    {
      id: "l4-06-q3",
      question: "In DCF analysis, if the intrinsic value is ₹500 and the market price is ₹350, the stock is:",
      options: [
        "Overvalued — do not buy",
        "Fairly valued — hold",
        "Undervalued — potentially a buy (with margin of safety)",
        "Cannot determine without P/E ratio",
      ],
      correct: 2,
      explanation: "Market price (₹350) < Intrinsic value (₹500) — the stock is trading below its fundamental worth, suggesting a potential buying opportunity (subject to margin of safety).",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 12.4",
    },
    {
      id: "l4-06-q4",
      question: "What is the 'margin of safety' concept in value investing?",
      options: [
        "Buying a stop-loss 10% below entry price",
        "Buying a stock significantly below its intrinsic value to protect against estimation errors",
        "Keeping 20% of portfolio in cash",
        "Only investing in companies with zero debt",
      ],
      correct: 1,
      explanation: "Margin of safety = buying at a significant discount to intrinsic value (typically 15–30% below). It protects against errors in your FCF projections.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 12.4",
    },
    {
      id: "l4-06-q5",
      question: "If you find a red flag while researching a company at Stage 1 (understanding the business), you should:",
      options: [
        "Continue to Stage 2 to check if the numbers are good",
        "Apply a 50% margin of safety to compensate",
        "Stop and find a different company — do not proceed",
        "Only investigate further if it is a large-cap stock",
      ],
      correct: 2,
      explanation: "Equity research stages are sequential. A red flag at Stage 1 means you should stop researching that company regardless of how attractive the business looks on the surface.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 13.3",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 3 — Fundamental Analysis (zerodha.com/varsity)",
}

export default lesson
