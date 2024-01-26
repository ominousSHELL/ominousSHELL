#!/bin/zsh


echo "Restoring 'ominousshell' database to docker container..."
sudo docker exec -i ominousshell-bookstack mysql -u bookstack -pominousshell ominousshell < /media/backup/Kali-Linux/bookstack/backup/ominousshell.sql

echo "Removing '.env', 'public/uploads', 'storage/uploads', 'themes' from docker container..."
sudo docker exec -i ominousshell-bookstack rm -rf /var/www/bookstack/{.env,public/uploads/,storage/uploads/,themes}

echo "Extracting 'bookstack-backup.tar.gz' to docker container... " 
sudo docker cp /media/backup/Kali-Linux/bookstack/backup/bookstack-backup.tar.gz ominousshell-bookstack:/var/www/bookstack/
sudo docker exec -i ominousshell-bookstack tar xzvf /var/www/bookstack/bookstack-backup.tar.gz -C /var/www/bookstack/ 1>/dev/null

echo "Removing 'bookstack-backup.tar.gz' from docker container..."
sudo docker exec -i ominousshell-bookstack rm /var/www/bookstack/bookstack-backup.tar.gz

echo "Restoring permissions in '/var/www/bookstack'..."
sudo docker exec -i ominousshell-bookstack chown -R root:www-data /var/www/bookstack/
sudo docker exec -i ominousshell-bookstack chmod -R 755 /var/www/bookstack/
sudo docker exec -i ominousshell-bookstack chmod -R 775 /var/www/bookstack/bootstrap/cache /var/www/bookstack/public/uploads /var/www/bookstack/storage
sudo docker exec -i ominousshell-bookstack chmod 740 /var/www/bookstack/.env

