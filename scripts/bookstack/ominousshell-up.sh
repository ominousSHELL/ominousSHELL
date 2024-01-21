#!/bin/zsh

cd ~/ominousSHELL/bookstack
RUNNING_CONTAINERS=$(sudo docker ps -a -q | wc -l)
if [[ $RUNNING_CONTAINERS < 2 ]]; then
	sudo docker-compose up -d
	exit
fi

sudo cp -r /media/backup/Kali-Linux/bookstack/{bookstack_app_data,bookstack_db_data} ~/ominousSHELL/bookstack 2>/dev/null
sudo docker-compose start
