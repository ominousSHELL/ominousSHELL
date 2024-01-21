#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: nmapALL-udp [HOST] [OUTPUT FILE]'
	exit
fi

outfile=`python -c "print('$2' + '.ALL-UDP')"`

mkdir udp
cd udp

nmap $1 -sU -p- -Pn -T5 -min-rate=10000 -v -oA $outfile
grep 'open' $outfile.nmap |awk -F/ '{print $1}' > tmp;for i in $(cat tmp);do printf "$i," >> $outfile.open-ports;done
rm tmp
