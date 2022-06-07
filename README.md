Myna browser extension
=========================

Firefox browser extension for Japan individual card (aka My Number Card) portal site.

Requirements
-------------------------

 * python3
 * [pyscard](https://pyscard.sourceforge.io/)

Supported platform
-------------------------

 * Firefox (Linux)

Components
-------------------------

 * Browser extension
 * Native messaging client
 
Installation
-------------------------

### Browser extension

TBD

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
