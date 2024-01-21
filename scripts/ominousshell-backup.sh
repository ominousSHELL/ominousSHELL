#!/bin/zsh

BACKUP_DIR=/media/backup/Kali-Linux

echo "Backing up 'ominousSHELL' to USB..."
sudo cp -r ~/ominousSHELL $BACKUP_DIR

echo "Backing up 'ominousSHELL' to Github..."
cd ~/ominousSHELL/
git config --global user.email "ominousshellotto@proton.me"
sudo git add .
sudo git commit -m "1.0"
git push

