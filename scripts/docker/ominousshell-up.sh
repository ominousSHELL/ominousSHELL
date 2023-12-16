#!/bin/zsh


RUNNING_CONTAINERS=$(sudo docker ps -a -q | wc -l)
if [[ $RUNNING_CONTAINERS == 0 ]]; then
	echo "Starting ominousshell for the first time..."
	sudo docker run --name='ominousshell-db' -p 33006:3306 -dt ominousshell-db
	sleep 10
	sudo docker run --name='ominousshell-django' -p 2000:2000 -dt ominousshell-django
	exit
fi

echo "Starting ominousshell..."
sudo docker start ominousshell-db && sleep 5 && sudo docker start ominousshell-django
