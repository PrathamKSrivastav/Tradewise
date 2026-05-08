import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '04-sectors-and-diversification',
  title: 'Sectors, Risk & Diversification',
  level: 2,
  order: 4,
  xpReward: 25,
  source: 'Zerodha Varsity M1 Ch.1, Ch.7 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Securities Market Booklet (Nov 2020).',
  estimatedReadTime: 5,
  body: `## What are Market Sectors?

The stock market is divided into **sectors** — groups of companies operating in the same industry. Understanding sectors helps you understand why multiple stocks often move together.

Key sectors in the Indian market include:
- **Banking & Financial Services** (HDFC Bank, ICICI Bank, SBI)
- **Information Technology** (Infosys, TCS, Wipro)
- **Pharmaceuticals** (Sun Pharma, Dr. Reddy's, Cipla)
- **Automobiles** (Tata Motors, Maruti Suzuki, Hero MotoCorp)
- **Energy** (Reliance, ONGC, BPCL)
- **FMCG** (HUL, ITC)
- **Metals & Mining** (Tata Steel, Coal India)

From Varsity M1:
> *"NASSCOM's statement that the customer's IT budget is likely to shrink by 15%... The information released by NASSCOM is applicable to the entire IT stocks and not just Infosys. Hence all IT companies are likely to witness a selling pressure."*

This illustrates **sector-wide impact** — one piece of industry news moves all companies in that sector.

## Types of Risk in the Stock Market

The SEBI Securities Market Booklet defines two key types of risk:

**Market Risk (Systematic Risk)** — Risk from factors affecting the overall economy and all securities. It cannot be eliminated through diversification.
> *"Market risk or Systematic Risk: It refers to the risk faced by investments due to factors affecting the overall performance of securities and general economy of the country."*

**Unsystematic Risk (Company/Industry Risk)** — Risk specific to a particular company or industry.
> *"Unsystematic risk can be described as the risk attached with a particular company or industry."*

Other types of risk from the SEBI booklet:
- **Inflation Risk** — Also called purchasing power risk. The chance that investment returns lose value because inflation erodes purchasing power
- **Liquidity Risk** — When an investment can't be bought or sold quickly enough
- **Business Risk** — Risk that a company's operations may be adversely affected
- **Volatility Risk** — Stock prices fluctuate over time

## What is Diversification?

**Diversification** means spreading your investment across different companies, sectors, and asset classes so that no single bad event destroys your entire portfolio.

From the SEBI Securities Market Booklet:
> *"Asset allocation is one strategy through which an investor can mitigate risk by diversifying their investments into various companies and asset classes."*

From Varsity M1 on asset allocation:
> *"Investments optimally should have a strong mix of all asset classes. It is smart to diversify your investment among the various asset classes."*

### Asset Allocation Examples from Varsity M1:

| Investor Type | Equity | Precious Metals | Fixed Income |
|---|---|---|---|
| Young Professional | 70% | 20% | 10% |
| Retired Person | 10% | 10% | 80% |

A young professional can take more risk (more equity) because they have more years to recover. A retired person prioritises capital protection (more fixed income).

## Why Diversification Works

Unsystematic risk can be reduced through diversification. If one stock or sector falls, others may remain stable or rise.

From Varsity M1:
> *"Investment in Equities is a great option. It is known to beat the inflation over long period of times. Historically equity investment has generated returns close to 14-15%. However, equity investments can be risky."*

- Investing in only one sector (e.g., all IT) concentrates unsystematic risk
- Spreading across sectors — IT, Banking, Pharma, FMCG — means one sector's bad news doesn't destroy your whole portfolio
- Systematic risk (market-wide crashes) affects all stocks and cannot be diversified away

## The Risk-Return Trade-off

Varsity M1 clearly states:
> *"Risk and Return go hand in hand. Higher the risk, higher the return. Lower the risk, lower is the return."*

Key principle: A fixed deposit gives a lower return than equities, but with lower risk. Equities can beat inflation over the long term, but carry higher short-term volatility.`,

  keyTerms: [
    { term: 'Market Sector', definition: 'A group of companies operating in the same industry (e.g., Banking, IT, Pharma). Sector news affects all companies within that sector.' },
    { term: 'Systematic Risk', definition: 'Also called market risk. Risk from macroeconomic factors affecting all securities. Cannot be eliminated by diversification.' },
    { term: 'Unsystematic Risk', definition: 'Risk specific to a particular company or industry. Can be reduced through diversification.' },
    { term: 'Inflation Risk', definition: 'Also called purchasing power risk. The risk that investment returns lose value because inflation erodes what that money can buy.' },
    { term: 'Liquidity Risk', definition: 'The risk that an investment cannot be bought or sold quickly enough at a fair price.' },
    { term: 'Diversification', definition: 'Spreading investments across different companies, sectors, and asset classes to reduce unsystematic risk.' },
    { term: 'Asset Allocation', definition: 'The strategy of dividing investments across asset classes (equity, debt, gold, real estate) based on risk appetite and goals.' },
    { term: 'Risk-Return Trade-off', definition: 'The principle that higher potential returns come with higher risk. Lower-risk investments generally offer lower returns.' },
  ],

  facts: [
    {
      statement: 'Market risk or Systematic Risk refers to the risk faced by investments due to factors affecting the overall performance of securities and the general economy. Unsystematic risk is the risk attached to a particular company or industry.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 5 — Key Risks in Investing, p.9',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Inflation risk is also called purchasing power risk. It is defined as the chance that cash flows from an investment would lose value in future because of a decline in purchasing power due to inflation.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 5 — Key Risks in Investing, p.9',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Asset allocation is one strategy through which an investor can mitigate risk by diversifying their investments into various companies and asset classes.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 6 — How to Mitigate the Risk?, p.10',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'From Varsity M1: Risk and Return go hand in hand. Higher the risk, higher the return. Lower the risk, lower is the return. A fixed deposit which gives 9% when inflation is 10% means you are net losing 1% per annum.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Varsity M1 asset allocation examples: a young professional should allocate around 70% in Equity, 20% in Precious Metals, and 10% in Fixed Income. A retired person could invest 80% in Fixed Income, 10% in Equity, and 10% in Precious Metals.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.2 (A note on investments)',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Historically Indian equity investment has generated returns close to 14-15% CAGR. Investing in some of the best and well-run Indian companies has yielded over 20% CAGR in the long term.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.2 (Equity)',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'From the SEBI Securities Market Booklet: what is the difference between Systematic Risk and Unsystematic Risk?',
      options: [
        'Systematic risk affects only one company; Unsystematic risk affects the whole economy',
        'Systematic risk affects overall market/economy; Unsystematic risk affects a specific company or industry',
        'Both are the same type of risk',
        'Systematic risk only affects government bonds',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "Market risk or Systematic Risk refers to the risk faced by investments due to factors affecting the overall performance of securities and general economy. Unsystematic risk can be described as the risk attached with a particular company or industry."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 5 — Key Risks in Investing, p.9',
      difficulty: 'medium',
    },
    {
      question: 'If news reports that the IT industry\'s customer budgets will shrink by 15%, which stocks are most likely to be affected?',
      options: [
        'Only Infosys, since the news is specific to one company',
        'All IT sector companies, since sector news affects the whole industry',
        'Only banking stocks',
        'The entire market equally, including FMCG and pharma',
      ],
      correct: 1,
      explanation: 'Varsity M1: "The information released by NASSCOM is applicable to the entire IT stocks and not just Infosys. Hence all IT companies are likely to witness a selling pressure." Sector-wide news affects all companies in that sector.',
      factRef: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.3',
      difficulty: 'easy',
    },
    {
      question: 'What does the SEBI booklet say about how investors can mitigate investment risk?',
      options: [
        'By keeping all money in a savings bank account',
        'Through asset allocation — diversifying investments across various companies and asset classes',
        'By trading only in government bonds',
        'By investing all money in a single high-performing sector',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "Asset allocation is one strategy through which an investor can mitigate risk by diversifying their investments into various companies and asset classes."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 6 — How to Mitigate the Risk?, p.10',
      difficulty: 'easy',
    },
    {
      question: 'According to Varsity M1, what is the recommended equity allocation for a young professional?',
      options: ['10% equity', '50% equity', '70% equity', '90% equity'],
      correct: 2,
      explanation: 'Varsity M1: "a young professional may be able to take a higher amount of risk given his age... Typically investor should allocate around 70% of his investable amount in Equity, 20% in Precious metals, and the rest in Fixed income investments."',
      factRef: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.2 (A note on investments)',
      difficulty: 'medium',
    },
    {
      question: 'From Varsity M1: What is inflation risk in the context of fixed deposits?',
      options: [
        'The risk that a bank will collapse',
        'The risk that FD returns are lower than inflation, resulting in a net real loss',
        'The risk that the government will raise taxes on FD returns',
        'The risk that fixed deposit interest rates will rise',
      ],
      correct: 1,
      explanation: 'Varsity M1: "A fixed deposit which gives you 9% when the inflation is 10% means you are net net losing 1% per annum." This is inflation risk (purchasing power risk) — when real returns after inflation are negative.',
      factRef: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.3',
      difficulty: 'medium',
    },
    {
      question: 'Which type of risk CANNOT be eliminated through diversification?',
      options: [
        'Unsystematic risk (company-specific risk)',
        'Sector-specific risk',
        'Systematic risk (market-wide risk)',
        'Business risk',
      ],
      correct: 2,
      explanation: 'Systematic risk (market risk) affects the overall economy and all securities. It cannot be eliminated through diversification because all stocks are affected. Unsystematic risk can be reduced by diversifying across different companies and sectors.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 5 — Key Risks in Investing, p.9',
      difficulty: 'hard',
    },
    {
      question: 'Historically, according to Varsity M1, what CAGR have Indian equities generated over the past 15 years?',
      options: ['5-6% CAGR', '8-9% CAGR', '14-15% CAGR', '25-30% CAGR'],
      correct: 2,
      explanation: 'Varsity M1 states: "Indian Equities have generated returns close to 14% – 15% CAGR (compound annual growth rate) over the past 15 years." This is why equities are recommended for inflation-beating long-term growth.',
      factRef: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.2 (Equity)',
      difficulty: 'medium',
    },
    {
      question: 'What is Liquidity Risk as defined in the SEBI Securities Market Booklet?',
      options: [
        'The risk that stock prices will fall due to market crashes',
        'The risk that an investment cannot be bought or sold quickly enough',
        'The risk that a company will not pay dividends',
        'The risk of currency depreciation',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "Liquidity risk: Liquidity risk arises when an investment can\'t be bought or sold quickly enough."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 5 — Key Risks in Investing, p.9',
      difficulty: 'easy',
    },
    {
      question: 'Why does Varsity M1 recommend that a retired person hold 80% in fixed income?',
      options: [
        'Because retired people pay no tax on fixed income',
        'Because retired people have less time to recover from losses and need capital protection',
        'Because fixed income always beats equity returns',
        'Because SEBI mandates 80% fixed income for retirees',
      ],
      correct: 1,
      explanation: 'Varsity M1 explains the ratio depends on risk appetite. Retired persons have limited earning years left, so capital protection (fixed income) is prioritised over high-risk/high-return equity. A young professional has decades to recover from losses.',
      factRef: 'Varsity M1 Ch.1 — The Need to Invest, Section 1.2 (A note on investments)',
      difficulty: 'medium',
    },
    {
      question: 'You invest ₹50,000 all in IT stocks. A global tech slowdown hits. Your portfolio drops 35%. What risk materialised that diversification would have reduced?',
      options: [
        'Systematic risk — affecting the whole market',
        'Unsystematic (sector-specific) risk — concentrated in IT sector',
        'Inflation risk',
        'Currency risk',
      ],
      correct: 1,
      explanation: 'Concentrating all investments in one sector (IT) means you carry full unsystematic risk for that sector. SEBI and Varsity M1 both recommend diversification across sectors and asset classes to reduce such sector-specific (unsystematic) risk.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 5-6, p.9-10',
      difficulty: 'hard',
    },
  ],
};

export default lesson;
