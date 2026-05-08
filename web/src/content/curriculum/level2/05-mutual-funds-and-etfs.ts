import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '05-mutual-funds-and-etfs',
  title: 'Mutual Funds & ETFs',
  level: 2,
  order: 5,
  xpReward: 25,
  source: 'SEBI Securities Market Booklet (Nov 2020), Sections 25–28. Verified against SEBI Financial Education Booklet (Nov 2020). Adapted for FinSim.',
  estimatedReadTime: 5,
  body: `## What is a Mutual Fund?

A mutual fund pools money from many investors and invests collectively in securities like stocks, bonds, and money market instruments.

From the SEBI Securities Market Booklet:
> *"A mutual fund pools in money from many investors and invests the money in stocks, bonds, short-term money-market instruments, other securities or assets, or some combination of these investments."*

The key advantage: instead of picking individual stocks, you get instant diversification across many securities.

**All mutual funds in India must be registered with SEBI before launching any scheme.**

## Categories of Mutual Fund Schemes

SEBI has broadly categorised mutual funds into five types:

| Category | What it invests in |
|---|---|
| **A. Equity Schemes** | Principally in stocks/equities |
| **B. Debt Schemes** | Principally in fixed income securities like bonds and treasury bills |
| **C. Hybrid Schemes** | Two or more asset classes (equities + fixed income + cash) |
| **D. Solution Oriented Schemes** | Investments aligned to specific goals like retirement or child planning |
| **E. Other Schemes** | Index Funds, Sectoral Funds, etc. |

Schemes are designed for different investor profiles:
- **Risk-averse (conservative)** → Debt schemes
- **Moderate investors** → Hybrid schemes
- **Aggressive investors** → Equity schemes

## Risk-o-Meter: Product Labelling

SEBI requires all mutual fund schemes to display a **risk-o-meter** showing the risk level:

| Label | Meaning |
|---|---|
| Low | Principal at low risk |
| Low to Moderate | Principal at moderately low risk |
| Moderate | Principal at moderate risk |
| Moderately High | Principal at moderately high risk |
| High | Principal at high risk |
| Very High | Principal at very high risk |

- The risk-o-meter is evaluated on a **monthly basis**
- AMCs must disclose it on their websites and AMFI website within **10 days** from the close of each month

## Investment Plans in Mutual Funds

Beyond lump-sum investment, mutual funds offer:

**Systematic Investment Plan (SIP)** — Invest a fixed amount in a scheme at regular intervals (monthly/quarterly). This builds discipline and benefits from rupee cost averaging.

**Systematic Withdrawal Plan (SWP)** — Withdraw a fixed amount from a scheme at regular intervals. Useful for generating regular income in retirement.

**Systematic Transfer Plan (STP)** — Transfer funds from one scheme to another at regular intervals.

## What is an ETF?

An **Exchange Traded Fund (ETF)** is a fund that tracks an index, commodity, bonds, or a basket of assets — and is traded directly on the stock exchange like a regular stock.

From the SEBI Securities Market Booklet:
> *"An Exchange traded fund (ETF) is a security that tracks an index, commodity, bonds, or a basket of assets like an index fund and is traded in the securities market. In simple words, ETFs are funds that track indices such as Sensex, Nifty, etc."*

> *"When you buy units of an ETF, you actually buy units of a portfolio that tracks the performance of the index. ETFs just reflect the performance of the index they track."*

### Mutual Fund vs. ETF

| Feature | Mutual Fund | ETF |
|---|---|---|
| Traded | Via AMC / distributor | Like a stock on BSE/NSE |
| Price | Once daily (NAV) | Continuously during market hours |
| Liquidity | Comparatively lower | Generally higher daily liquidity |
| Fees | Comparatively higher | Generally lower fees |

From SEBI booklet:
> *"ETFs, generally, have higher daily liquidity and lower fees than mutual fund schemes."*

## How to Invest in Mutual Funds

1. Complete the **KYC (Know Your Client)** process first (one-time requirement across all intermediaries)
2. Decide the scheme based on risk appetite and financial goals
3. Fill the application form (online or physical)
4. Provide bank account details for dividend payments and redemption
5. Choose investment mode: lump sum, SIP, SWP, or STP`,

  keyTerms: [
    { term: 'Mutual Fund', definition: 'A pooled investment vehicle that collects money from many investors and invests it in a diversified portfolio of securities. Must be SEBI-registered.' },
    { term: 'AMC (Asset Management Company)', definition: 'The company that manages a mutual fund, making investment decisions on behalf of investors.' },
    { term: 'NAV (Net Asset Value)', definition: 'The per-unit value of a mutual fund scheme, calculated daily as total assets minus liabilities divided by total units outstanding.' },
    { term: 'Risk-o-meter', definition: 'SEBI-mandated label on mutual fund schemes showing risk level from Low to Very High, evaluated monthly.' },
    { term: 'ETF (Exchange Traded Fund)', definition: 'A fund that tracks an index or basket of assets and is traded like a stock on BSE/NSE during market hours.' },
    { term: 'SIP (Systematic Investment Plan)', definition: 'A facility to invest a fixed amount in a mutual fund scheme at regular intervals.' },
    { term: 'SWP (Systematic Withdrawal Plan)', definition: 'A facility to withdraw a fixed amount from a mutual fund scheme at regular intervals.' },
    { term: 'Equity Scheme', definition: 'A mutual fund category that principally invests in equity shares/stocks.' },
    { term: 'Debt Scheme', definition: 'A mutual fund category that principally invests in fixed income securities like bonds and treasury bills.' },
  ],

  facts: [
    {
      statement: 'A mutual fund pools in money from many investors and invests in stocks, bonds, short-term money-market instruments, other securities or assets, or some combination. All mutual funds must be registered with SEBI before launching any scheme.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Mutual Funds, p.23',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'SEBI categorises mutual funds into five types: A) Equity Schemes (invest in stocks), B) Debt Schemes (fixed income), C) Hybrid Schemes (two or more asset classes), D) Solution Oriented Schemes (retirement, child planning), E) Other Schemes (index funds, sectoral funds).',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Categorization of Mutual Funds, p.23',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'As per SEBI guidelines, mutual fund schemes must be labelled according to risk on a risk-o-meter with six levels: Low, Low to Moderate, Moderate, Moderately High, High, and Very High. The risk-o-meter is evaluated monthly and disclosed within 10 days from month close.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 27 — Product Labelling in Mutual Funds, p.24',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Mutual funds offer three systematic plans: SIP (Systematic Investment Plan) — invest fixed amounts at regular intervals; SWP (Systematic Withdrawal Plan) — withdraw fixed amounts at regular intervals; STP (Systematic Transfer Plan) — transfer funds from one scheme to another at regular intervals.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 26 — How to Invest in Mutual Funds, p.24',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'An Exchange Traded Fund (ETF) is a security that tracks an index, commodity, bonds, or a basket of assets and is traded in the securities market. Unlike regular mutual funds, ETFs trade like a common stock on the stock exchange. ETFs generally have higher daily liquidity and lower fees than mutual fund schemes.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 28 — Exchange Traded Funds, p.25',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'When you buy units of an ETF, you actually buy units of a portfolio that tracks the performance of the index. ETFs just reflect the performance of the index they track. The trading value of an ETF depends on the net asset value of the underlying assets it represents.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 28 — Exchange Traded Funds, p.25',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'What is a mutual fund, as defined in the SEBI Securities Market Booklet?',
      options: [
        'A government savings scheme with guaranteed returns',
        'A pooled investment that collects money from many investors and invests in stocks, bonds, and other securities',
        'A type of fixed deposit offered by banks',
        'A personal loan scheme for investors',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "A mutual fund pools in money from many investors and invests the money in stocks, bonds, short-term money-market instruments, other securities or assets, or some combination of these investments."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Mutual Funds, p.23',
      difficulty: 'easy',
    },
    {
      question: 'Which SEBI requirement applies to ALL mutual fund schemes before they can be launched?',
      options: [
        'They must be listed on NSE',
        'They must be registered with SEBI',
        'They must offer guaranteed returns',
        'They must be backed by government collateral',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "All mutual funds are required to be registered with SEBI before they launch any scheme."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Mutual Funds, p.23',
      difficulty: 'easy',
    },
    {
      question: 'A mutual fund that principally invests in stocks belongs to which SEBI category?',
      options: ['Debt Scheme', 'Equity Scheme', 'Solution Oriented Scheme', 'Hybrid Scheme'],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet categorisation: "A — Equity Schemes: Mutual funds which principally invest in stocks/equities."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Categorization of Mutual Funds, p.23',
      difficulty: 'easy',
    },
    {
      question: 'How often is the mutual fund risk-o-meter evaluated, as per SEBI guidelines?',
      options: ['Daily', 'Weekly', 'Monthly', 'Annually'],
      correct: 2,
      explanation: 'SEBI Securities Market Booklet: "Risk-o-meter is evaluated on a monthly basis." AMCs must disclose it on their websites and AMFI website within 10 days from the close of each month.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 27 — Product Labelling, p.24',
      difficulty: 'medium',
    },
    {
      question: 'What is the key difference between an ETF and a regular mutual fund, according to the SEBI Securities Market Booklet?',
      options: [
        'ETFs invest in bonds only; mutual funds invest in equities only',
        'ETFs are traded like stocks on the exchange during market hours; mutual funds are not',
        'ETFs are managed by the government; mutual funds are private',
        'Mutual funds have no fees; ETFs charge high fees',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "Unlike regular mutual funds, ETFs trade like a common stock on the stock exchange and the price of an ETF changes as per the trading in the market takes place."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 28 — Exchange Traded Funds, p.25',
      difficulty: 'medium',
    },
    {
      question: 'According to the SEBI Securities Market Booklet, ETFs compared to mutual funds generally have:',
      options: [
        'Lower daily liquidity and higher fees',
        'Higher daily liquidity and lower fees',
        'Same liquidity and same fees',
        'Higher daily liquidity but higher fees',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "ETFs, generally, have higher daily liquidity and lower fees than mutual fund schemes."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 28 — Exchange Traded Funds, p.25',
      difficulty: 'medium',
    },
    {
      question: 'What facility allows a mutual fund investor to withdraw a fixed amount at regular intervals?',
      options: [
        'Systematic Investment Plan (SIP)',
        'Systematic Withdrawal Plan (SWP)',
        'Systematic Transfer Plan (STP)',
        'Dividend Reinvestment Plan',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "Systematic Withdrawal Plans: Facility to withdraw fixed amounts from a particular scheme at regular intervals." This is useful for generating regular income.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 26 — How to Invest in Mutual Funds, p.24',
      difficulty: 'medium',
    },
    {
      question: 'A Nifty 50 ETF tracks the Nifty index. If you buy units of this ETF, what are you actually buying?',
      options: [
        'Direct shares of all 50 companies in equal proportion',
        'Units of a portfolio that tracks the performance of the Nifty index',
        'A contract to buy Nifty futures',
        'A government bond backed by NSE',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "When you buy units of an ETF, you actually buy units of a portfolio that tracks the performance of the index. ETFs just reflect the performance of the index they track."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 28 — Exchange Traded Funds, p.25',
      difficulty: 'easy',
    },
    {
      question: 'An investor who does not want to take high risk should consider which mutual fund category?',
      options: ['Equity Schemes', 'Debt Schemes', 'Sectoral Schemes', 'Small-Cap Equity Schemes'],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "The schemes are designed... for risk averse investors (basically a conservative investor who does not want to take high risk)." Debt schemes invest in bonds and fixed income, which carry lower risk than equity schemes.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Mutual Funds, p.23',
      difficulty: 'easy',
    },
    {
      question: 'A Hybrid mutual fund scheme, as categorised by SEBI, invests in:',
      options: [
        'Only equity shares',
        'Only fixed income securities',
        'Two or more asset classes such as equities, fixed income, and cash',
        'Only gold and precious metals',
      ],
      correct: 2,
      explanation: 'SEBI Securities Market Booklet: "C — Hybrid Schemes: Mutual funds which invest in two or more asset classes such as equities, fixed income, cash, etc." Hybrid funds balance risk between growth (equity) and stability (debt).',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 25 — Categorization of Mutual Funds, p.23',
      difficulty: 'medium',
    },
  ],
};

export default lesson;
