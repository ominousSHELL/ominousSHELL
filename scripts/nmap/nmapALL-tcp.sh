#!/bin/zsh

if [[ $1 == '' || $2 == '' ]];then
	echo 'Usage: nmapALL-tcp [HOST] [OUTPUT FILE]'
	exit
fi

outfile=`python -c "print('$2' + '.ALL-TCP')"`

mkdir tcp
cd tcp
sudo nmap $1 -sT -p- -Pn -T4 -min-rate=1000 -v -oA $outfile
grep 'open' $outfile.nmap |awk -F/ '{print $1}' > tmp;for i in $(cat tmp);do printf "$i," >> $outfile.open-ports;done
rm tmp
