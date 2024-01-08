# configについて

## 概要
各環境ごとの設定を簡単に管理するためのGem

## 基本的な使い方
まずはGemをインストール。
```rb
gem 'config'
```
Gemfileに上記の記述を追加し`bundle install`。  
その後に以下のコマンドを実行。
```shell
rails g config:install
```
これで`config/settings/`配下に各環境用の定数管理ファイルが生成される。  
後は各ファイルにyml形式で定数を定義する。以下、一例。
```yml
default_url_options:
  host: localhost:3000
```
上記例の場合、定数の呼び出しは以下のようになる。ネストしている場合はチェーンすればOK。
```rb
Settings.default_url_options.host
# => 'localhost:3000'

Settings.default_url_options.to_h
# => { host: 'localhost:3000' }
```

## 参考リンク
- [公式ドキュメント](https://github.com/rubyconfig/config)
- [gem configを理解する ~ configを使った定数管理の方法](https://qiita.com/sazumy/items/8d3b06d0d42af114a383)