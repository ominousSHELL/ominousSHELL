#!/bin/zsh

if [[ $1 == '' ]];then
	echo 'Usage: nmapVERSIONS-udp [INITIAL OUTPUT FILE]'
	exit
fi


initial_outfile=`python -c "print('$1' + '.ALL-UDP.nmap')"`
host=`cat $initial_outfile | head -1 | awk '{print $21}'`
initial_outfile_ports=`python -c "print('$1' + '.ALL-UDP.open-ports')"`
outfile=`python -c "print('$1' '.VERSIONS-UDP')"` 
nmap $host -sU -sC -sV -Pn --version-all -T5 -oA $outfile -p$(cat $initial_outfile_ports)
