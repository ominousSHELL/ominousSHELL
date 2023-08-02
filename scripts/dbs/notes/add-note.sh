#!/bin/zsh

if [[ $1 == "" || $2 == "" || $3 == "" || $4 == ""|| $5 == ""|| $6 == "" ]]; then
	echo "Usage: add-note [PLATFORM] [MACHINE] [DIFFICULTY] [TYPE] [DATE] [FILE] [DESCRIPTION]"
	exit
fi

mysql -u root -panonymous ominousNotes \
-e "insert into notes (platform, machine, difficulty, type, date, file, description) values ('$1', '$2', '$3', '$4', '$5', '$6', '$7')"
