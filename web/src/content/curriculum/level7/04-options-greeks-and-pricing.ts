import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l7-04-options-greeks",
  level: 7,
  order: 4,
  title: "Options Greeks & Pricing",
  subtitle: "Delta, Theta, Vega, and the forces that move option premiums",
  xpReward: 38,
  body: `## Why Do Option Premiums Change Every Minute?

Option premiums are not fixed — they fluctuate throughout the trading day. Five forces called **Option Greeks** drive these changes. Understanding Greeks is what separates professional options traders from retail gamblers.

The most important Greeks are:
1. **Delta** — sensitivity to price change in the underlying
2. **Gamma** — rate of change of delta
3. **Theta** — time decay
4. **Vega** — sensitivity to volatility

---

## Delta: How Much Does Premium Move?

Delta measures how much an option's premium changes for every **1 point change** in the underlying asset.

**Formula**: Change in premium = Delta × Change in underlying

**Call option delta**: ranges from **0 to +1**
**Put option delta**: ranges from **−1 to 0** (negative because premium falls when underlying rises)

### Example — Nifty 8250 Call Option
- Nifty Spot: 8,268
- Option Strike: 8,250 CE
- Premium: ₹133
- Delta: 0.55 (slightly ITM)
- If Nifty moves from 8,268 to 8,310 (42 points up):
  - Change in premium = 0.55 × 42 = **+₹23.1**
  - New premium ≈ ₹133 + ₹23.1 = **₹156.1**

### Delta and Moneyness

| Moneyness | Call Delta | Put Delta |
|---|---|---|
| Deep ITM | 0.8 to 1.0 | −0.8 to −1.0 |
| Slightly ITM | 0.6 to 0.8 | −0.6 to −0.8 |
| **ATM** | **≈ 0.5** | **≈ −0.5** |
| Slightly OTM | 0.3 to 0.45 | −0.3 to −0.45 |
| Deep OTM | 0 to 0.3 | 0 to −0.3 |

**ATM options always have a delta of approximately 0.5.**
**ITM delta approaches 1; OTM delta approaches 0.**

### Why Delta Cannot Exceed 1 or Go Below 0

If delta > 1, the option would move faster than the underlying — which makes no sense for a derivative. If delta < 0 for a call, the premium would fall when the underlying rises — also impossible. Delta is bounded by the properties of the option contract itself.

---

## Moneyness: ITM, ATM, OTM

Options are classified based on whether they have intrinsic value:

| Classification | Call Option | Put Option | Intrinsic Value |
|---|---|---|---|
| **In the Money (ITM)** | Spot > Strike | Spot < Strike | Positive |
| **At the Money (ATM)** | Spot ≈ Strike | Spot ≈ Strike | ~Zero |
| **Out of the Money (OTM)** | Spot < Strike | Spot > Strike | Zero |

**Example (Nifty spot = 8,060):**
- 7,500 CE → ITM (IV = 8,060 − 7,500 = 560)
- 8,050 CE → ATM (closest to spot)
- 8,300 CE → OTM (IV = 0 because 8,060 < 8,300)

**ITM options are always more expensive than OTM options** because they carry intrinsic value.

---

## Theta: Time Decay

Theta measures how much the option's premium **decays each day** due to the passage of time (all else equal).

- Theta is always **negative for option buyers** — every day that passes reduces the option's value
- Theta is **positive for option sellers** — time decay works in their favor
- Theta accelerates as expiry approaches — options lose value faster in the last week before expiry

This is why buying far-OTM options and holding them for weeks is often a losing strategy even if the market direction is right.

---

## Vega: Volatility Sensitivity

Vega measures how much the option's premium changes for a **1% change in implied volatility**.

- **High volatility → higher premiums** (more chance of large moves)
- **Low volatility → lower premiums**
- Vega is positive for option buyers (they benefit from rising volatility)
- Vega is negative for option sellers (volatility spikes hurt them)

This explains the Bank Nifty Oct 2017 example: after PSU bank news, Bank Nifty options were overpriced (high implied volatility) → writing a short strangle to collect inflated premiums was the systematic trade.

---

## The Black-Scholes Formula (Conceptual)

The Black-Scholes model calculates theoretical option prices and outputs all the Greeks. Inputs:
1. Current spot price
2. Strike price
3. Time to expiry
4. Risk-free rate
5. Implied volatility

You don't need to calculate B-S manually — trading platforms compute it in real time. But understanding that **implied volatility is the key variable you can assess and trade around** is critical.

---

## Practical Use of Greeks

| You want to... | Use this Greek |
|---|---|
| Choose between two strikes with the same view | **Delta** — higher delta = more premium sensitivity |
| Assess how fast an option will decay | **Theta** — avoid buying options with high theta when holding for days |
| Trade around earnings announcements | **Vega** — buy before earnings (volatility rises), sell after |
| Assess risk of large market moves | **Gamma** — high gamma near expiry = dangerous for sellers |

An ATM call option on Nifty with delta 0.5 will move approximately 20 points for a 40-point Nifty move. An OTM call with delta 0.2 will move only 8 points for the same 40-point move.`,

  keyTerms: [
    {
      term: "Delta",
      definition: "Rate of change of option premium per 1-point change in the underlying. Call delta: 0 to +1. Put delta: −1 to 0. ATM options have delta ≈ 0.5.",
    },
    {
      term: "Theta",
      definition: "Daily time decay of option premium. Always negative for option buyers (premium erodes daily). Accelerates near expiry. Option sellers benefit from theta.",
    },
    {
      term: "Vega",
      definition: "Change in option premium per 1% change in implied volatility. High volatility = higher premiums. Buyers benefit from volatility spikes; sellers are hurt by them.",
    },
    {
      term: "In the Money (ITM)",
      definition: "A call is ITM when Spot > Strike (positive intrinsic value). A put is ITM when Spot < Strike. ITM options are more expensive than OTM options.",
    },
    {
      term: "At the Money (ATM)",
      definition: "The option strike closest to the current spot price. ATM options always have a delta of approximately 0.5. Most actively traded strike.",
    },
    {
      term: "Out of the Money (OTM)",
      definition: "A call is OTM when Spot < Strike; a put is OTM when Spot > Strike. Intrinsic value = 0. Cheaper than ITM options but require larger price moves to profit.",
    },
  ],

  facts: [
    {
      statement: "Delta: change in premium = Delta × change in underlying. Nifty 8250 CE with delta 0.55 — if Nifty moves 42 points, premium changes by 0.55 × 42 = ₹23.1.",
      citation: "Varsity Module 5, Ch. 9.3",
    },
    {
      statement: "Delta ranges: Deep ITM = 0.8–1.0, ATM ≈ 0.5, Deep OTM = 0–0.3 (for call options). Put options have the same magnitudes but negative sign.",
      citation: "Varsity Module 5, Ch. 9.4",
    },
    {
      statement: "ITM vs OTM classification: for call options, all strikes below ATM are ITM; all above ATM are OTM. For put options, all strikes above ATM are ITM; all below are OTM. ITM options always carry higher premiums.",
      citation: "Varsity Module 5, Ch. 8.2–8.3",
    },
    {
      statement: "Election rally example (18 May 2009): Nifty rallied ~20% in one day from 3,671 to 4,321 after UPA re-election. Far OTM options bought for ₹2,00,000 became extremely valuable — demonstrating delta acceleration near ATM.",
      citation: "Varsity Module 5, Ch. 10.3",
    },
  ],

  quizSeed: [
    {
      id: "l7-04-q1",
      question: "A Nifty 8250 Call has delta 0.55 and premium ₹133. Nifty moves from 8,268 to 8,310 (+42 points). What is the approximate new premium?",
      options: ["₹110", "₹133", "₹156.1", "₹179"],
      correct: 2,
      explanation: "Change in premium = Delta × Change in underlying = 0.55 × 42 = ₹23.1. New premium ≈ ₹133 + ₹23.1 = ₹156.1.",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 9.3",
    },
    {
      id: "l7-04-q2",
      question: "Nifty spot = 8,060. How would you classify the 7,500 CE, the 8,050 CE, and the 8,300 CE?",
      options: [
        "7500 CE = OTM, 8050 CE = ATM, 8300 CE = ITM",
        "7500 CE = ITM, 8050 CE = ATM, 8300 CE = OTM",
        "All three are OTM — they are all priced above spot",
        "7500 CE = ITM, 8050 CE = OTM, 8300 CE = ATM",
      ],
      correct: 1,
      explanation: "7500 CE: Spot (8060) > Strike (7500) → ITM. 8050 CE: closest to spot → ATM. 8300 CE: Spot (8060) < Strike (8300) → OTM (intrinsic value = 0).",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 8.2",
    },
    {
      id: "l7-04-q3",
      question: "An option buyer holds an ATM call for 10 days with no change in the underlying price. What happens to the premium?",
      options: [
        "Premium stays the same — price hasn't moved",
        "Premium increases due to time value building up",
        "Premium decreases due to theta (time decay) working against the buyer",
        "Premium doubles — ATM options benefit from time",
      ],
      correct: 2,
      explanation: "Theta erodes option premiums daily even if the underlying doesn't move. This is called time decay. The buyer of an option is always fighting theta — every passing day reduces the premium all else equal.",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 9",
    },
    {
      id: "l7-04-q4",
      question: "An option seller writes a straddle before a major earnings announcement. Earnings come out and volatility collapses immediately. What happens to the seller's P&L?",
      options: [
        "Seller loses money — stock moved on earnings",
        "Seller profits — volatility collapse reduces premiums, benefiting the option writer",
        "No change — earnings are already priced in",
        "Seller must close the position immediately",
      ],
      correct: 1,
      explanation: "Vega is negative for option sellers. When implied volatility collapses after the event (IV crush), all premiums fall sharply — the seller can buy back the options at much lower prices and pocket the difference.",
      difficulty: "hard",
      citation: "Varsity Module 5, Ch. 9",
    },
    {
      id: "l7-04-q5",
      question: "Between a Deep OTM call option and a Deep ITM call option, which has a higher delta and why?",
      options: [
        "Deep OTM — it has more room to move",
        "Deep ITM — delta approaches 1 because the option moves almost in line with the underlying",
        "They are equal — delta depends only on time to expiry",
        "Deep OTM — lower premium means higher leverage",
      ],
      correct: 1,
      explanation: "Deep ITM options behave like the underlying stock itself — a ₹1 move in Nifty causes nearly ₹1 change in premium (delta ≈ 0.8–1.0). Deep OTM options have delta near 0 and barely move when the underlying changes.",
      difficulty: "medium",
      citation: "Varsity Module 5, Ch. 9.4",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 5 — Options Theory for Professional Trading (zerodha.com/varsity)",
}

export default lesson
