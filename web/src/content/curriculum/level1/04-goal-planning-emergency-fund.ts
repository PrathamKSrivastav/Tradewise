import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '04-goal-planning-emergency-fund',
  title: 'Goal-Based Planning & Emergency Fund',
  level: 1,
  order: 4,
  xpReward: 25,
  source: 'Zerodha Varsity M11 Ch.4–5 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Financial Education Booklet (Nov 2020) and RBI FAME (Feb 2024).',
  estimatedReadTime: 6,
  body: `## What is Financial Planning?

The SEBI Financial Education Booklet defines financial planning as:

> *"The process of estimating financial needs of a person and implementing a comprehensive plan to meet those financial needs during his or her lifetime through investment."*

It covers life events such as: birth of a child, education, purchasing a house, marriage, illness, accidents, and retirement.

**Financial planning goes beyond savings.** It is investment with a purpose.

## Net Worth: Your Financial Starting Point

Before planning for the future, you must understand your current position. Your **Net Worth** is:

> **Net Worth = Total Assets − Total Liabilities**

| **Assets** | **Liabilities** |
|---|---|
| Car, Bank Balance, House | Home Loan, Car Loan |

Example from SEBI booklet: Assets ₹55,25,000 − Liabilities ₹20,10,000 = **Net Worth ₹35,15,000**

Net worth indicates your capacity to achieve financial goals.

## SMART Financial Goals

A good financial goal should be **SMART** (directly from the SEBI booklet):

| Criterion | Poor Goal | SMART Goal |
|---|---|---|
| **Specific** | "Save money for my granddaughter's birthday" | "Set aside ₹10,000 for my granddaughter's birthday next year" |
| **Measurable** | "Pay off most of my credit card dues soon" | "In 6 months, pay off all credit card bills in full" |
| **Achievable** | "I will save money" | "Save ₹48,000/year by setting aside ₹4,000/month" |
| **Realistic** | "I will become a millionaire by saving" | "Be debt-free by January next year" |
| **Time-bound** | "Save for my daughter's marriage" | "Save ₹50,000/year for next 10 years for daughter's marriage" |

## Three Horizons for Goals

The SEBI booklet classifies financial goals by time horizon:
- **Short-term**: A few months to 1 year (emergency fund, annual vacation)
- **Medium-term**: 1 to 8 years (buying a car, starting a business, professional course)
- **Long-term**: 8 years or more (child's marriage, retirement planning)

## The Emergency Fund

Before investing in any market instrument, you should build an **emergency fund** — a liquid reserve to cover 3–6 months of living expenses. This money should be kept in high-liquidity instruments (savings account or liquid mutual funds), not in stocks or fixed deposits with lock-in periods.

> **Why?** Emergencies (job loss, medical bills, accidents) happen without warning. Without an emergency fund, you are forced to sell investments at the wrong time — often at a loss.

## Asset Allocation

Once goals are defined, you allocate money across asset classes:
- **Equity** — higher risk, higher potential return; suitable for long-term goals
- **Debt** — lower risk, predictable return; suitable for short-to-medium goals
- **Gold / Real Assets** — inflation hedge

The SEBI booklet example shows three types of portfolios depending on risk appetite:
- Conservative: Debt 70%, Equity 15%, Gold 15%
- Moderate: Debt 40%, Equity 50%, Gold 10%
- Aggressive: Debt 25%, Equity 60%, Gold 15%`,

  keyTerms: [
    { term: 'Financial Planning', definition: 'The process of estimating financial needs and implementing a plan to meet them through investment across a lifetime.' },
    { term: 'Net Worth', definition: 'Total Assets minus Total Liabilities. The measure of your overall financial position.' },
    { term: 'SMART Goals', definition: 'Financial goals that are Specific, Measurable, Achievable, Realistic, and Time-bound.' },
    { term: 'Emergency Fund', definition: 'A liquid reserve covering 3–6 months of living expenses, kept in easily accessible instruments to handle unexpected events.' },
    { term: 'Asset Allocation', definition: 'A strategy of dividing investments across asset classes (equity, debt, gold) based on goals, risk tolerance, and time horizon.' },
    { term: 'Short-term Goal', definition: 'A financial target with a time horizon from a few months to one year.' },
    { term: 'Long-term Goal', definition: 'A financial target with a time horizon of 8 years or more, such as retirement or a child\'s marriage.' },
  ],

  facts: [
    {
      statement: 'Financial planning is the process of estimating financial needs of a person and implementing a comprehensive plan to meet those financial needs during his or her lifetime through investment.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Financial Planning, p.10',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'A good financial goal should be SMART: Specific, Measurable, Achievable, Realistic, and Time-bound.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Develop Financial Goals, p.11',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Short-term goals have a time horizon of a few months to one year. Medium-term goals have a time horizon of one to eight years. Long-term goals have a time horizon of eight years or more.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Five-Step Approach, Step 2, p.12',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Net worth is calculated as: Total Assets minus Total Liabilities. It indicates your capacity to achieve your financial goals.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Determine Your Current Financial Situation, p.10',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The SEBI booklet advises: "While making financial plans, one should first ensure a planned savings amount and then plan for meeting expenses."',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Develop Financial Goals, TIP box, p.11',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'From Varsity M11, Karthik Rangappa uses a retirement planning example showing that ₹50,000/month lifestyle today requires adjusting for 5% long-term inflation when calculating a retirement corpus 25 years out — simple multiplication of monthly expenses by years is insufficient.',
      source: 'varsity',
      citation: 'Varsity M11 Ch.4 — The Retirement Problem Part 1, Section 4.2–4.3',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'How does the SEBI Financial Education Booklet define financial planning?',
      options: [
        'Tracking income and expenses in a spreadsheet',
        'The process of estimating financial needs and implementing a plan to meet them through investment',
        'Opening a savings account and a fixed deposit',
        'Calculating how much tax to pay each year',
      ],
      correct: 1,
      explanation: 'The SEBI booklet defines financial planning as: "The process of estimating financial needs of a person and implementing a comprehensive plan to meet those financial needs during his or her lifetime through investment."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Financial Planning, p.10',
      difficulty: 'easy',
    },
    {
      question: 'What does SMART stand for in the context of financial goals (as per the SEBI booklet)?',
      options: [
        'Systematic, Manageable, Actionable, Reliable, Trackable',
        'Specific, Measurable, Achievable, Realistic, Time-bound',
        'Safe, Measured, Approved, Regulated, Timed',
        'Strategic, Market-linked, Adaptive, Reviewed, Taxable',
      ],
      correct: 1,
      explanation: 'The SEBI booklet states: "A good financial goal should be SMART i.e. Specific, Measurable, Achievable, Realistic and Time-bound."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Develop Financial Goals, p.11',
      difficulty: 'easy',
    },
    {
      question: 'According to the SEBI booklet, what is a "medium-term" financial goal?',
      options: [
        'Goals within a few months to 1 year',
        'Goals with a time horizon of 1 to 8 years (e.g., buying a property, starting a venture)',
        'Goals that take more than 8 years (e.g., retirement)',
        'Goals related to monthly household expenses',
      ],
      correct: 1,
      explanation: 'The SEBI booklet states: "Medium-term goals may have a time horizon of one year to eight years. Goals like buying a property, starting your own venture, getting enrolled in a professional course, etc."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Five-Step Approach, Step 2, p.12',
      difficulty: 'medium',
    },
    {
      question: 'If your total assets are ₹55,25,000 and total liabilities are ₹20,10,000, what is your net worth?',
      options: ['₹75,35,000', '₹35,15,000', '₹20,10,000', '₹55,25,000'],
      correct: 1,
      explanation: 'Net Worth = Assets − Liabilities = ₹55,25,000 − ₹20,10,000 = ₹35,15,000. This is the exact example from the SEBI Financial Education Booklet.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Determine Your Current Financial Situation, p.10',
      difficulty: 'medium',
    },
    {
      question: 'From the SEBI booklet, which of these is the SMART way to state a savings goal?',
      options: [
        '"I will save a lot of money this year."',
        '"I will save money for my daughter\'s marriage someday."',
        '"I will save ₹50,000 every year for the next 10 years for my daughter\'s marriage."',
        '"I will try to invest in something good."',
      ],
      correct: 2,
      explanation: 'The SEBI booklet shows this exact example under "Time-bound": "I will save ₹50,000/- every year for next 10 years for my daughter\'s marriage." This is Specific, Measurable, Achievable, Realistic, and Time-bound.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Develop Financial Goals, p.11',
      difficulty: 'easy',
    },
    {
      question: 'In the Varsity M11 retirement problem, why is it insufficient to simply multiply your monthly expenses by the number of retirement years to calculate the required corpus?',
      options: [
        'Because tax rates change every year',
        'Because inflation reduces the purchasing power of money over time, so future expenses will be higher than today\'s',
        'Because stock market returns are unpredictable',
        'Because bank interest rates vary annually',
      ],
      correct: 1,
      explanation: 'Varsity M11 Chapter 4 states: "Inflation is real, and this makes life complicated." Today\'s ₹50,000/month will not be worth ₹50,000 in 25 years due to inflation. You must use future value calculations to find the real corpus needed.',
      factRef: 'Varsity M11 Ch.4 — The Retirement Problem Part 1, Section 4.2',
      difficulty: 'hard',
    },
    {
      question: 'A conservative investor\'s portfolio, as shown in the SEBI booklet example, is weighted primarily toward:',
      options: ['Equity (70%)', 'Debt (70%)', 'Gold (70%)', 'Real Estate (70%)'],
      correct: 1,
      explanation: 'The SEBI booklet shows a conservative portfolio example: Debt 70%, Equity 15%, Gold 15%. Conservative investors prioritize safety and stability over high returns.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Asset Allocation, p.13',
      difficulty: 'medium',
    },
    {
      question: 'The SEBI booklet\'s TIP states: "While making financial plans, one should first ensure a ___ amount and then plan for meeting expenses."',
      options: ['investment', 'loan repayment', 'savings', 'tax'],
      correct: 2,
      explanation: 'The SEBI booklet TIP in Chapter 3 states: "While making financial plans, one should first ensure a planned savings amount and then plan for meeting expenses." Save first, spend what remains.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Develop Financial Goals, TIP box, p.11',
      difficulty: 'easy',
    },
    {
      question: 'Which of these is an example of a "long-term" financial goal according to the SEBI booklet?',
      options: [
        'Planning for a vacation next year',
        'Buying a car in 3 years',
        'Saving for a professional course in 5 years',
        'Retirement planning over 20+ years',
      ],
      correct: 3,
      explanation: 'The SEBI booklet defines long-term goals as having a time horizon of "eight years or more for example child\'s marriage, retirement planning, etc."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Five-Step Approach, Step 2, p.12',
      difficulty: 'easy',
    },
    {
      question: 'Diversification in asset allocation, as described in the SEBI booklet, aims to:',
      options: [
        'Guarantee a fixed annual return of 12%',
        'Reduce risk by investing in different asset classes that react differently to the same event',
        'Maximize short-term trading profits',
        'Avoid all forms of market risk',
      ],
      correct: 1,
      explanation: 'The SEBI booklet states: Diversification "aims to minimize loss on return by investing in different asset classes (debt, equity, gold, real assets, etc.) that would react differently to the same event." It does not guarantee against loss but is the most important component for long-term goals.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Diversification, p.13',
      difficulty: 'medium',
    },
  ],
};

export default lesson;
