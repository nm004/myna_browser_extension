/*
 * myna-browser-extension
 *
 * common/pin_reader.js
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

class PinReader {
  static read_user_auth_pin() {
    return this._read_pin('Please type user authentication pin (4 digits pin)', this._check_4pin) 
  }

  static read_kenmen_pin() {
    return this._read_pin('Please type kenmen pin (4 digits pin)', this._check_4pin) 
  }

  static _check_4pin(pin) {
    return isFinite(Number(pin)) && pin.length === 4
  }

  static _read_pin(prompt_text, pin_check) {
    while (true) {
      let pin = prompt(prompt_text)
      if (pin === null)
        return pin
      else if (pin_check(pin))
        return pin
    }
  }
}
