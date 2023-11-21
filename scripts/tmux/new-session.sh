#!/bin/zsh
tmux new-session -d -s session "zsh -l"
tmux send-keys -t session "source ~/.zshrc;clear" C-m
sleep 0.2
tmux attach-session -t session
