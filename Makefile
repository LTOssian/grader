# bring up the services
up:
	docker-compose up -d

# bring down the services
down:
	docker-compose down

# build the images defined in the compose file
build:
	docker-compose build

# views logs from the services
logs:
	docker-compose logs -f