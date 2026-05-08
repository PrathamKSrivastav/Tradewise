import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l7-02-futures-leverage",
  level: 7,
  order: 2,
  title: "Futures: Leverage, Margin & Payoff",
  subtitle: "How futures amplify returns — and risks — through leverage",
  xpReward: 35,
  body: `## Why Trade Futures Instead of Spot?

When you buy a stock in the spot market, you pay the full price and wait at least T+2 days before selling. You can only deploy as much capital as you actually have.

Futures let you participate in a much larger trade by paying only a **margin** — typically 10–20% of the contract value. This is the power of **leverage**.

---

## The TCS Trade: Spot vs Futures (Dec 2014)

**Trade setup:**
- Stock: TCS Limited
- Buy date: 15 Dec 2014 @ ₹2,362 per share
- Sell date: 23 Dec 2014 @ ₹2,519 per share
- Capital available: ₹1,00,000

### Spot Market (No Leverage)
- Shares bought: ₹1,00,000 ÷ ₹2,362 = **42 shares**
- Sell value: 42 × ₹2,519 = **₹1,05,798**
- Profit: ₹5,798
- Return: 5,798/1,00,000 = **5.79% over 9 days**

### Futures Market (With Leverage)
- TCS lot size = 125 shares
- Margin required = 14% of contract value
- Contract value per lot = 125 × ₹2,362 = **₹2,95,250**
- Margin per lot = 14% × ₹2,95,250 = **₹41,335**
- Lots affordable: ₹1,00,000 ÷ ₹41,335 = **2 lots** (₹82,670 margin used)
- Shares controlled: 2 × 125 = **250 shares**
- Sell value: 250 × ₹2,519 = ₹6,29,750
- Profit: ₹6,29,750 − ₹5,90,500 = **₹39,250**
- Return: ₹39,250 ÷ ₹82,670 = **47% over 9 days**

The same ₹1,00,000, the same price move from ₹2,362 to ₹2,519:
- Spot market: ₹5,798 profit (5.79%)
- Futures market: ₹39,250 profit (**47%**)

This is leverage in action.

---

## Calculating Leverage

**Leverage = Contract Value ÷ Margin**

For TCS futures:
= ₹2,95,250 ÷ ₹41,335 = **7.14x**

This means every ₹1 in the trading account controls ₹7.14 worth of TCS.

At 7.14x leverage, TCS would need to fall by approximately **14%** to wipe out the entire margin deposit.

**Leverage is a double-edged sword** — the same mechanism that generated 47% profit can generate 47% loss if the trade moves against you.

---

## Mark to Market (M2M)

M2M is how futures P&L is settled on a **daily basis** — not just at expiry.

At the end of every trading day, your futures position is "marked" to the closing price:
- If the price moved in your favor → profit credited to your account
- If the price moved against you → loss debited from your account

This daily settlement prevents losses from accumulating to catastrophic levels. If your account balance falls below the **maintenance margin**, you receive a **margin call** — a requirement to deposit more funds or the broker will square off your position.

---

## Margin Call Example

A trader buys 1 lot of TCS futures at ₹2,374.9. Margin deposited: ₹41,335.

Over the next few days:
- Day 1: TCS falls to ₹2,300 → Loss = 125 × ₹74.9 = ₹9,362 → Debited → Account balance: ₹31,973
- Day 2: TCS falls to ₹2,250 → Loss = 125 × ₹50 = ₹6,250 → Account: ₹25,723
- Day 3: TCS falls further → If balance drops below maintenance margin → **Margin call**

The broker demands additional funds. If not deposited, the position is forcibly squared off.

---

## The Futures Payoff

The futures payoff is **linear and symmetric**:
- For every ₹1 rise in price → Buyer gains ₹1 × lot size; Seller loses ₹1 × lot size
- For every ₹1 fall in price → Buyer loses ₹1 × lot size; Seller gains ₹1 × lot size

**Buyer's gain = Seller's loss** (and vice versa).

Unlike options, there is no cap on losses for futures traders on either side.

---

## Practical Summary

| Concept | Value (TCS Example) |
|---|---|
| Lot size | 125 shares |
| Futures price | ₹2,362 |
| Contract value | ₹2,95,250 |
| Margin (14%) | ₹41,335 |
| Leverage | 7.14x |
| Spot return (9 days) | 5.79% |
| Futures return (9 days) | 47% |`,

  keyTerms: [
    {
      term: "Leverage",
      definition: "Using a small margin deposit to control a larger contract value. TCS example: ₹41,335 margin controls ₹2,95,250 contract = 7.14x leverage. Amplifies both gains and losses.",
    },
    {
      term: "Margin",
      definition: "Token advance required to enter a futures position (typically 10–20% of contract value). TCS: 14% margin = ₹41,335 for a ₹2,95,250 contract.",
    },
    {
      term: "Mark to Market (M2M)",
      definition: "Daily settlement of futures P&L against the closing price. Profits are credited and losses debited daily — not just at expiry. Prevents unmanageable loss accumulation.",
    },
    {
      term: "Margin Call",
      definition: "A demand for additional funds when a trader's account balance falls below the maintenance margin due to M2M losses. If not met, the broker forcibly squares off the position.",
    },
    {
      term: "Futures Payoff",
      definition: "Linear and symmetric: for every ₹1 move in the underlying, the buyer gains/loses ₹1 × lot size. No cap on profit or loss for either the buyer or seller.",
    },
  ],

  facts: [
    {
      statement: "TCS trade Dec 2014: Buy 2 lots at ₹2,362, sell at ₹2,519. Margin used ₹82,670. Profit ₹39,250 = 47% return. Same capital in spot market made only 5.79% (₹5,798 on 42 shares).",
      citation: "Varsity Module 4, Ch. 4.3",
    },
    {
      statement: "Leverage formula: Contract Value ÷ Margin. TCS: ₹2,95,250 ÷ ₹41,335 = 7.14x. At 7.14x, a 14% adverse move wipes out the entire margin.",
      citation: "Varsity Module 4, Ch. 4.4",
    },
    {
      statement: "Mark to Market: futures P&L is settled daily at closing price. If balance drops below maintenance margin → margin call. Broker forcibly squares off if not met.",
      citation: "Varsity Module 4, Ch. 5.3",
    },
    {
      statement: "Futures payoff is linear: every ₹1 price change × lot size = P&L for the position holder. Buyer's gain = seller's loss. No asymmetric payoff unlike options.",
      citation: "Varsity Module 4, Ch. 4.5",
    },
  ],

  quizSeed: [
    {
      id: "l7-02-q1",
      question: "A trader has ₹1,00,000 and TCS futures require ₹41,335 margin per lot. How many lots can they buy, and how many shares do they control?",
      options: [
        "1 lot = 125 shares",
        "2 lots = 250 shares",
        "3 lots = 375 shares",
        "4 lots = 500 shares",
      ],
      correct: 1,
      explanation: "₹1,00,000 ÷ ₹41,335 = 2.4 lots → 2 lots (round down). 2 × 125 = 250 shares. The ₹17,330 leftover cannot buy a 3rd lot so it's held as cash.",
      difficulty: "easy",
      citation: "Varsity Module 4, Ch. 4.3",
    },
    {
      id: "l7-02-q2",
      question: "What is the leverage ratio for a futures contract with contract value ₹3,00,000 and margin of ₹42,000?",
      options: ["3.5x", "5.0x", "7.14x", "14x"],
      correct: 2,
      explanation: "Leverage = Contract Value ÷ Margin = ₹3,00,000 ÷ ₹42,000 = 7.14x. At this leverage, a 1/7.14 = 14% adverse price move wipes out the margin.",
      difficulty: "medium",
      citation: "Varsity Module 4, Ch. 4.4",
    },
    {
      id: "l7-02-q3",
      question: "What is Mark to Market (M2M) in futures trading?",
      options: [
        "Marking the stop loss price before entering a trade",
        "Daily settlement of P&L at the closing price — profits credited, losses debited every day",
        "Calculating the fair value of futures versus spot price",
        "The process of exercising a futures contract at expiry",
      ],
      correct: 1,
      explanation: "M2M means your futures position's P&L is settled daily at the closing price. Gains are credited to your account; losses are debited. If losses erode the margin below the maintenance level, a margin call is issued.",
      difficulty: "medium",
      citation: "Varsity Module 4, Ch. 5.3",
    },
    {
      id: "l7-02-q4",
      question: "The TCS spot market trade returned 5.79%. The same capital in TCS futures returned 47%. Both used identical buy/sell prices (₹2,362 → ₹2,519). Why the difference?",
      options: [
        "Futures prices moved more than spot prices",
        "Futures traders pay zero brokerage",
        "Leverage in futures allows control of more shares (250 vs 42) for the same capital",
        "The exchange subsidizes futures returns",
      ],
      correct: 2,
      explanation: "With ₹1,00,000: spot buys 42 shares, futures margin buys 2 lots = 250 shares. The profit per share is identical (₹157), but 250 shares × ₹157 = ₹39,250 vs 42 shares × ₹157 = ₹6,594. Leverage multiplies the exposure.",
      difficulty: "hard",
      citation: "Varsity Module 4, Ch. 4.3",
    },
    {
      id: "l7-02-q5",
      question: "What happens if a futures trader's account balance drops below the maintenance margin due to M2M losses?",
      options: [
        "The loss is written off and the position continues",
        "The position is automatically converted to a spot market holding",
        "The trader receives a margin call — must deposit more funds or the broker squares off the position",
        "The exchange suspends trading in that futures contract",
      ],
      correct: 2,
      explanation: "When M2M losses reduce the account balance below the maintenance margin, the broker issues a margin call — a demand to top up funds. If not met, the broker forcibly squares off the position to prevent further losses.",
      difficulty: "medium",
      citation: "Varsity Module 4, Ch. 5.5",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 4 — Futures Trading (zerodha.com/varsity)",
}

export default lesson
