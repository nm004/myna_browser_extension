#!@python@
# myna-browser-extension
#
# main.py
#
# Copyright 2022 Nozomi Miyamori
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

import sys
import base64
import json
import struct
from ._internal import Card

def main():
    while m := recv_msg(sys.stdin.buffer):
        r = handle_msg(m)
        send_msg(sys.stdout.buffer, r)
    return 0

def recv_msg(rbuf):
    b = rbuf.read(4)
    if len(b) == 0:
        return None
    n = struct.unpack('=I', b)[0]
    return json.loads(rbuf.read(n))

def send_msg(wbuf, msg):
    msg = json.dumps(msg)
    msg = bytes(msg, encoding='utf-8')
    msg = struct.pack('=I', len(msg)) + msg
    wbuf.write(msg)
    wbuf.flush()

def handle_msg(msg):
    try:
        # Message format is JSON RPC v2
        method = msg['method']
        method = globals()[f'{method}']
        params = msg['params']
        req_id = msg['id']

        if type(params) is list:
            result = method(*params)
        else:
            result = method(**params)

        return {
            'jsonrpc': '2.0',
            'result': result,
            'id': req_id
        }

    except e:
        print(e, file=sys.stderr)

        return {
            'jsonrpc': '2.0',
            'error': {
                'code': None,
                'message': None,
                'data': None,
            },
            'id': req_id
        }

# TODO: write error handling for following methods

def sign_with_user_auth(pin, message):
    pin = bytes(pin, 'utf-8')
    message = base64.standard_b64decode(message)
    r = Card().sign_with_user_auth(pin, message)
    r = bytes(r)
    r = base64.standard_b64encode(r)
    return str(r, 'utf-8')

def fetch_user_auth_cert():
    r = Card().fetch_user_auth_cert()
    r = bytes(r)
    r = base64.standard_b64encode(r)
    return str(r, 'utf-8')

def fetch_individual_number(pin):
    pin = bytes(pin, 'utf-8')
    r = Card().fetch_individual_number(pin)
    r = bytes(r)
    return str(r, 'utf-8')

def fetch_personal_info(pin):
    pin = bytes(pin, 'utf-8')
    r = Card().fetch_personal_info(pin)
    return tuple( str(bytes(i), 'utf-8') for i in r )

if __name__ == '__main__':
    sys.exit(main())