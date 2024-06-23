#!/bin/zsh

if [[ $1 == '' || $2 == '' ]]; then
	echo "Usage: add-host [IP ADDRESS] [HOSTNAME]"
	exit
fi

echo "$1 $2" | sudo tee -a /etc/hosts
