# FinSim — Codebase Audit Report
**Date**: 2026-05-06
**Audited By**: Gemini Pro 3.1
**Repo**: e:\Major 2\code\Tradewise
**Audit Scope**: Full codebase against PRD v1.0

***

## 1. Implementation Status Overview

| Feature | PRD Status | Implementation Status | Notes |
| :--- | :--- | :--- | :--- |
| **Tech Stack** | Next.js, Hono.js, MongoDB, NextAuth | **DIVERGED** | Uses Next.js, FastAPI (BFF + Market), PostgreSQL (asyncpg), Custom JWT auth. |
| **Trading Simulator** | Phase 3 | **PARTIAL** | GBM engine and WebSocket ticks exist. Risk metrics (Sharpe, VaR, etc.) are entirely missing. |
| **Academy & Curriculum** | Phase 1 & 2 | **MISSING** | No MDX files, no Lesson objects, no curriculum structure found. |
| **Quiz Engine** | Phase 2 | **MISSING** | No `quizSeed[]`, no Zod validation, no quiz generation endpoints. |
| **Gamification (XP/Streak)** | Phase 2 | **MISSING** | Leaderboard uses purely SQL-aggregated PnL; no XP or streak schema exists. |
| **AI Chatbot** | Phase 4 | **STUBBED** | UI sends a `ChartContext` text block; backend `/rag/chat` returns a hardcoded placeholder. |

## 2. Development Phase Assessment

Based on the planned phases, the project is currently in a fragmented state:

- **Phase 1 (Foundation):** **PARTIAL.** Auth and a Dashboard shell exist, but the database is PostgreSQL instead of MongoDB. Lesson Reader and Levels 1-2 are missing.
- **Phase 2 (Academy):** **NOT STARTED.** Quiz Engine, XP, Streaks, and Badges are completely absent from the codebase.
- **Phase 3 (Simulator):** **PARTIAL.** The Python GBM engine (`market-engine/app/stocks/gbm.py`) and Candlestick charts work over WebSockets. However, the Portfolio/Risk Metrics panel is missing (no Sharpe, VaR, or Beta calculations).
- **Phase 4 (Chatbot):** **PARTIAL.** The UI and context builder (`ChartContext`) are built. The BFF Hono server does not exist; instead, a FastAPI stub handles `/rag/chat` but does not connect to Claude/Gemini.
- **Phase 5 (Polish):** **NOT STARTED.**
- **Phase 6 (Launch):** **NOT STARTED.** The infrastructure is local Docker Compose (`infra/docker-compose.yml`), with no Vercel or Railway deployment config found.

## 3. Module Audit

### 3.1 Trading Simulator
- **GBM Engine:** Implemented in `market-engine/app/stocks/gbm.py` utilizing `_rng.standard_normal()` with drift and volatility.
- **WebSocket:** Working. Delivered via Redis pubsub and relayed by FastAPI (`gateway/app/websocket/connection_manager.py`). Client handles reconnects (`web/src/hooks/useMarketSocket.ts`).
- **Risk Metrics:** **Missing.** No code exists to calculate Sharpe, VaR 95%, Max Drawdown, Beta, or Volatility.
- **Candlestick Chart:** Live-updating via Lightweight Charts in the frontend.

### 3.2 Academy & Curriculum
- **Lesson Objects:** **Missing.** There are no MDX files, `content/curriculum` folder, or `LessonReader` components.
- **Levels:** No levels are populated. The entire educational module is missing.

### 3.3 Quiz Engine
- **Quiz Generation:** **Missing.** No BFF quiz generation endpoints exist.
- **Zod Validation:** **Missing.** No Zod schemas are used in the codebase (frontend or backend).
- **Adaptive Difficulty:** **Missing.**

### 3.4 Gamification
- **XP Formula:** **Missing.**
- **Streaks & Persistence:** **Missing.** Upstash Redis is solely used for market tick pubsub, not streaks.
- **Leaderboard:** Exists (`gateway/app/leaderboard/service.py`), but ranks users entirely on `realised_pnl` via SQL aggregation, not XP.

### 3.5 AI Chatbot
- **UISnapshot Builder:** Exists but modified. `web/src/lib/chartContext.ts` builds a `ChartContext` text block (last 20 candles OHLCV) instead of a true UISnapshot.
- **Isolation:** Architecture *is* isolated (Frontend -> Gateway -> Market Engine), but Gateway and Market Engine are both FastAPI.
- **LLM Integration:** **Missing.** `gateway/app/rag/router.py` returns a hardcoded string: `"RAG pipeline not yet configured..."`. No 200-word/20-message limit is enforced.

## 4. Data Model Integrity

The database uses **PostgreSQL (SQLAlchemy)** instead of the intended **MongoDB (Mongoose)**. Schema drift is severe:

| PRD Model | Implemented | Deviations |
| :--- | :--- | :--- |
| **LessonObject** | ❌ None | N/A |
| **User** | ✅ `User` (SQL) | Missing: `currentLevel`, `totalXP`, `completedLessons`, `currentStreak`, `badges`, `quizHistory`. Added: `wallet` relationship. |
| **Portfolio** | ✅ `Wallet`, `Position` | Missing: `riskSnapshots`. `cash` is modeled as `Wallet.balance`. `holdings` are modeled as `Position` table rows. |
| **UISnapshot** | ⚠️ `ChartContext` | Replaced by a text builder; does not capture `lessonContext` as there are no lessons. |

## 5. API Completeness Table

| Intended Endpoint | Implemented Path (FastAPI) | Method | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `WS /ws/market/{symbol}` | `WS /ws/{symbol}` | WS | ✅ Implemented | Broadcasts OHLCV ticks. |
| `POST /api/market/session` | N/A | POST | ❌ Missing | Simulation runs globally, not per session. |
| `GET /api/market/history` | `/market/candles/{symbol}` | GET | ✅ Implemented | Fetches historical candles. |
| `POST /api/portfolio/order`| `/trade/` | POST | ✅ Implemented | Places buy/sell orders. |
| `GET /api/portfolio/{userId}`| `/wallet/` & `/trade/positions`| GET | ✅ Implemented | Split into wallet balance and positions. |
| `POST /api/portfolio/reset`| `/wallet/reset/me` | POST | ✅ Implemented | Resets wallet to ₹1,00,000. |
| `GET /api/risk/{userId}` | N/A | GET | ❌ Missing | No risk engine built. |
| `POST /api/sip/calculate` | N/A | POST | ❌ Missing | No SIP tools exist. |
| `POST /api/chat` | `/rag/chat` | POST | ⚠️ Partial | Stubbed endpoint. No SSE stream. |
| `POST /api/quiz/generate` | N/A | POST | ❌ Missing | |
| `POST /api/quiz/submit` | N/A | POST | ❌ Missing | |
| `GET /api/xp/{userId}` | N/A | GET | ❌ Missing | |
| `POST /api/streak/checkin` | N/A | POST | ❌ Missing | |
| `GET /api/leaderboard` | `/leaderboard/` | GET | ⚠️ Partial | Sorts by PnL, not XP. |
| `GET /api/badges/{userId}` | N/A | GET | ❌ Missing | |

## 6. Bugs & Architectural Risks

1. **Massive Stack Divergence**: The use of FastAPI + PostgreSQL + Custom JWT instead of Hono.js + MongoDB + NextAuth breaks alignment with the PRD and requires immediate team alignment on the path forward.
2. **Missing Input Validation**: WebSocket payloads on the frontend (`JSON.parse(evt.data)` in `useMarketSocket.ts`) have no runtime validation (Zod is entirely missing), creating a risk of UI crashes on malformed ticks.
3. **Hardcoded Secrets**: `gateway/app/config.py` contains a hardcoded JWT secret (`"change-this-to-a-long-random-string"`), posing a severe security risk if deployed.
4. **Missing Risk Engine**: The core educational value of the simulator (Sharpe, VaR, Beta) is completely absent. Users can trade, but cannot analyze their risk.
5. **Chatbot Illusion**: The Chat UI looks functional but is wired to a hardcoded response. RAG ingestion code exists (`rag-ingestion/`) but is not connected to the API.

## 7. Next 3 Development Tasks

If the goal is to align with the original PRD scope:

**Task 1: Build the Risk Engine (Simulator Phase 3)**
- **Files**: `market-engine/app/risk/engine.py` (New), `gateway/app/portfolio/router.py` (New).
- **Description**: Implement mathematical functions for Volatility, Sharpe Ratio, VaR 95%, Max Drawdown, and Beta using `pandas`/`numpy` over user trade history.
- **Acceptance Criteria**: `GET /api/risk/{userId}` returns correct mathematical aggregates matching the PRD formulas.

**Task 2: Integrate Claude/Gemini with the Chatbot (Chatbot Phase 4)**
- **Files**: `gateway/app/rag/router.py`, `gateway/app/rag/service.py` (New).
- **Description**: Replace the hardcoded stub with a Vercel AI SDK (or native Python equivalent) streaming call to Claude Sonnet. Inject the `ChartContext` and enforce the 200-word / 20-message boundaries using system prompts.
- **Acceptance Criteria**: UI streams dynamic responses directly answering questions about the current chart state without hallucinating future prices.

**Task 3: Initialize the Academy Content System (Academy Phase 2)**
- **Files**: `web/content/curriculum/` (New), `web/src/app/academy/` (New).
- **Description**: Scaffold the Next.js routes to read and render MDX files using `next-mdx-remote`. Define the `LessonObject` schema and create a mock Level 1 lesson.
- **Acceptance Criteria**: Users can navigate to `/academy/1/1`, read a gamified MDX lesson, and see basic terms and illustrations.

## 8. Observations & Recommendations

The current codebase is a functional trading simulator but completely lacks the "educational" half of the platform. Before writing any more code, engineering leadership must formally **approve the pivot to Python/PostgreSQL** or mandate a rewrite to Node.js/MongoDB. Given that the complex ML price engine is already functioning in Python, retaining the current FastAPI backend is highly recommended.
