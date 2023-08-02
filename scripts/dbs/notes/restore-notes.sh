#!/bin/zsh

echo -e "\e[1;34mRestoring backup..."
mysql -u root -panonymous \
	-e "CREATE DATABASE ominousNotes"
mysql -u root -panonymous ominousNotes < ~/ominousSHELL/ominousBlog/backup/db/backup.sql
if [[ $? == 0 ]]; then
	echo -e "Done"
fi
