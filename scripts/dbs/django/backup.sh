#!/bin/zsh

echo -e "Creating database backup file $1..."
mysqldump -u root -panonymous ominousdb > ~/ominousSHELL/ominousdjango/backup.sql
if [[ $? == 0 ]]; then
	echo -e "Done"
fi
