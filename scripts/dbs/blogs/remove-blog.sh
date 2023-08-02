#!/bin/zsh

if [[ $1 == "" ]];then
	echo "Usage: remove-blog [ID]"
	exit
fi

mysql -u root -panonymous ominousBlog\
	-e "SELECT * FROM blogs WHERE ID=$1\\G"

echo "\nConfirm (y/n)" ;read choice
if [[ $choice == "y" ]]; then
	mysql -u root -panonymous ominousBlog\
		-e "DELETE FROM blogs WHERE ID=$1"
fi

