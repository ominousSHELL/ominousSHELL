#!/bin/zsh


echo "Backing up '/config' directory of 'ominousshell-bookstack' and 'ominousshell-boostack_db' to USB..."
sudo cp -r ~/ominousSHELL/bookstack/{bookstack_app_data,bookstack_db_data} /media/backup/Kali-Linux/bookstack/backup/
sudo cp -r ~/ominousSHELL/bookstack/{bookstack_app_data,bookstack_db_data} /media/backup/Kali-Linux/bookstack/

echo "Backing up 'ominousshell' database to USB..."
sudo docker exec -it ominousshell-bookstack_db mysqldump -u bookstack -pominousshell ominousshell > /dev/shm/ominousshell.sql
sudo mv /dev/shm/ominousshell.sql /media/backup/Kali-Linux/bookstack/backup/

echo "Backing up '/app' data directory to USB..."
sudo rm -rf /media/backup/Kali-Linux/bookstack/backup/app
sudo docker cp ominousshell-bookstack:/app /media/backup/Kali-Linux/bookstack/backup/
