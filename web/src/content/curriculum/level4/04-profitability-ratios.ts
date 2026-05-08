import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l4-04-profitability-ratios",
  level: 4,
  order: 4,
  title: "Profitability Ratios",
  subtitle: "EBITDA margin, PAT margin, ROE, and ROCE",
  xpReward: 30,
  body: `## Why Financial Ratios?

A single financial number in isolation means nothing. A ratio only gains meaning when compared over time (trend) or against a competitor (benchmarking). This is the fundamental principle of ratio analysis.

---

## EBITDA Margin (Operating Profit Margin)

**EBITDA** = Earnings Before Interest, Tax, Depreciation & Amortization

It measures the efficiency of the company's operating model.

**Formula**:
EBITDA = Operating Revenue − Operating Expense
Where:
- Operating Revenue = Total Revenue − Other Income
- Operating Expense = Total Expense − Finance Cost − Depreciation

**EBITDA Margin** = EBITDA ÷ Operating Revenue

### ARBL Example (FY14):
Operating Revenue = 3482 − 46 = **₹3,436 Crs**
Operating Expense = 2942 − 0.7 − 65 = **₹2,876 Crs**
EBITDA = 3436 − 2876 = **₹560 Crs**
EBITDA Margin = 560 / 3436 = **16.3%**

**4-year trend** (shows consistency):
| Year | Revenue (₹Crs) | EBITDA (₹Crs) | EBITDA Margin |
|---|---|---|---|
| 2011 | 1,761 | 257 | 14.6% |
| 2012 | 2,364 | 340 | 14.4% |
| 2013 | 2,959 | 451 | 15.2% |
| 2014 | 3,437 | 560 | 16.3% |

EBITDA CAGR (2011–2014) = **21%** — impressive.

---

## PAT Margin

PAT Margin = PAT ÷ Total Revenue

ARBL FY14: 367 / 3482 = **10.5%**

**4-year trend**:
| Year | PAT (₹Crs) | PAT Margin |
|---|---|---|
| 2011 | 148 | 8.4% |
| 2012 | 215 | 8.9% |
| 2013 | 287 | 9.6% |
| 2014 | 367 | 10.5% |

4-year PAT CAGR = **25.48%** — both PAT and PAT margin are expanding. Very positive.

---

## Return on Equity (ROE)

ROE = PAT ÷ Shareholders' Equity × 100

ROE measures the **return generated for every rupee invested by shareholders**. It shows how efficiently management uses equity capital to generate profits.

- Average ROE of top Indian companies: **14–16%**
- Preferred minimum for investment: **≥18%**
- ROE > 25% is excellent

High ROE + low debt = best combination.
High ROE + high debt = dangerous (leverage is inflating ROE).

---

## Return on Capital Employed (ROCE)

ROCE = EBIT ÷ Capital Employed × 100
Where Capital Employed = Total Assets − Current Liabilities

ROCE measures efficiency of **all capital** (equity + debt) in generating operating profit. It is useful for comparing capital-intensive businesses.

ROCE > cost of capital = company is creating value.

---

## Return on Assets (ROA)

ROA = PAT ÷ Total Assets × 100

Measures how efficiently the company generates profit from its asset base.

---

## Key Takeaways on Ratios

1. Always track trends — a rising EBITDA margin over 4 years shows management efficiency
2. Always compare with peers — 16.3% EBITDA margin only becomes meaningful when compared to Exide Batteries
3. High ROE must be accompanied by low D/E — high ROE from leverage is not sustainable
4. PAT growing faster than revenue (PAT margin expansion) is a strong positive signal`,

  keyTerms: [
    {
      term: "EBITDA Margin",
      definition: "EBITDA divided by Operating Revenue. Measures operating efficiency — how much operating profit the company retains per rupee of revenue, before interest, tax, and depreciation.",
    },
    {
      term: "PAT Margin",
      definition: "Net Profit After Tax divided by Total Revenue. The final profitability measure after all expenses including interest and tax.",
    },
    {
      term: "Return on Equity (ROE)",
      definition: "PAT divided by Shareholders' Equity. Measures profit generated per rupee of shareholder capital. Average top Indian company ROE = 14–16%. Preferred: ≥18%.",
    },
    {
      term: "Return on Capital Employed (ROCE)",
      definition: "EBIT divided by Capital Employed (Total Assets − Current Liabilities). Measures efficiency of total capital (debt + equity) in generating operating profit.",
    },
    {
      term: "EBITDA CAGR",
      definition: "The compounded annual growth rate of EBITDA over multiple years. ARBL's 4-year EBITDA CAGR (2011–2014) was 21%.",
    },
  ],

  facts: [
    {
      statement: "ARBL FY14 EBITDA = ₹560 Crs; EBITDA Margin = 16.3%. Four-year EBITDA CAGR = 21% (₹257 Crs in 2011 to ₹560 Crs in 2014).",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      statement: "ARBL PAT margin trend: 8.4% (2011), 8.9% (2012), 9.6% (2013), 10.5% (2014). Four-year PAT CAGR = 25.48%.",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      statement: "Average ROE of top Indian companies is 14–16%. Personally preferred minimum for investment is 18% or above.",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      statement: "A ratio in isolation is meaningless — it must be compared over time (trend) or against peers (benchmark) to be useful.",
      citation: "Varsity Module 3, Ch. 9.3",
    },
  ],

  quizSeed: [
    {
      id: "l4-04-q1",
      question: "Using ARBL data: Operating Revenue = ₹3,436 Crs, EBITDA = ₹560 Crs. What is the EBITDA margin?",
      options: ["10.5%", "14.6%", "16.3%", "21.0%"],
      correct: 2,
      explanation: "EBITDA Margin = EBITDA / Operating Revenue = 560 / 3436 = 16.3%.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      id: "l4-04-q2",
      question: "ARBL's PAT grew from ₹148 Crs (2011) to ₹367 Crs (2014). The 4-year PAT CAGR is approximately:",
      options: ["15.2%", "20.0%", "25.48%", "30.0%"],
      correct: 2,
      explanation: "4-year PAT CAGR = [(367/148)^(1/3) − 1] = 25.48%. PAT margin also expanded from 8.4% to 10.5% — a positive sign.",
      difficulty: "hard",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      id: "l4-04-q3",
      question: "What is the average ROE range of top Indian companies?",
      options: ["5–10%", "10–14%", "14–16%", "20–25%"],
      correct: 2,
      explanation: "The average ROE of top Indian companies varies between 14–16%. Investors should look for companies with ROE of 18% or above for strong returns.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      id: "l4-04-q4",
      question: "A company has high ROE but also very high debt. What is the correct interpretation?",
      options: [
        "High ROE is always positive regardless of debt",
        "High ROE is only impressive if it comes from operational efficiency, not leverage",
        "High debt always means poor management",
        "ROE and debt are unrelated metrics",
      ],
      correct: 1,
      explanation: "High debt inflates ROE because equity (denominator) is lower. Always check ROE alongside D/E ratio. High ROE from leverage is risky; high ROE from operating efficiency is desirable.",
      difficulty: "hard",
      citation: "Varsity Module 3, Ch. 9.3",
    },
    {
      id: "l4-04-q5",
      question: "Which statement is true about financial ratios?",
      options: [
        "A ratio's absolute value is always meaningful on its own",
        "Ratios are only useful when compared over time or against peers",
        "Higher ratios are always better",
        "Ratios only apply to manufacturing companies",
      ],
      correct: 1,
      explanation: "A ratio in isolation conveys little. A 16.3% EBITDA margin is only meaningful when tracked over 4 years (trend) or compared to Exide Batteries (benchmark).",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 9.3",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 3 — Fundamental Analysis (zerodha.com/varsity)",
}

export default lesson
