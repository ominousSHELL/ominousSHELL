#!/bin/zsh
#Initialize directories
temp_dir=$(mktemp -d)
temp_name=$(echo $temp_dir |grep -o 'tmp.*'| awk -F / '{print $2}')
mkdir $temp_dir/www 
mkdir $temp_dir/defense
mkdir $temp_dir/recon
mkdir $temp_dir/scanning
mkdir $temp_dir/exploit
mv $temp_dir ~

#WINDOW DEFINITION
tmux new-session -En 'SERVERS' -c ~/$temp_name/www -d 
tmux new-window -n 'DEFENSE[1]' -c ~/$temp_name/defense
tmux new-window -n 'DEFENSE[2]' -c ~/$temp_name/defense
tmux new-window -n 'MSF' -c ~/$temp_name/exploit
tmux new-window -n 'RECON' -c ~/$temp_name/recon/
tmux new-window -n 'SCANNING[1]' -c ~/$temp_name/scanning/
tmux new-window -n 'SCANNING[2]' -c ~/$temp_name/scanning/
tmux new-window -n 'EXPLOIT[1]' -c ~/$temp_name/exploit/
tmux new-window -n 'EXPLOIT[2]' -c ~/$temp_name/exploit/

#PANES
#SERVER
cd ~/$temp_name/www
tmux select-window -t 0
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
#DEFENSE
cd ~/$temp_name/defense
#MSF
#RECON
cd ~/$temp_name/recon
tmux select-window -t 4
tmux split-window -v
#SCANNING
cd ~/$temp_name/scanning
tmux select-window -t 5
tmux split-window -vb 
#EXPLOIT
cd ~/$temp_name/exploit

sleep 3

#COMMANDS
#SERVER
tmux send-keys -t 0:0.2 $'python3 -m http.server 8000\n'
#DEFENSE
#MSF
tmux send-keys -t 0:3.0 $'msfconsole\n'
#RECON

#SCANNING

tmux select-window -t 4
tmux select-pane -t 0
tmux attach-session
