import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '02-reading-a-stock-quote',
  title: 'Reading a Stock Quote',
  level: 2,
  order: 2,
  xpReward: 20,
  source: 'Zerodha Varsity M1 Ch.6, Ch.8 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim.',
  estimatedReadTime: 5,
  body: `## What is a Stock Quote?

A stock quote is a snapshot of a stock's current and historical trading information. Every time you look up a stock on a trading terminal or financial website, you see a quote.

## OHLC — The Four Key Price Points

**OHLC** stands for Open, High, Low, and Close — the four price points for a stock on any given trading day.

From Varsity M1:
> *"Open is the price at which the stock opens for the day, High is the highest price at which the stock trades during the day, Low is the lowest price at which the stock trades during the day, and the Close is the closing price of the stock."*

Example from Varsity M1: The OHLC of ACC on 17th June 2014 was **1486, 1511, 1467, and 1499**.
- Open: ₹1,486 (first trade of the day)
- High: ₹1,511 (highest price during the day)
- Low: ₹1,467 (lowest price during the day)
- Close: ₹1,499 (last traded price for the day)

## Volume

**Volume** represents the total number of shares traded (both buys and sells counted together) for a particular stock on a particular day.

From Varsity M1:
> *"Volumes represent the total transactions (both buy and sell put together) for a particular stock on a particular day. For example, on 17th June 2014, the volume on ACC was 5,33,819 shares."*

High volume on a day of price movement confirms the move. Low volume suggests weak interest.

## 52-Week High and Low

- **52-week high**: The highest price at which a stock has traded in the past 52 weeks
- **52-week low**: The lowest price at which a stock has traded in the past 52 weeks

From Varsity M1:
> *"The 52 week high and low gives a sense of the range within which the stock has traded during the year. Many people believe that if a stock reaches 52 week high, then it indicates a bullish trend."*

## Calculating Returns

**Absolute Return** — For investments held 1 year or less:

> **Absolute Return = [(Ending Value / Starting Value) − 1] × 100**

Varsity M1 example: Buy Infosys at ₹3,030, sell at ₹3,550:
= [(3550 / 3030) − 1] × 100 = **17.16%**

**CAGR (Compound Annual Growth Rate)** — For multi-year investments:

> **CAGR = [(Ending Value / Starting Value)^(1/n) − 1]**

Where n = number of years.

Varsity M1 example: Buy Infosys at ₹3,030, sell at ₹3,550 after 2 years:
= [(3550/3030)^(1/2) − 1] = **8.2% per year**

From Varsity M1:
> *"Always use CAGR when you want to check returns over multiple years. Use absolute return when your time frame is for a year or lesser."*

## Key Market Terms

**Bull Market / Bullish** — When stock prices are rising and market participants expect prices to go up. A trader who expects a stock to rise is said to be bullish.

**Bear Market / Bearish** — When stock prices are falling and market participants expect prices to go down.

**Long Position** — Buying a stock expecting the price to rise. You profit when the price goes up.

**Short Position** — Selling a stock first (that you may not yet own) expecting the price to fall, and buying it back later at a lower price. You profit when the price goes down.

From Varsity M1 summary table:
- Long: Buy first → Sell later → Profit if price goes UP
- Short: Sell first → Buy back later → Profit if price goes DOWN`,

  keyTerms: [
    { term: 'OHLC', definition: 'Open, High, Low, Close — the four standard price points tracked for a stock on any trading day.' },
    { term: 'Volume', definition: 'The total number of shares traded (buys and sells combined) for a particular stock on a given day.' },
    { term: '52-Week High/Low', definition: 'The highest and lowest prices at which a stock has traded over the past 52 weeks (one year).' },
    { term: 'Absolute Return', definition: 'Return as a percentage of the original investment, calculated as [(Ending Value / Starting Value) − 1] × 100. Best for holdings of 1 year or less.' },
    { term: 'CAGR', definition: 'Compound Annual Growth Rate — the annualised rate of return for multi-year investments. Formula: [(End / Start)^(1/n) − 1].' },
    { term: 'Bull Market', definition: 'A market condition where prices are rising or expected to rise. Investors/traders who expect prices to rise are said to be bullish.' },
    { term: 'Bear Market', definition: 'A market condition where prices are falling or expected to fall. Investors/traders who expect prices to fall are said to be bearish.' },
    { term: 'Long Position', definition: 'Buying a stock expecting its price to rise. You profit if the price goes up after you buy.' },
    { term: 'Short Position', definition: 'Selling a stock (borrowed) expecting its price to fall, then buying it back at a lower price. You profit if the price goes down.' },
  ],

  facts: [
    {
      statement: 'OHLC stands for Open, High, Low and Close. Open is the price at which the stock opens for the day, High is the highest price during the day, Low is the lowest price during the day, and Close is the closing price. The OHLC of ACC on 17th June 2014 was 1486, 1511, 1467, and 1499.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.8 — Commonly Used Jargons, OHLC section',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Volumes represent the total transactions (both buy and sell put together) for a particular stock on a particular day. On 17th June 2014, the volume on ACC was 5,33,819 shares.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.8 — Commonly Used Jargons, Volume section',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The formula to calculate Absolute Return is: [Ending Period Value / Starting Period Value − 1] × 100. Example: Buy Infosys at 3030, sell at 3550 → [(3550/3030) − 1] × 100 = 17.16%.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.7',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'CAGR formula: [(Ending Value / Starting Value)^(1/n) − 1]. Example: Buy Infosys at 3030, sell at 3550 after 2 years → [(3550/3030)^(1/2) − 1] = 8.2% per annum. Always use CAGR when checking returns over multiple years.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.7',
      verifiedDate: '2024-04-01',
    },
    {
      statement: '52 week high is the highest point at which a stock has traded during the last 52 weeks. 52 week low marks the lowest point. Many traders believe a stock reaching its 52-week high indicates a bullish trend.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.8 — Commonly Used Jargons, 52 week high/low section',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'When you are Long, your first leg is Buy and second leg is Sell. You are bullish. You make money when price goes up and lose when price drops. When you are Short, first leg is Sell and second leg is Buy. You are bearish. You make money when price goes down.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.8 — Commonly Used Jargons, Long/Short Position table',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'From Varsity M1: The OHLC of ACC on 17th June 2014 was 1486, 1511, 1467, 1499. What does the "H" (High) represent?',
      options: ['The closing price of ₹1,499', 'The highest traded price of ₹1,511', 'The opening price of ₹1,486', 'The previous day\'s close'],
      correct: 1,
      explanation: 'Varsity M1 states: "High is the highest price at which the stock trades during the day." In the ACC example, the High was ₹1,511 — the peak price traded on that day.',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, OHLC section',
      difficulty: 'easy',
    },
    {
      question: 'From Varsity M1: Using Absolute Return formula, if you buy Infosys at ₹3,030 and sell at ₹3,550, what is your return?',
      options: ['8.2%', '14.7%', '17.16%', '20%'],
      correct: 2,
      explanation: 'Absolute Return = [(3550/3030) − 1] × 100 = [1.1716 − 1] × 100 = 17.16%. Varsity M1 gives this exact example in Chapter 6.',
      factRef: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.7',
      difficulty: 'medium',
    },
    {
      question: 'You buy a stock at ₹100 and sell at ₹120 after 2 years. What is the CAGR?',
      options: ['10%', '9.5%', '20%', '11%'],
      correct: 1,
      explanation: 'CAGR = [(120/100)^(1/2) − 1] = [1.2^0.5 − 1] = [1.0954 − 1] = 9.54% ≈ 9.5%. Use CAGR for multi-year returns per Varsity M1.',
      factRef: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.7',
      difficulty: 'hard',
    },
    {
      question: 'According to Varsity M1, when should you use CAGR instead of Absolute Return?',
      options: [
        'For investments held less than 1 year',
        'For multi-year investments to compare growth rates',
        'Only for government bonds',
        'Only for mutual funds, not individual stocks',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "Always use CAGR when you want to check returns over multiple years. Use absolute return when your time frame is for a year or lesser."',
      factRef: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.7',
      difficulty: 'easy',
    },
    {
      question: 'From Varsity M1: What does Volume represent?',
      options: [
        'The total buy orders pending on the exchange',
        'The total transactions (buys and sells) for a stock on a particular day',
        'The number of shares listed on the exchange',
        'The market capitalisation of the company',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "Volumes represent the total transactions (both buy and sell put together) for a particular stock on a particular day."',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, Volume section',
      difficulty: 'easy',
    },
    {
      question: 'In a "long position" trade, what is the correct sequence of actions?',
      options: [
        'Sell first → Buy later',
        'Buy first → Sell later',
        'Buy and hold forever',
        'Only buy on the first day of each month',
      ],
      correct: 1,
      explanation: 'Varsity M1 Table 8.1: Long position — first leg is Buy, second leg is Sell. You are bullish and make money when the stock price goes up.',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, Table 8.1',
      difficulty: 'easy',
    },
    {
      question: 'In a "short position" trade, you make a profit when:',
      options: [
        'The stock price goes up after you sell',
        'The stock price goes down after you sell',
        'The stock price stays flat',
        'You hold the stock for more than 1 year',
      ],
      correct: 1,
      explanation: 'Varsity M1 Table 8.1: Short position — Sell first → Buy back later. You are bearish and make money when the stock price goes DOWN.',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, Table 8.1',
      difficulty: 'medium',
    },
    {
      question: 'A stock\'s 52-week high is ₹500 and 52-week low is ₹280. The stock is currently trading at ₹490. Which Varsity M1 statement best applies?',
      options: [
        'This indicates a bearish trend since the stock is near its low',
        'This may indicate a bullish trend since the stock is near its 52-week high',
        'The 52-week range has no significance',
        'The stock must be avoided if it is within 5% of the 52-week high',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "Many people believe that if a stock reaches 52 week high, then it indicates a bullish trend for the foreseeable future."',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, 52 week high/low section',
      difficulty: 'medium',
    },
    {
      question: 'What does "squaring off" a long position mean, as per Varsity M1?',
      options: [
        'Buying more shares to average down your cost',
        'Selling the stock you own to close the position',
        'Transferring shares to another demat account',
        'Filing a complaint with SEBI',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "Square off is a term used to indicate that you intend to close an existing position. If you are long on a stock squaring off the position means to sell the stock."',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, Square off section',
      difficulty: 'medium',
    },
    {
      question: 'You buy a stock at ₹200 and sell at ₹230 within 6 months. What is the annualised return?',
      options: ['15%', '30%', '7.5%', '20%'],
      correct: 1,
      explanation: 'Absolute return = [(230/200) − 1] × 100 = 15% in 6 months. Annualised = 15% × 2 = 30% per year. Varsity M1: "what if you have bought Infosys at 3030 and sold it at 3550 within 6 months? In that case you have generated 17.16% in 6 months which translates to 34.32% (17.16% * 2) for the year."',
      factRef: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.7',
      difficulty: 'hard',
    },
  ],
};

export default lesson;
