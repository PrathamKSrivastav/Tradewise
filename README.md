# Tradewise Platform

Educational Indian stock market simulator. No real money, no real data.

## Services
| Service | Port | Description |
|---------|------|-------------|
| market-engine | 8001 | GBM tick generator + Redis publisher |
| gateway | 8000 | User API + WebSocket relay |
| web | 3000 | Next.js frontend |
| postgres | 5432 | Persistent data |
| redis | 6379 | Pub/sub bus |
| qdrant | 6333 | Vector DB for RAG |

## Quick start
```bash
cp infra/.env.example infra/.env   # fill in secrets
make dev
```

## Ingest books (Phase 5)
Drop PDFs into rag-ingestion/books/ then run:
```bash
make ingest
```

## Reset wallets for a new session
```bash
make reset
```
