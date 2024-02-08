run-dev:
	docker compose build
	docker compose watch

logs:
	docker compose logs -f

back-end-test-watch:
	docker compose exec back-end npm run test:watch

web-app-test-watch:
	docker compose exec web-app npm run test:watch

web-app-generate-graphql-types:
	cd web-app && npm run graphql-codegen