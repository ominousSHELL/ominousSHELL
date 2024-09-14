#!/bin/bash

cp init/ominous-gen.sql init/backup/
docker exec -t ominous-gen-mysql mysqldump -u root -pominous-gen ominous_gen > init/ominous-gen.sql

