#!/bin/zsh

mysql -u root -panonymous ominousBlog \
	-e 'create table blogs (id int primary key auto_increment, title char(120), category char(60), date DATE, file char(60), description char(120))'
