#!/bin/zsh
#Initialize directories
temp_dir=$(mktemp -d)
temp_name=$(echo $temp_dir |grep -o 'tmp.*'| awk -F / '{print $2}')
mkdir -p $temp_dir/www 
mkdir -p $temp_dir/defense
mkdir -p $temp_dir/recon
mkdir -p $temp_dir/scanning
mkdir -p $temp_dir/exploit
sudo mv $temp_dir '/home/ominousshell/es/HTB/bg/'

cp ~/ominousSHELL/scripts/bg/start.sh "/home/ominousshell/es/HTB/bg/$temp_name/recon/"

#WINDOW DEFINITION
tmux new-session -n 'SERVERS' -c /home/ominousshell/es/HTB/bg/$temp_name/www -d 
tmux new-window -n 'DEFENSE[1]' -c /home/ominousshell/es/HTB/bg/$temp_name/defense
tmux new-window -n 'DEFENSE[2]' -c /home/ominousshell/es/HTB/bg/$temp_name/defense
tmux new-window -n 'MSF' -c /home/ominousshell/es/HTB/bg/$temp_name/exploit
tmux new-window -n 'RECON' -c /home/ominousshell/es/HTB/bg/$temp_name/recon/
tmux new-window -n 'SCANNING[1]' -c /home/ominousshell/es/HTB/bg/$temp_name/scanning/
tmux new-window -n 'SCANNING[2]' -c /home/ominousshell/es/HTB/bg/$temp_name/scanning/
tmux new-window -n 'EXPLOIT[1]' -c /home/ominousshell/es/HTB/bg/$temp_name/exploit/
tmux new-window -n 'EXPLOIT[2]' -c /home/ominousshell/es/HTB/bg/$temp_name/exploit/

#PANES
#SERVER
cd /home/ominousshell/es/HTB/bg/$temp_name/www
tmux select-window -t 0
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
#DEFENSE
cd /home/ominousshell/es/HTB/bg/$temp_name/defense
#MSF
#RECON
cd /home/ominousshell/es/HTB/bg/$temp_name/recon
tmux select-window -t 4
tmux split-window -v
#SCANNING
cd /home/ominousshell/es/HTB/bg/$temp_name/scanning
tmux select-window -t 5
tmux split-window -vb 
#EXPLOIT
cd /home/ominousshell/es/HTB/bg/$temp_name/exploit

sleep 3

#COMMANDS
#SERVER
#tmux send-keys -t 0:0.2 $'python3 -m http.server 8000\n'
tmux send-keys -t 0:0.2 $'w-server-80\n'
#DEFENSE
#MSF
tmux send-keys -t 0:3.0 $'msfconsole\n'
#RECON

#SCANNING

tmux select-window -t 4
tmux select-pane -t 0
tmux attach-session
