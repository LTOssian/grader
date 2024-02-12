# bring up the services
up-prod:
	docker-compose up -d

up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# bring down the services
down:
	docker-compose down

# build the images defined in the compose file
build:
	docker-compose build

# views logs from the services
logs:
	docker-compose logs -f