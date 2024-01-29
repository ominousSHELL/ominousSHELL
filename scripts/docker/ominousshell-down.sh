#!/bin/zsh

cd ~/ominousSHELL/bookstack
sudo docker-compose stop
sudo mv ~/ominousSHELL/bookstack/{bookstack_app_data,bookstack_db_data} /media/backup/Kali-Linux/bookstack

