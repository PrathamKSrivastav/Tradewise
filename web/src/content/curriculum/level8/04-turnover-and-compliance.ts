import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l8-04-turnover-compliance",
  level: 8,
  order: 4,
  title: "Turnover, Audit & Compliance",
  subtitle: "How trading turnover is calculated and when a tax audit is required",
  xpReward: 30,
  body: `## Why Turnover Matters for Traders

Trading turnover determines whether you need a **tax audit** under Section 44AB of the Income Tax Act. The audit threshold, the method of computing turnover, and the associated compliance requirements differ by activity type.

---

## How to Calculate Trading Turnover

The Income Tax Act defines turnover differently for different types of trading:

### Speculative (Intraday Equity) Turnover
The sum of the **absolute value of all profits and losses** across each trade.

- Trade 1: +₹5,000 → contribution = ₹5,000
- Trade 2: −₹3,000 → contribution = ₹3,000
- Trade 3: +₹1,500 → contribution = ₹1,500
- **Speculative Turnover = ₹9,500**

*(Note: only differences/P&L are summed, not the actual buy/sell values.)*

### Non-Speculative (F&O) Turnover
The sum of absolute favourable and unfavourable differences, **plus premium received on options sold**.

- Futures profit on Trade A: +₹8,000 → ₹8,000
- Futures loss on Trade B: −₹4,500 → ₹4,500
- Options premium received (short trade): ₹2,200 → ₹2,200
- **F&O Turnover = ₹14,700**

### Delivery-Based (Capital Gains) Turnover
The **total sales value** of all equity sold.

- Sold 50 shares × ₹920 = ₹46,000
- Sold 100 shares × ₹1,240 = ₹1,24,000
- **Delivery Turnover = ₹1,70,000**

---

## Section 44AD: Presumptive Taxation

Section 44AD offers an option to declare a **presumptive income of 8% of turnover** without maintaining detailed books of accounts — but only for businesses with turnover below ₹2 crore.

**For most traders, Section 44AD does not apply** because the actual profit is declared (which may be higher or lower than 8%).

---

## When Is a Tax Audit Required?

Under Section 44AB, a tax audit is **mandatory** if:

| Condition | Audit Required? |
|---|---|
| Total trading turnover > ₹1 crore (all trading) | Yes |
| Declared profit < 8% of total turnover AND total income > basic exemption limit (₹2.5L) | Yes |
| Total income < ₹2.5 lakh (regardless of turnover) | No |

**Practical example:**
- F&O turnover: ₹90 lakh; F&O profit: ₹3 lakh
- 8% of ₹90 lakh = ₹7.2 lakh; declared profit (₹3 lakh) < 8% threshold
- If total income > ₹2.5 lakh → **Tax audit required** even though turnover < ₹1 crore

A tax audit must be conducted by a **Chartered Accountant** and filed by **September 30th** (one month earlier than the regular July 31st deadline for non-audit cases).

---

## Books of Account: What Traders Must Maintain

Traders with business income must maintain:

1. **Trading P&L Statement** — profit/loss from each trading segment
2. **Balance Sheet** — assets (cash, equity holdings) and liabilities
3. **Bank statements** — all transfers related to trading activity
4. **Broker contract notes** — evidence of all trades

Most traders get a consolidated **Tax P&L statement from their broker** (e.g., Zerodha Console) which covers the first two requirements. This is the starting point for tax filing.

---

## Common Compliance Errors to Avoid

| Error | Consequence |
|---|---|
| Not declaring trading activity | IT notice (PAN-mapped exchange data is visible to IT dept) |
| Using ITR 1/2 when F&O or intraday was done | Defective return notice; must refile with ITR 4 |
| Missing July 31st deadline with losses | Losses cannot be carried forward |
| Not paying advance tax | Interest under Section 234B and 234C |
| Mixing personal and trading bank accounts | Makes books difficult to verify during audit |

---

## Summary: Trader's Compliance Checklist

- [ ] Classify all income correctly (LTCG/STCG/Speculative/Non-Speculative)
- [ ] Calculate turnover by activity type
- [ ] Check if tax audit is required
- [ ] Deduct eligible business expenses
- [ ] Pay advance tax by installment deadlines
- [ ] File ITR 4 by July 31st (non-audit) or Sep 30th (audit)
- [ ] Declare all losses even if net loss for the year
- [ ] Consult a CA for complex cases (multiple income heads, high turnover)`,

  keyTerms: [
    {
      term: "Trading Turnover",
      definition: "For speculative/F&O: absolute sum of all P&L differences (not the buy/sell value itself). For delivery: total sales value. Determines whether a tax audit is required.",
    },
    {
      term: "Section 44AB (Tax Audit)",
      definition: "Requires a CA-conducted audit if trading turnover > ₹1 crore, OR declared profit < 8% of turnover AND total income > ₹2.5 lakh. Audit return deadline: September 30th.",
    },
    {
      term: "Section 44AD",
      definition: "Presumptive taxation: declare 8% of turnover as profit without detailed books, for businesses with turnover < ₹2 crore. Most traders use actual profit declaration instead.",
    },
    {
      term: "Tax P&L Statement",
      definition: "A consolidated report from the broker showing all realized profits, losses, and charges for the financial year. Starting point for traders filing income tax returns.",
    },
  ],

  facts: [
    {
      statement: "Speculative (intraday) turnover = sum of absolute P&L differences per trade (not buy/sell values). F&O turnover = sum of absolute differences + option premiums received. Delivery turnover = total sale value.",
      citation: "Varsity Module 7, Ch. 6.1",
    },
    {
      statement: "Tax audit under Section 44AB is mandatory if turnover > ₹1 crore, OR if declared profit < 8% of turnover AND total income > ₹2.5 lakh. The audit must be done by a CA and filed by Sep 30th.",
      citation: "Varsity Module 7, Ch. 6.2",
    },
    {
      statement: "Traders with business income must maintain: trading P&L statement, balance sheet, bank statements, and broker contract notes. Most brokers provide a consolidated Tax P&L report to meet these requirements.",
      citation: "Varsity Module 7, Ch. 6.3",
    },
    {
      statement: "Filing deadline: non-audit cases — July 31st; audit cases — September 30th. Losses can only be carried forward if declared by the applicable deadline. Missing the deadline forfeits loss carry-forward rights.",
      citation: "Varsity Module 7, Ch. 3.3",
    },
  ],

  quizSeed: [
    {
      id: "l8-04-q1",
      question: "A trader makes 3 intraday trades: +₹4,000, −₹2,500, +₹1,000. What is the speculative turnover?",
      options: ["₹2,500 (net profit)", "₹7,500 (sum of absolute P&L)", "₹15,000 (buy + sell values)", "₹4,000 (only profits counted)"],
      correct: 1,
      explanation: "Speculative turnover = sum of absolute values of each trade's P&L. |₹4,000| + |−₹2,500| + |₹1,000| = ₹4,000 + ₹2,500 + ₹1,000 = ₹7,500. Net profit (₹2,500) is not the turnover figure.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 6.1",
    },
    {
      id: "l8-04-q2",
      question: "A trader has F&O turnover of ₹80 lakh and declared F&O profit of ₹2 lakh. Their total income is ₹12 lakh. Is a tax audit required?",
      options: [
        "No — turnover is below ₹1 crore",
        "Yes — declared profit (₹2L) is below 8% of turnover (₹6.4L) and total income > ₹2.5L",
        "Only if the broker reports it to the IT department",
        "No — audits are only for turnover above ₹5 crore",
      ],
      correct: 1,
      explanation: "8% of ₹80 lakh = ₹6.4 lakh. Declared profit ₹2 lakh < ₹6.4 lakh (presumptive threshold). Total income ₹12 lakh > ₹2.5 lakh basic exemption. Both conditions trigger mandatory audit under Section 44AB — even though turnover < ₹1 crore.",
      difficulty: "hard",
      citation: "Varsity Module 7, Ch. 6.2",
    },
    {
      id: "l8-04-q3",
      question: "What is the filing deadline for a trader whose income requires a tax audit under Section 44AB?",
      options: [
        "July 31st — same as all taxpayers",
        "March 31st — end of financial year",
        "September 30th — one month later than regular deadline",
        "December 31st — calendar year end",
      ],
      correct: 2,
      explanation: "Non-audit cases: July 31st. Audit cases (Section 44AB): September 30th. The audit must be completed and filed by this extended deadline. Missing it forfeits loss carry-forward rights and attracts penalties.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 6.2",
    },
    {
      id: "l8-04-q4",
      question: "For delivery-based equity trading (capital gains), how is the turnover calculated?",
      options: [
        "Sum of absolute P&L differences per trade",
        "Total buy value of all stocks purchased",
        "Total sale value of all stocks sold",
        "Net profit from all equity sales",
      ],
      correct: 2,
      explanation: "Delivery (capital gains) turnover = total sales value. Unlike speculative/F&O where only P&L differences count, delivery turnover counts the full selling price of every equity sold during the year.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 6.1",
    },
    {
      id: "l8-04-q5",
      question: "Which documents must a trader primarily maintain to support their business income tax filing?",
      options: [
        "Only the broker's annual statement is needed",
        "Trading P&L, balance sheet, bank statements, and broker contract notes",
        "Only the Form 16 from their employer",
        "No documentation needed — the IT system has all exchange data",
      ],
      correct: 1,
      explanation: "Traders with business income must maintain: (1) Trading P&L statement, (2) Balance sheet, (3) Bank statements, (4) Broker contract notes. Most brokers provide a Tax P&L report that covers the first two. Documentation is essential if the return is audited.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 6.3",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 7 — Markets & Taxation (zerodha.com/varsity). Always consult a Chartered Accountant before filing.",
}

export default lesson
