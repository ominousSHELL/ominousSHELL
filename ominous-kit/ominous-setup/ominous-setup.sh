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
function setup_zsh(){
	which zsh >/dev/null 2>&1
	if [[ $? == 0 ]]; then
		which curl >/dev/null 2>&1
		if [[ $? == 0 ]]; then
			curl -sS http://127.0.0.1/ominous-setup/zsh/.zshrc > /tmp/zsh-config.sh
			if [[ $? == 0 ]]; then
				printf "$green[+] Done!\n$reset"
				printf "$green[+] Run 'source /tmp/zsh-config.sh'!\n$reset"
			else
				printf "$red[+] Error occured!\n$reset"
			fi
		else
			which wget >/dev/null 2>&1
			if [[ $? == 0 ]]; then
				wget -q0- http://127.0.0.1/ominous-setup/zsh/.zshrc > /tmp/zsh-config.sh 
				if [[ $? == 0 ]]; then
					printf "$green[+] Done!\n$reset"
					printf "$green[+] Run 'source /tmp/zsh-config.sh'!\n$reset"
				else
					printf "$red[+] Error occured!\n$reset"
				fi
			else
				printf "$red[-] cURL or wget is not installed!\n$reset"
				abort_msg
			fi	
		fi

	else
		printf "$red[-] zsh is not installed!\n"
		abort_msg
	fi
}

function setup_vim(){
	which vim >/dev/null 2>&1
	if [[ $? == 0 ]]; then
		which curl >/dev/null 2>&1
		if [[ $? == 0 ]]; then
			curl -sS http://127.0.0.1/ominous-setup/vim/.vimrc > /tmp/vimrc
			if [[ $? == 0 ]]; then
				printf "$green[+] Done!\n$reset"
			else
				printf "$red[+] Error occured!\n$reset"
			fi
		else
			which wget >/dev/null 2>&1
			if [[ $? == 0 ]]; then
				wget -q0- http://127.0.0.1/ominous-setup/vim/.vimrc > /tmp/vimrc
				if [[ $? == 0 ]]; then
					printf "$green[+] Done!\n$reset"
				else
					printf "$red[+] Error occured!\n$reset"
				fi
			else
				printf "$red[-] cURL or wget is not installed!\n$reset"
				abort_msg
			fi	
		fi
	else
		printf "$red[-] vim is not installed\n$reset"
		abort_msg
	fi
}



echo "[1/2] Attempting to setup zsh environment..."
setup_zsh

echo "[2/2] Attempting to setup vim environment..."
setup_vim


