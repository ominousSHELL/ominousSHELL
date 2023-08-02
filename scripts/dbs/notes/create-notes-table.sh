#!/bin/zsh

mysql -u root -panonymous ominousNotes \
	-e 'create table notes (id int primary key auto_increment, platform char(120), machine char(120), difficulty char(60), type char(60), date DATE, file char(60), description char(120))'
