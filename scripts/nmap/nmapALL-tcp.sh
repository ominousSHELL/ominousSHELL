#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: nmapALL-tcp [IP] [OUTFILE]'
	exit
fi

outfile=`python -c "print('$2' + '.ALL-TCP')"`

nmap $1 --unprivileged -sT -p- -Pn -T5 -min-rate=10000 -v -oN $outfile
grep '/tcp' $outfile |awk -F/ '{print $1}' > port;for i in $(cat port);do printf "$i," >> ports;done
rm port
