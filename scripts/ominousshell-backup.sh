#!/bin/zsh

BACKUP_DIR="/home/ominousshell/es/Kali Linux/"

echo "Removing old 'ominousSHELL' from USB..."
sudo rm -rf "$BACKUP_DIR/ominousSHELL/"

echo "Backing up 'ominousSHELL' to USB..."
sudo cp -r ~/ominousSHELL $BACKUP_DIR

echo "Backing up 'ominousSHELL' to Github..."
cd ~/ominousSHELL/
git config --global user.email "ominousshellotto@proton.me"
sudo git add .
sudo git commit -m "1.0"
git push

