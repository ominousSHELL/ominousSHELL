#!/bin/zsh
#Initialize directories
mkdir {recon,scanning,exploit,www} 2>/dev/null
cp ~/ominousSHELL/bg/start.sh "$(pwd)/recon/"

#WINDOW DEFINTION
tmux new-session -n SERVERS -c "$(pwd)/www/" -d
tmux new-window -n MSF
tmux new-window -n RECON -c "$(pwd)/recon/"
tmux new-window -n 'SCANNING[1]' -c "$(pwd)/scanning/"
tmux new-window -n 'SCANNING[2]' -c "$(pwd)/scanning/"
tmux new-window -n 'EXPLOIT[1]' -c "$(pwd)/exploit/"
tmux new-window -n 'EXPLOIT[2]' -c "$(pwd)/exploit/"
sleep 2.5

#SERVER
tmux select-window -t 0
tmux split-window -v -c "$(pwd)/www/"
tmux split-window -hv -c "$(pwd)/www/"
tmux send-keys -t 0 $'python -m http.server 8000\n'
tmux resize-pane -t 2 -x 60 -y 0
#MSF
tmux send-keys -t 0:1.0 $'msfconsole\n'
#RECON
tmux select-window -t 2
tmux split-window -v -c "$(pwd)/recon/"
#SCANNING
tmux select-window -t 3
tmux split-window -v -c "$(pwd)/scanning/"
#EXPLOIT

tmux select-window -t 2
tmux attach-session

