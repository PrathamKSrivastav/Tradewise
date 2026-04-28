dev:
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.dev.yml up --build

prod:
	docker compose -f infra/docker-compose.yml up --build -d

ingest:
	cd rag-ingestion && python ingest.py

reset:
	python scripts/reset_wallets.py

seed:
	python scripts/seed_users.py

load-test:
	python scripts/load_test.py

down:
	docker compose -f infra/docker-compose.yml down
