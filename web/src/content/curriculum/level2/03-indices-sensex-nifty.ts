import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '03-indices-sensex-nifty',
  title: 'Market Indices — Sensex & Nifty',
  level: 2,
  order: 3,
  xpReward: 25,
  source: 'Zerodha Varsity M1 Ch.7 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim.',
  estimatedReadTime: 5,
  body: `## What is a Market Index?

A market index is a pre-packaged tool that tracks the performance of a selected group of stocks, giving you an instant summary of how the overall market is doing.

From Varsity M1:
> *"There are approximately 5,000 listed companies in the Bombay Stock Exchange and about 2,000 listed companies in the National Stock Exchange. It would be clumsy to check each and every company... Instead you would just check few important companies across key industrial sectors."*

These selected companies collectively make up the **stock market index**.

## India's Two Main Indices

**S&P BSE Sensex** — Represents the Bombay Stock Exchange (BSE)
- S&P stands for Standard and Poor's, a global credit rating agency that licenses index construction methodology to BSE
- Tracks 30 major listed companies

**CNX Nifty (Nifty 50)** — Represents the National Stock Exchange (NSE)
- CNX stands for CRISIL and NSE
- Maintained by **India Index Services & Products Limited (IISL)** — a joint venture of NSE and CRISIL
- Tracks 50 major listed companies

From Varsity M1:
> *"There are two main market indices in India. The S&P BSE Sensex representing the Bombay stock exchange and CNX Nifty representing the National Stock exchange."*

## What Does Index Movement Mean?

> *"An ideal index gives us minute by minute reading about how the market participants perceive the future. The movements in the Index reflect the changing expectations of the market participants."*

- Index going **up** → market participants are **optimistic** about the future
- Index going **down** → market participants are **pessimistic** about the future

**Real example from Varsity M1:** Nifty on 1st January 2014 was **6,301**. By 24th June 2014 it was **7,580** — a rise of 1,279 points (20.3% increase), indicating strong market optimism.

## Practical Uses of the Index

1. **Information** — Broad indicator of the country's economic sentiment
2. **Benchmarking** — Compare your portfolio's performance against the market. If Nifty returns 30% and your portfolio returns 20%, you underperformed the index
3. **Trading** — Index trading via the Futures & Options (derivatives) segment allows traders to bet on the overall market direction
4. **Portfolio Hedging** — Investors can use index derivatives to protect their portfolio during adverse market conditions

## Index Construction: Free Float Market Capitalisation

Indian stock exchanges use the **free float market capitalisation** method to assign weight to stocks in the index.

From Varsity M1:
> *"Free float market capitalization is the product of total number of shares outstanding in the market, and the price of the stock."*

**Formula:** Free Float Market Cap = Total Shares Outstanding × Current Price

Example: Company ABC has 100 shares outstanding and stock price is ₹50:
Free Float Market Cap = 100 × 50 = **₹5,000**

**Higher market cap → higher weightage in the index.**

From the Varsity M1 Nifty weightage table (as of 2014):
- ITC Limited (Cigarettes): **7.60%** — highest weightage
- DLF Ltd (Construction): **0.34%** — lowest weightage

This means Nifty is most sensitive to price changes in ITC and least sensitive to DLF.

## Sectoral Indices

Besides Sensex and Nifty, there are **sectoral indices** that track specific industries:

- **Bank Nifty** (NSE) — tracks the banking sector
- **CNX IT** (NSE) — tracks all IT stocks

From Varsity M1:
> *"Both BSE and NSE have sector specific indexes. The construction and maintenance of these indices is similar to the other major indices."*`,

  keyTerms: [
    { term: 'Market Index', definition: 'A pre-packaged tool that tracks the performance of a selected group of stocks to represent the overall market or a specific sector.' },
    { term: 'Sensex', definition: 'S&P BSE Sensex — India\'s BSE index tracking 30 major listed companies. S&P licenses the construction methodology to BSE.' },
    { term: 'Nifty 50', definition: 'CNX Nifty — India\'s NSE index tracking 50 major listed companies. Maintained by IISL (joint venture of NSE and CRISIL).' },
    { term: 'Free Float Market Capitalisation', definition: 'Total shares outstanding × current stock price. Used to assign weight to stocks in an index. Higher market cap = higher weight.' },
    { term: 'Benchmarking', definition: 'Comparing your investment returns against a market index (like Nifty) to evaluate performance.' },
    { term: 'Sectoral Index', definition: 'An index that tracks stocks from a specific industry, e.g., Bank Nifty (banking) or CNX IT (information technology).' },
    { term: 'IISL', definition: 'India Index Services & Products Limited — the joint venture of NSE and CRISIL that maintains the Nifty index.' },
  ],

  facts: [
    {
      statement: 'There are two main market indices in India: the S&P BSE Sensex representing the Bombay Stock Exchange and CNX Nifty representing the National Stock Exchange. S&P stands for Standard and Poor\'s, and CNX stands for CRISIL and NSE.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'CNX Nifty consists of the largest and most frequently traded stocks within NSE. It is maintained by India Index Services & Products Limited (IISL), which is a joint venture of NSE and CRISIL.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'When the index goes up, market participants think the future will be better. The index drops if market participants perceive the future pessimistically. Nifty on 1st January 2014 was 6,301; by 24th June 2014 it was 7,580 — a 20.3% increase indicating strong optimism.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2 and 7.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'India follows the free float market capitalization method to construct the index. Free float market cap = total number of shares outstanding × price of the stock. Higher market cap = higher weight in the index.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.4',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The four practical uses of an index are: Information (economic barometer), Benchmarking (comparing portfolio performance), Trading (via derivative segment), and Portfolio Hedging (protecting against adverse market moves).',
      source: 'varsity',
      citation: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Sectoral indices track specific sectors. Bank Nifty on NSE represents the banking industry. CNX IT on NSE represents IT stocks. Both BSE and NSE have sector-specific indexes constructed similarly to main indices.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.5',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'According to Varsity M1, what are the two main market indices in India?',
      options: [
        'Nifty Bank and CNX IT',
        'S&P BSE Sensex (BSE) and CNX Nifty (NSE)',
        'NSDL Index and CDSL Index',
        'RBI Index and SEBI Index',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "There are two main market indices in India. The S&P BSE Sensex representing the Bombay stock exchange and CNX Nifty representing the National Stock exchange."',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2',
      difficulty: 'easy',
    },
    {
      question: 'What does "CNX" stand for in CNX Nifty?',
      options: ['Central National Exchange', 'CRISIL and NSE', 'Capital and NSE Index', 'Consumer NSE Exchange'],
      correct: 1,
      explanation: 'Varsity M1 states: "the term \'CNX\' stands for CRISIL and NSE." CNX Nifty is maintained by IISL — a joint venture of NSE and CRISIL.',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2',
      difficulty: 'medium',
    },
    {
      question: 'If the Nifty index rises significantly from January to June, what does Varsity M1 say this indicates?',
      options: [
        'Market participants are pessimistic about the future',
        'The RBI has raised interest rates',
        'Market participants are optimistic about the future',
        'Companies are paying higher dividends',
      ],
      correct: 2,
      explanation: 'Varsity M1 states: "When the index goes up, it is because the market participants think the future will be better." A rising Nifty reflects collective optimism.',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2',
      difficulty: 'easy',
    },
    {
      question: 'Company X has 1,000 shares outstanding and each share is priced at ₹200. What is its free float market capitalisation?',
      options: ['₹200', '₹2,000', '₹2,00,000', '₹20,000'],
      correct: 2,
      explanation: 'Free Float Market Cap = Total shares outstanding × Price = 1,000 × 200 = ₹2,00,000. Per Varsity M1: "Free float market capitalization is the product of total number of shares outstanding in the market, and the price of the stock."',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.4',
      difficulty: 'medium',
    },
    {
      question: 'In the Nifty index (Varsity M1 data from 2014), which company had the HIGHEST weightage at 7.60%?',
      options: ['Infosys Ltd', 'Reliance Industry Ltd', 'ITC Limited', 'HDFC Bank Ltd'],
      correct: 2,
      explanation: 'Varsity M1 Table 7.1 shows ITC Limited (Cigarettes) had the highest Nifty weightage at 7.60%. This means "the Nifty index is most sensitive to price changes in ITC Ltd."',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Table 7.1',
      difficulty: 'medium',
    },
    {
      question: 'What is the purpose of "benchmarking" using the Nifty, as described in Varsity M1?',
      options: [
        'To predict tomorrow\'s stock prices',
        'To compare your portfolio returns against the overall market performance',
        'To calculate the face value of shares',
        'To file your income tax returns',
      ],
      correct: 1,
      explanation: 'Varsity M1 explains: "A yardstick to measure the performance is required... what if during the same year Nifty moved to 7,800 from 6,000 generating 30%? Suddenly it may seem you have underperformed the market. You need the index to benchmark the performance."',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.3',
      difficulty: 'easy',
    },
    {
      question: 'Which index on NSE specifically tracks the banking industry?',
      options: ['CNX IT', 'Bank Nifty', 'Nifty 50', 'S&P BSE Sensex'],
      correct: 1,
      explanation: 'Varsity M1 states: "the Bank Nifty on NSE represents the mood specific to the banking industry." These are called sectoral indices.',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.5',
      difficulty: 'easy',
    },
    {
      question: 'The Nifty Nifty 50 is maintained by IISL. What does IISL stand for?',
      options: [
        'Indian Investment and Stock Ltd.',
        'India Index Services & Products Limited',
        'Indian Institute of Securities Listing',
        'Index Infrastructure & Settlement Ltd.',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "It is maintained by India Index Services & Products Limited (IISL) which is a joint venture of National Stock Exchange and CRISIL."',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.2',
      difficulty: 'hard',
    },
    {
      question: 'According to Varsity M1, what are the four practical uses of the stock market index?',
      options: [
        'Savings, Loans, Insurance, and Tax planning',
        'Information, Benchmarking, Trading, and Portfolio Hedging',
        'Buying, Selling, Shorting, and Hedging',
        'IPO, FPO, Rights Issue, and Bonus Issue',
      ],
      correct: 1,
      explanation: 'Varsity M1 Chapter 7 explicitly lists four uses: Information (economic barometer), Benchmarking (measuring performance), Trading (via derivatives), and Portfolio Hedging (protecting investments during adverse markets).',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.3',
      difficulty: 'medium',
    },
    {
      question: 'In index construction, if Company A has a market cap of ₹50,000 crore and Company B has a market cap of ₹10,000 crore, which gets a higher weight in the index?',
      options: [
        'Company B, because smaller companies are riskier',
        'Company A, because higher market cap means higher weight',
        'Both get equal weight regardless of size',
        'Neither — only government bonds are included in indices',
      ],
      correct: 1,
      explanation: 'Varsity M1 states: "The weights are assigned based on the free float market capitalization of the company, larger the market capitalization, higher the weight." Company A with higher market cap gets a higher weight.',
      factRef: 'Varsity M1 Ch.7 — The Stock Markets Index, Section 7.4',
      difficulty: 'medium',
    },
  ],
};

export default lesson;
