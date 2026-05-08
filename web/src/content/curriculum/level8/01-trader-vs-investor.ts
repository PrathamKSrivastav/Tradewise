import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l8-01-trader-vs-investor",
  level: 8,
  order: 1,
  title: "Trader vs Investor: Tax Classification",
  subtitle: "How you classify your market activity determines how you are taxed",
  xpReward: 28,
  body: `## Why Classification Matters

The Income Tax Department taxes different types of market activity differently. Before filing your returns, you must first classify yourself as a **trader**, **investor**, or **both**. Getting this wrong can mean paying more tax than required — or receiving an IT notice.

The IT department has access to all your market activity through the exchanges, all mapped to your PAN. Not declaring trading activity is risky.

---

## The Four Income Categories

All market-related income falls under one of four categories:

| Category | What It Is | Tax Treatment |
|---|---|---|
| **Long Term Capital Gain (LTCG)** | Equity held > 1 year, sold on exchange | Flat 12.5% on gains above ₹1.25 lakh |
| **Short Term Capital Gain (STCG)** | Equity held > 1 day but < 1 year, on exchange | Flat 20% |
| **Speculative Business Income** | Intraday equity trading (no delivery) | Added to total income, taxed at slab |
| **Non-Speculative Business Income** | F&O trading (all timeframes), active delivery equity | Added to total income, taxed at slab |

*Note: Tax rates change per annual Union Budget. Verify current rates each year.*

---

## Investor vs Trader: The CBDT Circular

CBDT (Central Board of Direct Taxes) states:
- **Investor**: buys stocks with intent to earn through dividends
- **Trader**: buys and sells stocks with intent to profit from price rise

This definition is intentionally vague. The AO (Assessing Officer) has discretion. However, certain rules are unambiguous:

**Compulsory Trader Classification:**
- **F&O trading** (equity, commodity, currency) → always Non-Speculative Business Income
- **Intraday equity trading** → always Speculative Business Income
- If trading is your **primary source of income** → classify all activity as business income

**Can be Investor:**
- Long-term delivery holdings (>1 year) → LTCG
- Low-frequency delivery trades (a few times a year) → STCG

---

## Can You Be Both?

Yes. CBDT clarifies that you can be a **trader and investor simultaneously**:
- Hold some stocks as long-term investments (LTCG)
- Trade F&O actively (Non-Speculative Business Income)
- Do intraday equity (Speculative Business Income)

You must **clearly demarcate** trading and investment portfolios. Just because you trade F&O does not automatically convert your long-term holdings into business income.

**Consistency is key** — don't switch between investor/trader classification across years.

---

## Why Declare Losses Too?

Many traders skip filing when they have losses. This is a mistake.

Losses **must be declared** on time (by July 31st for non-audit cases) to:
1. Carry forward losses to offset future gains
2. Avoid IT scrutiny notices when the IT system detects exchange activity on your PAN but no declaration

Speculative losses → carry forward 4 years (offset only against speculative gains)
Non-speculative losses → carry forward 8 years (offset against non-speculative gains)

---

## Which ITR Form?

| Your Situation | ITR Form |
|---|---|
| Only capital gains (no business income) | ITR 2 |
| Business income (F&O or intraday) + capital gains | **ITR 4** |
| Only salary and LTCG/STCG | ITR 2 |

If you traded F&O or intraday equity **even once** in a financial year, you must use ITR 4 — even if you are salaried.

*Always consult a Chartered Accountant before filing.*`,

  keyTerms: [
    {
      term: "Long Term Capital Gain (LTCG)",
      definition: "Profit from equity or equity MF held on exchange for more than 1 year. Taxed at 12.5% on gains above ₹1.25 lakh (Budget 2024 rates). Verify current rate each year.",
    },
    {
      term: "Short Term Capital Gain (STCG)",
      definition: "Profit from equity or equity MF held > 1 day but < 1 year, sold on exchange. Taxed at flat 20% (Budget 2024 rate). Verify current rate each year.",
    },
    {
      term: "Speculative Business Income",
      definition: "Income from intraday equity trading (no delivery taken). Added to total income and taxed at slab rate. Losses carry forward 4 years, set-off only against speculative gains.",
    },
    {
      term: "Non-Speculative Business Income",
      definition: "Income from F&O trading (all timeframes) and active delivery equity trading. Added to total income, taxed at slab. Losses carry forward 8 years, set-off against any non-speculative business income.",
    },
    {
      term: "PAN Mapping",
      definition: "All exchange transactions are linked to your PAN (Permanent Account Number). The IT department can verify your trading activity even without your disclosure.",
    },
  ],

  facts: [
    {
      statement: "F&O trading (equity, commodity, currency) is always categorized as Non-Speculative Business Income. Intraday equity trading is Speculative Business Income. These are defined under Section 43(5) of the Income Tax Act, 1961.",
      citation: "Varsity Module 7, Ch. 3.1",
    },
    {
      statement: "You can be a trader and investor simultaneously. CBDT clarifies: F&O/intraday trading doesn't automatically convert your long-term equity holdings into business income — but you must demarcate both portfolios clearly.",
      citation: "Varsity Module 7, Ch. 3.3",
    },
    {
      statement: "Losses must be declared on time (July 31st for non-audit) even if they are losses. Undeclared losses cannot be carried forward. Hiding trading activity when the IT system detects PAN-linked exchange activity can trigger scrutiny notices.",
      citation: "Varsity Module 7, Ch. 3.3",
    },
    {
      statement: "If you traded F&O or intraday equity even once, you must use ITR 4 to file income tax returns — even if salaried. You cannot use ITR 1 or ITR 2 in this case.",
      citation: "Varsity Module 7, Ch. 5.9",
    },
  ],

  quizSeed: [
    {
      id: "l8-01-q1",
      question: "How is income from F&O trading (futures and options) classified under Indian tax law?",
      options: [
        "Long Term Capital Gain — taxed at 12.5%",
        "Short Term Capital Gain — taxed at 20%",
        "Non-Speculative Business Income — taxed at slab rate",
        "Speculative Business Income — taxed at slab rate",
      ],
      correct: 2,
      explanation: "F&O trading income is explicitly categorized as Non-Speculative Business Income under Section 43(5) of the Income Tax Act. It is added to total income and taxed at the applicable income tax slab — not at a flat rate.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 3.1",
    },
    {
      id: "l8-01-q2",
      question: "You trade F&O actively AND hold a few blue-chip stocks for 3 years. How should you classify your income?",
      options: [
        "All income must be business income since you trade F&O",
        "F&O as Non-Speculative Business Income, long-term holdings as LTCG — clearly demarcated",
        "All income as LTCG — the holding period is what matters",
        "F&O as STCG, long-term holdings as LTCG",
      ],
      correct: 1,
      explanation: "CBDT allows being both a trader and investor simultaneously. F&O → Non-Speculative Business Income; long-term equity holdings → LTCG. Both portfolios must be clearly demarcated in your filing.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 3.3",
    },
    {
      id: "l8-01-q3",
      question: "Why must even loss-making traders file their income tax returns on time?",
      options: [
        "The IT department penalizes any undeclared PAN-mapped exchange activity",
        "Losses must be declared by the due date to carry them forward and offset future gains",
        "Trading losses attract a flat 5% penalty tax",
        "Loss filing is optional — only profits need to be declared",
      ],
      correct: 1,
      explanation: "Losses can only be carried forward to offset future gains if declared on time (by the due date). Missing the deadline forfeits the right to carry forward. Also, the IT system detects PAN-linked exchange activity — undeclared activity risks scrutiny notices.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 3.3",
    },
    {
      id: "l8-01-q4",
      question: "Which ITR form must a salaried employee use if they also traded Nifty futures during the year?",
      options: ["ITR 1 — only for salary", "ITR 2 — for salary + capital gains", "ITR 3 — for business income", "ITR 4 — required when any F&O or intraday trading was done"],
      correct: 3,
      explanation: "F&O trading creates Non-Speculative Business Income, which requires ITR 4 (or ITR 3 for individual/HUF). Even one F&O trade means you cannot use ITR 1 or ITR 2.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 5.9",
    },
    {
      id: "l8-01-q5",
      question: "Intraday equity trading income is classified as:",
      options: [
        "Long Term Capital Gain",
        "Short Term Capital Gain",
        "Speculative Business Income",
        "Non-Speculative Business Income",
      ],
      correct: 2,
      explanation: "Intraday equity trading (buying and selling on the same day, no delivery) is Speculative Business Income under Section 43(5). It is taxed at slab rates. Losses can only be offset against speculative gains and carried forward for 4 years.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 3.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 7 — Markets & Taxation (zerodha.com/varsity). Tax rates verified per Budget 2024. Always consult a CA before filing.",
}

export default lesson
