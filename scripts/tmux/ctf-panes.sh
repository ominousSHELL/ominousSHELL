#!/bin/zsh
if [[ $1 == '' || $2 == '' ]]; then
	echo '[+] Syntax: hacking [platform] [name]'
	exit
fi

#Initialize directories
mkdir ~/es/ctf/htb/$1/$2 2>/dev/null
cd ~/es/ctf/$1/$2
mkdir {recon,scanning,exploit,www} 2>/dev/null
cp ~/ominousSHELL/bg/start.sh ~/es/ctf/$1/$2/recon/

#WINDOW DEFINTION
tmux new-session -n SERVERS -c ~/es/ctf/$1/$2/www/ -d
tmux new-window -n MSF
tmux new-window -n RECON -c ~/es/ctf/$1/$2/recon/
tmux new-window -n 'SCANNING[1]' -c ~/es/ctf/$1/$2/scanning/
tmux new-window -n 'SCANNING[2]' -c ~/es/ctf/$1/$2/scanning/
tmux new-window -n 'EXPLOIT[1]' -c ~/es/ctf/$1/$2/exploit/
tmux new-window -n 'EXPLOIT[2]' -c ~/es/ctf/$1/$2/exploit/
sleep 2.5

#SERVER
tmux select-window -t 0
tmux split-window -v -c ~/es/ctf/$1/$2/www/
tmux split-window -hv -c ~/es/ctf/$1/$2/www/
tmux send-keys -t 0 $'python -m http.server 8000\n'
tmux resize-pane -t 2 -x 60 -y 0
#MSF
tmux send-keys -t 0:1.0 $'msfconsole\n'
#RECON
tmux select-window -t 2
tmux split-window -v -c ~/es/ctf/$1/$2/recon/
#SCANNING
tmux select-window -t 3
tmux split-window -v -c ~/es/ctf/$1/$2/scanning/
#EXPLOIT

tmux select-window -t 2
tmux attach-session

