#!/bin/bash

# help #
help:
	@echo "\033[32mAvailable commands\033[0m"
	@echo "\033[33mLibrary Updater\033[0m"
	@echo "- \033[1mlibrary-updater-run:\033[0m Run library-updater"
	@echo "\033[33mDocker compose\033[0m"
	@echo "- \033[1mcmp-up:\033[0m Up containers"
	@echo "- \033[1mcmp-pull:\033[0m Update containers"
	@echo "- \033[1mcmp-stop:\033[0m Stop containers"
	@echo "\033[33mMongoDB\033[0m"
	@echo "- \033[1mmongo-connect:\033[0m Open mongodb term (container must be already run)"
	@echo ""

# library-updater #
library-updater-run:
	docker-compose run --rm --service-ports library-updater npm run update ./

# docker-compose #
cmp-up:
	docker-compose up -d

cmp-pull:
	docker-compose pull

cmp-stop:>
	docker-compose stop

# mongodb #
mongo-run:
	docker-compose run --rm --service-ports database

mongo-connect:
	docker exec -t -i database
