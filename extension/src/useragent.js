/*
 * myna-browser-extension
 *
 * useragent.js
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

var browser;
if (browser === undefined) {
  Object.defineProperty(navigator, 'userAgent', {
    get: ()=>"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.0.0 Safari/537.36",
    configurable: true
  })
} else {
  const s = document.createElement('script')
  s.src = browser.runtime.getURL('src/useragent.js')
  s.onload = () => s.remove();
  (document.head || document.documentElement).appendChild(s)
}
