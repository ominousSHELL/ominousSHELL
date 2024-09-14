#!/bin/zsh

vared -p 'Confirm (y/N) ' -c choice

if [[ $choice == '' || $choice == 'n' ]]; then
	echo 'Cancelling...'
	exit

elif [[ $choice == 'y' ]]; then
	sed -i "s/tun0/eth0/g" /home/ominousshell/kali-build/roles/setup/configurations/zsh/files/prompt.sh
	sudo pkill -9 openvpn
	tmux kill-session
else
	echo 'Invalid input! Options are (y/n)'
fi
