#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: ssh-key [HOST] [KEY FILE] [USER]'
	exit
fi

if [[ $3 == '' ]]; then
	user='root'
else
	user=$3
fi

ssh -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i $2 $user@$1
