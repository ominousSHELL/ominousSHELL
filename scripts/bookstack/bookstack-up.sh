#!/bin/zsh

cd ~/ominousSHELL/bookstack
RUNNING_CONTAINERS=$(sudo docker ps -a -q | wc -l)
if [[ $RUNNING_CONTAINERS < 2 ]]; then
	sudo docker build -t ominousshell-bookstack .
	sudo docker run -p 2000:2000 --name=ominousshell-bookstack -dit ominousshell-bookstack
	exit
fi
sudo docker run -p 2000:2000 --name=ominousshell-bookstack -dit ominousshell-bookstack
