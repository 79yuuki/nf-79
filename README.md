# Welcome to Node Framework 79

Node.jsで実装された、expressをちょっと使いたいようにラップしたオレオレフレームワーク(ただのスケルトンプロジェクト)です。

## ちょっと追加したという機能

### prefix選択

下記のように起動すれば、指定した設定が反映される。指定無しの場合はlocalがデフォルトで選ばれる

        node server.js -c config/[local|develop|staging|production]/config.json
### routing設定

config.json上にrouterの実装をしたモジュールのpathと、urlを指定。
### test

mochaとexpectで書けるようにしてある。server起動マネージャも一応ある。
### loggerモジュール

log4jsベースで使えるようにしてある。access_log, system_logみたいな感じで、ファイルに吐き出せます。
### validation使う準備がしてある

express-validationを使えるようにしてある。
### view周り

ejsのlayoutを使えるようにしてます。
twitter bootstrapのデザインをフラットデザインにしただけのflatstrapっていうのを使ってlayoutを適当に組んであります。
