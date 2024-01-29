#!/bin/zsh

echo "Backin up 'ominousshell-bookstack_db' database..."
sudo docker exec -it ominousshell-bookstack_db mysqldump -u bookstack -panonymous ominousshell > /media/backup/Kali-Linux/bookstack/backup/ominousshell-bookstack_db.sql 
