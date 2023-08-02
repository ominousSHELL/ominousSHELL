#!/bin/zsh

if [[ $1 == "" || $2 == "" || $3 == "" || $4 == ""|| $5 == "" ]]; then
	echo "Usage: add-blog [TITLE] [CATEGORY] [DATE] [FILE] [DESCRIPTION]"
	exit
fi

mysql -u root -panonymous ominousBlog \
-e "insert into blogs (title, category, date, file, description) values ('$1', '$2', '$3', '$4', '$5')"
