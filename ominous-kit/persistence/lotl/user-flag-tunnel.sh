#!/bin/bash


#COLORS
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"

#Initialize variables
ip=$(ip addr | grep lo$ | awk '{print $2}' | cut -d / -f 1)
uid=$(id -un)

function user-flag-tunnel(){
	bash -c "printf \"$green USER FLAG : $id : $uid : $ip : $user \n\" > /dev/tcp/127.0.0.1/9999" 2>/dev/null
}

type -fp watch 1>/dev/null
if [[ $? == 0 ]]; then
	id=0
	while true; do
		nohup watch -gn 1 'cat /opt/flag.txt' 1>/dev/null 2>/dev/null
		if [[ $? == 0 ]]; then
			user=$(cat /opt/flag.txt)
			user-flag-tunnel
			id=$((id + 1))
		fi
	done&disown

else
	for id in {1..100}; do
		user=$(cat /opt/flag.txt 2>/dev/null)
		user-flag-tunnel
		sleep 30
	done&disown
fi



