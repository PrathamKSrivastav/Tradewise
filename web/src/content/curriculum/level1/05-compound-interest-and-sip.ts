import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '05-compound-interest-and-sip',
  title: 'Compound Interest & SIP',
  level: 1,
  order: 5,
  xpReward: 30,
  source: 'Zerodha Varsity M11 Ch.2 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Financial Education Booklet (Nov 2020) and RBI FAME (Feb 2024).',
  estimatedReadTime: 7,
  body: `## Simple Interest vs. Compound Interest

**Simple interest** is paid only on the original principal. The principal never changes.

From Varsity M11:
> Principal ₹1,00,000 at 10% simple interest for 5 years = **₹50,000** total interest
> Formula: Interest = P × R × T = 1,00,000 × 10% × 5

**Compound interest** is paid on both the principal *and* previously earned interest. The RBI FAME booklet calls it *"interest on interest"*.

From Varsity M11 compound interest formula:
> **A = P × (1 + R)^n**
> - A = Final Amount, P = Principal, R = Interest rate (decimal), n = Number of years

**Same example — compound interest:**
- Year 1: ₹1,00,000 × (1.10)¹ = ₹1,10,000
- Year 2: ₹1,00,000 × (1.10)² = ₹1,21,000
- Year 5: ₹1,00,000 × (1.10)⁵ = **₹1,61,051**

Compare: Simple interest earns ₹50,000; Compound interest earns **₹61,051** — 22% more, for the same amount, rate, and time period.

## The Power of Compounding

The RBI FAME booklet demonstrates this vividly:

> *"₹10,000 earning Simple Interest of 10% when invested for 10 years will become ₹20,000. BUT with 10% interest compounded quarterly, it will become ₹26,851 — Compounding earns ₹6,851, or 34% more!"*

From the SEBI booklet compounding table: ₹1,000 invested at 9% compound interest:
- Year 1: grows to ₹1,090
- Year 10: grows to ₹2,367
- Year 20: grows to ₹5,604
- Year 40: grows to **₹31,409**

The same ₹1,000 with **simple interest** at 9% over 40 years would only grow to **₹4,600**.

Varsity M11 describes this as the **compounding effect** — Karthik Rangappa quotes Albert Einstein calling compound interest *"the 8th wonder of the world."*

## The Rule of 72

A quick mental math tool from the SEBI booklet:

> **Years to double = 72 ÷ Annual interest rate**

Examples:
- At 6% interest: 72 ÷ 6 = **12 years** to double your money
- At 9% interest: 72 ÷ 9 = **8 years** to double
- At 12% interest: 72 ÷ 12 = **6 years** to double

## What is a SIP?

A **Systematic Investment Plan (SIP)** is a way to invest a fixed amount into a mutual fund at regular intervals (monthly, quarterly) — regardless of market conditions.

SIPs work on the principle of **Rupee Cost Averaging**: from the SEBI booklet:
> *"You buy more units when unit prices are low and less units when unit prices are high."*

The SEBI booklet example: investing ₹2,000/month for 12 months with fluctuating unit prices (ranging ₹28 to ₹50), the investor received **466 units** total. Average price per unit = ₹51.50 (₹24,000 ÷ 466 units) — lower than the highest price of ₹71.42, because SIP averaged the cost down.

## SIP + Compound Interest = Wealth Creation

SIPs combine Rupee Cost Averaging with the power of compounding. Investing regularly over a long period — even small amounts — creates significant wealth through the compounding effect.`,

  keyTerms: [
    { term: 'Simple Interest', definition: 'Interest calculated only on the original principal. Formula: I = P × R × T. The principal never changes.' },
    { term: 'Compound Interest', definition: 'Interest calculated on both the principal and previously accumulated interest. Formula: A = P × (1 + R)^n.' },
    { term: 'Compounding Effect', definition: 'The phenomenon where reinvesting earnings generates earnings on earnings, producing exponential growth over time.' },
    { term: 'CAGR', definition: 'Compound Annual Growth Rate — the annualised rate at which an investment has grown over a period longer than one year.' },
    { term: 'Rule of 72', definition: 'A mental math shortcut: divide 72 by the annual interest rate to estimate how many years it takes to double your money.' },
    { term: 'SIP (Systematic Investment Plan)', definition: 'A method of investing a fixed amount in a mutual fund at regular intervals, automating disciplined investing.' },
    { term: 'Rupee Cost Averaging', definition: 'Investing a fixed amount at regular intervals so you buy more units when prices are low and fewer when prices are high, averaging out the cost per unit.' },
  ],

  facts: [
    {
      statement: 'The compound interest formula is A = P × (1 + R)^n, where A = final amount, P = principal, R = interest rate (decimal), and n = number of years. Banks pay compound interest, not simple interest.',
      source: 'varsity',
      citation: 'Varsity M11 Ch.2 — Personal Finance Math Part 1, Section 2.2',
      verifiedDate: '2024-04-01',
    },
    {
      statement: '₹10,000 earning Simple Interest of 10% invested for 10 years becomes ₹20,000. With 10% interest compounded quarterly, it becomes ₹26,851 — compounding earns ₹6,851, or 34% more.',
      source: 'rbi',
      citation: 'RBI FAME (4th Edition, Feb 2024), Message 7 — Compounding, p.14',
      verifiedDate: '2024-02-01',
    },
    {
      statement: 'An initial investment of ₹1,000 at 9% compound interest grows to ₹2,367 in 10 years, ₹5,604 in 20 years, and ₹31,409 in 40 years. With simple interest at 9%, the same ₹1,000 over 40 years grows to only ₹4,600.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Power of Compounding table, p.7',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The Rule of 72: divide 72 by the annual interest rate to find the approximate number of years required to double your money. At 6% interest: 72 ÷ 6 = 12 years to double.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — The Rule of 72, p.8',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Rupee cost averaging is the process of investing a fixed amount at regular intervals irrespective of market fluctuations. You buy more units when unit prices are low and fewer units when unit prices are high.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Rupee Cost Averaging, p.8',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The SEBI booklet Rupee Cost Averaging example: total investment of ₹24,000 over 12 months at varying unit prices resulted in 466 units. Average price per unit = ₹51.50 (₹24,000 ÷ 466).',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Rupee Cost Averaging table, p.9',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'Using the compound interest formula A = P × (1 + R)^n, what does ₹1,00,000 at 10% per year grow to after 2 years?',
      options: ['₹1,20,000', '₹1,21,000', '₹1,10,000', '₹1,22,000'],
      correct: 1,
      explanation: 'A = 1,00,000 × (1.10)² = 1,00,000 × 1.21 = ₹1,21,000. This is the Varsity M11 example: "Principal *(1+ Interest)^(2) = 100,000*(1+10%)^(2) = 121,000."',
      factRef: 'Varsity M11 Ch.2 — Personal Finance Math Part 1, Section 2.2',
      difficulty: 'medium',
    },
    {
      question: 'For the same ₹1,00,000 at 10% over 5 years, how much more does compound interest earn vs. simple interest?',
      options: ['Both earn the same amount', 'Compound interest earns ₹50,000 more', 'Compound interest earns ₹11,051 more', 'Simple interest earns more'],
      correct: 2,
      explanation: 'Simple interest: P × R × T = ₹1,00,000 × 10% × 5 = ₹50,000. Compound interest: ₹1,00,000 × (1.10)^5 = ₹1,61,051, so interest earned = ₹61,051. Difference = ₹61,051 − ₹50,000 = ₹11,051 more.',
      factRef: 'Varsity M11 Ch.2 — Personal Finance Math Part 1, Section 2.2',
      difficulty: 'hard',
    },
    {
      question: 'According to the RBI FAME booklet, how much does ₹10,000 at 10% compounded quarterly grow to in 10 years?',
      options: ['₹20,000', '₹26,851', '₹25,000', '₹30,000'],
      correct: 1,
      explanation: 'The RBI FAME Message 7 states: "₹10,000 earning Simple Interest of 10% when invested for 10 years will become ₹20,000. BUT with 10% interest compounded quarterly, it will become ₹26,851 — Compounding earns ₹6,851, or 34% more."',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 7 — Compounding, p.14',
      difficulty: 'medium',
    },
    {
      question: 'Using the Rule of 72 from the SEBI booklet, how long does it take to double ₹200 at 6% interest per year?',
      options: ['6 years', '12 years', '18 years', '24 years'],
      correct: 1,
      explanation: 'The SEBI booklet states: "Divide the number 72 by the interest rate: 72 / 6% interest = 12 years." So ₹200 doubles to ₹400 in 12 years at 6%.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — The Rule of 72, p.8',
      difficulty: 'easy',
    },
    {
      question: 'What does ₹1,000 invested at 9% compound interest grow to after 40 years (from the SEBI booklet table)?',
      options: ['₹4,600', '₹31,409', '₹5,604', '₹2,367'],
      correct: 1,
      explanation: 'The SEBI booklet compounding table shows ₹1,000 at 9% compound interest grows to ₹31,409 in 40 years. With simple interest, the same grows to only ₹4,600 — compounding is nearly 7x more powerful.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Power of Compounding table, p.7',
      difficulty: 'medium',
    },
    {
      question: 'What is Rupee Cost Averaging in a SIP, as described in the SEBI booklet?',
      options: [
        'Investing all your money at once when prices are at the lowest point',
        'Investing a fixed amount at regular intervals, buying more units when prices are low and fewer when high',
        'Averaging your tax liability over the financial year',
        'Borrowing money at a fixed rate to invest in mutual funds',
      ],
      correct: 1,
      explanation: 'The SEBI booklet defines Rupee Cost Averaging as: "the process in which you invest a fixed amount of money at regular intervals irrespective of market fluctuations. You buy more units when unit prices are low and less units when unit prices are high."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Rupee Cost Averaging, p.8',
      difficulty: 'easy',
    },
    {
      question: 'In the SEBI booklet\'s Rupee Cost Averaging example (₹2,000/month for 12 months), what was the average price per unit?',
      options: ['₹40', '₹51.50', '₹71.42', '₹28'],
      correct: 1,
      explanation: 'The SEBI booklet table shows total investment ₹24,000 over 12 months resulted in 466 units. Average price per unit = ₹24,000 ÷ 466 = ₹51.50. This is lower than many months\' unit prices because SIP bought more units at lower prices.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Rupee Cost Averaging table, p.9',
      difficulty: 'hard',
    },
    {
      question: 'In simple interest, the interest is calculated on:',
      options: [
        'Both the principal and previously earned interest',
        'Only the outstanding principal — which never changes',
        'The total portfolio value including unrealised gains',
        'The inflation-adjusted principal amount',
      ],
      correct: 1,
      explanation: 'Varsity M11 states: "In simple interest, the interest gets charged only on the outstanding principal." Banks do NOT pay simple interest — they pay compound interest.',
      factRef: 'Varsity M11 Ch.2 — Personal Finance Math Part 1, Section 2.1',
      difficulty: 'easy',
    },
    {
      question: 'Using Rule of 72: at 12% annual return, approximately how long to double your money?',
      options: ['4 years', '6 years', '8 years', '12 years'],
      correct: 1,
      explanation: '72 ÷ 12 = 6 years. The Rule of 72 from the SEBI booklet: years to double = 72 ÷ annual interest rate.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — The Rule of 72, p.8',
      difficulty: 'medium',
    },
    {
      question: 'Varsity M11 attributes which famous quote to Albert Einstein about compound interest?',
      options: [
        '"The stock market is a device for transferring money from the impatient to the patient."',
        '"Compound interest is the 8th wonder of the world."',
        '"Investing is simple, but not easy."',
        '"Price is what you pay; value is what you get."',
      ],
      correct: 1,
      explanation: 'Varsity M11 Chapter 2 states: "Apparently, Albert Einstein once described \'compound interest\' as the 8th wonder of the world." This is used to illustrate the extraordinary power of compounding over time.',
      factRef: 'Varsity M11 Ch.2 — Personal Finance Math Part 1, Section 2.4',
      difficulty: 'easy',
    },
  ],
};

export default lesson;
