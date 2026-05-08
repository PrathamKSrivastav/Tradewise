import type { LessonObject } from '@/types/lesson';

const lesson: LessonObject = {
  id: '06-demat-account-and-order-types',
  title: 'Demat Account, Trading & Order Types',
  level: 2,
  order: 6,
  xpReward: 30,
  source: 'SEBI Securities Market Booklet (Nov 2020), Sections 7–17. Zerodha Varsity M1 Ch.3, Ch.9 by Karthik Rangappa, CC BY-NC-SA 4.0. Adapted for FinSim.',
  estimatedReadTime: 6,
  body: `## Three Accounts Required to Invest

To invest in equity shares in India, you need **three accounts** working together:

1. **Bank Account** — with a commercial bank (source of funds)
2. **Trading Account** — with a SEBI-registered stock broker to place buy/sell orders on recognised stock exchanges
3. **Demat Account** — with a SEBI-registered Depository Participant (DP) to hold securities in electronic form

From the SEBI Securities Market Booklet:
> *"In order to invest in equity shares, an investor needs to open three accounts namely: Bank Account, Trading account or broking account with a SEBI registered stock broker of a recognized Stock Exchange, and Demat account with a SEBI-registered DP."*

A combination of all three is often called a **"3-in-1" account**.

## What is a Demat Account?

Before 1996, share certificates were in physical paper form. In 1996, the process of converting paper certificates to digital form was introduced — called **Dematerialisation (DEMAT)**.

From Varsity M1:
> *"The storage place for the digital share certificate is the 'DEMAT Account'. A Depository is a financial intermediary which offers the service of Demat account. Think of DEMAT account as a digital vault for your shares."*

The two SEBI-registered depositories in India are:
- **NSDL** (National Securities Depository Limited)
- **CDSL** (Central Depository Services (India) Limited)

You cannot walk directly into a depository — you must open a demat account through a **Depository Participant (DP)**, who acts as an agent for NSDL or CDSL.

## Basic Services Demat Account (BSDA)

BSDA is a low-cost demat account for individuals with:
- Only **one demat account** (across all depositories), AND
- Holdings value does **not exceed ₹2 lakhs** (for non-debt securities)

BSDA Annual Maintenance Charge (AMC) structure:
| Value of Holdings | Charges |
|---|---|
| Up to ₹50,000 | No AMC |
| ₹50,001 to ₹2,00,000 | Up to ₹100/year |

## KYC (Know Your Client)

KYC is **mandatory** for opening any demat, trading, or bank account. It is required under the Prevention of Money Laundering Act, 2002.

Acceptable KYC documents (Officially Valid Documents / OVDs):
- PAN card
- UIDAI-Aadhaar
- Passport
- Voter ID
- Driving Licence

KYC is a **one-time process** — valid across all SEBI-registered intermediaries. Once KYC is done, you receive a **KIN (KYC Identification Number)**.

**e-KYC** is also available using Aadhaar and PAN — complete the process online with video-based In-Person Verification (IPV).

## Trading: How an Order Works

When you want to buy a stock, you place an order through your trading account (via trading terminal, mobile app, or broker call). From Varsity M1:

1. An **order ticket** is generated with your trading account details, the price you want to buy at, and the number of shares
2. The broker verifies you have sufficient funds
3. The order hits the **stock exchange**
4. The exchange's **order matching algorithm** finds a seller at your price
5. The trade is executed, and shares are **credited to your Demat account**

## Types of Traders

From Varsity M1:

**Day Trader** — Initiates and closes all positions on the same day. Does not carry overnight risk. Example: Buy 100 shares of TCS at ₹2,212 at 9:15 AM, sell at ₹2,220 at 3:20 PM.

**Scalper** — A type of day trader who trades very large quantities for small, quick profits. Example: Buy 10,000 shares at ₹2,212.0, sell at ₹2,212.1.

**Swing Trader** — Holds positions for days to weeks. Example: Buy 100 shares on 12th June, sell on 19th June.

**Investor** — Holds for months to years, expecting significant appreciation.

## Contract Note

A **Contract Note** is a legal document issued by the broker after every trade. It contains:
- Securities bought/sold
- Traded price
- Time of trade
- Brokerage charges

From the SEBI Securities Market Booklet:
> *"Contract note shall be issued by the stock broker within 24 hours of the execution of the trade."*

Contract notes can be issued in physical or electronic (digitally signed, encrypted) form. Preserve them for future reference — especially important if any dispute arises.

## Settlement Cycle

After a trade is executed, settlement happens on **T+1 rolling basis** (where T = trade day). Shares and funds are exchanged within one working day after the trade.

The SEBI booklet references the earlier T+2 settlement (effective April 1, 2003). India has since moved to T+1 for most securities.`,

  keyTerms: [
    { term: 'Demat Account', definition: 'An account that holds securities in electronic (dematerialised) form, opened with a SEBI-registered Depository Participant.' },
    { term: 'Trading Account', definition: 'An account with a SEBI-registered stock broker used to place buy and sell orders on recognised stock exchanges.' },
    { term: 'Dematerialisation', definition: 'The process of converting physical paper share certificates to electronic form. Introduced in India in 1996.' },
    { term: 'NSDL / CDSL', definition: 'National Securities Depository Ltd. and Central Depository Services (India) Ltd. — India\'s two SEBI-registered depositories that hold shares electronically.' },
    { term: 'Depository Participant (DP)', definition: 'An agent of NSDL or CDSL that opens and maintains Demat accounts for investors.' },
    { term: 'BSDA', definition: 'Basic Services Demat Account — a low-cost demat account for investors with only one demat account and holdings up to ₹2 lakhs.' },
    { term: 'KYC', definition: 'Know Your Client — mandatory identity verification process required under the Prevention of Money Laundering Act, 2002. One-time process valid across all SEBI intermediaries.' },
    { term: 'Contract Note', definition: 'A legal document issued by the stock broker within 24 hours of a trade, detailing securities transacted, price, time, and charges.' },
    { term: 'Settlement Cycle', definition: 'The time between trade execution and final exchange of funds and securities. Currently T+1 in India (was T+2 until recently).' },
    { term: 'Day Trader', definition: 'A market participant who initiates and closes all positions within the same trading day, avoiding overnight risk.' },
  ],

  facts: [
    {
      statement: 'To invest in equity shares, an investor needs three accounts: Bank Account, Trading Account with a SEBI registered stock broker, and Demat Account with a SEBI registered Depository Participant (DP). A combination of these three is referred to as the "3-in-1" account.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 7 — Pre-requisites for Investing, p.10',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'The process of converting paper format share certificates to digital form is called Dematerialisation (DEMAT). The storage place for the digital share certificate is the DEMAT Account. Think of DEMAT account as a digital vault for your shares.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.3 — Financial Intermediaries, Section 3.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'At present there are only two depositaries offering DEMAT account services: The National Securities Depository Limited (NSDL) and Central Depository Services (India) Limited (CDSL). Both operate under strict SEBI regulations.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.3 — Financial Intermediaries, Section 3.3',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'KYC is mandatory under the Prevention of Money Laundering Act, 2002. KYC is a one-time process and is valid across all intermediaries in the securities market. A unique KYC Identification Number (KIN) is generated and communicated by SMS/Email.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 8 — KYC Process, p.11',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Basic Services Demat Account (BSDA) is for individuals who have only one demat account and holdings that do not exceed Rs.2 lakhs. For holdings up to Rs.50,000: No AMC. For holdings Rs.50,001 to Rs.2,00,000: AMC up to Rs.100.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 9 — Basic Services Demat Account, p.12',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'Contract note shall be issued by the stock broker within 24 hours of the execution of the trade. It is a legal document containing securities bought/sold, traded price, time of trade, and brokerage. It should be preserved for future references.',
      source: 'sebi',
      citation: 'SEBI Securities Market Booklet (Nov 2020), Section 17 — Contract Note, p.18',
      verifiedDate: '2024-04-01',
    },
    {
      statement: 'From Varsity M1: A Day Trader initiates and closes all positions during the same day and does not carry forward positions. Example: buy 100 shares of TCS at Rs.2212 at 9:15 AM and sell at Rs.2220 at 3:20 PM.',
      source: 'varsity',
      citation: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.8',
      verifiedDate: '2024-04-01',
    },
  ],

  quizSeed: [
    {
      question: 'According to the SEBI Securities Market Booklet, how many accounts are needed to invest in equity shares?',
      options: ['One (just a bank account)', 'Two (bank + demat)', 'Three (bank + trading + demat)', 'Four (bank + trading + demat + NPS)'],
      correct: 2,
      explanation: 'SEBI Securities Market Booklet: "In order to invest in equity shares, an investor needs to open three accounts namely: Bank Account, Trading Account with a SEBI registered stock broker, and Demat Account with a SEBI registered DP."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 7 — Pre-requisites for Investing, p.10',
      difficulty: 'easy',
    },
    {
      question: 'What was Dematerialisation (DEMAT), as described in Varsity M1?',
      options: [
        'The process of listing a company on the stock exchange',
        'The process of converting paper share certificates to electronic (digital) form',
        'The process of buying shares in an IPO',
        'The process of settling trades between buyers and sellers',
      ],
      correct: 1,
      explanation: 'Varsity M1: "Before 1996 the share certificate was in paper format however post 1996, the share certificates were converted to digital form. The process of converting paper format share certificate into digital format share certificate is called Dematerialization."',
      factRef: 'Varsity M1 Ch.3 — Financial Intermediaries, Section 3.3',
      difficulty: 'easy',
    },
    {
      question: 'How many SEBI-registered depositories exist in India, as stated in Varsity M1?',
      options: ['One (NSDL only)', 'Two (NSDL and CDSL)', 'Three (NSDL, CDSL, and BSE)', 'Four, one per major bank'],
      correct: 1,
      explanation: 'Varsity M1: "At present there are only two depositaries offering you DEMAT account services. They are The National Securities Depository Limited (NSDL) and Central Depository Services (India) Limited."',
      factRef: 'Varsity M1 Ch.3 — Financial Intermediaries, Section 3.3',
      difficulty: 'easy',
    },
    {
      question: 'KYC is mandatory under which law, as per the SEBI Securities Market Booklet?',
      options: [
        'The Companies Act, 2013',
        'The Prevention of Money Laundering Act, 2002',
        'The SEBI Act, 1992',
        'The Depositories Act, 1996',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "KYC is mandatory under the Prevention of Money Laundering Act, 2002 and Rules framed thereunder."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 8 — KYC Process, p.11',
      difficulty: 'medium',
    },
    {
      question: 'Under BSDA (Basic Services Demat Account), what is the Annual Maintenance Charge for holdings valued at ₹60,000?',
      options: ['No AMC', 'Up to ₹100', 'Up to ₹500', 'Up to ₹1,000'],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet BSDA table: For Non-Debt Securities, Rs.50,001 to Rs.2,00,000 = "Up to Rs.100." ₹60,000 falls in this bracket, so AMC is up to ₹100.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 9 — Basic Services Demat Account, p.12',
      difficulty: 'medium',
    },
    {
      question: 'Within how many hours must a stock broker issue a contract note after a trade, as per SEBI?',
      options: ['1 hour', '12 hours', '24 hours', '48 hours'],
      correct: 2,
      explanation: 'SEBI Securities Market Booklet: "Contract note shall be issued by the stock broker within 24 hours of the execution of the trade."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 17 — Contract Note, p.18',
      difficulty: 'easy',
    },
    {
      question: 'From Varsity M1: A Day Trader buys 100 shares at ₹2,212 at 9:15 AM. When should they close the trade?',
      options: [
        'Within one week',
        'Within the same trading day',
        'After 1 year to get long-term capital gains tax benefit',
        'After receiving the first quarterly dividend',
      ],
      correct: 1,
      explanation: 'Varsity M1: "A day trader initiates and closes the position during the day. He does not carry forward his positions." This avoids overnight risk.',
      factRef: 'Varsity M1 Ch.6 — The Stock Markets, Section 6.8',
      difficulty: 'easy',
    },
    {
      question: 'What is KYC and is it a one-time process?',
      options: [
        'Know Your Commodity — must be done for each individual trade',
        'Know Your Client — one-time process valid across all SEBI-registered intermediaries',
        'Know Your Capital — done annually for tax purposes',
        'Know Your Credit — done separately for each bank',
      ],
      correct: 1,
      explanation: 'SEBI Securities Market Booklet: "KYC is a one-time process and is valid across all the intermediaries. You need not undergo the same process again while opening an account with another intermediary in securities market."',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 8 — KYC Process, p.11',
      difficulty: 'easy',
    },
    {
      question: 'What is the role of a Depository Participant (DP), as described in Varsity M1?',
      options: [
        'A DP sets the price of stocks on the exchange',
        'A DP acts as an agent to the Depository (NSDL/CDSL) to open and maintain Demat accounts',
        'A DP is the same as a stock broker',
        'A DP manages mutual fund portfolios on behalf of investors',
      ],
      correct: 1,
      explanation: 'Varsity M1: "You cannot walk into a Depository to open a DEMAT account. To open a DEMAT account you need to liaison with a Depository Participant (DP). A DP helps you set up your DEMAT account with a Depository. A DP acts as an agent to the Depository."',
      factRef: 'Varsity M1 Ch.3 — Financial Intermediaries, Section 3.3',
      difficulty: 'medium',
    },
    {
      question: 'Under the BSDA rules, what is the Annual Maintenance Charge for Demat holdings worth ₹40,000?',
      options: ['No AMC (₹0)', 'Up to ₹100', 'Up to ₹500', '₹250 flat'],
      correct: 0,
      explanation: 'SEBI Securities Market Booklet BSDA table: For Non-Debt Securities, "Up to Rs.50,000 — No AMC." Holdings of ₹40,000 fall below ₹50,000, so there is No Annual Maintenance Charge.',
      factRef: 'SEBI Securities Market Booklet (Nov 2020), Section 9 — Basic Services Demat Account, p.12',
      difficulty: 'medium',
    },
  ],
};

export default lesson;
