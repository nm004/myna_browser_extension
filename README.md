Myna browser extension
=========================

[マイナンバーカードポータルサイト](https://myna.go.jp])用のFirefox拡張機能。

必要なもの
-------------------------

 * python3
 * [pyscard](https://pyscard.sourceforge.io/)

動作を確認しているプラットフォーム
-------------------------

 * Firefox (Linux)

Windows, macOS でも動くと思うけどどうなるかは知らん。

内容物
-------------------------

 * Firefoxの拡張機能 (`extension` ディレクトリ)
 * 拡張機能とやりとりするホスト側のプログラム (`src` ディレクトリ)

インストール
-------------------------

### Firefoxの拡張機能

`about:debugging#/runtime/this-firefox` から一時的なアドオンとして`extension/manifest.json`を読み込む。

### ホスト側のプログラム
```
meson setup -Dmozdir=$HOME/.mozilla build 
meson install -C build
```

アンインストール
-------------------------

```
rm -rf $HOME/.mozilla/native-messaging-hosts/myna-browser-extension{,.json}
```

動作確認済みの内容
-------------------------

 * マイナポータルへのログイン
 * 公金受け取り講座の登録、確認
 * 健康保険証の利用申し込み、確認 (手動によるユーザエージェントの変更が必要)
   * `about:config` で `general.useragent.override` の値 (文字列) を `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36` にする
 * 外部サイトとの連携 (もっとつながる)

できないこと、未実装の機能
-------------------------

 * パスワード変更
 * ログイン時と利用者情報確認時のパスワードを間違えたときのエラー処理

ライセンス
-------------------------

GPLv3
