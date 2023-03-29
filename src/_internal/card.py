# myna-browser-extension
#
# card.py
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

from smartcard.CardType import ATRCardType
from smartcard.CardRequest import CardRequest
from smartcard.util import toBytes
from smartcard.sw.ISO7816_4ErrorChecker import ISO7816_4ErrorChecker

SELECT_KOUTEKI = toBytes( '00 A4 04 0C 0A D3 92 F0 00 26 01 00 00 00 01' )
SELECT_KENMEN = toBytes( '00 A4 04 0C 0A D3 92 10 00 31 00 01 01 04 08' )
VERIFY_USER_AUTH = toBytes( '00 20 00 98 04' )
VERIFY_KENMEN = toBytes( '00 20 00 91 04' )
COMPUTE_DIGITAL_SIGNATURE_USER_AUTH = toBytes( '80 2A 00 97' )
READ_USER_AUTH_CERTIFICATE_LEN = toBytes( '00 B0 8A 00 04' )
READ_USER_AUTH_CERTIFICATE_VALUE = toBytes( '00 B0 8A 04 00' )
READ_MY_NUMBER = toBytes( '00 B0 81 03 0C' )
READ_PERSONAL_INFO_LEN = toBytes( '00 B0 82 02 01' )
READ_PERSONAL_INFO_VALUE = toBytes( '00 B0 82 03' )

class Card:
    def fetch_individual_number(self, pin):
        self._connect()
        self._transmit( SELECT_KENMEN )
        self._transmit( VERIFY_KENMEN + list(pin) )
        r = self._transmit( READ_MY_NUMBER )
        return r

    def fetch_personal_info(self, pin):
        self._connect()
        self._transmit( SELECT_KENMEN )
        self._transmit( VERIFY_KENMEN + list(pin) )
        le = self._transmit( READ_PERSONAL_INFO_LEN )
        r = self._transmit( READ_PERSONAL_INFO_VALUE + le )
        def val(i):
            o = r[2*i+4]
            l = r[o-1]
            return r[o:o+l]

        # name, physical address, date of birth, sex
        return tuple( val(i) for i in range(4) )

    def fetch_user_auth_cert(self):
        self._connect()
        self._transmit( SELECT_KOUTEKI )
        le = self._transmit( READ_USER_AUTH_CERTIFICATE_LEN )
        r = self._transmit( READ_USER_AUTH_CERTIFICATE_VALUE + le[2:4] )
        return le+r

    def sign_with_user_auth(self, pin, message):
        self._connect()
        self._transmit( SELECT_KOUTEKI )
        self._transmit( VERIFY_USER_AUTH + list(pin) )
        r = self._transmit( COMPUTE_DIGITAL_SIGNATURE_USER_AUTH + [len(message)] + list(message) + [0x00] )
        return r

    def __init__(self):
        cardtype = ATRCardType( toBytes( '3B E0 00 FF 81 31 FE 45 14' ) )
        cardrequest = CardRequest( cardType=cardtype )
        self._cardservice = cardrequest.waitforcard()

    def _transmit(self, apdu):
        data, *sw = self._cardservice.connection.transmit( apdu )
        ISO7816_4ErrorChecker()( data, *sw )
        return data

    def _connect(self):
        self._cardservice.connection.connect()
