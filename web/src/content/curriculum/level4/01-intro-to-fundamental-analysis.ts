import type { LessonObject } from "@/types/lesson"

const lesson: LessonObject = {
  id: "l4-01-intro-to-fa",
  level: 4,
  order: 1,
  title: "Introduction to Fundamental Analysis",
  subtitle: "The long-term investor's approach to evaluating businesses",
  xpReward: 28,
  body: `## What is Fundamental Analysis?

Fundamental Analysis (FA) is a holistic approach to studying a business. When an investor wishes to invest for the long term (3–5 years), it is critical to understand the business from multiple perspectives — separating daily short-term noise from underlying business performance.

Over the long term, stock prices of fundamentally strong companies tend to appreciate and create wealth. Examples from the Indian market: Infosys, TCS, Page Industries, Eicher Motors, Bosch India, Nestle India, and TTK Prestige have each delivered over **20% CAGR year on year for over 10 years**. At 20% CAGR, money doubles in roughly 3.5 years.

Conversely, companies like Suzlon Energy and Reliance Power have destroyed wealth for investors.

## Two Dimensions of Analysis

Every investment is evaluated on two aspects:

**1. Qualitative aspects** — non-numeric information about the company:
- Management quality and integrity
- Business model and competitive advantage (moat)
- Industry dynamics and competition
- Regulatory environment

**2. Quantitative aspects** — financial numbers:
- Profitability and margins
- Revenue and earnings growth
- Debt levels and cash flows
- Financial ratios (ROE, ROCE, PE, EPS)

## The Economic Moat

The term "moat" (economic moat) was popularized by Warren Buffett. It refers to a company's **sustainable competitive advantage** over rivals.

Examples:
- **Eicher Motors / Royal Enfield**: massive brand loyalty in a niche segment — hard for competitors to displace
- **Page Industries**: manufacturing/distribution license for Jockey innerwear in India
- **Infosys**: labour arbitrage between India and the US
- **Gruh Finance**: small-ticket housing loans to an underserved segment

Always invest in companies with a **wider economic moat** — they protect long-term profits.

## The Due Diligence Process

Investing in a stock requires three stages:
1. **Understanding the business** — read the annual report thoroughly
2. **Checklist analysis** — apply a financial checklist to evaluate performance
3. **Valuation** — estimate intrinsic value using DCF or other methods

The 10-point checklist includes: Gross Profit Margin > 20%, consistent EPS growth, low debt, positive cash flow from operations, ROE > 25%, 1–2 business segments, and limited subsidiaries.

## The Annual Report — Primary Source

The Annual Report (AR) is the most reliable source of company information. It is published annually (as of 31 March), audited and certified, and contains:
- Management Discussion & Analysis (MD&A) — management's perspective
- Standalone and Consolidated Financial Statements
- P&L statement, Balance Sheet, Cash Flow statement
- Notes and schedules for every line item

Always use the AR over media websites for investment research.`,

  keyTerms: [
    {
      term: "Fundamental Analysis (FA)",
      definition: "A research method that evaluates a company's intrinsic value by analyzing its financial statements, business model, management quality, and industry dynamics. Used for long-term investment (3–5 year horizon).",
    },
    {
      term: "Economic Moat",
      definition: "A company's sustainable competitive advantage — brand loyalty, pricing power, patents, distribution networks — that protects long-term profits from competition.",
    },
    {
      term: "Annual Report (AR)",
      definition: "The official yearly publication by a company containing audited financial statements, management commentary, and corporate governance disclosures. Dated 31 March for Indian companies.",
    },
    {
      term: "CAGR (Compound Annual Growth Rate)",
      definition: "The rate at which an investment grows year-over-year, compounded. Formula: [(End/Start)^(1/n) − 1]. At 20% CAGR, money doubles in ~3.5 years.",
    },
    {
      term: "Standalone vs Consolidated Statements",
      definition: "Standalone shows the parent company's numbers only. Consolidated includes parent + all subsidiaries. Consolidated is generally preferred for a complete picture.",
    },
  ],

  facts: [
    {
      statement: "Companies like Infosys, TCS, Page Industries, Eicher Motors, and Bosch India have delivered over 20% CAGR year-on-year for over 10 years. At 20% CAGR, money doubles in approximately 3.5 years.",
      citation: "Varsity Module 3, Ch. 1.1",
    },
    {
      statement: "Bosch India Limited has delivered close to 30% CAGR over the long term.",
      citation: "Varsity Module 3, Ch. 1.1",
    },
    {
      statement: "The 10-point investment checklist includes: Gross Profit Margin > 20%, consistent EPS, low debt, positive operating cash flow, ROE > 25%, 1–2 business lines, limited subsidiaries.",
      citation: "Varsity Module 3, Ch. 12.4",
    },
    {
      statement: "The Annual Report is published by the end of the financial year (31 March) and contains auditor-certified financial data — the most reliable source for investors.",
      citation: "Varsity Module 3, Ch. 3.1",
    },
    {
      statement: "CRISIL example: standalone loss of ₹1000 Cr + subsidiary Irevna profit of ₹700 Cr = consolidated loss of only ₹300 Cr — demonstrating why consolidated statements give a fuller picture.",
      citation: "Varsity Module 3, Ch. 3.3",
    },
  ],

  quizSeed: [
    {
      id: "l4-01-q1",
      question: "At a 20% CAGR, approximately how many years does it take to double your money?",
      options: ["2 years", "3.5 years", "5 years", "7 years"],
      correct: 1,
      explanation: "At 20% CAGR, money doubles in approximately 3.5 years (using the Rule of 72: 72/20 = 3.6 years).",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 1.1",
    },
    {
      id: "l4-01-q2",
      question: "Which of the following is a 'qualitative' aspect in fundamental analysis?",
      options: [
        "Earnings Per Share (EPS)",
        "Return on Equity (ROE)",
        "Management quality and business moat",
        "Debt to equity ratio",
      ],
      correct: 2,
      explanation: "Qualitative aspects are non-numeric — management integrity, competitive moat, industry dynamics. EPS, ROE, and D/E are quantitative (numerical) metrics.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 2",
    },
    {
      id: "l4-01-q3",
      question: "What is an 'economic moat' as defined by Warren Buffett?",
      options: [
        "A company's cash reserves",
        "A company's sustainable competitive advantage over rivals",
        "A company's dividend yield",
        "A company's market capitalisation",
      ],
      correct: 1,
      explanation: "An economic moat refers to a company's sustainable competitive advantage — brand, pricing power, patents — that protects long-term profits from being eroded by competition.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 12.3",
    },
    {
      id: "l4-01-q4",
      question: "Consolidated financial statements differ from standalone statements because they:",
      options: [
        "Include only the parent company's numbers",
        "Include the parent company plus all its subsidiaries",
        "Are prepared quarterly rather than annually",
        "Exclude intercompany transactions",
      ],
      correct: 1,
      explanation: "Consolidated statements include the parent company's financials plus all its subsidiaries. This gives a more complete picture of the group's true financial health.",
      difficulty: "medium",
      citation: "Varsity Module 3, Ch. 3.3",
    },
    {
      id: "l4-01-q5",
      question: "What is the primary source of information an investor should use when researching a company?",
      options: [
        "Financial news websites",
        "Stock broker research reports",
        "The company's Annual Report",
        "Social media posts by analysts",
      ],
      correct: 2,
      explanation: "The Annual Report is the official, auditor-certified document. Media websites may misrepresent or reclassify data. The AR is always the most reliable primary source.",
      difficulty: "easy",
      citation: "Varsity Module 3, Ch. 3.1",
    },
  ],

  attribution: "Content sourced from Zerodha Varsity Module 3 — Fundamental Analysis (zerodha.com/varsity)",
}

export default lesson
