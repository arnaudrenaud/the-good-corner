run-dev:
	docker compose build
	docker compose watch

logs-dev:
	docker compose logs -f

run-prod:
	docker compose -f docker-compose.prod.yml up --build --detach

logs-prod:
	docker compose -f docker-compose.prod.yml logs -f

back-end-test-watch:
	docker compose exec back-end npm run test:watch

web-app-test-watch:
	docker compose exec web-app npm run test:watch

web-app-generate-graphql-types:
	cd web-app && npm run graphql-codegen

database-generate-migration:
	docker compose exec back-end npm run migration:generate
	docker compose cp back-end:/app/src/database/migrations/ back-end/src/database

database-backup:
	docker compose exec database pg_dumpall -c -U postgres > ./db-dumps/pg_`date +%Y-%m-%d"_"%H-%M-%S`.sql
	rclone sync db-dumps "Google Drive":the-good-corner-db-dumps