#!/bin/zsh

cd ~/ominousSHELL/bookstack
sudo cp -r {bookstack_app_data,bookstack_db_data} /media/backup/Kali-Linux/bookstack/
sudo rm -rf {bookstack_app_data,bookstack_db_data} 
sudo docker-compose stop

