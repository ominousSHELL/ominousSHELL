#!/bin/bash

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: ssh-key [HOST] [PASSWORD]'
	exit
fi
echo "sshpass -p $2 ssh -o GlobalKnownHostsFile=/dev/null -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no root@$1"

