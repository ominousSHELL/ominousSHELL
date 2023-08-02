#!/bin/zsh
mysql -u root -panonymous ominousNotes \
	-e "select * from notes\\G"


