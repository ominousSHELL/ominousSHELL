#!/bin/zsh

vared -p 'Confirm (y/N) ' -c choice

if [[ $choice == '' || $choice == 'n' ]]; then
	echo 'Cancelling...'
	exit

elif [[ $choice == 'y' ]]; then
	tmux kill-session
else
	echo 'Invalid input! Options are (y/n)'
fi
