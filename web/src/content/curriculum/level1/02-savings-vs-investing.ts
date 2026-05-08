import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '02-savings-vs-investing',
  title: 'Savings vs. Investing',
  level: 1,
  order: 2,
  xpReward: 20,
  source: 'Zerodha Varsity M11 Ch.1 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Financial Education Booklet (Nov 2020) and RBI FAME (Feb 2024).',
  estimatedReadTime: 5,
  body: `## What are Savings?

The SEBI Financial Education Booklet defines savings simply:

> **Savings = Income − Expenditure**

Savings are the surplus of income over expenditure. They are typically kept in highly liquid, low-risk instruments — like a savings bank account or Post Office account — to meet **short-term or urgent requirements**.

The RBI FAME booklet reinforces this with a key rule:
> *"You should set aside a portion of your income BEFORE you spend anything."*

This echoes Warren Buffett's famous advice, quoted directly in the SEBI booklet:
> *"Don't save what is left after spending; spend what is left after saving."*

The formula to live by: **Income − Savings = Expenditure**

## What are Investments?

Investment is the act of deploying money from savings into financial or non-financial products with the expectation of **earning higher returns over time**.

Financial investment products include: fixed deposits, shares, mutual funds, bonds.
Non-financial investment products include: land, gold, silver.

The SEBI booklet highlights a key difference:

| | Savings | Investment |
|---|---|---|
| **Purpose** | Maintain liquidity for short-term/urgent needs | Make money grow by creating income-generating assets |
| **Risk** | Low or negligible | Depends on the asset class |
| **Liquidity** | Highly liquid | Comparatively less liquid |

## The Three Pillars of Investment

Every investment decision is influenced by three factors (the SEBI booklet calls these the "three pillars"):

1. **Safety** — How well is your principal protected? Government bonds are considered the safest as governments are not expected to default.
2. **Liquidity** — How quickly can you convert the investment to cash without significant loss?
3. **Return** — What earnings will you receive — in the form of income (interest/dividend) or capital appreciation?

> 💡 These three pillars are interconnected. Higher safety usually means lower return. Higher return usually means lower liquidity or higher risk.

## Why Start Early? The Power of Time

Varsity M11 illustrates this beautifully with the story of three sisters, each receiving ₹50,000 on their birthday, invested at 12% compounded annually:

- **Sister 1**: Invested for the first 9 years (ages 20–28 only). Invested ₹4.5L total → Corpus at 65: **₹4.89 Crore**
- **Sister 2**: Invested for 9 years (ages 28–36 only). Invested ₹4.5L total → Corpus at 65: **₹1.98 Crore**
- **Sister 3**: Invested from age 28 all the way to 65. Invested ₹19L total → Corpus at 65: **₹3.05 Crore**

Sister 1 saved the **least** but ended up with the **most** — because she started earliest and gave her money the most time to compound.

**Key takeaway**: Starting early matters more than saving more.`,

  keyTerms: [
    { term: 'Savings', definition: 'The surplus of income over expenditure. Typically held in liquid, low-risk instruments to meet short-term needs.' },
    { term: 'Investment', definition: 'The deployment of savings into financial or non-financial products with the expectation of earning higher returns over time.' },
    { term: 'Liquidity', definition: 'The degree of ease with which an asset can be converted to cash quickly without significant loss in value.' },
    { term: 'Capital Appreciation', definition: 'An increase in the market value of an investment over time. The gain made when selling at a higher price than the purchase price.' },
    { term: 'Safety (Investment Pillar)', definition: 'How well the principal amount of an investment is protected from loss.' },
    { term: 'Return', definition: 'The earnings from an investment — either as regular income (interest/dividends) or capital appreciation.' },
    { term: 'Compounding', definition: 'Earning interest on both the original principal and previously earned interest. Also called "interest on interest".' },
  ],

  facts: [
    {
      statement: 'Savings are the surplus of income over expenditure. People meet short-term goals with savings, which earn a small amount of interest and are easy to withdraw when needed.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — What are Savings?, p.5',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Investment is the act of deployment of money out of savings into financial or non-financial products with the expectation of earning higher returns over a period of time.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — What are Investments?, p.5',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The three pillars of investment are Safety, Liquidity, and Return. Every investment decision is influenced by these three factors.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Three pillars of investment, p.14',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Warren Buffett, quoted in the SEBI Financial Education Booklet, advised: "Don\'t save what is left after spending; spend what is left after saving." This reinforces the principle: Income − Savings = Expenditure.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Financial Planning, p.11',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'From Varsity M11\'s three-sisters example: Sister 1 invested ₹4.5L at 12% compounded annually from age 20–28 (9 years only) and accumulated ₹4.89 Crore by age 65. Sister 3 invested ₹19L from age 28–65 (37 years) and accumulated ₹3.05 Crore. Starting early beats saving more.',
      source: 'varsity',
      citation: 'Varsity M11 Ch.1 — Background and Orientation, Section 1.2',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The RBI FAME booklet states three important things to keep in mind while saving are Safety, Liquidity and Return.',
      source: 'rbi',
      citation: 'RBI FAME (4th Edition, Feb 2024), Message 1 — Budgeting, Saving and Responsible Borrowing, p.2',
      verifiedDate: '2024-02-01',
    },
  ],

  quizSeed: [
    {
      question: 'How does the SEBI Financial Education Booklet define savings?',
      options: [
        'Money deposited in a fixed deposit account',
        'The surplus of income over expenditure',
        'Any money invested in the stock market',
        'Funds allocated for long-term goals only',
      ],
      correct: 1,
      explanation: 'The SEBI Financial Education Booklet (Chapter 2) states: "Savings are the surplus of income over expenditure." Savings are held in liquid instruments for short-term and urgent needs.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — What are Savings?, p.5',
      difficulty: 'easy',
    },
    {
      question: 'What is the correct formula for the savings principle recommended in the SEBI booklet (quoting Warren Buffett)?',
      options: [
        'Savings = Income + Expenditure',
        'Expenditure = Income + Savings',
        'Income − Savings = Expenditure',
        'Savings = Expenditure − Income',
      ],
      correct: 2,
      explanation: 'The SEBI booklet quotes Warren Buffett: "Don\'t save what is left after spending; spend what is left after saving." This translates to: Income − Savings = Expenditure.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Financial Planning, p.11',
      difficulty: 'easy',
    },
    {
      question: 'In the SEBI booklet, what are the three pillars of every investment decision?',
      options: [
        'Growth, Speed, Stability',
        'Safety, Liquidity, Return',
        'Risk, Reward, Timing',
        'Capital, Interest, Inflation',
      ],
      correct: 1,
      explanation: 'The SEBI Financial Education Booklet (Chapter 3) identifies the three pillars of investment as Safety (protection of principal), Liquidity (ease of conversion to cash), and Return (earnings from the investment).',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Three pillars of investment, p.14',
      difficulty: 'easy',
    },
    {
      question: 'Compared to savings, how does investment differ in terms of purpose according to SEBI?',
      options: [
        'Investment is for short-term needs; savings is for growth',
        'Investment makes money grow by creating income-generating assets; savings maintains liquidity for urgent needs',
        'Both investment and savings serve the same purpose',
        'Investment is only for institutional investors, not individuals',
      ],
      correct: 1,
      explanation: 'The SEBI booklet table clearly states: Savings purpose = "maintain liquidity to meet short term or urgent requirements." Investment purpose = "make the money grow by creating assets that can generate income in the future/increase value of assets."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 2 — Difference between Savings and Investments, p.5',
      difficulty: 'medium',
    },
    {
      question: 'In Varsity M11\'s three-sisters story (₹50,000 per year at 12% compounded), which sister accumulated the most by age 65?',
      options: [
        'Sister 3, who saved the most (₹19L from age 28–65)',
        'Sister 2, who saved from age 28–36',
        'Sister 1, who saved only from age 20–28',
        'All sisters accumulated the same amount',
      ],
      correct: 2,
      explanation: 'Despite investing the least (₹4.5L over just 9 years), Sister 1 accumulated ₹4.89 Crore by starting at age 20. Sister 3 invested ₹19L over 37 years and accumulated ₹3.05 Crore. Time beats amount — starting early is the most powerful advantage in compounding.',
      factRef: 'Varsity M11 Ch.1 — Background and Orientation, Section 1.2',
      difficulty: 'hard',
    },
    {
      question: 'According to the SEBI booklet, what does "liquidity" mean as an investment pillar?',
      options: [
        'The total value of an investment portfolio',
        'How well protected the principal is from loss',
        'The degree of ease with which you can convert your investment to cash at fair value',
        'The annual interest rate paid on a fixed deposit',
      ],
      correct: 2,
      explanation: 'The SEBI booklet defines the Liquidity pillar as: "the degree of ease with which you can en-cash or liquidate your investment at fair value."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Three pillars of investment, p.14',
      difficulty: 'medium',
    },
    {
      question: 'What type of investment does the SEBI booklet say is considered effectively "risk-free"?',
      options: [
        'Blue-chip equity shares',
        'Corporate fixed deposits',
        'Government bonds',
        'Gold',
      ],
      correct: 2,
      explanation: 'The SEBI booklet states: "Government bonds are considered to be effectively \'risk free\' due to the trust that government will not default on the repayment to investors."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Choosing Investment Options, p.14',
      difficulty: 'easy',
    },
    {
      question: 'The RBI FAME booklet says savings should ensure three things: Safety, Liquidity, and ___.',
      options: ['Speed', 'Return', 'Stability', 'Growth'],
      correct: 1,
      explanation: 'The RBI FAME Message 1 states: "The three important things that one must keep in mind while Saving are Safety, Liquidity and Return."',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 1 — Budgeting, Saving and Responsible Borrowing, p.2',
      difficulty: 'easy',
    },
    {
      question: 'According to the SEBI booklet, what is Capital Appreciation?',
      options: [
        'Interest earned on a fixed deposit',
        'Dividend paid by a company',
        'An increase in the market value of an investment over time',
        'The tax rebate received on an investment',
      ],
      correct: 2,
      explanation: 'The SEBI booklet defines Capital Appreciation as: "When the value of initial investment increases over a period of time and the investor benefits by selling part or whole of the investment at the increased value."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 3 — Returns from Investment, p.15',
      difficulty: 'medium',
    },
    {
      question: 'The RBI FAME booklet advises investing in diversified instruments. What is the main benefit of diversification?',
      options: [
        'It guarantees a fixed return',
        'It reduces risk by spreading money across different instruments that react differently to the same event',
        'It is only useful for institutional investors',
        'It increases tax liability',
      ],
      correct: 1,
      explanation: 'The RBI FAME Message 1 states: "Make sure that your savings are invested in diversified instruments." The SEBI booklet further explains diversification reduces risk by investing in different asset classes "that would react differently to the same event."',
      factRef: 'RBI FAME (4th Edition, Feb 2024), Message 1 — Budgeting, Saving and Responsible Borrowing, p.2',
      difficulty: 'medium',
    },
  ],
};

export default lesson;
