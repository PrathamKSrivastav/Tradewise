dev:
	docker compose -f infra/docker-compose.yml -f infra/docker-compose.dev.yml up --build

prod:
	docker compose -f infra/docker-compose.yml up --build -d

down:
	docker compose -f infra/docker-compose.yml down

down-v:
	docker compose -f infra/docker-compose.yml down -v

seed:
	cd gateway && python ../scripts/seed_users.py

reset:
	cd gateway && python ../scripts/reset_wallets.py --confirm

load-test:
	cd gateway && python ../scripts/load_test.py --duration 30

logs-engine:
	docker compose -f infra/docker-compose.yml logs -f market-engine

logs-gateway:
	docker compose -f infra/docker-compose.yml logs -f gateway

logs-web:
	docker compose -f infra/docker-compose.yml logs -f web