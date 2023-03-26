/*
 * myna-browser-extension
 *
 * main.js
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

async function on_mode01(digest) {
  const pin = PinReader.read_kenmen_pin()
  if (!pin) {
    return { result: '9' }
  }

  return {
    result: '0',
    signature: await Card.sign_with_user_auth(pin, digest),
    certificate: await Card.fetch_user_auth_cert(),
    combination_code: await Card.fetch_individual_number(pin)
  }
}

async function on_mode0304() {
  const pin = PinReader.read_kenmen_pin()
  if (!pin) {
    return { result: '9' }
  }

  const [name,address,birthday,sex] = (await Card.fetch_personal_info(pin)).map( x => toHexString(x) )
  const combination_code = await Card.fetch_individual_number(pin)

  return {
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

//TODO: write error handling
async function on_launchApp(e) {
  const msg = JSON.parse(e.detail)

  let r = undefined
  switch (msg.mode) {
  case '01':
    r = on_mode01(msg.digest)
    break;
  case '03':
  case '04':
    r = on_mode0304()
    break;
  }

  send_response({
    mode: msg.mode,
    ...(await r)
  })
}

/* They check if the extension and the native messaging client are installed or not
 * by finding these element. */
function inject_extension_installation_check_code() {
  const e1 = document.createElement('input')
  e1.id = 'extension-is-installed'
  e1.type = 'hidden'
  e1.value = true
  document.body.appendChild(e1)

  const e2 = document.createElement('input')
  e2.id = 'app-is-installed'
  e2.type = 'hidden'
  e2.value = true
  document.body.appendChild(e2)
}

function inject_ua_override_code() {
  const s = document.createElement('script')
  s.textContent = `
    Object.defineProperty(navigator, 'userAgent', {
      get: ()=>"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0",
      configurable: true
    })
  `
  s.onload = () => s.remove()

  const head_or_doc = document.head || document.documentElement
  head_or_doc.appendChild(s)
}

document.addEventListener('launchApp', on_launchApp)
inject_extension_installation_check_code()
inject_ua_override_code()
