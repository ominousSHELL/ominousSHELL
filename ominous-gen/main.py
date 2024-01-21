#!/bin/env python

import argparse
import payloads
import generator

parser = argparse.ArgumentParser(
				prog='ominousGEN.py',
				usage="ominousGEN.py [PAYLOAD] [IP] [-p PORT]",
               	description='Python REVERSE|BIND Shell generator')

parser.add_argument("payload", help="Specify payload to generate", nargs='?')
parser.add_argument("ip", help='IP ADDRESS', nargs='?')
parser.add_argument('-B', "--bind", help="Generate BIND shell payload", action='store_true')
parser.add_argument('-p', "--port", help="PORT Number (Default 9001)", default="9001")
parser.add_argument('-b', "--base64", help="Encodes payloads in base64", action='store_true')
parser.add_argument('-t', "--type", help="List types of payloads available.", action=payloads.List)
parser.add_argument('-l', "--level", help="Run payload level. Some payloads may have more levels than others. Specify `-t all_reverse` or -t `all_bind` to see all levels", type=int, default=0)

args = parser.parse_args()
if (args.payload is None or args.ip is None):
    parser.print_help()
    exit()

generator.check(args)
