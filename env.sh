#!/bin/bash

set -a
source .env
cat ${COMPOSE_CONFIG}
sudo docker-compose -f ${COMPOSE_CONFIG} down
sudo docker-compose -f ${COMPOSE_CONFIG} -p "topcs" up --build -d