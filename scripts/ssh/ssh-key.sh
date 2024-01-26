#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: ssh-key [USER] [FILE] [HOST]'
	exit
fi

ssh -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i $2 $1@$3
