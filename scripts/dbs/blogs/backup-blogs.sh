#!/bin/zsh

echo -e "Creating database backup file $1..."
mysqldump -u root -panonymous ominousBlog > ~/ominousSHELL/ominousBlog/backup/db/backup.sql
if [[ $? == 0 ]]; then
	echo -e "Done"
fi
