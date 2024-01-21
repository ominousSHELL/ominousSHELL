#!/bin/python
import os
import sys
import time


if len(sys.argv) < 2:
    print('Usage: timer [min]')
    exit()

duration = int(sys.argv[1]) * 60
while duration >= 0:
    #Calculate minutes and seconds
    minutes, seconds = divmod(duration, 60)
    Timer = f"{minutes}m : {seconds:02d}s"
    #Tmux Status Bar
    os.system("tmux set-option -g status-right-style 'fg=black underscore'")
    os.system(f"tmux set-option -g status-right '{Timer}'")
    #Substract 1 second
    duration -= 1
    time.sleep(0.9)

os.system(f"tmux set-option -g status-right 'GAMEOVER!'")
time.sleep(60)
os.system(f"tmux set-option -g status-right ''")

