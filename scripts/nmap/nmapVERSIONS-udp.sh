#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: nmapVERSIONS-udp [IP] [OUTFILE]' 
	exit
fi

outfile=`python -c "print('$2' + '.VERSIONS-UDP')"`
nmap $1 --unprivileged -sU -sC -sV -Pn --version-all -T5 -oN $outfile -p$(cat ports)
rm ports
