# Tradewise Makefile

# Simple startup
dev:
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.dev.yml up --build

prod:
	docker compose -f infra/docker-compose.yml up --build -d

# Stop services
down:
	docker compose -f infra/docker-compose.yml down

down-v:
	docker compose -f infra/docker-compose.yml down -v

# Utility
seed:
	cd gateway && venv/Scripts/python ../scripts/seed_users.py

reset:
	cd gateway && venv/Scripts/python ../scripts/reset_wallets.py --confirm

ingest:
	cd rag-ingestion && ../gateway/venv/Scripts/python ingest.py

# Logging
logs-engine:
	docker compose -f infra/docker-compose.yml logs -f market-engine

logs-gateway:
	docker compose -f infra/docker-compose.yml logs -f gateway

logs-web:
	docker compose -f infra/docker-compose.yml logs -f web
