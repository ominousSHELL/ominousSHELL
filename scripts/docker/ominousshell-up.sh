#!/bin/zsh

cd ~/ominousSHELL/bookstack
sudo mv /media/backup/Kali-Linux/bookstack/{bookstack_app_data,bookstack_db_data} ~/ominousSHELL/bookstack 2>/dev/null

if [[ $? == 1 ]]; then
	sudo docker-compose up -d
	exit
fi

sudo docker-compose start
