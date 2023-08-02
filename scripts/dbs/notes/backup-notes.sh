#!/bin/zsh
echo -e "Creating database backup file..."
mysqldump -u root -panonymous ominousNotes > ~/ominousSHELL/ominousBlog/backup/db/backup.sql
if [[ $? == 0 ]]; then
	echo -e "Done"
fi
