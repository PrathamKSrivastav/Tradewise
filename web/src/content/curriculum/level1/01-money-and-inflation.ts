import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '01-money-and-inflation',
  title: 'What is Money & Inflation?',
  level: 1,
  order: 1,
  xpReward: 20,
  source: 'Zerodha Varsity M11 Ch.1–3 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Financial Education Booklet (Nov 2020) and RBI FAME (Feb 2024).',
  estimatedReadTime: 5,
  body: `## What is Money?

Money is anything widely accepted as a **medium of exchange**, a **unit of account**, and a **store of value**. In modern economies, currency notes, coins, and digital balances in bank accounts all serve as money — backed by collective trust and the Reserve Bank of India (RBI).

> **Key insight**: A ₹500 note is just paper. Its value comes from trust. The moment that trust disappears, the note is worthless.

## The Time Value of Money

₹100 today is worth more than ₹100 a year from now. Why? Because you can invest ₹100 today and earn returns on it. This is called the **Time Value of Money (TVM)** — one of the most important ideas in all of personal finance.

As the RBI's FAME booklet puts it: *"Money available now is worth more than the same amount of money available in the future due to its potential earning capacity."*

**Future Value formula:** FV = P × (1 + R)^n
- P = Principal, R = Rate, n = Time in years

**Example:** ₹10,000 invested at 10% for 2 years grows to ₹10,000 × (1.10)² = **₹12,100**

## What is Inflation?

Inflation is the rate at which the general price level of goods and services rises over time, reducing the **purchasing power** of money.

From the RBI FAME booklet:
> *"Say you get 1 kg apples for ₹100 in 2023. The same 1 kg now costs ₹110 in 2024. Inflation = (₹110 − ₹100)/₹100 × 100 = 10%"*

India measures inflation using two indices:
- **CPI (Consumer Price Index)** — tracks prices of a household basket of goods. This is the RBI's primary benchmark.
- **WPI (Wholesale Price Index)** — tracks prices at the producer/wholesale level.

## How Inflation Erodes Savings

The **real rate of return** = Nominal return % − Inflation %

| Scenario | Return | Inflation | Real Return |
|---|---|---|---|
| Money in bank at 6% p.a. | 6% | 4% | **+2% (positive)** |
| Money held as cash | 0% | 4% | **−4% (negative)** |

This is why keeping money as cash loses value. You must invest to beat inflation.

## The RBI's Role

The Reserve Bank of India (RBI), established on **April 1, 1935**, controls India's money supply and targets a **CPI inflation rate of 4%** (with a tolerance band of ±2%, i.e., between 2% and 6%). Its primary tool is the **repo rate** — the rate at which the RBI lends money to commercial banks.`,

  keyTerms: [
    { term: 'Inflation', definition: 'The rate at which the general price level of goods and services rises over time, reducing purchasing power.' },
    { term: 'CPI', definition: 'Consumer Price Index — the primary inflation benchmark used by the RBI, tracking prices of a representative basket of household goods.' },
    { term: 'WPI', definition: 'Wholesale Price Index — measures price changes at the producer/wholesale level in India.' },
    { term: 'Time Value of Money (TVM)', definition: 'The principle that money available today is worth more than the same amount in the future because it can be invested to earn returns.' },
    { term: 'Repo Rate', definition: 'The rate at which the RBI lends short-term funds to commercial banks; a key tool for controlling inflation.' },
    { term: 'Purchasing Power', definition: 'The amount of goods and services that one unit of currency can buy. Inflation reduces purchasing power over time.' },
    { term: 'Real Rate of Return', definition: 'Your actual return after adjusting for inflation. Real return = Nominal return % − Inflation %.' },
  ],

  facts: [
    {
      statement: 'The time value of money (TVM) is the concept that money available now is worth more than the same amount of money available in the future due to its potential earning capacity, provided the rate of interest is positive.',
      source: 'rbi',
      citation: 'RBI FAME (4th Edition, Feb 2024), Message 9 — Time Value of Money, p.16',
      verifiedDate: '2024-02-01',
    },
    {
      statement: 'Inflation is the rate of increase in prices of goods and services over a period of time. Money held as cash with 0% return and 4% inflation has a real rate of return of −4%.',
      source: 'rbi',
      citation: 'RBI FAME (4th Edition, Feb 2024), Message 8 — Inflation, p.15',
      verifiedDate: '2024-02-01',
    },
    {
      statement: 'The Reserve Bank of India (RBI) was established on April 1, 1935, under the Reserve Bank of India Act. It uses monetary policy to create financial stability in India and is charged with regulating the country\'s currency and credit systems.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 4, Section I — Reserve Bank of India, p.22',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Inflation refers to rise in prices of goods and services. Over time, the purchasing power of money — the ability of one rupee to buy goods and services — keeps declining.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Key Concepts in Personal Finance, p.6',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The present value formula is: Present Value = Future Value / (1 + discount rate)^(time). The discount rate represents the opportunity cost of money.',
      source: 'varsity',
      citation: 'Varsity M11 Ch.3 — Personal Finance Math Part 2, Section 3.2',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'According to the RBI FAME booklet, what is the Time Value of Money?',
      options: [
        'The interest rate charged by banks on loans',
        'The concept that money now is worth more than the same amount in the future due to its earning capacity',
        'The rate at which the RBI prints new currency',
        'The value of gold held by the RBI as reserves',
      ],
      correct: 1,
      explanation: 'The RBI FAME booklet (Message 9) defines TVM as: money available now is worth more than the same amount available in the future due to its potential earning capacity, provided the rate of interest is positive.',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 9 — Time Value of Money, p.16',
      difficulty: 'easy',
    },
    {
      question: 'If you hold ₹100 as cash and inflation is 4%, what is your real rate of return?',
      options: ['+4%', '0%', '−4%', '+6%'],
      correct: 2,
      explanation: 'Real rate of return = Nominal return − Inflation = 0% − 4% = −4%. As shown in the RBI FAME Inflation message (Scenario 2), money held in cash loses value by the inflation rate.',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 8 — Inflation, p.15',
      difficulty: 'easy',
    },
    {
      question: 'If you invest ₹10,000 at 10% interest compounded annually, what will it be worth at the end of Year 2?',
      options: ['₹12,000', '₹12,100', '₹11,000', '₹12,200'],
      correct: 1,
      explanation: 'Using the compound interest formula: ₹10,000 × (1 + 0.10)² = ₹10,000 × 1.21 = ₹12,100. This is demonstrated in the RBI FAME compounding example (Year 2 amount).',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 7 — Compounding, p.13',
      difficulty: 'medium',
    },
    {
      question: 'Which index does the RBI primarily use as its inflation benchmark for monetary policy?',
      options: ['WPI', 'GDP Deflator', 'CPI', 'Sensex'],
      correct: 2,
      explanation: 'The RBI uses the Consumer Price Index (CPI) as its primary benchmark. WPI tracks wholesale prices and is a different measure.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Key Concepts, p.6',
      difficulty: 'easy',
    },
    {
      question: 'What is the present value formula as stated in Varsity M11?',
      options: [
        'PV = FV × (1 + discount rate)^time',
        'PV = FV / (1 + discount rate)^time',
        'PV = FV × discount rate × time',
        'PV = FV − (discount rate × time)',
      ],
      correct: 1,
      explanation: 'From Varsity M11 Chapter 3: Present value = Future value / (1 + discount rate)^(time). This discounts a future sum back to today\'s equivalent value.',
      factRef: 'Varsity M11 Ch.3 — Personal Finance Math Part 2, Section 3.2',
      difficulty: 'medium',
    },
    {
      question: 'From the SEBI Financial Education Booklet, what happens to purchasing power as inflation rises?',
      options: [
        'Purchasing power increases proportionally',
        'Purchasing power stays the same',
        'Purchasing power of money declines',
        'Purchasing power doubles',
      ],
      correct: 2,
      explanation: 'The SEBI booklet states: "as the cost of goods and services increases, the ability of a unit of money, say one rupee, to buy goods and services keeps declining." This reduction in buying ability is the decline in purchasing power.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Key Concepts in Personal Finance, p.6',
      difficulty: 'easy',
    },
    {
      question: 'The RBI was established under which Act, and on which date?',
      options: [
        'Banking Regulation Act, January 1, 1949',
        'Reserve Bank of India Act, April 1, 1935',
        'SEBI Act, January 30, 1992',
        'Companies Act, April 1, 1956',
      ],
      correct: 1,
      explanation: 'As stated in the SEBI Financial Education Booklet: "The Reserve Bank of India (RBI), the central bank of India, was established on April 1, 1935, under the Reserve Bank of India Act."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 4, Section I — Reserve Bank of India, p.22',
      difficulty: 'medium',
    },
    {
      question: 'If ₹200 is invested at 6% per year, how many years will it take to grow to ₹400 (i.e., double)?',
      options: ['6 years', '12 years', '18 years', '24 years'],
      correct: 1,
      explanation: 'Using the Rule of 72 from the SEBI booklet: Time to double = 72 / interest rate = 72 / 6 = 12 years. So in 12 years, ₹200 grows to approximately ₹400.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — The Rule of 72, p.8',
      difficulty: 'medium',
    },
    {
      question: 'What does the RBI FAME booklet say happens if the return on an investment is 5% but inflation is 7%?',
      options: [
        'The money grows at 12%',
        'The money grows at 2%',
        'The real return is −2%, meaning the money loses value',
        'The investment is neutral',
      ],
      correct: 2,
      explanation: 'The RBI FAME booklet states: "If the return on an investment of ₹100 is say 5% and inflation rate is 7%, then the real return is (−2%)! Money has lost value to the extent of ₹2."',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 9 — Time Value of Money, p.17',
      difficulty: 'hard',
    },
    {
      question: 'From Varsity M11, what is the conclusion about money today vs. money tomorrow?',
      options: [
        'Money tomorrow is more valuable because of future growth',
        'Both are equal if inflation is low',
        'Money today is more valuable because it can be invested at a risk-free rate',
        'The comparison depends entirely on your tax bracket',
      ],
      correct: 2,
      explanation: 'Varsity M11 Chapter 3 concludes: "Money today is far more valuable than money tomorrow because today we have an option to invest this money and grow it at a risk-free rate."',
      factRef: 'Varsity M11 Ch.3 — Personal Finance Math Part 2, Section 3.4',
      difficulty: 'easy',
    },
  ],
};

export default lesson;
