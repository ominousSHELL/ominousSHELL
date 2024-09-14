#!/bin/bash

echo "Setting up productivity environment on remote host..."
echo "-----------------------------------------------------"
echo ""

#COLORS
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"
reset="\033[0m"

function abort_msg(){
	printf "$red[-] Aborting...\n"
}

#Check if cURL is installed
which curl >/dev/null 2>&1
if [[ $? == 0 ]];then
	curl_installed=true
else
	curl_installed=false
fi
#Check if wget is installed
which wget >/dev/null 2>&1
if [[ $? == 0 ]];then
	wget_installed=true
else
	wget_installed=false
fi


function setup_zsh(){
	which zsh >/dev/null 2>&1
	if [[ $? == 0 ]]; then
		if [[ curl_installed ]];then
			RESPONSE=$(curl -sS http://127.0.0.1:8000/ominous-kit/ominous-setup/zsh/.zshrc -o /tmp/zsh-config.sh 2>/dev/null 2>&1)
			if [[ $? == 0 ]]; then
				printf "$green[+] Done!\n$reset"
				printf "$green[+] Run 'source /tmp/zsh-config.sh'!\n$reset"
			else
				printf "$red[+] Error: $RESPONSE\n$reset"
			fi
		elif [[ wget_installed ]];then
			RESPONSE=$(wget  http://127.0.0.1:8000/ominous-kit/ominous-setup/zsh/.zshrc -O /tmp/zsh-config.sh 2>/dev/null 2>&1)
			if [[ $? == 0 ]]; then
				printf "$green[+] Done!\n$reset"
				printf "$green[+] Run 'source /tmp/zsh-config.sh'!\n$reset"
			else
				printf "$red[+] Error: $RESPONSE\n$reset"
			fi
		else
			printf "$red[-] cURL or wget is not installed!\n$reset"
			abort_msg
		fi

	else
		printf "$red[-] zsh is not installed!\n"
		abort_msg
	fi
}

function setup_vim(){
	which vim >/dev/null 2>&1
	if [[ $? == 0 ]]; then
		if [[ curl_installed ]];then
			RESPONSE=$(curl -sS http://127.0.0.1:8000/ominous-kit/ominous-setup/vim/.vimrc -o ~/.vimrc 2>/dev/null 2>&1)
			if [[ $? == 0 ]]; then
				printf "$green[+] Done!\n$reset"
			else
				printf "$red[+] Error: $RESPONSE\n$reset"
			fi
		elif [[ wget_installed ]];then
			RESPONSE=$(wget  http://127.0.0.1:8000/ominous-kit/ominous-setup/vim/.vimrc -O ~/.vimrc 2>/dev/null 2>&1)
			if [[ $? == 0 ]]; then
				printf "$green[+] Done!\n$reset"
			else
				printf "$red[+] Error: $RESPONSE\n$reset"
			fi
		else
			printf "$red[-] cURL or wget is not installed!\n$reset"
			abort_msg
		fi	
	else
		printf "$red[-] vim is not installed\n$reset"
		abort_msg
	fi
}



printf "$blue[1/2] Attempting to setup zsh environment...\n$reset"
setup_zsh

printf "$blue[2/2] Attempting to setup vim environment...\n$reset"
setup_vim


