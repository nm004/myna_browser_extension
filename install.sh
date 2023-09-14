#!/bin/sh

here=$(realpath $0)
here=${here%/*}

pip install --user $here/nmh

nmhd=$HOME/.mozilla/native-messaging-hosts
mkdir -p "$nmhd"

exe=$(type -Pp myna_browser_extension_nmh)
sed -e "s|@path@|$exe|" < extension.json.in > "$nmhd"/myna_browser_extension.json
