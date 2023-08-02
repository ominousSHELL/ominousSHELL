#!/bin/zsh
echo -e "Restoring backup..."
mysql -u root -panonymous \
	-e "CREATE DATABASE ominousBlog"
mysql -u root -panonymous ominousBlog < ~/ominousSHELL/ominousBlog/backup/db/backup.sql
if [[ $? == 0 ]]; then
	echo -e "Done"
fi
