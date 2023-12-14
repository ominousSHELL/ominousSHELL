#!/bin/zsh


if [[ $1 == "" ]]; then
	echo "Usage: ./createsheet.sh [cheatsheet]"
	exit
fi

cat $1 | tr "\`" " " | awk -F\| '{gsub($2, "<td style=\"font-size: 0.8rem\" class=\"text-info\">"$2"</td>"); print $2; gsub($3, "<td style=\"font-size: 0.8rem\" class=\"text-white-50\">"$3"</td>"); print$3; print ""}'
