import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l4-02-pl-statement",
  level: 4,
  order: 2,
  title: "Reading the P&L Statement",
  subtitle: "Revenue, expenses, and profitability — the top and bottom lines",
  xpReward: 28,
  body: `## What is the P&L Statement?

The Profit & Loss (P&L) statement — also called Income Statement, Statement of Operations, or Statement of Earnings — shows what **transpired during a time period** (usually one financial year, April–March in India).

It reports:
1. Revenue (income generated)
2. Expenses incurred to generate that revenue
3. Tax and depreciation
4. Earnings Per Share (EPS)

By default, companies publish current year and previous year numbers side by side, enabling trend comparison.

## ARBL (Amara Raja Batteries) P&L Example — FY14

### Revenue Side (Top Line)

| Item | FY14 (₹ Crs) | FY13 (₹ Crs) |
|---|---|---|
| Sale of Products | 3,804 | 3,294 |
| Less: Excise Duty | (400) | — |
| **Net Sales** | **3,403** | **2,943** |
| Revenue from Services | 30.9 | — |
| Other Operating Revenue | 2.1 | — |
| **Total Operating Revenue** | **3,436** | **2,959** |
| Other Income | 45.5 | — |
| **Total Revenue** | **3,482** | — |

**Other income** (interest on deposits, dividends, insurance claims, royalty) should form a small proportion of total revenue. A large "other income" is a red flag.

### Expense Side

Key expense line items:
- **Cost of materials consumed** — raw material cost (ARBL: ₹2,101 Crs FY14)
- **Employee benefit expenses** — staff salaries and benefits
- **Depreciation & Amortization** — spreading the cost of an asset over its useful life
- **Finance cost** — interest on borrowed money
- **Exceptional items** — one-time items, not part of regular operations

### The Bottom Line

**PBT** (Profit Before Tax) = Total Revenue − Total Expenses − Exceptional Items
**PAT** (Profit After Tax / Net Profit) = PBT − Tax

ARBL FY14: PAT = ₹367 Crs (vs ₹287 Crs in FY13)

### Earnings Per Share (EPS)

EPS = PAT ÷ Total outstanding shares

ARBL: ₹367 Crs ÷ 17.081 Crs shares = **₹21.51 per share**

EPS indicates how much the company earns per share of face value. Higher EPS = better for shareholders. Consistent EPS growth is a positive sign.

## Key Warning Signs in P&L

1. Revenue growing but earnings not — margin compression
2. Earnings growing but not cash flows or sales — possible manipulation
3. Frequent changes in accounting policies — watch out
4. Large "other income" relative to operating revenue — unsustainable
5. High finance cost — company is heavily leveraged

## Standalone vs Consolidated

Always prefer **consolidated P&L** as it reflects the performance of the entire group including subsidiaries. Standalone may look better than the true picture if subsidiaries are loss-making.`,

  keyTerms: [
    {
      term: "P&L Statement (Profit & Loss)",
      definition: "A financial statement showing revenue, expenses, and net profit for a specific period (usually 1 year). Also called Income Statement or Statement of Earnings.",
    },
    {
      term: "Net Revenue from Operations",
      definition: "Total revenue from the company's core business: Net Sales + Revenue from Services + Other Operating Revenue. Does not include 'Other Income'.",
    },
    {
      term: "PAT (Profit After Tax)",
      definition: "The final bottom-line profit after deducting all expenses, depreciation, interest, and taxes. Also called Net Profit.",
    },
    {
      term: "EPS (Earnings Per Share)",
      definition: "PAT divided by total outstanding shares. Measures profitability on a per-share basis. ARBL FY14: ₹367 Crs ÷ 17.081 Crs shares = ₹21.51.",
    },
    {
      term: "Depreciation & Amortization",
      definition: "The accounting method of spreading the cost of a tangible asset (depreciation) or intangible asset (amortization) over its useful life.",
    },
  ],

  facts: [
    {
      statement: "ARBL (Amara Raja Batteries) P&L FY14: Net Sales = ₹3,403 Crs, Total Operating Revenue = ₹3,436 Crs, Other Income = ₹45.5 Crs, Total Revenue = ₹3,482 Crs.",
      citation: "Varsity Module 3, Ch. 4.3",
    },
    {
      statement: "ARBL FY14 cost of raw materials consumed = ₹2,101 Crs (FY13: ₹1,760 Crs) — largest expense line item.",
      citation: "Varsity Module 3, Ch. 5.1",
    },
    {
      statement: "ARBL FY14 PAT = ₹367 Crs; total outstanding shares = 17,08,12,500 (17.081 Crs); EPS = ₹21.51 per share.",
      citation: "Varsity Module 3, Ch. 5.3",
    },
    {
      statement: "PBT = Total Revenue − Total Expense − Exceptional Items; PAT = PBT − applicable taxes.",
      citation: "Varsity Module 3, Ch. 5",
    },
    {
      statement: "A large 'other income' relative to operating revenue is a red flag — it is unsustainable and suggests the company is not generating enough from its core business.",
      citation: "Varsity Module 3, Ch. 4.3",
    },
  ],

  quizSeed: [
    {
      id: "l4-02-q1",
      question: "What is ARBL's EPS for FY14 given PAT = ₹367 Crs and total shares = 17.081 Crs?",
      options: ["₹15.50", "₹18.75", "₹21.51", "₹25.00"],
      correct: 2,
      explanation: "EPS = PAT ÷ Total Shares = 367 / 17.081 = ₹21.51 per share.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 5.3",
    },
    {
      id: "l4-02-q2",
      question: "Which is NOT included in 'Net Revenue from Operations'?",
      options: [
        "Net Sales of products",
        "Revenue from services",
        "Interest on bank deposits",
        "Other operating revenue",
      ],
      correct: 2,
      explanation: "Interest on bank deposits is classified as 'Other Income' — not part of core operations. Net Revenue from Operations = Net Sales + Services Revenue + Other Operating Revenue.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 4.3",
    },
    {
      id: "l4-02-q3",
      question: "What is PAT?",
      options: [
        "Profit before tax but after depreciation",
        "Profit after deducting all expenses including tax",
        "Profit from operations only, before finance cost",
        "Profit available for distribution as dividend",
      ],
      correct: 1,
      explanation: "PAT (Profit After Tax) = PBT − Tax. It is the final bottom-line profit after deducting all expenses: materials, employees, depreciation, finance cost, exceptional items, and tax.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 5",
    },
    {
      id: "l4-02-q4",
      question: "Which warning sign should make an investor investigate further?",
      options: [
        "Revenue growing at 15% year on year",
        "EPS growing consistently with PAT",
        "Earnings growing but cash flows and sales are not",
        "EBITDA margin expanding over 4 years",
      ],
      correct: 2,
      explanation: "If earnings grow but cash flows and sales don't, it suggests accounting manipulation — earnings may be inflated. This is a key red flag.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 11.1",
    },
    {
      id: "l4-02-q5",
      question: "Depreciation in a P&L statement represents:",
      options: [
        "The cost of borrowing money",
        "Loss due to fall in stock price",
        "Spreading the cost of an asset over its useful life",
        "Tax paid to the government",
      ],
      correct: 2,
      explanation: "Depreciation is an accounting method to spread the cost of a tangible asset across its useful life — not a cash outflow in the period it is reported.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 5",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 3 — Fundamental Analysis (zerodha.com/varsity)",
}

export default lesson
