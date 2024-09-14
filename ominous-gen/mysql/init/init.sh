#!/bin/bash

# Define variables
DB_USER="root"
DB_PASSWORD="ominous-gen"
DB_NAME="ominous_gen"
SQL_FILE="/docker-entrypoint-initdb.d/ominous-gen.sql"

echo "[1/1] Restoring database from $SQL_FILE..."
mysql -u "$DB_USER" --password="$DB_PASSWORD" "$DB_NAME" < "$SQL_FILE"
echo "Done"
