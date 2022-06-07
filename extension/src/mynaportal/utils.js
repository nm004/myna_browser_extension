/*
 * myna-browser-extension
 *
 * mynaportal/utils.js
 *
 * Copyright 2022 Nozomi Miyamori
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

function on_launchApp(e) {
  const msg = JSON.parse(e.detail)
  handle_msg(msg).then(send_response)
}

function handle_msg(msg) {
  switch (msg.mode) {
  case '01':
    return on_mode01(msg)
  case '03':
  case '04':
    return on_mode0304(msg)
  }
}

async function on_mode01(msg) {
  const mode = msg.mode
  const pin = PinReader.read_kenmen_pin()
  if (!pin) {
    return { mode, result: '9' }
  }

  //TODO: write error handling
  return {
    mode,
    result: '0',
    signature: await Card.sign_with_user_auth(pin, msg.digest),
    certificate: await Card.fetch_user_auth_cert(),
    combination_code: await Card.fetch_individual_number(pin),
  }
}

async function on_mode0304(msg) {
  const mode = msg.mode
  const pin = PinReader.read_kenmen_pin()
  if (!pin) {
    return { mode, result: '9' }
  }

  //TODO write error handling
  const [name,address,birthday,sex] = (await Card.fetch_personal_info(pin)).map( x => toHexString(x) )
  const combination_code = await Card.fetch_individual_number(pin)

  return {
    mode,
    result: '0',
    mynumber: toHexString(combination_code),
    name,
    address,
    birthday,
    sex,
    combination_code,
  }
}

function toHexString(x) {
  const r = new TextEncoder().encode(x)
  return Array.from(r).map(x => x.toString(16).padStart(2, '0')).reduce((x,y)=>x+y)
}

function send_response(msg) {
  const detail = JSON.stringify(msg)
  const e = new CustomEvent('recvMsg', { detail })
  document.dispatchEvent(e)
}
