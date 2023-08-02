#!/bin/zsh
mysql -u root -panonymous ominousBlog \
	-e "select * from blogs\\G"


