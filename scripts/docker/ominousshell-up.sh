#!/bin/zsh

sudo mv /media/backup/Kali-Linux/bookstack/bookstack* ~/ominousSHELL/bookstack
cd ~/ominousSHELL/bookstack
sudo docker-compose start

if [[ $? == 1 ]]; then
	sudo docker-compose up -d
fi
