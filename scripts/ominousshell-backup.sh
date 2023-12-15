#!/bin/zsh

BACKUP_DIR=/media/backup/

echo "Backing up 'ominousSHELL' to SSD..."
sudo cp -r ~/ominousSHELL $BACKUP_DIR

echo "Backing up 'ominousSHELL' to Github..."
cd ~/ominousSHELL/
git config --global user.email "ominousshellotto@proton.me"
git add .
git commit -m "1.0"
git push

