#!/bin/bash

if [[ $1 == '' ||  $2 == '' || $3 == '' ]];then
	echo 'Usage: ssh-pass [USER] [PASSWORD] [HOST]'
	exit
fi

sshpass -p $2 -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $1@$3


