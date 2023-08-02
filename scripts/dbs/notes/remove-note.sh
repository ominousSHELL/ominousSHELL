#!/bin/zsh

if [[ $1 == "" ]];then
	echo "Usage: remove-note [ID]"
	exit
fi

mysql -u root -panonymous ominousNotes\
	-e "SELECT * FROM notes WHERE ID=$1\\G"

echo "\nConfirm (y/n)" ;read choice
if [[ $choice == "y" ]]; then
	mysql -u root -panonymous ominousNotes\
		-e "DELETE FROM notes WHERE ID=$1"
fi

