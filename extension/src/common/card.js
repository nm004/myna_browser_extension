/*
 * myna-browser-extension
 *
 * common/card.js
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

class Card {

  static sign_with_user_auth(pin, message) {
    const method = this.sign_with_user_auth.name
    const params = { pin, message }
    const msg = { method, params, id: Date.now() }
    return browser.runtime.sendMessage(msg).then(this._parse_response)
  }

  static fetch_user_auth_cert() {
    const method = this.fetch_user_auth_cert.name
    const params = {}
    const msg = { method, params, id: Date.now() }
    return browser.runtime.sendMessage(msg).then(this._parse_response)
  }

  static fetch_individual_number(pin) {
    const method = this.fetch_individual_number.name
    const params = { pin }
    const msg = { method, params, id: Date.now() }
    return browser.runtime.sendMessage(msg).then(this._parse_response)
  }

  static fetch_personal_info(pin) {
    const method = this.fetch_personal_info.name
    const params = { pin }
    const msg = { method, params, id: Date.now() }
    return browser.runtime.sendMessage(msg).then(this._parse_response)
  }

  static _parse_response(r) {
    if (r.result !== undefined) {
      return Promise.resolve(r.result)
    } else {
      return Promise.resolve(r.error)
    }
  }
}
