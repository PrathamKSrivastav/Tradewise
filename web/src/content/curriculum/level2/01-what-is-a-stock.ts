import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '01-what-is-a-stock',
  title: 'What is a Stock?',
  level: 2,
  order: 1,
  xpReward: 20,
  source: 'Zerodha Varsity M1 Ch.6 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Securities Market Booklet (Nov 2020).',
  estimatedReadTime: 5,
  body: `## What is a Share?

A **share** (also called equity share or stock) represents a unit of ownership in a company. When you buy a share of a publicly listed company, you become a **shareholder** — a part-owner of that company.

From the SEBI Securities Market Booklet:
> *"Equity Shares or commonly called as shares, represent a share of ownership in a company. An investor who invests in shares of a company is called a shareholder, and is entitled to receive all corporate benefits, like dividends, out of the profits of the company."*

Shareholders also get the right to vote on major company decisions at General Meetings.

## Equity vs. Debt Securities

There are two main types of securities:

| | **Equity (Shares)** | **Debt (Bonds/Debentures)** |
|---|---|---|
| What it is | Ownership stake | Money lent to the company |
| Return | Dividends + capital appreciation | Fixed interest/coupon payments |
| Risk | Higher | Lower |
| Repayment | No fixed repayment | Principal repaid at maturity |

Debt securities represent money borrowed by the company from investors and must be repaid. Debt securities are also called **debentures** or **bonds**.

## Why Do Companies Issue Shares (Go Public)?

Varsity M1 explains that companies go public mainly to:
1. **Raise capital** — fund large capital expenditures (Capex) without taking on debt
2. **Avoid finance charges** — no interest burden unlike loans
3. **Spread risk** — distribute business risk among thousands of shareholders
4. **Provide exit for early investors** — angels, VCs, and PE investors can sell their stake
5. **Reward employees** — through Employee Stock Options (ESOPs)
6. **Improve visibility** — public listed status increases brand credibility

## Corporate Benefits for Shareholders

Once you own shares, you are entitled to corporate actions:

- **Dividends** — a share of company profits paid to shareholders
- **Bonus shares** — additional shares issued free to existing shareholders in proportion to their holding
- **Stock split** — the face value is reduced, increasing the number of shares proportionally
- **Rights issue** — the company gives existing shareholders the right to subscribe to newly issued shares at a discount
- **Buyback** — the company buys back its own shares from the market, often boosting the stock price
- **Voting rights** — shareholders vote on board appointments and major decisions

## Face Value of a Share

The **face value (FV)** or par value is the original fixed denomination of a share. Dividends and stock splits are usually calculated based on face value.

From Varsity M1:
> *"Issuing shares is quite simple, the company assumes that each share is worth Rs.10 and because there is Rs.5 crore as share capital, there has to be 50 lakh shares with each share worth Rs.10. In this context, Rs.10 is called the Face value (FV) of the share."*

If a company has Face Value ₹5 and declares ₹63 dividend, the dividend yield relative to face value = 63/5 = 1260%.

## How Shares Get Listed

When a company offers its shares to the general public for the first time, it is called an **Initial Public Offering (IPO)**. After the IPO, shares are listed on a recognised stock exchange (BSE or NSE) and traded publicly in the secondary market.`,

  keyTerms: [
    { term: 'Equity Share', definition: 'A unit of ownership in a company. Holders receive dividends, capital appreciation, and voting rights.' },
    { term: 'Shareholder', definition: 'An investor who owns one or more shares of a company, entitling them to a proportional ownership stake.' },
    { term: 'Debt Securities', definition: 'Bonds or debentures representing money borrowed by a company from investors, repaid with interest at maturity.' },
    { term: 'IPO (Initial Public Offering)', definition: 'The first sale of a company\'s shares to the public, transitioning it from a private to a publicly listed company.' },
    { term: 'Face Value', definition: 'The original fixed denomination of a share (e.g., ₹10, ₹5, ₹2) used as the basis for dividends and corporate actions.' },
    { term: 'Dividend', definition: 'A portion of a company\'s profits distributed to shareholders, usually expressed per share.' },
    { term: 'Bonus Issue', definition: 'Additional shares issued free to existing shareholders in proportion to their current holding, with no cash payment.' },
    { term: 'Stock Split', definition: 'Reduction in face value of a share that increases the number of shares proportionally, keeping total market cap unchanged.' },
    { term: 'Buyback', definition: 'When a company purchases its own shares from the market, reducing outstanding shares and often boosting share price.' },
  ],

  facts: [
    {
      statement: 'Equity Shares represent a share of ownership in a company. A shareholder is entitled to receive corporate benefits like dividends and has the right to vote in decision making at General Meetings.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 2 — What are Securities?, p.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Debt Securities represent money borrowed by the company from an investor and must be repaid. Debt securities are also called debentures or bonds. An investor is entitled to receive interest/coupon payments and repayment of principal.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 2 — What are Securities?, p.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Companies go public to raise funds to meet Capex requirements, avoid finance charges from debt, spread risk among shareholders, provide exit for early investors, reward employees through ESOPs, and improve visibility.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.5 — The IPO Markets Part 2, Section 5.2',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Face value (FV) is a denominator indicating how much one share is originally worth. If FV is Rs.10 and share capital is Rs.5 crore, there are 50 lakh shares. If FV is Rs.5, there are 1 crore shares.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.4 — The IPO Markets Part 1, Section 4.2',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'When you own a stock you get corporate privileges like bonus shares, dividends, rights issue, stock split, buyback, and voting rights.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.5',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'According to the SEBI Securities Market Booklet, what does an equity share represent?',
      options: [
        'A loan given to the company',
        'A share of ownership in a company',
        'A fixed deposit receipt from a bank',
        'A government bond certificate',
      ],
      correct: 1,
      explanation: 'The SEBI Securities Market Booklet states: "Equity Shares or commonly called as shares, represent a share of ownership in a company. An investor who invests in shares of a company is called a shareholder."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 2 — What are Securities?, p.3',
      difficulty: 'easy',
    },
    {
      question: 'What are debt securities also called, as per the SEBI Securities Market Booklet?',
      options: [
        'Equity shares and warrants',
        'Debentures or bonds',
        'Mutual fund units',
        'Exchange Traded Funds',
      ],
      correct: 1,
      explanation: 'The SEBI booklet states: "Debt Securities represent money that is borrowed by the company / institution from an investor... Debt securities are also called as debentures or bonds."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 2 — What are Securities?, p.3',
      difficulty: 'easy',
    },
    {
      question: 'According to Varsity M1, which of these is NOT a reason for companies to go public (IPO)?',
      options: [
        'Raising capital to fund Capex requirements',
        'Providing an exit for early investors like angels and VCs',
        'Avoiding all government regulations permanently',
        'Rewarding employees through Employee Stock Options (ESOPs)',
      ],
      correct: 2,
      explanation: 'Varsity M1 lists the reasons companies go public as: raising capital, avoiding finance charges, spreading risk, providing exit for early investors, rewarding employees via ESOPs, and improving visibility. Avoiding government regulations is not a valid reason.',
      factRef: 'Varsity M1 Ch.5 — The IPO Markets Part 2, Section 5.2',
      difficulty: 'medium',
    },
    {
      question: 'From Varsity M1: if a company has ₹5 crore as share capital and each share has a face value of ₹10, how many shares exist?',
      options: ['5 lakh shares', '50 lakh shares', '5 crore shares', '50 crore shares'],
      correct: 1,
      explanation: 'Varsity M1: "The company assumes that each share is worth Rs.10 and because there is Rs.5 crore as share capital, there has to be 50 lakh shares with each share worth Rs.10." (5,00,00,000 ÷ 10 = 50,00,000 = 50 lakh)',
      factRef: 'Varsity M1 Ch.4 — The IPO Markets Part 1, Section 4.2',
      difficulty: 'medium',
    },
    {
      question: 'What is a "bonus issue" of shares?',
      options: [
        'Shares issued at a premium price to institutional investors',
        'Additional shares issued free to existing shareholders in proportion to their holding',
        'Shares issued as collateral for a bank loan',
        'Shares given to the government as tax payment',
      ],
      correct: 1,
      explanation: 'Varsity M1 and the SEBI booklet describe a Bonus Issue as: when existing shareholders are issued additional shares in proportion to their existing shareholding, without any additional cost.',
      factRef: 'Varsity M1 Ch.11 — Corporate Actions, Section 11.3',
      difficulty: 'easy',
    },
    {
      question: 'What corporate benefit do shareholders get that allows them to influence company decisions?',
      options: ['Dividend payments', 'Voting rights at General Meetings', 'Free products from the company', 'Tax exemptions'],
      correct: 1,
      explanation: 'The SEBI Securities Market Booklet states shareholders are "entitled to receive the right to cast a vote with regard to the decision making process of the company at General meeting of the company."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 2 — What are Securities?, p.3',
      difficulty: 'easy',
    },
    {
      question: 'If Infosys has a face value of ₹5 and declares an annual dividend of ₹63, what is the dividend yield relative to face value?',
      options: ['63%', '126%', '1260%', '315%'],
      correct: 2,
      explanation: 'Varsity M1 explains: "the FV of Infosys is 5, and if they announce an annual dividend of Rs.63 that means the dividend yield is 1260% (63 divided by 5)." Dividend yield on FV = 63/5 = 12.6 = 1260%.',
      factRef: 'Varsity M1 Ch.8 — Commonly Used Jargons, Face Value section',
      difficulty: 'hard',
    },
    {
      question: 'What is a "buyback" of shares?',
      options: [
        'When a company issues new shares to raise funds',
        'When a company purchases its own shares from the market',
        'When shareholders sell shares back to their broker',
        'When SEBI forces a company to delist from the exchange',
      ],
      correct: 1,
      explanation: 'A buyback (or share repurchase) is when the company buys back its own outstanding shares from the market. This reduces the number of shares outstanding and often increases the share price.',
      factRef: 'Varsity M1 Ch.11 — Corporate Actions, Section 11.6',
      difficulty: 'medium',
    },
    {
      question: 'What is the key difference between equity and debt securities in terms of repayment?',
      options: [
        'Equity must be repaid at maturity; debt does not',
        'Debt securities must be repaid to investors at maturity; equity has no fixed repayment obligation',
        'Both equity and debt are repaid in fixed installments',
        'There is no difference — both are treated identically by law',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: Debt securities "must be repaid to the investor" and "are issued for a fixed term, at the end of which the securities can be redeemed." Equity shares have no such repayment obligation.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 2 — What are Securities?, p.3',
      difficulty: 'medium',
    },
    {
      question: 'When a company does a stock split by reducing the face value from ₹10 to ₹5, what happens to the number of shares?',
      options: [
        'The number of shares is halved',
        'The number of shares doubles',
        'The number of shares stays the same',
        'New shares are issued only to institutional investors',
      ],
      correct: 1,
      explanation: 'In a stock split, the face value is reduced (e.g., from ₹10 to ₹5), which doubles the number of shares. The total market capitalisation remains the same because the price per share also halves proportionally.',
      factRef: 'Varsity M1 Ch.11 — Corporate Actions, Section 11.4',
      difficulty: 'medium',
    },
  ],
};

export default lesson;
