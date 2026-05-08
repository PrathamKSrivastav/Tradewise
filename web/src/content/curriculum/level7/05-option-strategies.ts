import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l7-05-option-strategies",
  level: 7,
  order: 5,
  title: "Option Strategies",
  subtitle: "Bull spreads, straddles, strangles, and when to use each",
  xpReward: 40,
  body: `## Why Use Option Strategies?

Buying a naked call or put is a binary, high-risk bet. Option strategies combine multiple legs to:
1. **Define maximum loss** — no nasty surprises
2. **Reduce cost of entry** — offset the premium you pay
3. **Profit from specific market conditions** — moderately bullish, range-bound, high volatility, etc.

There are approximately 475 known option strategies. You only need to know a handful — used at the right time, they make money.

---

## Bull Call Spread (Moderately Bullish)

Use when: you expect the market/stock to rise **moderately** — not an explosive move.

**Setup (Nifty example, 23 Nov 2015):**
- Nifty spot: 7,846
- Buy 7800 CE (ATM) @ ₹79 (cash out)
- Sell 7900 CE (OTM) @ ₹25 (cash in)
- **Net debit: ₹79 − ₹25 = ₹54** (maximum loss)

**Outcomes at expiry:**

| Nifty at Expiry | 7800 CE P&L | 7900 CE P&L | Net P&L |
|---|---|---|---|
| 7700 (below lower strike) | −₹79 | +₹25 | **−₹54** (max loss) |
| 7800 (at lower strike) | −₹79 | +₹25 | **−₹54** |
| 7900 (at upper strike) | +₹21 | +₹25 | **+₹46** (max profit) |
| 8000 (above upper strike) | +₹121 | −₹75 | **+₹46** (capped) |

**Breakeven = Lower Strike + Net Debit = 7800 + 54 = 7,854**
**Maximum profit = Spread width − Net debit = 100 − 54 = ₹46**
**Maximum loss = Net debit paid = ₹54**

*The selling of the OTM call reduces your entry cost but caps your maximum profit.*

---

## Bear Put Spread (Moderately Bearish)

Use when: you expect the market to fall moderately.

**Setup:**
- Buy ATM Put (higher strike) — pay premium
- Sell OTM Put (lower strike) — receive premium
- Net debit = premium paid − premium received

Maximum profit = Spread width − Net debit (achieved when market falls to lower strike)
Maximum loss = Net debit paid

---

## Long Straddle (High Volatility Expected — Direction Unknown)

Use when: you expect a **big move** but don't know which direction (e.g., before a major announcement, budget, elections).

**Setup:**
- Buy ATM Call + Buy ATM Put (same strike, same expiry)
- **Both legs cost premium → double premium outflow**

**Profit when:** underlying moves significantly in either direction beyond the combined premium cost.
**Loss when:** underlying stays near the strike (both options expire near worthless).

**Example (Bank Nifty straddle):**
- Buy 18400 CE @ ₹350
- Buy 18400 PE @ ₹315
- Total premium = ₹665
- Upper breakeven = 18,400 + 665 = **19,065**
- Lower breakeven = 18,400 − 665 = **17,735**
- Profitable if Bank Nifty moves beyond either breakeven level by expiry

---

## Short Straddle (Low Volatility Expected — Range-Bound Market)

Use when: you expect the market to **stay flat** near the current level — no big moves.

**Setup:**
- Sell ATM Call + Sell ATM Put (same strike, same expiry)
- **Both legs receive premium → double premium inflow**

**Profit when:** underlying stays near the strike; both options expire worthless.
**Loss when:** underlying makes a large move in either direction.

*This is the Bank Nifty Oct 2017 trade: PSU bank news caused Bank Nifty options to be overpriced (high implied volatility). Writing a short strangle (similar to straddle) collected excess premium with the expectation that volatility would normalize.*

---

## Long Strangle (High Volatility, OTM Strikes)

Similar to long straddle but cheaper — buy **OTM call + OTM put** instead of ATM.
- Lower premium cost (cheaper entry)
- Needs a larger move to profit (wider breakevens)

---

## Short Strangle (Range-Bound with OTM Cushion)

Sell **OTM call + OTM put**.
- Collect premium from both legs
- Market stays between the two OTM strikes → both expire worthless → profit
- Risk: large move in either direction

---

## When to Use Which Strategy

| Market View | Strategy | Risk | Reward |
|---|---|---|---|
| Strongly bullish | Buy Call | Premium paid | Unlimited |
| Moderately bullish | Bull Call Spread | Net debit | Capped |
| Strongly bearish | Buy Put | Premium paid | Strike − Premium |
| Moderately bearish | Bear Put Spread | Net debit | Capped |
| Big move expected (any dir.) | Long Straddle / Strangle | Total premium | Unlimited |
| Range-bound (no big move) | Short Straddle / Strangle | Unlimited | Premium collected |
| Moderately bullish, want to collect premium | Bull Put Spread | Width − Premium | Net credit |

---

## The Golden Rule of Options

Never buy options blindly for "limited risk, unlimited profit." The phrase is theoretically correct but practically dangerous — most options expire worthless. The statistics favor option sellers (as Venu in the Ajay-Venu example demonstrated).

Trade options with a clear market view, defined entry and exit levels, and a strategy that matches the expected market condition.`,

  keyTerms: [
    {
      term: "Bull Call Spread",
      definition: "Buy ATM call + Sell OTM call. Net debit strategy for moderately bullish view. Max loss = net debit. Max profit = spread width − net debit. Breakeven = lower strike + net debit.",
    },
    {
      term: "Bear Put Spread",
      definition: "Buy ATM put + Sell OTM put. Net debit strategy for moderately bearish view. Limits both maximum loss and maximum profit.",
    },
    {
      term: "Long Straddle",
      definition: "Buy ATM call + Buy ATM put at same strike and expiry. Profits from large moves in either direction. Max loss = total premium paid. Used before high-uncertainty events.",
    },
    {
      term: "Short Straddle",
      definition: "Sell ATM call + Sell ATM put at same strike and expiry. Profits when market stays flat. Max profit = total premium collected. Risk is unlimited for large moves.",
    },
    {
      term: "Net Debit",
      definition: "In a spread strategy, the net amount paid after subtracting premium received from premium paid. This is always the maximum possible loss.",
    },
    {
      term: "Short Strangle",
      definition: "Sell OTM call + Sell OTM put. Wider profit zone than short straddle but also collects less premium. Profits if underlying stays between the two OTM strikes at expiry.",
    },
  ],

  facts: [
    {
      statement: "Bull Call Spread (Nifty 23 Nov 2015): Buy 7800 CE @ ₹79, Sell 7900 CE @ ₹25. Net debit = ₹54. Max profit = ₹46 (at Nifty ≥ 7,900). Max loss = ₹54 (at Nifty ≤ 7,800). Breakeven = 7,854.",
      citation: "Varsity Module 6, Ch. 2.2",
    },
    {
      statement: "Long Straddle: buy both ATM call and ATM put. Total premium = sum of both premiums. Upper breakeven = strike + total premium. Lower breakeven = strike − total premium. Profits from large moves in either direction.",
      citation: "Varsity Module 6, Ch. 10.2",
    },
    {
      statement: "Short Straddle: sell ATM call + sell ATM put. Maximum profit = total premium collected. Used in range-bound markets when expecting volatility to decline. Risk is theoretically unlimited in either direction.",
      citation: "Varsity Module 6, Ch. 11.2",
    },
    {
      statement: "Bank Nifty Oct 2017 short strangle: after PSU bank news, Bank Nifty options had inflated premiums. Writing a short strangle on Bank Nifty collected premium of ~253 points per lot, betting that Bank Nifty implied volatility would normalize.",
      citation: "Varsity Module 10, Ch. 1.1",
    },
  ],

  quizSeed: [
    {
      id: "l7-05-q1",
      question: "In a Bull Call Spread (Buy 7800 CE @ ₹79, Sell 7900 CE @ ₹25), what is the maximum profit?",
      options: ["₹25", "₹46", "₹54", "₹100"],
      correct: 1,
      explanation: "Max profit = Spread width − Net debit = (7,900 − 7,800) − (79 − 25) = 100 − 54 = ₹46. This is achieved when Nifty expires at or above 7,900.",
      difficulty: "medium",
      citation: "Varsity Module 6, Ch. 2.2",
    },
    {
      id: "l7-05-q2",
      question: "A trader buys a Long Straddle on Bank Nifty: Buy 18400 CE @ ₹350 + Buy 18400 PE @ ₹315. What are the breakeven points?",
      options: [
        "18085 and 18750",
        "17735 and 19065",
        "18050 and 18750",
        "18000 and 19000",
      ],
      correct: 1,
      explanation: "Total premium = ₹350 + ₹315 = ₹665. Upper BE = 18,400 + 665 = 19,065. Lower BE = 18,400 − 665 = 17,735. The straddle is profitable only if Bank Nifty moves beyond either of these levels.",
      difficulty: "medium",
      citation: "Varsity Module 6, Ch. 10.2",
    },
    {
      id: "l7-05-q3",
      question: "When should you use a Short Straddle?",
      options: [
        "When you expect a very large move but don't know the direction",
        "When you expect the underlying to stay flat and implied volatility to decline",
        "When you want to hedge a long stock position against a fall",
        "When earnings are expected to cause a surprise",
      ],
      correct: 1,
      explanation: "A short straddle sells both ATM call and ATM put. Maximum profit (both options expire worthless) occurs when the underlying stays at or near the strike price. It also benefits from declining implied volatility (vega negative for sellers).",
      difficulty: "easy",
      citation: "Varsity Module 6, Ch. 11.2",
    },
    {
      id: "l7-05-q4",
      question: "The key difference between a Long Straddle and a Long Strangle is:",
      options: [
        "Straddle uses calls only; strangle uses puts only",
        "Straddle uses ATM strikes; strangle uses OTM strikes — cheaper but requires larger moves",
        "Straddle expires monthly; strangle expires weekly",
        "Strangle profits only in bull markets; straddle works in both directions",
      ],
      correct: 1,
      explanation: "Long straddle: buy ATM call + ATM put. Long strangle: buy OTM call + OTM put. The strangle is cheaper (lower premiums) but needs a bigger move to profit because the strikes are further from current price.",
      difficulty: "medium",
      citation: "Varsity Module 6, Ch. 12.2",
    },
    {
      id: "l7-05-q5",
      question: "Why did writing a short strangle on Bank Nifty in Oct 2017 (after PSU bank news) make systematic sense?",
      options: [
        "Bank Nifty was expected to rally strongly due to government policy",
        "PSU banks (10% of Bank Nifty) drove a 27.75% move, but Bank Nifty moved only 3% — options were overpriced relative to the likely actual index move",
        "Short strangles are always profitable when the market is bullish",
        "The PSU news was negative for Bank Nifty, making puts expensive",
      ],
      correct: 1,
      explanation: "PSU banks = 10% of Bank Nifty. A 27.75% PSU move should theoretically cause only ~2.7% Bank Nifty move — not justify extreme Bank Nifty option premiums. The inflated Bank Nifty option premiums from the market overreaction made a short strangle systematically attractive.",
      difficulty: "hard",
      citation: "Varsity Module 10, Ch. 1.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 6 — Option Strategies & Module 10 — Trading Systems (zerodha.com/varsity)",
}

export default lesson
