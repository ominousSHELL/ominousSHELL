#!/bin/zsh

if [[ -f ".zshrc" ]]; then
	rm .zshrc
fi

#Misc
for i in $(ls misc/); do
	cat misc/$i >> .zshrc
done

#Aliases
for i in $(ls aliases/); do
	cat aliases/$i >> .zshrc
done


