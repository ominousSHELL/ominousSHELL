#!/bin/bash

if [[ $1 == '' ||  $2 == '' ]];then
	echo 'Usage: ssh-pass [HOST] [PASSWORD] [USER]'
	exit
fi

if [[ $3 == '' ]]; then
	user='root'
else
	user="$3"
fi

sshpass -p $2 ssh -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $user@$1

