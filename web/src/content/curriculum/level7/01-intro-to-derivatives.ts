import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l7-01-intro-derivatives",
  level: 7,
  order: 1,
  title: "Introduction to Derivatives",
  subtitle: "Forwards, futures, and the foundation of derivative markets",
  xpReward: 30,
  body: `## What are Derivatives?

A **derivative** is a financial contract whose value is derived from an underlying asset. The underlying can be a stock, bond, commodity, currency, or index.

Derivatives have existed for a long time. The earliest Indian reference dates to **320 BC in Kautilya's Arthashastra**, which described a pricing mechanism for standing crops to be harvested at a future date — a true forwards contract.

In India today:
- Index futures launched: **12 June 2000**
- Index options launched: **4 June 2001**
- Stock options launched: **2 July 2001**
- Single stock futures launched: **9 November 2001**

Options gained real liquidity only around 2006. Today, **nearly 80% of Indian derivatives traded are options**, with the rest being futures.

---

## The Forwards Contract: The Predecessor

A **forwards contract** is the simplest derivative. Two parties agree to exchange an asset for cash at a **specific future date and price**, fixed today.

**Classic example — ABC Jewelers and XYZ Gold Dealers:**
- Date of agreement: 9 Dec 2014
- Agreement: ABC will buy 15 kg of gold at ₹2,450/gram from XYZ on 9 Mar 2015
- Contract value: ₹2,450 × 15,000 grams = **₹3.675 Crores**

ABC believes gold prices will rise; XYZ believes they will fall. Both enter the agreement because it aligns with their view.

**Three possible outcomes on 9 Mar 2015:**
1. Gold rises to ₹2,700/gram → ABC saves ₹38 lakhs; XYZ loses ₹38 lakhs
2. Gold falls to ₹2,050/gram → ABC loses ₹59.5 lakhs; XYZ gains ₹59.5 lakhs
3. Gold stays at ₹2,450/gram → Neither party gains or loses

---

## Problems with Forwards Contracts

Forwards have four critical risks:
1. **Liquidity risk** — hard to find a counterparty with exactly the opposite view
2. **Default/counterparty risk** — the other party may refuse to honor the contract at expiry
3. **Regulatory risk** — forwards are OTC (over-the-counter), with no regulatory oversight; default incentive is high
4. **Rigidity** — cannot exit the agreement before expiry even if views change

---

## How Futures Contracts Solve These Problems

| Feature | Forwards Contract | Futures Contract |
|---|---|---|
| Traded | OTC (private) | On exchange (NSE/BSE) |
| Standardization | Custom terms | Standardized lot size, expiry |
| Counterparty risk | High | Virtually none (exchange guarantees) |
| Regulated | No | Yes — SEBI in India |
| Transferable | No | Yes — easily tradeable |
| Settlement | Physical or cash | Cash settled |
| Time frames | Single date | Multiple expiries (1, 2, 3 months) |

**The exchange acts as the financial supermarket** — thousands of buyers and sellers with opposing views meet simultaneously. No need to find a counterparty yourself.

In India, all **derivative contracts expire on the last Thursday of every month**.

---

## Key Futures Concepts

**Lot size** — minimum quantity that must be traded in a futures contract. Standardized per stock.
Example: TCS futures lot size = 125 shares; SBI futures = 1,500 shares.

**Contract value** = Lot size × Futures price
Example: TCS futures at ₹2,374.9 with lot size 125 → Contract value = 125 × 2,374.9 = **₹2,96,862.5**

**Margin** — a token advance (typically 10–20% of contract value) deposited to enter a futures position. Not the full contract value.

**Expiry** — the date the futures contract ceases to exist. After expiry, new contracts are introduced.

**Square off** — closing an existing futures position before or at expiry by taking the opposite position. A buy position is squared off by selling; a sell position by buying.`,

  keyTerms: [
    {
      term: "Derivative",
      definition: "A financial contract whose value is derived from an underlying asset (stock, index, commodity, currency). Includes futures and options.",
    },
    {
      term: "Forwards Contract",
      definition: "An OTC agreement between two parties to buy/sell an asset at a predetermined price on a future date. No regulatory oversight, high counterparty risk, not transferable.",
    },
    {
      term: "Futures Contract",
      definition: "A standardized, exchange-traded derivative that mimics the forward contract but eliminates its risks. Cash settled, regulated by SEBI, tradeable before expiry, multiple expiry dates.",
    },
    {
      term: "Lot Size",
      definition: "The minimum number of shares per futures contract. Standardized per stock. TCS lot size = 125 shares.",
    },
    {
      term: "Square Off",
      definition: "Closing a futures position before expiry by taking the opposite position. Buying to close a short, or selling to close a long. Margins are unblocked on square off.",
    },
  ],

  facts: [
    {
      statement: "Derivatives in India: Index futures launched 12 Jun 2000, Index options 4 Jun 2001, Stock options 2 Jul 2001, Single stock futures 9 Nov 2001. Real liquidity in index options emerged only around 2006.",
      citation: "Varsity Module 5, Ch. 1.1",
    },
    {
      statement: "ABC Jewelers vs XYZ Gold Dealers: 15 kg gold at ₹2,450/gram on 9 Dec 2014. If gold rises to ₹2,700 by 9 Mar 2015 → ABC saves ₹38 lakhs; XYZ loses ₹38 lakhs. This is the classic forwards example.",
      citation: "Varsity Module 4, Ch. 1.2–1.3",
    },
    {
      statement: "Forwards contract risks: (1) Liquidity risk, (2) Default/counterparty risk, (3) No regulatory oversight, (4) Rigidity — cannot exit before expiry. Futures contracts address all four.",
      citation: "Varsity Module 4, Ch. 1.6",
    },
    {
      statement: "All derivative contracts in India expire on the last Thursday of every month. Three expiry series are always available: current month, mid month, and far month.",
      citation: "Varsity Module 4, Ch. 3.1",
    },
  ],

  quizSeed: [
    {
      id: "l7-01-q1",
      question: "Which of the following correctly distinguishes a futures contract from a forwards contract?",
      options: [
        "Futures are private OTC agreements; forwards are exchange-traded",
        "Futures are standardized, exchange-traded, and regulated; forwards are OTC, customizable, and unregulated",
        "Futures require physical delivery; forwards are cash-settled",
        "Forwards can be squared off before expiry; futures cannot",
      ],
      correct: 1,
      explanation: "Futures are traded on exchanges, standardized (lot size, expiry), regulated by SEBI, cash-settled, and easily transferable. Forwards are OTC, custom, unregulated, and not easily transferable.",
      difficulty: "medium",
      citation: "Varsity Module 4, Ch. 2.2",
    },
    {
      id: "l7-01-q2",
      question: "In the ABC Jewelers/XYZ Gold example, gold price on expiry is ₹2,700/gram vs the agreed ₹2,450/gram. What happens?",
      options: [
        "XYZ profits by ₹38 lakhs; ABC loses ₹38 lakhs",
        "ABC profits by ₹38 lakhs; XYZ loses ₹38 lakhs",
        "Both parties profit — the contract is mutual",
        "Neither party is affected — the margin covers the difference",
      ],
      correct: 1,
      explanation: "ABC agreed to buy gold at ₹2,450 when it's now worth ₹2,700 — a saving of ₹250/gram × 1500 grams × 15 kg effective difference = ₹38 lakhs. XYZ must sell at the lower price, incurring an equal loss. Buyer's gain = seller's loss.",
      difficulty: "medium",
      citation: "Varsity Module 4, Ch. 1.3",
    },
    {
      id: "l7-01-q3",
      question: "TCS futures price is ₹2,374.9 and lot size is 125 shares. What is the contract value?",
      options: ["₹29,686", "₹2,96,862.5", "₹1,87,450", "₹14,843"],
      correct: 1,
      explanation: "Contract value = Lot size × Futures price = 125 × ₹2,374.9 = ₹2,96,862.5",
      difficulty: "easy",
      citation: "Varsity Module 4, Ch. 3.1",
    },
    {
      id: "l7-01-q4",
      question: "Why are futures contracts considered to have virtually no counterparty risk?",
      options: [
        "Both parties pay full contract value upfront",
        "The exchange itself acts as guarantor, and margins ensure both parties can honor the contract",
        "SEBI insures all futures positions against default",
        "Futures contracts expire worthless if one party defaults",
      ],
      correct: 1,
      explanation: "The stock exchange acts as the central counterparty — it guarantees settlement. Combined with the margin system (which ensures participants have skin in the game), default risk is essentially eliminated.",
      difficulty: "medium",
      citation: "Varsity Module 4, Ch. 2.2",
    },
    {
      id: "l7-01-q5",
      question: "When you 'square off' a futures position, what happens?",
      options: [
        "You hold the position until the monthly expiry",
        "You take the opposite position to close out the existing futures contract, transferring risk to the new buyer/seller",
        "You pay the full contract value to settle the trade",
        "You request physical delivery of the underlying asset",
      ],
      correct: 1,
      explanation: "Squaring off means taking the opposite position — sell 1 lot if you bought 1 lot. This transfers risk to the new counterparty. Margins are unblocked, and P&L is credited/debited the same day.",
      difficulty: "easy",
      citation: "Varsity Module 4, Ch. 3.3",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 4 — Futures Trading & Module 5 — Options Theory (zerodha.com/varsity)",
}

export default lesson
