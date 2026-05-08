import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l8-02-capital-gains-tax",
  level: 8,
  order: 2,
  title: "Capital Gains Tax",
  subtitle: "LTCG, STCG, FIFO rules, and STT — the investor's tax guide",
  xpReward: 30,
  body: `## Short Term vs Long Term Capital Gains

When you sell equity shares or equity mutual funds purchased on an exchange, your gains are taxed as capital gains — not as business income.

The holding period determines which rate applies:

| Holding Period | Classification | Tax Rate (Budget 2024) |
|---|---|---|
| More than 1 year | Long Term Capital Gain (LTCG) | 12.5% on gains **above ₹1.25 lakh** |
| More than 1 day, less than 1 year | Short Term Capital Gain (STCG) | Flat 20% |

*Gains are calculated as: Sale Price − Purchase Price − Transaction Costs (excluding STT)*

*Tax rates are subject to change annually. Verify rates each year before filing.*

---

## LTCG in Practice

Under Budget 2024:
- First ₹1.25 lakh of LTCG per year is **exempt** (no tax)
- Gains above ₹1.25 lakh are taxed at **12.5%**
- **No indexation benefit** for equity/equity MF (indexation applies only to debt MF and real estate)

**Example:**
- You buy Infosys shares in 2022, sell in 2024 at a ₹2,00,000 gain
- Taxable LTCG = ₹2,00,000 − ₹1,25,000 = ₹75,000
- Tax = 12.5% × ₹75,000 = **₹9,375**

---

## Indexation (Debt Mutual Funds — Pre-2023 Rules)

For debt mutual funds purchased before April 2023, indexation adjusts the purchase price for inflation using the **Cost Inflation Index (CII)**.

**Example:**
- Purchased debt MF for ₹1,00,000 in FY 2005-06 (CII = 497)
- Sold for ₹3,00,000 in FY 2015-16 (CII = 1,024)
- Indexed purchase price = ₹1,00,000 × (1,024 ÷ 497) = **₹2,06,036**
- LTCG without indexation = ₹3,00,000 − ₹1,00,000 = ₹2,00,000 → Tax = ₹40,000
- LTCG with indexation = ₹3,00,000 − ₹2,06,036 = ₹93,964 → Tax = **₹18,792**

Indexation significantly reduced the tax burden. Note: debt MF tax rules changed after April 2023; gains are now taxed at slab rates regardless of holding period for new purchases.

---

## FIFO Rule: Multiple Purchase Lots

When you buy shares at different times and sell a portion, the Income Tax Act uses **FIFO (First In, First Out)** to determine which shares are sold — the oldest shares are considered sold first.

**Example — Reliance:**
- Purchase 1: 100 shares @ ₹800 on 10 Apr 2014
- Purchase 2: 100 shares @ ₹820 on 1 Jun 2014
- Sell: 150 shares @ ₹920 on 1 May 2015

**FIFO calculation:**
- First 100 shares (bought Apr 2014): held > 1 year by May 2015 → **LTCG**
  - Gain per share = ₹920 − ₹800 = ₹120 → Total LTCG = ₹12,000
- Next 50 shares (bought Jun 2014): held < 1 year by May 2015 → **STCG**
  - Gain per share = ₹920 − ₹820 = ₹100 → Total STCG = ₹5,000

FIFO determines whether each lot qualifies as LTCG or STCG — this can significantly affect your tax liability.

---

## Securities Transaction Tax (STT)

STT is levied at source on every equity transaction on Indian exchanges:
- Delivery buy and sell: **0.1%** of transaction value each side
- Intraday sell: 0.025%
- F&O sell: 0.0125% (on premium for options)

**STT cannot be treated as a cost of acquisition** for capital gains computation. It cannot be subtracted from sale proceeds when calculating LTCG or STCG.

However, STT paid on business income (F&O, intraday) **can be claimed as a business expense** when computing business income.

---

## Advance Tax for Capital Gains

If your total tax liability exceeds ₹10,000 in a year, you must pay **advance tax** in installments:

| Deadline | Cumulative % Due |
|---|---|
| 15 September | 30% of estimated tax |
| 15 December | 60% of estimated tax |
| 15 March | 100% of estimated tax |

Capital gains earned throughout the year should be estimated and included in advance tax calculations. Delay attracts interest under Section 234B and 234C.`,

  keyTerms: [
    {
      term: "Long Term Capital Gain (LTCG)",
      definition: "Profit from equity or equity MF held on exchange for more than 1 year. Taxed at 12.5% on gains above ₹1.25 lakh (Budget 2024). First ₹1.25 lakh per year is exempt.",
    },
    {
      term: "Short Term Capital Gain (STCG)",
      definition: "Profit from equity or equity MF held > 1 day but < 1 year on exchange. Taxed at flat 20% (Budget 2024). No exemption limit applies.",
    },
    {
      term: "FIFO (First In, First Out)",
      definition: "When selling a portion of a multi-lot stock holding, the Income Tax Act treats the oldest shares as sold first. This determines whether gains are LTCG or STCG.",
    },
    {
      term: "Cost Inflation Index (CII)",
      definition: "Government-published index used to adjust purchase price of assets for inflation. Reduces taxable gains through indexation. Applicable to debt MF (pre-April 2023) and real estate — not equity.",
    },
    {
      term: "Securities Transaction Tax (STT)",
      definition: "Tax levied at source on equity transactions on Indian exchanges. Delivery trades: 0.1% each side. Cannot be claimed as cost of acquisition for capital gains.",
    },
    {
      term: "Advance Tax",
      definition: "Mandatory installment payment of estimated tax liability. Deadlines: 30% by Sep 15, 60% by Dec 15, 100% by Mar 15. Required if total tax liability > ₹10,000.",
    },
  ],

  facts: [
    {
      statement: "LTCG on equity (Budget 2024): 12.5% on gains exceeding ₹1.25 lakh per year. No indexation benefit for equity. The ₹1.25 lakh exemption applies per year regardless of number of stocks sold.",
      citation: "Varsity Module 7, Ch. 4.1",
    },
    {
      statement: "STCG on equity (Budget 2024): 20% flat rate on gains. No minimum exemption. Any gain from equity held < 1 year is taxed at this rate.",
      citation: "Varsity Module 7, Ch. 4.1",
    },
    {
      statement: "Indexation example (debt MF): bought ₹1,00,000 in FY 2005-06 (CII 497), sold ₹3,00,000 in FY 2015-16 (CII 1,024). Indexed cost = ₹2,06,036. Taxable LTCG = ₹93,964. Tax = ₹18,792 vs ₹40,000 without indexation.",
      citation: "Varsity Module 7, Ch. 4.1",
    },
    {
      statement: "FIFO rule (Reliance example): Buy 100 shares Apr 2014 @ ₹800 and 100 shares Jun 2014 @ ₹820. Sell 150 shares May 2015 @ ₹920. First 100 → LTCG ₹12,000 (held > 1yr). Next 50 → STCG ₹5,000 (held < 1yr). FIFO determines classification.",
      citation: "Varsity Module 7, Ch. 4.2",
    },
    {
      statement: "Advance tax deadlines: 30% by Sep 15, 60% by Dec 15, 100% by Mar 15. Applies if total tax exceeds ₹10,000. Failure to pay attracts interest under Section 234B and 234C.",
      citation: "Varsity Module 7, Ch. 5.7",
    },
  ],

  quizSeed: [
    {
      id: "l8-02-q1",
      question: "You sell equity shares held for 14 months with a gain of ₹2,00,000. What is your tax liability (Budget 2024 rates)?",
      options: [
        "₹25,000 (12.5% on full ₹2,00,000)",
        "₹9,375 (12.5% on ₹75,000 after ₹1.25 lakh exemption)",
        "₹40,000 (20% on full ₹2,00,000)",
        "₹0 (LTCG on equity is tax-free)",
      ],
      correct: 1,
      explanation: "Holding period > 1 year → LTCG. Budget 2024: first ₹1.25 lakh is exempt. Taxable LTCG = ₹2,00,000 − ₹1,25,000 = ₹75,000. Tax = 12.5% × ₹75,000 = ₹9,375.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 4.1",
    },
    {
      id: "l8-02-q2",
      question: "You sell equity shares held for 8 months with a gain of ₹50,000. What is your tax?",
      options: [
        "₹0 — below ₹1.25 lakh exemption",
        "₹7,500 — STCG at 15%",
        "₹10,000 — STCG at 20%",
        "₹6,250 — LTCG at 12.5%",
      ],
      correct: 2,
      explanation: "Holding period < 1 year → STCG. Budget 2024 STCG rate = 20%. No exemption applies. Tax = 20% × ₹50,000 = ₹10,000. The ₹1.25 lakh exemption applies only to LTCG, not STCG.",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 4.1",
    },
    {
      id: "l8-02-q3",
      question: "You bought 100 Reliance shares at ₹800 on 10 Apr 2014 and 100 more at ₹820 on 1 Jun 2014. You sell 150 shares at ₹920 on 1 May 2015. Under FIFO, which shares are treated as sold?",
      options: [
        "150 shares from Jun 2014 lot — most recent purchase first",
        "75 shares from each lot equally",
        "100 from Apr 2014 (LTCG) + 50 from Jun 2014 (STCG)",
        "All 150 as STCG because average holding < 1 year",
      ],
      correct: 2,
      explanation: "FIFO: oldest shares sold first. 100 shares from Apr 2014 are sold first (held > 1yr → LTCG: gain ₹12,000). The remaining 50 shares from Jun 2014 are sold next (held < 1yr → STCG: gain ₹5,000).",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 4.2",
    },
    {
      id: "l8-02-q4",
      question: "Can Securities Transaction Tax (STT) be deducted as a cost when calculating capital gains on equity delivery trades?",
      options: [
        "Yes — STT paid on purchase can be added to acquisition cost",
        "Yes — STT paid on sale can be deducted from sale proceeds",
        "No — STT cannot be treated as cost of acquisition or deducted from sale proceeds for capital gains",
        "Yes — but only for LTCG, not STCG",
      ],
      correct: 2,
      explanation: "STT cannot be claimed as a deduction when computing capital gains. However, for traders with business income (intraday/F&O), STT paid can be claimed as a business expense — a different treatment entirely.",
      difficulty: "medium",
      citation: "Varsity Module 7, Ch. 4.3",
    },
    {
      id: "l8-02-q5",
      question: "What are the advance tax payment deadlines if your total tax liability exceeds ₹10,000?",
      options: [
        "50% by Dec 15, 100% by Mar 31",
        "30% by Sep 15, 60% by Dec 15, 100% by Mar 15",
        "100% by Mar 31 (one installment only)",
        "25% per quarter: Jun 15, Sep 15, Dec 15, Mar 15",
      ],
      correct: 1,
      explanation: "Advance tax deadlines: 30% cumulative by Sep 15, 60% by Dec 15, 100% by Mar 15. If not paid on time, interest is charged under Section 234B (shortfall) and 234C (deferment).",
      difficulty: "easy",
      citation: "Varsity Module 7, Ch. 5.7",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 7 — Markets & Taxation (zerodha.com/varsity). Tax rates per Budget 2024. Verify current rates and consult a CA before filing.",
}

export default lesson
