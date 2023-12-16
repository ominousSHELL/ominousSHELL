#!/bin/zsh

echo "Restoring 'ominousshell' project..."
sudo docker load -i /media/backup/Kali-Linux/docker_containers/ominousshell-db.tar
sudo docker load -i /media/backup/Kali-Linux/docker_containers/ominousshell-django.tar
