Myna browser extension
=========================

Firefox browser extension for [Japan individual card (aka My Number Card) portal site](https://myna.go.jp]).

Requirements
-------------------------

 * python3
 * [pyscard](https://pyscard.sourceforge.io/)

Supported platform
-------------------------

 * Firefox (Linux)

Components
-------------------------

 * Browser extension (`extension` dir)
 * Native messaging client (`src` dir)

Installation
-------------------------

### Browser extension

Load `extension/manifest.json` as a temporary Add-on via `about:debugging#/runtime/this-firefox`.

### Native messaging client
```
meson setup -Dmozdir=$HOME/.mozilla build
meson install -C build
```

Uninstall
-------------------------

```
rm -rf $HOME/.mozilla/native-messaging-hosts/myna-browser-extension{,.json}
```

License
-------------------------

GPLv3
