#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: nmapVERSIONS-tcp [IP] [OUTFILE]' 
	exit
fi

outfile=`python -c "print('$2' + '.VERSIONS-TCP')"`
nmap $1 --unprivileged -sT -sC -sV -Pn --version-all -T5 -oN $outfile -p$(cat ports)
rm ports
