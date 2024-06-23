#!/bin/zsh

if [[ $1 == '' ]];then
	echo 'Usage: nmapVERSIONS-tcp [INITIAL OUTPUT FILE]'
	exit
fi

initial_outfile=`python -c "print('$1' + '.ALL-TCP.nmap')"`
host=`cat $initial_outfile | head -1 | awk '{print $21}'`
initial_outfile_ports=`python -c "print('$1' + '.ALL-TCP.open-ports')"`
outfile=`python -c "print('$1' '.VERSIONS-TCP')"` 
nmap $host -sT -sC -sV -Pn --version-all -T4 -oA $outfile -p$(cat $initial_outfile_ports)
