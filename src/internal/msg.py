# myna-browser-extension
#
# msg.py
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

import json
import struct

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
