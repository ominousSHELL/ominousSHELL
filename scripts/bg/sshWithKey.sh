#!/bin/zsh

if [[ $1 == '' || $2 == '' || $3 == '' ]];then
	echo 'Usage: ssh-key [FILE] [USER] [HOST]'
	exit
fi

echo "ssh -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i $1 $2@$3"
