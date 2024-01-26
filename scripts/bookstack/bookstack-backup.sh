#!/bin/zsh

echo "Compressing '.env', 'public/uploads/', 'storage/uploads', '/themes'..."
sudo docker exec -it ominousshell-bookstack tar -C /var/www/bookstack -czvf /bookstack-backup.tar.gz .env public/uploads storage/uploads themes 1>/dev/null

echo "Backing up 'bookstack-backup.tar.gz' to USB..."
sudo docker cp ominousshell-bookstack:/bookstack-backup.tar.gz /media/backup/Kali-Linux/bookstack/backup/

echo "Backing up 'ominousshell' database to USB..."
sudo docker exec -it ominousshell-bookstack mysqldump -u bookstack -pominousshell ominousshell > /dev/shm/ominousshell.sql
sudo mv /dev/shm/ominousshell.sql /media/backup/Kali-Linux/bookstack/backup/
