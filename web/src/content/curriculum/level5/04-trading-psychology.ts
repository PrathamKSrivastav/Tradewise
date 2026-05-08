import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l5-04-trading-psychology",
  level: 5,
  order: 4,
  title: "Trading Psychology & Cognitive Biases",
  subtitle: "The mental traps that destroy profitable trading — and how to avoid them",
  xpReward: 30,
  body: `## Why Psychology Matters

Biases, in the trading and investing world, are **the only thing standing between you and a profitable P&L.** Understanding them is the first step to overcoming them.

The MRF grandfather story illustrates this perfectly: a man who bought 20,000 MRF shares in the 1990s accumulated ₹128 Crores (at ₹64,000/share) simply by **forgetting** he owned the stock. Had he tracked it daily, his biases would have caused him to sell at 100%, 200%, or 500% returns — long before the 2,000%+ gain materialised.

---

## 1. Anchoring Bias (Focalism)

We get fixated on the **first piece of information** we receive — it becomes an anchor for all subsequent decisions.

**Example**: Sundaram Clayton was available at ₹270 (Aug/Sep 2013 bear market). The analyst set ₹270 as the "right price." The stock moved to ₹280, then ₹290, then ₹310. Anchored to ₹270, the investor never bought. The stock went on to deliver massive returns.

The difference between available price (₹310) and desired price (₹270) was just 15% — but the mind wouldn't allow it.

**Cure**: Be aware of it. Adopt critical thinking. Ask: "Is my price anchor based on fundamentals or arbitrary first impression?"

---

## 2. Illusion of Control

Traders load 8+ indicators on a chart (Bollinger Bands, Fibonacci, Pivot Points, RSI, MACD, Stochastic, ATR, Volume) believing more analysis = more control. In reality, no amount of indicators can predict the future with certainty.

The market is a complex system — adding complexity to your analysis gives the **illusion** of control without actually improving outcomes. Simple, consistent systems often outperform overly complex ones.

---

## 3. Loss Aversion

Humans feel the pain of a loss approximately **2× more intensely** than the pleasure of an equivalent gain (Kahneman & Tversky). This leads traders to:
- Hold losing trades too long (hoping to break even)
- Cut winning trades too quickly (taking profits early to avoid "giving them back")

This is the exact opposite of what a profitable system requires: **cut losses quickly, let winners run.**

---

## 4. Recency Bias

We give too much weight to recent events. After 3 consecutive winning trades, we become overconfident and over-size the next trade. After 3 losing trades, we become fearful and under-size or skip trades.

A trading system's edge plays out over dozens or hundreds of trades — not 3.

---

## 5. Gambler's Fallacy

After a long losing streak, traders believe the next trade "must" be a winner — and increase bet size. In reality, each trade is independent. Past losses don't improve future probabilities.

The poker story: after losing ₹2,000 over two buy-ins, the gambler bought in a third time convinced his luck was turning. He lost again. The trades/hands were independent events.

---

## 6. Confirmation Bias

We seek information that **confirms** our existing view and ignore information that contradicts it. Once a trader decides a stock is a buy, they notice only bullish signals and dismiss bearish ones.

---

## 7. Bandwagon Effect

Buying a stock because "everyone is buying it" — following the crowd without independent analysis. This is how retail investors buy at market tops.

---

## The Solution

There is no permanent cure for cognitive biases — they are hardwired into human psychology. The only real cure is:
1. **Awareness** — know the biases exist
2. **Systems** — have a rule-based trading system (entry, exit, position size) with no room for discretion
3. **Journaling** — record every trade and the reasoning behind it. Review regularly to spot bias patterns`,

  keyTerms: [
    {
      term: "Anchoring Bias",
      definition: "Getting fixated on the first piece of information received (e.g., a stock price) and using it as a reference for all subsequent decisions, even when irrelevant.",
    },
    {
      term: "Loss Aversion",
      definition: "The tendency to feel the pain of loss ~2× more than the pleasure of equivalent gain. Leads traders to hold losers too long and cut winners too early.",
    },
    {
      term: "Gambler's Fallacy",
      definition: "Believing that after a losing streak, the next trade 'must' win — and increasing bet size accordingly. Each trade is an independent event.",
    },
    {
      term: "Recency Bias",
      definition: "Overweighting recent events. After consecutive wins, overconfidence increases bet size. After consecutive losses, fear reduces bet size or causes trade skipping.",
    },
    {
      term: "Confirmation Bias",
      definition: "Seeking information that confirms your existing view and ignoring contradictory evidence. Leads to poor trade selection and missed exit signals.",
    },
    {
      term: "Illusion of Control",
      definition: "Loading charts with excessive indicators creates the feeling of certainty. In reality, no number of indicators can predict markets with certainty.",
    },
  ],

  facts: [
    {
      statement: "MRF grandfather: 20,000 shares bought in the 1990s at ~₹64,000/share by 2017 = ₹128 Crores. The wealth was created by NOT paying attention — biases couldn't intervene.",
      citation: "Varsity Module 9, Ch. 15.1",
    },
    {
      statement: "Sundaram Clayton anchoring bias example: analyst fixated on ₹270 entry price. Stock moved to ₹310 without retracing — investor missed the entire rally.",
      citation: "Varsity Module 9, Ch. 16.1",
    },
    {
      statement: "Anchoring Bias is also called Focalism. It belongs to a class called cognitive biases — systematic errors in thinking that affect human decisions.",
      citation: "Varsity Module 9, Ch. 16.1",
    },
    {
      statement: "Trading biases are the only thing standing between a trader and a profitable P&L. Awareness and rule-based systems are the cure.",
      citation: "Varsity Module 9, Ch. 15",
    },
  ],

  quizSeed: [
    {
      id: "l5-04-q1",
      question: "The MRF grandfather accumulated ₹128 Crores because he:",
      options: [
        "Was an expert at timing the market",
        "Forgot he owned the stock and held it for decades without bias interference",
        "Followed a systematic position sizing strategy",
        "Re-invested all dividends",
      ],
      correct: 1,
      explanation: "By forgetting he owned the stock, the grandfather never fell prey to biases like loss aversion or recency bias. His lack of active involvement allowed the compounding to work undisturbed.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 15.1",
    },
    {
      id: "l5-04-q2",
      question: "In the Sundaram Clayton example, what bias prevented the investor from buying at ₹310?",
      options: [
        "Loss aversion",
        "Gambler's fallacy",
        "Anchoring bias — fixated on the initial ₹270 price",
        "Recency bias",
      ],
      correct: 2,
      explanation: "The investor anchored to ₹270 as the 'right price.' When the stock moved to ₹310, the 15% difference felt too large — even though the fundamental thesis hadn't changed.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 16.1",
    },
    {
      id: "l5-04-q3",
      question: "Loss aversion causes traders to make which pair of errors?",
      options: [
        "Buy winners too early and sell losers too early",
        "Hold losing trades too long and cut winning trades too quickly",
        "Oversize winning trades and undersize losing trades",
        "Trade too frequently and ignore stop losses",
      ],
      correct: 1,
      explanation: "Loss aversion makes the pain of loss feel 2× as intense as equivalent gain. Traders hold losers (hoping to break even) and cut winners quickly (to 'lock in' gains), destroying their edge.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 15",
    },
    {
      id: "l5-04-q4",
      question: "Gambler's fallacy is best described as:",
      options: [
        "Believing past wins guarantee future wins",
        "Believing a losing streak means the next trade must win, so you increase bet size",
        "Placing too many trades in a single session",
        "Using leverage beyond your position sizing limit",
      ],
      correct: 1,
      explanation: "Gambler's fallacy: after a streak of losses, our mind tricks us into believing the next trade must be a winner, causing us to increase bet size dangerously. Each trade is independent.",
      difficulty: "easy",
      citation: "Varsity Module 9, Ch. 11.1",
    },
    {
      id: "l5-04-q5",
      question: "What is the most effective solution to trading biases?",
      options: [
        "Trade less frequently",
        "Use more indicators to analyse charts",
        "Awareness + rule-based system + trade journaling",
        "Only trade with 1% of capital",
      ],
      correct: 2,
      explanation: "There is no cure for cognitive biases — they are hardwired. The solution is: (1) be aware they exist, (2) follow a rule-based system that eliminates discretion, (3) journal every trade to spot bias patterns.",
      difficulty: "medium",
      citation: "Varsity Module 9, Ch. 15–16",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 9 — Risk Management & Trading Psychology (zerodha.com/varsity)",
}

export default lesson
