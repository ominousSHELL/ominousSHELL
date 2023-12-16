#!/bin/zsh


echo "Backing up 'ominousshell' database..."
sudo docker exec -it ominousshell-db mysqldump -u root -panonymous ominousshell > ~/ominousSHELL/projects/django/ominousshell/mysql/backups/ominousshell-db.sql

echo "Backing up 'ominousshell-db' docker image..."
sudo docker save -o "/media/backup/Kali-Linux/docker_containers/ominousshell-db.tar" ominousshell-db

echo "Backing up 'ominousshell-django' docker image..."
sudo docker save -o "/media/backup/Kali-Linux/docker_containers/ominousshell-django.tar" ominousshell-django
