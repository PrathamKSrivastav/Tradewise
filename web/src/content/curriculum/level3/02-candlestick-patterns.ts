import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l3-02-candlestick-patterns",
  level: 3,
  order: 2,
  title: "Candlestick Patterns",
  subtitle: "Reading candles and identifying single & multi-candle signals",
  xpReward: 30,
  body: `## Why Candlesticks?

Japanese Candlesticks were invented in the 18th century by rice merchant Homma Munehisa. Trader Steve Nison introduced them to the Western world in the 1980s and authored *Japanese Candlestick Charting Techniques*.

Candlesticks are preferred over bar charts and line charts because they display all four key price points — Open, High, Low, Close (OHLC) — in a visually intuitive format and make pattern identification easy.

## Anatomy of a Candlestick

A candlestick has three parts:
- **Real body** — rectangular; connects open and close
- **Upper shadow** — line above the body connecting to the High
- **Lower shadow** — line below the body connecting to the Low

**Bullish candle** (blue/green): Close > Open. Low = base of lower shadow, High = top of upper shadow.
**Bearish candle** (red): Close < Open. Open is at the top of the body, Close at the bottom.

A long body = strong buying or selling. A short body = subdued activity.

## Three Rules for All Candlestick Patterns

1. **Buy strength, sell weakness** — Buy on a bullish (blue) candle day; sell on a bearish (red) candle day.
2. **Be flexible — quantify and verify** — Minor variations to textbook patterns are acceptable within a reasonable limit.
3. **Look for a prior trend** — A bullish reversal pattern requires a prior downtrend; a bearish pattern requires a prior uptrend.

## Single Candlestick Patterns

### Marubozu ("Bald" candle)
No upper or lower shadow. The only pattern that violates Rule 3 — it can appear anywhere.

- **Bullish Marubozu**: Open = Low, High = Close. Indicates strong buying throughout the day. *Trade*: Buy near the close; stoploss = Low of the candle. Example: ACC Ltd — O=971.8, H=1030.2, L=970.1, C=1028.4.
- **Bearish Marubozu**: Open = High, Close = Low. Indicates strong selling throughout the day. *Trade*: Sell/short near the close; stoploss = High of the candle. Example: BPCL Ltd — O=355.4, H=356.0, L=341, C=341.7.

Avoid trading candles with range < 1% (subdued) or > 10% (extreme — stoploss becomes too wide).

### Doji
Open ≈ Close, resulting in a very small or absent real body. Both upper and lower shadows are present. Indicates indecision — neither bulls nor bears controlled the day. A doji after an uptrend suggests a potential bearish reversal; after a downtrend, a potential bullish reversal.

### Spinning Top
Small real body with roughly equal upper and lower shadows. Bulls tried to push higher; bears tried to push lower — neither succeeded. Indicates market indecision. Context matters: a spinning top after a long rally suggests the trend may be tiring.

### Paper Umbrella (Hammer & Hanging Man)
Long lower shadow (at least 2× the real body), little or no upper shadow.
- **Hammer**: Appears after a downtrend → bullish reversal signal. Bulls pushed back hard from the lows.
- **Hanging Man**: Same shape but appears after an uptrend → bearish warning.

### Shooting Star
Long upper shadow (at least 2× the real body), little or no lower shadow. Appears after an uptrend → bearish reversal signal. Bulls tried to push higher but failed; bears pushed price back down.

## Multiple Candlestick Patterns

### Bullish Engulfing
A large bullish candle's body completely engulfs the previous bearish candle's body. Appears after a downtrend. Strong buy signal.

### Bearish Engulfing
A large bearish candle's body completely engulfs the previous bullish candle's body. Appears after an uptrend. Strong sell/short signal.

### Morning Star (3-candle bullish reversal)
1. Long bearish candle (downtrend continues)
2. Small body candle (indecision — gap down if possible)
3. Long bullish candle closing above the midpoint of candle 1

### Evening Star (3-candle bearish reversal)
Mirror image of Morning Star. Appears after an uptrend.

### Harami
A small candle whose body is completely within the previous large candle's body — opposite of engulfing. Indicates trend exhaustion.`,

  keyTerms: [
    {
      term: "Marubozu",
      definition: "A candlestick with no upper or lower shadow. Bullish Marubozu: Open=Low, High=Close. Bearish Marubozu: Open=High, Close=Low. Indicates strong directional conviction.",
    },
    {
      term: "Doji",
      definition: "A candlestick where Open ≈ Close, resulting in a tiny or absent real body. Signals indecision between bulls and bears.",
    },
    {
      term: "Hammer",
      definition: "A paper umbrella candlestick appearing after a downtrend. Long lower shadow (≥2× body), little upper shadow. Bullish reversal signal.",
    },
    {
      term: "Shooting Star",
      definition: "Long upper shadow (≥2× body), little lower shadow, appears after an uptrend. Bearish reversal signal — bulls tried and failed to sustain higher prices.",
    },
    {
      term: "Engulfing Pattern",
      definition: "A two-candle pattern where the second candle's body completely engulfs the first. Bullish engulfing after a downtrend signals a buy; bearish engulfing after an uptrend signals a sell.",
    },
    {
      term: "Morning Star",
      definition: "A three-candle bullish reversal pattern: long bearish candle, small indecision candle, long bullish candle closing above the midpoint of the first.",
    },
  ],

  facts: [
    {
      statement: "Candlestick charting originated in 18th century Japan by rice merchant Homma Munehisa; introduced to the Western world by Steve Nison in the 1980s.",
      citation: "Varsity Module 2, Ch. 3.3",
    },
    {
      statement: "A Bullish Marubozu has Open = Low and High = Close; it is the only candlestick pattern that does not require a prior trend.",
      citation: "Varsity Module 2, Ch. 5.2–5.3",
    },
    {
      statement: "For ACC Ltd, a Bullish Marubozu example shows O=971.8, H=1030.2, L=970.1, C=1028.4 — buy near close 1028.4, stoploss at low 970.0.",
      citation: "Varsity Module 2, Ch. 5.3",
    },
    {
      statement: "For BPCL Ltd, a Bearish Marubozu example shows O=355.4, H=356.0, L=341, C=341.7 — short near close 341.7, stoploss at high 356.0.",
      citation: "Varsity Module 2, Ch. 5.3",
    },
    {
      statement: "A candle with range less than 1% (very short) or greater than 10% (very long) should be avoided for trading — either too subdued or stoploss too wide.",
      citation: "Varsity Module 2, Ch. 5.4",
    },
    {
      statement: "The three rules for candlestick patterns: (1) Buy strength, sell weakness; (2) Be flexible — quantify and verify; (3) Look for a prior trend.",
      citation: "Varsity Module 2, Ch. 4.3",
    },
  ],

  quizSeed: [
    {
      id: "l3-02-q1",
      question: "In a Bullish Marubozu, which of the following is true?",
      options: [
        "Open = High, Close = Low",
        "Open = Low, High = Close",
        "Open = Close, forming a Doji",
        "Lower shadow is twice the real body",
      ],
      correct: 1,
      explanation: "A Bullish Marubozu has no shadows — Open equals Low (bulls never let price fall below open) and High equals Close (bulls kept buying to the end of the session).",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 5.3",
    },
    {
      id: "l3-02-q2",
      question: "The stoploss for a Bullish Marubozu trade is:",
      options: [
        "The high of the marubozu candle",
        "The open of the marubozu candle",
        "The low of the marubozu candle",
        "The previous day's close",
      ],
      correct: 2,
      explanation: "The low of the Bullish Marubozu is the stoploss. If price breaks below this level, the bullish thesis is invalidated.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 5.4",
    },
    {
      id: "l3-02-q3",
      question: "A Hammer pattern appears after a downtrend. What does it signal?",
      options: [
        "Continuation of the downtrend",
        "Bearish reversal",
        "Bullish reversal",
        "Market indecision with no directional bias",
      ],
      correct: 2,
      explanation: "A Hammer (long lower shadow, small body, after a downtrend) is a bullish reversal signal — bears pushed price lower but bulls brought it back up by the close.",
      difficulty: "easy",
      citation: "Varsity Module 2, Ch. 6",
    },
    {
      id: "l3-02-q4",
      question: "Which candlestick pattern is the ONLY one that does not require a prior trend?",
      options: [
        "Doji",
        "Hammer",
        "Marubozu",
        "Morning Star",
      ],
      correct: 2,
      explanation: "Marubozu violates the 'look for prior trend' rule — it can appear anywhere in the chart and the trading implication remains the same.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 5.2",
    },
    {
      id: "l3-02-q5",
      question: "A Shooting Star after an uptrend has:",
      options: [
        "Long lower shadow and small upper shadow",
        "Equal upper and lower shadows",
        "Long upper shadow (≥2× body) and little lower shadow",
        "No shadows at all",
      ],
      correct: 2,
      explanation: "A Shooting Star has a long upper shadow (at least twice the real body) and little or no lower shadow. It appears after an uptrend and signals a bearish reversal.",
      difficulty: "medium",
      citation: "Varsity Module 2, Ch. 6",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 2 — Technical Analysis (zerodha.com/varsity)",
}

export default lesson
