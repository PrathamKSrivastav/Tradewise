import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l5-05-portfolio-risk-sharpe",
  level: 5,
  order: 5,
  title: "Portfolio Risk & the Sharpe Ratio",
  subtitle: "Measuring risk-adjusted returns and optimising your portfolio",
  xpReward: 28,
  body: `## Portfolio Returns

When you hold multiple stocks, your portfolio return is the **weighted average** of individual stock returns.

**Example** — Infosys (22% expected return) + Biocon (15% expected return), equally weighted:
= 50% × 22% + 50% × 15% = 11% + 7.5% = **18.5%**

If weights change to 70% Infosys / 30% Biocon:
= 70% × 22% + 30% × 15% = 15.4% + 4.5% = **19.9%**

As investment weights vary, **both risk and return characteristics change**. Portfolio optimisation finds the weight combination that achieves the best risk/return trade-off.

---

## Portfolio Optimisation Concepts

### Minimum Variance Portfolio
The combination of stock weights that produces the **lowest possible portfolio risk (variance)**. Suitable for highly risk-averse investors.

### Maximum Return Portfolio
The weight combination that produces the **highest possible return**. Comes with the highest risk.

### Efficient Frontier
The set of all optimal portfolios — for any given level of risk, the frontier shows the maximum achievable return. Portfolios below the frontier are sub-optimal (too much risk for their return).

---

## The Sharpe Ratio

Developed by William Sharpe. Measures **risk-adjusted return** — how much excess return you earn per unit of risk taken.

**Formula**:
Sharpe Ratio = (Portfolio Return − Risk-Free Return) / Portfolio Standard Deviation

Where:
- **Portfolio Return** = actual return of your trading/portfolio
- **Risk-Free Return** = return from a risk-free asset (typically Indian government bond yield, ~7%)
- **Standard Deviation** = volatility of portfolio returns

### Interpretation

| Sharpe Ratio | Meaning |
|---|---|
| < 0 | Worse than risk-free investment — no reason to take this risk |
| 0 to 0.5 | Acceptable but poor |
| 0.5 to 1.0 | Adequate |
| **> 1.0** | **Good — earning more than 1 unit of return per unit of risk** |
| > 2.0 | Excellent |
| > 3.0 | Outstanding |

### Example

Portfolio return = 18%, Risk-free return = 7%, SD = 8%
Sharpe = (18 − 7) / 8 = 11/8 = **1.375** — Good risk-adjusted return.

### Why Sharpe Ratio Matters

Two traders both earn 20% annual returns. But Trader A achieves this with low volatility (SD = 6%), while Trader B has high volatility (SD = 18%):
- Trader A Sharpe = (20-7)/6 = **2.17** — Excellent
- Trader B Sharpe = (20-7)/18 = **0.72** — Adequate

Trader A is producing superior risk-adjusted returns.

---

## Drawdown

Drawdown = the decline from a portfolio's peak value to its lowest point.

**Maximum Drawdown** = largest peak-to-trough decline in portfolio history.

Example: Portfolio peaks at ₹10,00,000, falls to ₹7,50,000 = **25% maximum drawdown**.

A good risk management system should:
1. Limit maximum drawdown to an acceptable level (e.g., < 20%)
2. Track drawdown alongside Sharpe Ratio
3. Adjust position sizing if drawdown exceeds threshold

---

## Asset Allocation Impact on Risk

The asset mix between equity, debt, and gold has a profound impact on both returns and risk:

| Allocation | Expected Return | Risk Level |
|---|---|---|
| 100% equity | Highest | Highest |
| 70% equity + 30% debt | High | Medium-high |
| 50% equity + 50% debt | Medium | Medium |
| 30% equity + 70% debt | Lower | Low-medium |
| 100% debt | Lowest | Lowest |

**Rule of thumb for equity allocation by age**: 100 − Age = % in equity.
Example: 30-year-old → 70% equity, 30% debt.`,

  keyTerms: [
    {
      term: "Sharpe Ratio",
      definition: "(Portfolio Return − Risk-Free Return) / Standard Deviation. Measures risk-adjusted return. Sharpe > 1.0 = good. Sharpe > 2.0 = excellent.",
    },
    {
      term: "Minimum Variance Portfolio",
      definition: "The combination of asset weights that produces the least possible portfolio variance (risk). Optimal for highly risk-averse investors.",
    },
    {
      term: "Efficient Frontier",
      definition: "The set of portfolios offering the maximum return for each level of risk. Portfolios below the frontier are sub-optimal.",
    },
    {
      term: "Maximum Drawdown",
      definition: "The largest decline from a portfolio's peak value to its lowest trough. A key risk metric — good risk management limits drawdown to acceptable levels.",
    },
    {
      term: "Asset Allocation",
      definition: "The distribution of investments across asset classes (equity, debt, gold). Drives both expected return and risk level. Rule of thumb: 100 minus age = % in equity.",
    },
  ],

  facts: [
    {
      statement: "Portfolio return example: Infosys (22%) + Biocon (15%) at 50/50 = 18.5%. At 70/30 Infosys/Biocon = 19.9%.",
      citation: "Varsity Module 9, Ch. 8.1",
    },
    {
      statement: "Sharpe Ratio = (Portfolio Return − Risk-Free Rate) / Standard Deviation. Sharpe > 1.0 = good, > 2.0 = excellent, < 0 = worse than risk-free.",
      citation: "Varsity Module 9, Ch. 8",
    },
    {
      statement: "Maximum drawdown = largest peak-to-trough decline. A portfolio that peaks at ₹10 lakhs and falls to ₹7.5 lakhs has a 25% drawdown.",
      citation: "Varsity Module 9, Ch. 8",
    },
    {
      statement: "Asset allocation rule of thumb: 100 minus your age = percentage to allocate to equity. A 30-year-old allocates 70% equity, 30% debt.",
      citation: "Varsity Module 9, Ch. 8",
    },
  ],

  quizSeed: [
    {
      id: "l5-05-q1",
      question: "Portfolio return = 18%, Risk-free = 7%, Standard deviation = 8%. What is the Sharpe Ratio?",
      options: ["0.72", "1.0", "1.375", "2.25"],
      correct: 2,
      explanation: "Sharpe = (18 − 7) / 8 = 11/8 = 1.375 — classified as a good risk-adjusted return (Sharpe > 1.0).",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 8",
    },
    {
      id: "l5-05-q2",
      question: "Portfolio A: return 20%, SD = 6%. Portfolio B: return 20%, SD = 18%. Risk-free = 7%. Which is superior?",
      options: [
        "Portfolio B — same return, doesn't matter",
        "Portfolio A — higher Sharpe ratio (2.17 vs 0.72)",
        "Portfolio B — higher absolute return per unit of SD",
        "They are equal in risk-adjusted terms",
      ],
      correct: 1,
      explanation: "Portfolio A Sharpe = (20−7)/6 = 2.17 (Excellent). Portfolio B Sharpe = (20−7)/18 = 0.72 (Adequate). Same return, but A achieves it with far lower volatility — clearly superior.",
      difficulty: "hard",
      citation: "Varsity Module 9, Ch. 8",
    },
    {
      id: "l5-05-q3",
      question: "An equally weighted portfolio of Infosys (22% return) and Biocon (15% return) is expected to return:",
      options: ["15%", "17%", "18.5%", "22%"],
      correct: 2,
      explanation: "50% × 22% + 50% × 15% = 11% + 7.5% = 18.5%.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 8.1",
    },
    {
      id: "l5-05-q4",
      question: "A portfolio peaks at ₹10,00,000 and falls to ₹7,50,000. What is the drawdown?",
      options: ["10%", "15%", "25%", "33%"],
      correct: 2,
      explanation: "Drawdown = (Peak − Trough) / Peak = (10,00,000 − 7,50,000) / 10,00,000 = 2,50,000 / 10,00,000 = 25%.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 8",
    },
    {
      id: "l5-05-q5",
      question: "Using the 'Rule of 100' for a 35-year-old investor, what percentage should be in equity?",
      options: ["35%", "50%", "65%", "75%"],
      correct: 2,
      explanation: "100 − Age = % in equity. 100 − 35 = 65% in equity, 35% in debt/fixed income.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 8",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 9 — Risk Management & Trading Psychology (zerodha.com/varsity)",
}

export default lesson
