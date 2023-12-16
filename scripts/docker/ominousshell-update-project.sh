#!/bin/zsh


echo "Updating 'ominousshell-django' docker image with new source code..."
cd ~/ominousSHELL/projects/django/ominousshell/
sudo docker build -t ominousshell-django .

