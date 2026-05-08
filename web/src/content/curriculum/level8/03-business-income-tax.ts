import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l8-03-business-income-tax",
  level: 8,
  order: 3,
  title: "Business Income Tax for Traders",
  subtitle: "How F&O and intraday profits are taxed, and what expenses you can deduct",
  xpReward: 32,
  body: `## How Business Income Is Taxed

Unlike capital gains (which are taxed at flat rates), business income from trading is **added to your total income** and taxed at the applicable income tax slab rate.

**India's income tax slabs (new regime FY 2024-25):**

| Total Income | Tax Rate |
|---|---|
| Up to ₹3 lakh | Nil |
| ₹3–7 lakh | 5% |
| ₹7–10 lakh | 10% |
| ₹10–12 lakh | 15% |
| ₹12–15 lakh | 20% |
| Above ₹15 lakh | 30% |

*Verify current slabs each assessment year.*

---

## Computing Tax with Mixed Income

When you have both salary income and trading income, they are combined for slab calculation.

**Example:**
- Salary income: ₹10,00,000
- F&O profits (Non-Speculative Business Income): ₹1,00,000
- Intraday profits (Speculative Business Income): ₹1,00,000
- STCG on equity: ₹75,000

**Tax computation:**
1. Non-speculative + Speculative income added to salary = ₹12,00,000 taxable at slab
2. Tax on ₹12,00,000 (slab) = approximately ₹1,85,000 (under old regime calculation)
3. STCG taxed separately at 20% = ₹75,000 × 20% = ₹15,000
4. **Total tax ≈ ₹2,00,000**

Trading profits push your total income into higher slab brackets — adding ₹2 lakh trading income to ₹10 lakh salary can increase your marginal rate.

---

## Set-Off Rules: What Can Offset What

The Income Tax Act has strict rules on which losses can offset which gains:

| Loss Type | Can Be Set Off Against |
|---|---|
| Speculative loss | **Only** speculative gains |
| Non-speculative loss | Any business income (speculative or non-speculative) |
| Capital loss (STCG) | Any capital gains (LTCG or STCG) |
| Capital loss (LTCG) | Only LTCG |

**Critical rule**: A speculative (intraday equity) loss **cannot** be set off against F&O profits or salary income. It can only reduce speculative gains, either in the same year or carried forward.

**Carry forward periods** (if declared on time):
- Speculative losses: **4 years**
- Non-speculative losses: **8 years**

---

## Deductible Business Expenses

Traders with business income can deduct legitimate trading expenses. These reduce taxable business income before applying the slab rate.

**Allowed deductions:**
| Expense | Deductible? |
|---|---|
| Brokerage and transaction charges | Yes |
| STT (Securities Transaction Tax) | Yes (for business income) |
| Exchange transaction charges | Yes |
| Internet/phone bills (used for trading) | Yes (proportionate) |
| Depreciation on computer/equipment | Yes |
| Advisory fees, subscription charges | Yes |
| Office space rent (if separate) | Yes |
| Salary to any trading assistants | Yes |

**Not allowed:**
- STT cannot be claimed for capital gains (only for business income)
- Personal expenses cannot be mixed in

**Example:**
- F&O profits: ₹2,50,000
- Brokerage paid: ₹15,000
- Internet + phone: ₹12,000
- Computer depreciation: ₹8,000
- **Net taxable F&O income = ₹2,50,000 − ₹35,000 = ₹2,15,000**

---

## Speculative vs Non-Speculative: The Key Differences

| Feature | Speculative | Non-Speculative |
|---|---|---|
| Activity | Intraday equity trading | F&O trading (all timeframes) |
| Tax treatment | Added to total income (slab) | Added to total income (slab) |
| Loss set-off | Only vs speculative gains | Any business income |
| Loss carry forward | 4 years | 8 years |
| Can offset salary? | No | No (business losses only) |

Neither type of trading loss can be set off against salary income — they can only offset other business income or capital gains (within the rules above).`,

  keyTerms: [
    {
      term: "Slab Rate Taxation",
      definition: "Business income (F&O and intraday profits) is added to total income and taxed at the applicable income tax slab rate — not at a flat rate like capital gains.",
    },
    {
      term: "Speculative Business Income",
      definition: "Income from intraday equity trading. Taxed at slab. Losses can only be set off against speculative gains and carried forward for 4 years.",
    },
    {
      term: "Non-Speculative Business Income",
      definition: "Income from F&O trading (all timeframes). Taxed at slab. Losses can be set off against any business income and carried forward for 8 years.",
    },
    {
      term: "Set-Off",
      definition: "Using losses from one income head to reduce taxable income in another. Speculative losses can only offset speculative gains. Non-speculative losses can offset any business income.",
    },
    {
      term: "Business Expense Deduction",
      definition: "Traders with business income can deduct legitimate expenses (brokerage, STT, internet, depreciation) from their trading profits before computing the slab tax.",
    },
  ],

  facts: [
    {
      statement: "Business income from trading is taxed at income tax slab rates — not at flat rates. F&O profits and intraday profits are added to total income (salary, other sources) before computing tax.",
      citation: "Varsity Module 7, Ch. 5.1",
    },
    {
      statement: "Speculative (intraday equity) losses can only be set off against speculative gains — not against F&O profits, salary, or capital gains. They can be carried forward for 4 years.",
      citation: "Varsity Module 7, Ch. 5.3",
    },
    {
      statement: "Non-speculative (F&O) losses can be set off against any business income (including speculative gains) and carried forward for 8 years — but cannot be set off against salary income.",
      citation: "Varsity Module 7, Ch. 5.3",
    },
    {
      statement: "Deductible trading business expenses: brokerage, STT (for business income), exchange charges, internet/phone (proportionate), computer depreciation, advisory fees. These reduce net taxable business income before slab tax applies.",
      citation: "Varsity Module 7, Ch. 5.2",
    },
  ],

  quizSeed: [
    {
      id: "l8-03-q1",
      question: "A trader has F&O profit of ₹1,50,000 and a salary of ₹8,00,000. How is the F&O profit taxed?",
      options: [
        "At 20% flat rate (like STCG)",
        "At 12.5% flat rate (like LTCG)",
        "Added to salary to get ₹9,50,000 total, then taxed at applicable slab rate",
        "Not taxed — F&O profits are exempt up to ₹2 lakh",
      ],
      correct: 2,
      explanation: "F&O income is Non-Speculative Business Income. It is added to total income (₹8,00,000 + ₹1,50,000 = ₹9,50,000) and the entire amount is taxed at the applicable slab rate — not at a flat rate.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 5.1",
    },
    {
      id: "l8-03-q2",
      question: "You have an intraday equity loss of ₹20,000 and F&O profit of ₹30,000 this year. Can the intraday loss offset the F&O profit?",
      options: [
        "Yes — both are business income so they can be set off",
        "No — speculative losses can only offset speculative gains, not non-speculative income",
        "Yes — losses from any trading activity can offset any trading gain",
        "No — trading losses can never be set off in the same year",
      ],
      correct: 1,
      explanation: "Speculative (intraday equity) losses can ONLY be set off against speculative gains. F&O profits are non-speculative — the intraday loss cannot reduce them. The ₹20,000 speculative loss must be carried forward (up to 4 years) to offset future speculative gains.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 5.3",
    },
    {
      id: "l8-03-q3",
      question: "Which of these expenses can a trader with F&O business income deduct from taxable profits?",
      options: [
        "STT paid on F&O trades and brokerage fees",
        "STT paid on capital gains trades and personal phone bills",
        "Only brokerage — other trading costs are personal",
        "Nothing — trading is passive income with no deductions allowed",
      ],
      correct: 0,
      explanation: "Traders with business income can deduct brokerage, STT (for business income transactions), internet/phone (proportionate), computer depreciation, advisory fees, and other legitimate business expenses. This reduces taxable F&O income before slab rates apply.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 5.2",
    },
    {
      id: "l8-03-q4",
      question: "You have a non-speculative (F&O) loss of ₹50,000 this year and a speculative (intraday) profit of ₹20,000. Can you set off the F&O loss?",
      options: [
        "No — F&O losses can only offset F&O profits",
        "Yes — non-speculative losses can be set off against any business income, including speculative gains",
        "Yes — but only 50% can be set off in the same year",
        "No — business losses can never offset business profits in the same year",
      ],
      correct: 1,
      explanation: "Non-speculative (F&O) losses can be set off against any business income — including speculative gains. After this set-off, the remaining ₹30,000 F&O loss (₹50,000 − ₹20,000) can be carried forward for 8 years.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 5.3",
    },
    {
      id: "l8-03-q5",
      question: "For how many years can non-speculative (F&O) losses be carried forward, and what can they offset?",
      options: [
        "4 years — only against F&O profits",
        "8 years — against any business income (speculative or non-speculative)",
        "4 years — against any income including salary",
        "8 years — only against non-speculative income",
      ],
      correct: 1,
      explanation: "Non-speculative (F&O) losses can be carried forward for 8 years and set off against any business income — including speculative gains from intraday trading. They cannot be set off against salary or capital gains.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 5.3",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 7 — Markets & Taxation (zerodha.com/varsity). Tax slabs per FY 2024-25. Always consult a Chartered Accountant before filing.",
}

export default lesson
