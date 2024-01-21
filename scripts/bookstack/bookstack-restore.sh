#!/bin/zsh

echo "Restoring '/config' directory of 'ominousshell-bookstack' and 'ominousshell-bookstack_db' to docker container..."
sudo cp -r /media/backup/Kali-Linux/bookstack/backup/{bookstack_app_data,bookstack_db_data} ~/ominousSHELL/bookstack/
sudo chown -R ominousshell:ominousshell ~/ominousSHELL/bookstack/

echo "Restoring 'ominousshell' database to docker container..."
sudo docker exec -i ominousshell-bookstack_db mysql -u bookstack -pominousshell ominousshell < /media/backup/Kali-Linux/bookstack/backup/ominousshell.sql

echo "Restoring '/app' data directory to docker container..."
sudo docker exec -i ominousshell-bookstack rm -rf /app
sudo docker cp /media/backup/Kali-Linux/bookstack/backup/app ominousshell-bookstack:/

~/ominousSHELL/scripts/bookstack/ominousshell-restart.sh


