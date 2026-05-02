# Tradewise Codebase Audit

## 1) Project Overview
- Tradewise is an **educational Indian stock market simulator** with no real money or real data. (README.md:1-3)
- The repo defines three primary services: **market-engine** (tick generator), **gateway** (API + WebSocket relay), and **web** (Next.js frontend), alongside Postgres, Redis, and Qdrant. (README.md:5-14)

## 2) Services, Architecture, and Entry Points
- **Gateway (FastAPI)** boots DB tables, starts Redis relay tasks, and mounts routers for auth, trades, market, wallet, leaderboard, and RAG. (gateway/app/main.py:25-56)
- **Market engine (FastAPI)** initializes GBM stock states, starts a scheduler, and publishes ticks; docs are disabled. (market-engine/app/main.py:17-38)
- **Nginx reverse proxy** routes REST paths and WebSocket traffic to gateway and web, including WS upgrade headers. (infra/nginx/nginx.conf:6-66)
- **Docker Compose** wires services together and exposes ports; gateway and market-engine share Postgres + Redis; web depends on gateway. (infra/docker-compose.yml:1-84)

## 3) Tech Stack
**Backend (gateway):**
- FastAPI, SQLAlchemy (async), Alembic, Redis, asyncpg, bcrypt, jose, qdrant-client, OpenAI. (gateway/requirements.txt:1-13)

**Backend (market-engine):**
- FastAPI, SQLAlchemy (async), Redis, APScheduler, NumPy. (market-engine/requirements.txt:1-9)

**RAG ingestion pipeline:**
- PyMuPDF, sentence-transformers, qdrant-client, OpenAI, Pillow. (rag-ingestion/requirements.txt:1-7)

**Frontend:**
- Next.js 16, React 18, TypeScript, Tailwind CSS, Zustand, lightweight-charts. (web/package.json:1-28)

## 4) Data Model and Schema
**Gateway domain models (SQLAlchemy):**
- `users` (id, username, email, hashed_password, is_active, is_admin, created_at). (gateway/app/db/models.py:7-16)
- `wallets` (user_id, balance) with 1:1 relation to users. (gateway/app/db/models.py:18-23)
- `trades` (user_id, symbol, side, quantity, price, total, timestamp). (gateway/app/db/models.py:24-34)
- `positions` (user_id, symbol, quantity, avg_buy_price). (gateway/app/db/models.py:35-41)

**Migration confirms schema and indexes:**
- Users + wallets + trades + positions tables, with indexes on trade user/symbol/timestamp and position user_id. (gateway/app/db/migrations/001_init.py:7-47)

**Market-engine model:**
- `candle_history` (symbol, timestamp, open, high, low, close, volume). (market-engine/app/db/models.py:6-15)

## 5) Market Simulation and Data Flow
- GBM price steps are generated per symbol, with drift + volatility from stock profiles. (market-engine/app/stocks/gbm.py:5-27)
- Stock profiles (4 synthetic stocks) define base price, drift, volatility, and risk label. (market-engine/app/stocks/profiles.py:11-44)
- Candles are built using GBM + intraday bias and volatility multipliers. (market-engine/app/stocks/ohlcv_builder.py:8-32)
- Scheduler ticks every `tick_interval_seconds`, publishes to Redis, inserts candles, and trims history. (market-engine/app/scheduler.py:14-41)
- `publish_tick` writes to Redis and stores last close price for trades. (market-engine/app/pubsub/publisher.py:8-19)

## 6) API Layer (Gateway)
**Auth:**
- `/auth/register` and `/auth/login` issue JWT access tokens. (gateway/app/auth/router.py:7-39)
- Passwords are bcrypt hashed; JWTs use HS256 and `jwt_secret`. (gateway/app/auth/service.py:9-20)
- Auth dependencies validate JWTs and enforce admin access. (gateway/app/auth/deps.py:9-25)

**Market:**
- `/market/stocks` returns static metadata. (gateway/app/market/router.py:7-10)
- `/market/candles/{symbol}` returns candle history from DB. (gateway/app/market/router.py:11-20)
- Candle history uses SQL query on `candle_history`. (gateway/app/market/service.py:5-26)

**Trades and positions:**
- `/trade/` executes buy/sell with balance checks and position updates. (gateway/app/trades/router.py:12-34; gateway/app/trades/service.py:18-71)
- `/trade/positions` returns positions for the current user. (gateway/app/trades/router.py:24-33)
- `/trade/history` returns last 100 trades. (gateway/app/trades/router.py:35-58)

**Wallet:**
- `/wallet/` returns balance + realised P&L. (gateway/app/wallet/router.py:8-19; gateway/app/wallet/service.py:6-21)
- `/wallet/reset/me` and `/wallet/reset/all` reset balances; `/reset/all` is admin-gated. (gateway/app/wallet/router.py:20-31; gateway/app/wallet/service.py:22-36)

**Leaderboard:**
- `/leaderboard/` ranks users by realised P&L. (gateway/app/leaderboard/router.py:8-15; gateway/app/leaderboard/service.py:6-43)

**RAG / Chatbot:**
- `/rag/chat` is a stubbed response until RAG pipeline is wired. (gateway/app/rag/router.py:12-26)

## 7) Realtime WebSocket + Pub/Sub
- WebSocket endpoint `ws://.../ws/{symbol}` relays live candles to clients. (gateway/app/main.py:57-67)
- Redis relay subscribes to per-symbol channels and broadcasts to all connected sockets. (gateway/app/websocket/relay.py:9-20; gateway/app/websocket/connection_manager.py:6-33)

## 8) Environment and Configuration
**Gateway config defaults:**
- `jwt_secret` default is `"change-this-to-a-long-random-string"`. (gateway/app/config.py:4-9)
- Defaults include `database_url`, `redis_url`, `qdrant_url`, and `openai_api_key`. (gateway/app/config.py:4-12)

**Market-engine config defaults:**
- `tick_interval_seconds` and `candle_history_limit` are configurable via env. (market-engine/app/config.py:5-16)

**Compose wiring:**
- Services load `infra/.env` via `env_file` and set DB/Redis/Qdrant URLs. (infra/docker-compose.yml:35-83)

## 9) Setup & Operations
- Quick start: `cp infra/.env.example infra/.env` then `make dev`. (README.md:15-19)
- Wallet reset and ingestion commands are described in README. (README.md:21-29)
- Makefile defines `dev`, `prod`, `seed`, `reset`, and `load-test` targets. (Makefile:1-28)
- `scripts/seed_users.py` creates 20 test users with wallets. (scripts/seed_users.py:1-42)
- `scripts/reset_wallets.py` resets all balances and clears trades/positions. (scripts/reset_wallets.py:1-32)

## 10) Code Quality Notes, Risks, and Security Concerns
- **Potential data divergence:** `_tick` builds a candle and then `publish_tick` builds another candle for the same symbol, so DB inserts and Redis publishes may not match. (market-engine/app/scheduler.py:18-25; market-engine/app/pubsub/publisher.py:8-19)
- **Positions uniqueness not enforced:** `positions` model/migration lacks a unique constraint on `(user_id, symbol)`, increasing risk of duplicates under concurrent trades. (gateway/app/db/models.py:35-41; gateway/app/db/migrations/001_init.py:40-47)
- **Trade history returns wallet_balance=0:** The `/trade/history` response hardcodes `wallet_balance=0.0`. (gateway/app/trades/router.py:48-56)
- **JWT secret has a weak default value** in config; unsafe if `.env` is not populated. (gateway/app/config.py:4-9)
- **WebSocket endpoint is unauthenticated**; any client can subscribe by symbol. (gateway/app/main.py:57-67)
- **Admin UI auth redirect is commented out**, so any logged-out user can see the admin page UI (server still enforces admin). (web/src/app/admin/page.tsx:14-35)
- **Crowd influence module imports NumPy after usage**, which can raise `NameError` at runtime. (market-engine/app/crowd/influence.py:15-30)
- **CORS is pinned to localhost:3000** in gateway, which blocks non-local frontends unless changed. (gateway/app/main.py:44-49)

## 11) Missing / Incomplete Areas
- **RAG integration is incomplete**: API returns a hardcoded stub response, and Phase 5 ingestion is not wired yet. (gateway/app/rag/router.py:17-26; README.md:21-25)
- **Admin reset in UI expects a session management capability** but the server reset only changes wallets (no explicit trade/position clearing via API). (web/src/app/admin/page.tsx:44-73; gateway/app/wallet/service.py:30-36)

