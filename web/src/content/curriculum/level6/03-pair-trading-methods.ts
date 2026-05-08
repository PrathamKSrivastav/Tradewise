import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l6-03-pair-trading-methods",
  level: 6,
  order: 3,
  title: "Pair Trading: Measuring the Relationship",
  subtitle: "Correlation, linear regression, and trade identification",
  xpReward: 35,
  body: `## Two Methods to Quantify a Pair

To trade a pair, you must **quantify the relationship** between the two stocks. There are two approaches:

1. **Correlation-based method** — tracks price spreads and statistical ratios
2. **Linear Regression method** — models one stock's price as a function of the other

---

## Method 1: Correlation-Based Approach

### Spread and Ratio

**Spread** = Closing price of Stock 1 − Closing price of Stock 2

For example:
- GICRE daily return: +6.1%
- ICICIGI daily return: +3.85%
- Spread = 6.1 − 3.85 = **2.25**

You track this spread over time. Calculate the **mean** and **standard deviation** of the spread. A trade is triggered when the spread moves beyond the mean ± 1 standard deviation.

### Correlation

Correlation measures how closely two stock prices move together. It ranges from −1 to +1:
- +1 = perfect positive correlation (move identically)
- 0 = no relationship
- −1 = perfect inverse relationship

For pair trading, you want **high positive correlation** (typically > 0.75).

---

## Method 2: Linear Regression Approach

This is the more statistically robust method. Here, you model the relationship as:

**Y = Beta × X + Intercept + Residual**

Where:
- **Y** = price of Stock 2 (dependent)
- **X** = price of Stock 1 (independent)
- **Beta** = how much Y moves for every 1 unit X moves
- **Intercept** = the portion of Y's price the model cannot explain from X alone
- **Residual** = the difference between predicted Y and actual Y

The residual is the key trading signal. When the residual deviates significantly from its mean, it indicates a pair trading opportunity.

---

## The ADF Test: Is the Relationship Stable?

Not all correlated pairs are suitable for pair trading. The relationship must be **stationary** — meaning it reverts to a mean rather than drifting away permanently.

The **Augmented Dickey-Fuller (ADF) test** measures this:
- **ADF value < 0.05** → the residual is stationary (pair is tradeable)
- **ADF value > 0.10** → the residual is not stationary (avoid the pair)

**Example**: ICICI Bank and HDFC Bank pair:
- ADF = 0.048 → 95.2% confidence that the residual is stationary → tradeable pair

---

## Trade Identification Using Z-Score

Once you have the regression model, calculate the **z-score** of the residual:

**Z-score = (Current Residual − Mean) / Standard Deviation**

| Z-Score | Signal |
|---|---|
| > +2 | Short the pair (Y overvalued vs X) |
| > +1 | Consider shorting |
| 0 | No trade / close existing trade |
| < −1 | Consider going long |
| < −2 | Long the pair (Y undervalued vs X) |

Positions are closed when the z-score reverts to 0 (the mean).

---

## Position Sizing: Beta Neutrality

In the regression pair trade, you don't simply buy 1 lot of each. You must ensure the trade is **beta neutral** — the monetary exposure to each stock is balanced by their relative price sensitivity.

**Beta of the pair** = the regression beta from the linear equation.

**Example** (ICICI Bank vs HDFC Bank):
- ADF = 0.048, Beta = 0.79, Intercept = 1626
- HDFC (Y) lot size = 500 shares
- ICICI (X) lot size = 2,750 shares

To beta-neutralise: 2,750 / 0.79 = 3,481 → round to 3,500 HDFC shares → **7 lots of HDFC vs 1 lot of ICICI**

---

## The Intercept Warning

A large intercept is a red flag. In the ICICI/HDFC example:
- Intercept = 1,626
- HDFC price = ₹2,024
- Intercept accounts for 1,626/2,024 = **80% of HDFC's price**

This means the regression model can only explain 20% of HDFC's price movement from ICICI. Despite the good ADF value, the trade has questionable statistical grounding — many experienced traders would avoid it.

**Rule**: A good pair trade needs both a low ADF value AND a low intercept relative to the stock price.

---

## Summary: Pair Trade Checklist

Before entering a pair trade (regression method):
1. ADF value < 0.05 (stationary residual)
2. Intercept is small relative to stock price
3. Beta is positive (same direction pair)
4. Z-score has moved beyond ±1 or ±2 standard deviations
5. Position sized for beta neutrality`,

  keyTerms: [
    {
      term: "Spread (Pair Trading)",
      definition: "Closing price of Stock 1 minus closing price of Stock 2. Used in the correlation-based method to track the price relationship between two stocks.",
    },
    {
      term: "Linear Regression (Pair Trading)",
      definition: "Models Y = Beta × X + Intercept + Residual. The residual's z-score is the trading signal — a large positive residual means Y is overpriced vs X; a large negative means Y is underpriced.",
    },
    {
      term: "ADF Test",
      definition: "Augmented Dickey-Fuller test — checks if the residual is stationary (reverts to mean). ADF < 0.05 means the pair is tradeable with 95%+ confidence.",
    },
    {
      term: "Z-Score",
      definition: "(Current Residual − Mean) / Standard Deviation. Trading signal in pair trading: enter near ±2, exit near 0.",
    },
    {
      term: "Beta Neutral",
      definition: "A pair trade where the number of shares in each leg is adjusted by the regression beta so that the monetary exposure to each stock is balanced. Prevents directional bias from lot size mismatches.",
    },
    {
      term: "Intercept",
      definition: "In the regression equation Y = Beta × X + Intercept, this is the portion of Y's price the model cannot explain. A high intercept relative to stock price signals a poor regression fit — avoid trading.",
    },
  ],

  facts: [
    {
      statement: "ICICI Bank and HDFC Bank pair trade example: ADF = 0.048 (only 4.8% chance residual is non-stationary), Beta = 0.79, Intercept = 1,626. The intercept accounts for 80% of HDFC's stock price, making it a questionable trade despite the good ADF value.",
      citation: "Varsity Module 10, Ch. 14.1–14.2",
    },
    {
      statement: "Beta neutral position sizing for ICICI/HDFC: ICICI lot size 2,750, Beta 0.79. Required HDFC shares = 2,750/0.79 = 3,481 → 7 lots of HDFC (500/lot) against 1 lot of ICICI.",
      citation: "Varsity Module 10, Ch. 14.1",
    },
    {
      statement: "ADF test for stationarity: ADF < 0.05 means the residual is stationary and the pair is tradeable. ADF > 0.10 means avoid the pair.",
      citation: "Varsity Module 10, Ch. 11",
    },
    {
      statement: "Pair trade entry: z-score > +2 triggers a short (Y overvalued vs X). Z-score < −2 triggers a long (Y undervalued vs X). Position closed when z-score reverts to 0.",
      citation: "Varsity Module 10, Ch. 12",
    },
  ],

  quizSeed: [
    {
      id: "l6-03-q1",
      question: "In linear regression pair trading (Y = Beta × X + Intercept + Residual), what is the trading signal?",
      options: [
        "The beta value crossing above 1.0",
        "The intercept exceeding 50% of Y's price",
        "The residual's z-score moving beyond ±1 or ±2 standard deviations",
        "The correlation dropping below 0.75",
      ],
      correct: 2,
      explanation: "The residual's z-score is the key trading signal. A z-score beyond +2 means Y is overvalued relative to X (short signal); below −2 means Y is undervalued (long signal). Trades close when z-score reverts to 0.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 12",
    },
    {
      id: "l6-03-q2",
      question: "An ADF test result of 0.048 for a pair means:",
      options: [
        "There is a 4.8% chance the residual is stationary — avoid this pair",
        "There is a 95.2% chance the residual is stationary — this pair is tradeable",
        "The beta is 0.048 — position size accordingly",
        "The spread has moved 4.8 standard deviations — enter immediately",
      ],
      correct: 1,
      explanation: "ADF value of 0.048 means there is only 4.8% probability the residual is non-stationary — i.e., 95.2% confidence it is stationary and will revert to mean. This is a good ADF result for pair trading.",
      difficulty: "medium",
      citation: "Varsity Module 10, Ch. 11",
    },
    {
      id: "l6-03-q3",
      question: "Why is beta neutrality important in pair trading position sizing?",
      options: [
        "It ensures both legs have the same number of shares",
        "It balances monetary exposure by adjusting lot quantities according to the regression beta",
        "It prevents both stocks from being in the same sector",
        "It guarantees the ADF test passes",
      ],
      correct: 1,
      explanation: "Beta neutrality adjusts the number of lots in each leg so that the monetary exposure is proportional to the stocks' relative sensitivity. Without it, a lot size mismatch creates unintended directional bias.",
      difficulty: "hard",
      citation: "Varsity Module 10, Ch. 14.1",
    },
    {
      id: "l6-03-q4",
      question: "In the ICICI/HDFC pair (HDFC price ₹2,024, Intercept = 1,626), why is this a questionable trade?",
      options: [
        "The ADF value is too high",
        "The beta is negative, making it untradeable",
        "The intercept accounts for 80% of HDFC's price, meaning the regression explains only 20% of the relationship",
        "ICICI and HDFC are in different sectors",
      ],
      correct: 2,
      explanation: "Intercept 1,626 out of HDFC's price 2,024 = 80% unexplained by the model. The regression can only explain 20% of HDFC's price from ICICI. A large intercept relative to stock price means a poor model fit — risky to trade.",
      difficulty: "hard",
      citation: "Varsity Module 10, Ch. 14.2",
    },
    {
      id: "l6-03-q5",
      question: "When does a pair trade position get closed?",
      options: [
        "When the ADF value drops below 0.05",
        "When the beta exceeds 1.0",
        "When the z-score reverts to 0 (the mean)",
        "At the end of every month regardless of z-score",
      ],
      correct: 2,
      explanation: "A pair trade is entered when the z-score is extreme (±2) and closed when the z-score returns to 0 — meaning the spread has reverted to its historical mean and the trade has achieved its objective.",
      difficulty: "easy",
      citation: "Varsity Module 10, Ch. 12",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 10 — Trading Systems (zerodha.com/varsity)",
}

export default lesson
