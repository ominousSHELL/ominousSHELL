#!/bin/zsh

cd ~
echo "Copying configuration files..."
cp -r ~/.zshrc ~/ominousSHELL/configurations/zshrc
cp -r ~/.bashrc ~/ominousSHELL/configurations/bashrc
cp -r ~/.vimrc ~/ominousSHELL/configurations/vimrc
cp -r ~/../usr/etc/tmux.conf ~/ominousSHELL/configurations/tmux.conf

if [[ ! -d ~/ominous-backup ]];then
	echo 'Git backup repository directory doesn"t exist. Clone it first.'
	echo 'Exiting...'
	exit
fi

echo "Coping ominousSHELL/ to ~/ominous-backup/..."
cp -r ~/ominousSHELL/ ~/ominous-backup/

echo "Backing up ominousSHELL/ to external storage..."
#rm -rf /storage/sdcard0/backup/hacking/ominousSHELL/
cp -r ~/ominous-backup/ominousSHELL/ /storage/sdcard0/backup/hacking/


cd  ~/ominous-backup
echo "Pushing ominousSHELL/ to Git repository..."
token="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"
echo "https://ominousSHELL:$token@github.com" > ~/.git-credentials
git config --global http.postBuffer 157286400
git add .
git commit -m "1.0"
git push -u origin main


#Initialize repository
#cd ~/ominousSHELL/
#rm -rf .git
#git init
#git branch -m main
#git remote add origin https://github.com/ominousSHELL/ominous-backup/
#git add .
#git commit -m '1.0'
#git config pull.rebase true
#git pull origin main
#git add .
#git rebase --continue
