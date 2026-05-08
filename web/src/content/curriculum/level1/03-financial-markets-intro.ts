import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '03-financial-markets-intro',
  title: 'Introduction to Financial Markets — BSE, NSE & SEBI',
  level: 1,
  order: 3,
  xpReward: 25,
  source: 'Zerodha Varsity M11 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim. Verified against SEBI Financial Education Booklet (Nov 2020).',
  estimatedReadTime: 6,
  body: `## What is a Financial Market?

A financial market is a marketplace where buyers and sellers come together to trade financial instruments — such as stocks, bonds, mutual funds, and derivatives. Financial markets channel savings from investors to businesses and governments that need capital.

There are two types of securities markets:
- **Primary Market** — where companies first issue new stocks and bonds to the public (e.g., an IPO).
- **Secondary Market** — where already-issued securities are bought and sold between investors through stock exchanges.

## India's Stock Exchanges

India has two major SEBI-recognised stock exchanges:

**BSE Ltd. (Bombay Stock Exchange)**
- Formerly known as the Bombay Stock Exchange Ltd.
- One of the oldest stock exchanges in Asia.
- Home to the **Sensex** (S&P BSE Sensex) — an index tracking 30 major listed companies.

**NSE (National Stock Exchange of India Ltd.)**
- India's largest stock exchange by trading volume.
- Home to the **Nifty 50** — an index tracking 50 major listed companies.

## What is SEBI?

**SEBI (Securities and Exchange Board of India)** is the regulator of the Indian securities market. It was established to **protect investors' interests** and **regulate and develop** the securities market in India.

SEBI's key roles include:
- Registering and regulating stock brokers, depositories, and market intermediaries
- Examining company prospectuses before IPOs
- Preventing insider trading and market manipulation
- Investor education and awareness

> All stock brokers and depository participants must be **SEBI-registered**. You can verify their registration on [sebi.gov.in](https://www.sebi.gov.in).

## How to Invest in Stocks — 3 Accounts Required

To invest in equity shares, you need three accounts (as specified by SEBI):

1. **Savings Bank Account** — with a commercial bank (for funds)
2. **Trading Account** — with a SEBI-registered stock broker, to place buy/sell orders on a recognised stock exchange
3. **Demat Account** — with a SEBI-registered Depository Participant (DP), to hold securities in electronic (dematerialised) form

India has two SEBI-registered depositories:
- **NSDL** (National Securities Depository Ltd.)
- **CDSL** (Central Depository Services (India) Ltd.)

## Primary Market: IPOs and ASBA

When a company offers its shares to the public for the first time, it is called an **IPO (Initial Public Offering)**. Investors can apply for IPO shares through **ASBA (Application Supported by Blocked Amount)** — an RBI/SEBI mechanism where the application money is **blocked** (not debited) in the investor's bank account until allotment. If shares are not allotted, the blocked amount is released automatically.

## Settlement Cycle

After a trade is executed on the stock exchange, settlement happens on a **T+1 rolling basis** (as updated — previously T+2). T = Trade day. Funds and securities are exchanged between buyer and seller within one working day after the trade.`,

  keyTerms: [
    { term: 'Primary Market', definition: 'The market where companies issue new securities (stocks/bonds) to the public for the first time, e.g., through an IPO.' },
    { term: 'Secondary Market', definition: 'The market where previously-issued securities are bought and sold between investors through stock exchanges like BSE and NSE.' },
    { term: 'SEBI', definition: 'Securities and Exchange Board of India — the regulator of India\'s securities markets, responsible for protecting investors and ensuring market integrity.' },
    { term: 'BSE', definition: 'Bombay Stock Exchange Ltd. — one of India\'s two major SEBI-recognised stock exchanges; home to the Sensex index.' },
    { term: 'NSE', definition: 'National Stock Exchange of India Ltd. — India\'s largest stock exchange by volume; home to the Nifty 50 index.' },
    { term: 'Demat Account', definition: 'An account that holds securities in electronic (dematerialised) form, opened with a SEBI-registered Depository Participant.' },
    { term: 'IPO', definition: 'Initial Public Offering — the first time a company issues its shares to the public through the primary market.' },
    { term: 'ASBA', definition: 'Application Supported by Blocked Amount — a mechanism to apply for IPO shares where application money is blocked (not debited) until allotment.' },
    { term: 'NSDL / CDSL', definition: 'National Securities Depository Ltd. and Central Depository Services (India) Ltd. — India\'s two SEBI-registered depositories that hold shares in electronic form.' },
  ],

  facts: [
    {
      statement: 'Major SEBI recognised stock exchanges in India are BSE Ltd. (formerly Bombay Stock Exchange Ltd.) and the National Stock Exchange of India Ltd. (NSE).',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Secondary Market, p.26',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'In order to invest in equity shares, an investor should have three accounts: a Savings Bank Account, a Trading Account with a SEBI-registered stock broker, and a Demat Account with a SEBI-recognised Depository Participant.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Pre-requisites to invest in securities, p.24',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'National Securities Depository Ltd. (NSDL) and Central Depository Services (India) Ltd. (CDSL) are the two SEBI-registered depositories in India.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Pre-requisites to invest in securities, p.25',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'ASBA (Application Supported by Blocked Amount) is a mechanism for applying for IPO shares where the application money is blocked in the investor\'s bank account. Blocked amount continues to earn interest. Money is debited only if the application is selected for allotment.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — ASBA for Shares, p.25',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'In the primary market, investors are allotted securities directly by the company. In the secondary market, investors buy securities from existing investors through their stock brokers.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Investment in Securities Market, p.24',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'SEBI examines the prospectus issued to the public for subscription of shares to see that it meets with the requirements of the SEBI Regulations.',
      source: 'sebi',
      citation: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Primary Market, p.25',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'According to the SEBI booklet, what are the two major SEBI-recognised stock exchanges in India?',
      options: [
        'MCX and NCDEX',
        'BSE Ltd. and the National Stock Exchange of India Ltd. (NSE)',
        'NSDL and CDSL',
        'RBI and SEBI',
      ],
      correct: 1,
      explanation: 'The SEBI booklet states: "Major SEBI recognised stock exchanges in India are BSE Ltd. (formerly Bombay Stock Exchange Ltd.) and the National Stock Exchange of India Ltd. (NSE)."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Secondary Market, p.26',
      difficulty: 'easy',
    },
    {
      question: 'To invest in equity shares in India, how many accounts does the SEBI booklet say you need?',
      options: ['One (just a savings bank account)', 'Two (savings + demat)', 'Three (savings + trading + demat)', 'Four (savings + trading + demat + NPS)'],
      correct: 2,
      explanation: 'The SEBI booklet specifies three accounts: "Savings Account, Trading Account with a SEBI-registered stock broker, and Demat Account with a SEBI-recognised Depository Participant."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Pre-requisites to invest in securities, p.24',
      difficulty: 'easy',
    },
    {
      question: 'What is the difference between the primary market and the secondary market?',
      options: [
        'Primary is for bonds only; secondary is for stocks only',
        'In primary market, investors get securities directly from the company; in secondary market, investors buy from existing investors through brokers',
        'Primary market is regulated by NSE; secondary market by BSE',
        'Primary is for retail investors; secondary is for institutional investors',
      ],
      correct: 1,
      explanation: 'The SEBI booklet explains: "in the primary market, investors are allotted securities directly by the company, while in the secondary market investors buy securities from the existing investors through their stock brokers."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Investment in Securities Market, p.24',
      difficulty: 'easy',
    },
    {
      question: 'What are the two SEBI-registered depositories in India that hold shares in electronic form?',
      options: [
        'BSE and NSE',
        'SEBI and RBI',
        'NSDL and CDSL',
        'MCX and NCDEX',
      ],
      correct: 2,
      explanation: 'The SEBI booklet states: "National Securities Depository Ltd. (NSDL) and Central Depository Services (India) Ltd. (CDSL) are two SEBI registered depositories in India."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Pre-requisites to invest in securities, p.25',
      difficulty: 'medium',
    },
    {
      question: 'What does ASBA stand for, and what does it do?',
      options: [
        'Application Supported by Bank Approval — debits money immediately on IPO application',
        'Application Supported by Blocked Amount — blocks money in your account until allotment, not debits it',
        'Automated Stock Buying Algorithm — places buy orders automatically',
        'Account Settlement by Broker Authorization — settles trades via broker',
      ],
      correct: 1,
      explanation: 'ASBA = Application Supported by Blocked Amount. The SEBI booklet states it "contains an authorization to the bank to block the application money in his/her bank account." Money is debited only if selected for allotment.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — ASBA for Shares, p.25',
      difficulty: 'medium',
    },
    {
      question: 'Who regulates India\'s securities market to protect investors?',
      options: ['Reserve Bank of India (RBI)', 'Ministry of Finance', 'Securities and Exchange Board of India (SEBI)', 'NSDL'],
      correct: 2,
      explanation: 'SEBI (Securities and Exchange Board of India) is the regulator of India\'s securities markets. All stock brokers must be SEBI-registered, and SEBI examines company prospectuses before IPOs.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5, p.24–26',
      difficulty: 'easy',
    },
    {
      question: 'In the ASBA mechanism, what happens to the application money if you are NOT allotted shares in an IPO?',
      options: [
        'It is permanently forfeited',
        'It is converted into a fixed deposit automatically',
        'The blocked amount is released and made available in your account',
        'It is transferred to SEBI\'s investor protection fund',
      ],
      correct: 2,
      explanation: 'The SEBI booklet states: "in case the securities are not allotted to the investor, then the blocked amount in his/her bank account is released and made available to use."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — ASBA for Shares, p.25',
      difficulty: 'medium',
    },
    {
      question: 'What role does SEBI play in the IPO process?',
      options: [
        'SEBI directly allots shares to investors',
        'SEBI examines the prospectus issued to the public to ensure it meets SEBI Regulations',
        'SEBI sets the IPO price for all companies',
        'SEBI provides the underwriting for all IPOs',
      ],
      correct: 1,
      explanation: 'The SEBI booklet states: "SEBI examines the prospectus issued to the public for subscription of shares to see that it meets with the requirements of the SEBI Regulations."',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Primary Market, p.25',
      difficulty: 'hard',
    },
    {
      question: 'A Demat Account holds securities in which form?',
      options: ['Physical certificate form', 'Electronic (dematerialised) form', 'Gold-backed certificate form', 'Paper bond form'],
      correct: 1,
      explanation: 'A Demat (short for dematerialised) account holds securities in electronic form. It is opened with a SEBI-recognised Depository Participant (DP) of either NSDL or CDSL.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Pre-requisites to invest in securities, p.24',
      difficulty: 'easy',
    },
    {
      question: 'What was the settlement cycle for trades on Indian stock exchanges as of April 1, 2003?',
      options: ['T+0 (same day)', 'T+1', 'T+2', 'T+5'],
      correct: 2,
      explanation: 'The SEBI booklet states: "Settlement cycle is on T+2 rolling settlement basis w.e.f. April 01, 2003 (where T stands for the trade day)." Note: India has since moved to T+1 for most securities.',
      factRef: 'SEBI Financial Education Booklet (Nov 2020), Chapter 5 — Trading days and Settlement Cycle, p.27',
      difficulty: 'hard',
    },
  ],
};

export default lesson;
