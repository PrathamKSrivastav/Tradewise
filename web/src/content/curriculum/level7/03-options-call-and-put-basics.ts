import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l7-03-options-basics",
  level: 7,
  order: 3,
  title: "Options: Call & Put Basics",
  subtitle: "Understanding rights, obligations, premiums, and payoff structures",
  xpReward: 35,
  body: `## The Ajay-Venu Land Deal: Understanding Options

Ajay wants to buy a 1-acre plot from Venu, currently worth ₹5,00,000. A highway might be built nearby, potentially doubling the price — but it's just a rumor.

Ajay proposes a structured deal:
1. Ajay pays ₹1,00,000 as a **non-refundable agreement fee** today
2. Venu agrees to sell the land to Ajay **6 months later at today's price of ₹5,00,000**
3. Only Ajay can choose whether to complete the deal — Venu is obligated to sell if Ajay decides to buy
4. If Ajay walks away, Venu keeps the ₹1,00,000

**This is a Call Option.**

---

## Three Scenarios at Expiry

**Scenario 1: Land price rises to ₹10,00,000**
- Ajay exercises his right. Buys at ₹5,00,000, pays ₹1,00,000 agreement fee → total cost ₹6,00,000
- Market value: ₹10,00,000
- **Ajay's profit: ₹4,00,000** (Venu's equivalent loss)

**Scenario 2: Land price falls to ₹3,00,000**
- Ajay walks away. Paying ₹5,00,000 for land worth ₹3,00,000 makes no sense
- **Ajay's maximum loss: ₹1,00,000** (the premium he paid — nothing more)
- Venu pockets the ₹1,00,000

**Scenario 3: Land price stays at ₹5,00,000**
- Ajay walks away. Total cost would be ₹6,00,000 for ₹5,00,000 land
- **Ajay's loss: ₹1,00,000**

---

## Key Insight

- **Option buyer (Ajay)**: Has a **right but no obligation** to buy. Maximum loss = premium paid. Profit potential is unlimited.
- **Option seller/writer (Venu)**: Has an **obligation** to deliver if the buyer exercises. Profit is capped at the premium received. Loss can be very large.

Statistically: out of 3 scenarios, 2 benefit Venu. The option seller has better odds but takes asymmetric risk.

---

## Call Option in Stock Markets

A **Call Option** gives the buyer the right (not obligation) to buy a stock at a **strike price** on expiry.

**Example — Bajaj Auto:**
- Bajaj Auto spot price: ₹2,026.9
- Buy 2050 Call Option, premium: ₹6.35 per share
- Lot size (for calculation): say 1 share for simplicity

**P&L at various expiry prices:**
| Spot at Expiry | Intrinsic Value (Spot − Strike) | P&L (IV − Premium) |
|---|---|---|
| ₹1,990 | 0 | −₹6.35 (max loss) |
| ₹2,050 | 0 | −₹6.35 |
| ₹2,060 | ₹10 | +₹3.65 |
| ₹2,080 | ₹30 | +₹23.65 |
| ₹2,100 | ₹50 | +₹43.65 |

**Breakeven = Strike Price + Premium = ₹2,050 + ₹6.35 = ₹2,056.35**

**General formula**: P&L = Max[0, Spot − Strike] − Premium Paid

---

## Put Option Basics

A **Put Option** gives the buyer the right (not obligation) to **sell** a stock at the strike price on expiry. Used when you expect prices to fall.

**Put Option P&L Formula**: P&L = Max[0, Strike − Spot] − Premium Paid

| Scenario | Action |
|---|---|
| Price falls below strike | Put buyer profits — can "sell" at higher strike price |
| Price stays at or above strike | Put expires worthless; buyer loses only the premium |

---

## Call vs Put: Quick Comparison

| Feature | Call Option Buyer | Put Option Buyer |
|---|---|---|
| View | Bullish (price will rise) | Bearish (price will fall) |
| Right | To buy at strike price | To sell at strike price |
| Maximum loss | Premium paid | Premium paid |
| Maximum gain | Unlimited | Strike price − Premium |
| Seller's obligation | Must sell at strike if exercised | Must buy at strike if exercised |

---

## Important Rules

1. Options expire on the **last Thursday of every month** in India
2. Three expiry series always available: current month, mid month, far month
3. Options are **cash settled** in India — no physical delivery
4. Premium changes on a **minute-by-minute basis** based on 5 factors (the Greeks)
5. **Only the option buyer can exercise** — the seller is always obligated`,

  keyTerms: [
    {
      term: "Call Option",
      definition: "The right (not obligation) to buy an underlying asset at the strike price on expiry. Buyer profits when price rises above strike + premium. Maximum loss = premium paid.",
    },
    {
      term: "Put Option",
      definition: "The right (not obligation) to sell an underlying asset at the strike price on expiry. Buyer profits when price falls below strike − premium. Maximum loss = premium paid.",
    },
    {
      term: "Premium",
      definition: "The price paid by the option buyer to the option seller/writer for the right. Non-refundable. The option buyer's maximum loss is limited to the premium paid.",
    },
    {
      term: "Strike Price",
      definition: "The pre-agreed price at which the option can be exercised on expiry. For call options: ITC 340 CE means the right to buy ITC at ₹340 on expiry.",
    },
    {
      term: "Intrinsic Value",
      definition: "The non-negative profit if the option were exercised right now. For call options: Max[0, Spot − Strike]. For put options: Max[0, Strike − Spot]. Cannot be negative.",
    },
  ],

  facts: [
    {
      statement: "Ajay-Venu example: ₹1,00,000 premium for right to buy land at ₹5,00,000 in 6 months. If land rises to ₹10,00,000, Ajay profits ₹4,00,000. If falls, Ajay loses only ₹1,00,000 (premium). This illustrates limited risk, unlimited upside of call options.",
      citation: "Varsity Module 5, Ch. 1.2",
    },
    {
      statement: "Bajaj Auto 2050 Call Option: spot ₹2,026.9, premium ₹6.35. Breakeven = ₹2,056.35. Below ₹2,050 at expiry → loss = ₹6.35 (max). At ₹2,080 → profit = ₹23.65. Formula: Max[0, Spot−Strike] − Premium.",
      citation: "Varsity Module 5, Ch. 3.4",
    },
    {
      statement: "Call option buyer generalization: (1) Maximum loss = premium paid; (2) Profit is unlimited above breakeven; (3) It makes sense to buy a call only when expecting price to increase.",
      citation: "Varsity Module 5, Ch. 3.4",
    },
    {
      statement: "JP Associates Call Option (26 Mar 2015 expiry): Strike ₹25, lot 8,000, premium ₹1.35. If spot = ₹32 at expiry → cash payout = 7 × 8,000 = ₹56,000. Net profit = ₹56,000 − ₹10,800 (premium) = ₹45,200 = 419% return.",
      citation: "Varsity Module 5, Ch. 2.1",
    },
  ],

  quizSeed: [
    {
      id: "l7-03-q1",
      question: "You buy a call option on ITC with strike price ₹340, premium ₹4.75. ITC expires at ₹360. What is your P&L per share?",
      options: ["-₹4.75", "+₹15.25", "+₹20", "+₹24.75"],
      correct: 1,
      explanation: "P&L = Max[0, Spot − Strike] − Premium = Max[0, 360−340] − 4.75 = 20 − 4.75 = ₹15.25 profit per share.",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 3.4",
    },
    {
      id: "l7-03-q2",
      question: "You buy a Bajaj Auto 2050 Call at ₹6.35 premium. At expiry, Bajaj Auto is at ₹2,030. What is your P&L?",
      options: ["+₹23.65", "-₹6.35 (max loss)", "0", "+₹13.65"],
      correct: 1,
      explanation: "Spot (₹2,030) < Strike (₹2,050) → Intrinsic value = 0. P&L = 0 − ₹6.35 = −₹6.35. The option expires worthless; maximum loss is the premium paid.",
      difficulty: "easy",
      citation: "Varsity Module 5, Ch. 3.4",
    },
    {
      id: "l7-03-q3",
      question: "In options, who has the right and who has the obligation?",
      options: [
        "Both buyer and seller have rights; neither has obligations",
        "The seller has the right to exercise; the buyer has the obligation to deliver",
        "The buyer has the right but no obligation; the seller has an obligation",
        "Both parties have equal rights and obligations",
      ],
      correct: 2,
      explanation: "The option buyer pays a premium for the RIGHT (but not obligation) to exercise. The option seller/writer receives the premium and has the OBLIGATION to honor the buyer's decision if exercised.",
      difficulty: "easy",
      citation: "Varsity Module 5, Ch. 1.2",
    },
    {
      id: "l7-03-q4",
      question: "Statistically, why does the option seller have better odds than the option buyer?",
      options: [
        "The seller receives the premium upfront as guaranteed income",
        "In a typical call option, 2 out of 3 scenarios (price stays flat or falls) benefit the seller, not the buyer",
        "Exchange margin rules favor sellers",
        "Option sellers can exit anytime without penalty",
      ],
      correct: 1,
      explanation: "For a call option: price rising above strike benefits the buyer (1 scenario). Price staying flat or falling both benefit the seller (2 scenarios). Statistically, the seller wins 66.7% of the time, though each win is limited to the premium received.",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 1.2",
    },
    {
      id: "l7-03-q5",
      question: "What is the breakeven price for a 2050 Call Option bought at a premium of ₹6.35?",
      options: ["₹2,043.65", "₹2,050", "₹2,056.35", "₹2,062.70"],
      correct: 2,
      explanation: "Breakeven = Strike Price + Premium = ₹2,050 + ₹6.35 = ₹2,056.35. Below this price, the buyer loses money. Above it, the buyer profits.",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 3.4",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 5 — Options Theory for Professional Trading (zerodha.com/varsity)",
}

export default lesson
