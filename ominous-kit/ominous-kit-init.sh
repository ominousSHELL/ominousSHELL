#!/bin/bash
if [[ $1 == '' ]]; then
    echo "Usage: ominous-kit-init.sh [IP Address]"
    exit
fi

#Copy ominous-kit
echo 'Copying ominous-kit...'
cp -r /home/ominousshell/ominousSHELL/ominous-kit/ .
for directory in $(find -type d); do 
    FILES=$(find $directory -type f)
    sed -i "s/127.0.0.1/$1/g" $FILES 2>/dev/null 
done
rm ./ominous-kit/ominous-kit-init.sh


#Run dynamic init scripts
echo 'Running dynamic initialization scripts...'
for INIT_SCRIPT in $(find ./ominous-kit -type f); do
    echo $INIT_SCRIPT | grep 'init.sh' 1>/dev/null
    if [[ $? == 0 ]]; then
        bash $INIT_SCRIPT 
    fi
done

echo 'Done...'