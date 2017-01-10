#! /bin/bash

# fix inconsistent docker env var name
export NODE_ENV="dev"
export LIBRARY_UPDATER_DB_URL=${DATABASE_1_PORT_27017_TCP_ADDR}
export LIBRARY_UPDATER_DB_PORT=${DATABASE_1_PORT_27017_TCP_PORT}
export LIBRARY_UPDATER_DB_NAME="library_updater"

#Run a command
$1
