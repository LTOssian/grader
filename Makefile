# bring up the services
up-prod:
	docker-compose --project-name grader_prod up -d

up-dev:
	docker-compose --project-name grader_dev -f docker-compose.yml -f docker-compose.dev.yml up -d

# bring down the services
down-prod:
	docker-compose -p grader_prod down
down-dev:
	docker-compose -p grader_dev down

# views logs from the services
logs-dev:
	docker-compose -p grader_dev logs -f grader_backend grader_frontend grader_db