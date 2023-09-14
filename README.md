Myna browser extension
=========================

[マイナンバーカードポータルサイト](https://myna.go.jp)用のウェブブラウザ拡張機能。

必要なもの
-------------------------

 * python3
 * [pyscard](https://pyscard.sourceforge.io/)

動作を確認しているプラットフォーム
-------------------------

 * Linux
 * Windows

内容物
-------------------------

 * ブラウザ用の拡張機能 (`extension` ディレクトリ)
 * 拡張機能とやりとりするホスト側のプログラム (`nmh` ディレクトリ)

インストール
-------------------------

### ウェブブラウザの拡張機能

#### Firefox

`about:debugging#/runtime/this-firefox` から一時的なアドオンとして`extension/manifest.json`を読み込む。

### ホスト側のプログラム

### Linux

install.shを実行する

### Windows

install.batを実行する

アンインストール
-------------------------

### Linux

uninstall.shを実行する

### Windows

uninstall.batを実行する

動作確認済みの内容
-------------------------

 * マイナポータルへのログイン
 * 公金受け取り講座の登録、確認
 * 健康保険証の利用申し込み、確認 (手動によるユーザエージェントの変更が必要)
   * `about:config` で `general.useragent.override` の値 (文字列) を `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36` にする
 * 外部サイトとの連携 (もっとつながる)

未実装の機能
-------------------------

 * パスワード変更
 * ログイン時と利用者情報確認時のパスワードを間違えたときのエラー処理

ライセンス
-------------------------

GPLv3
