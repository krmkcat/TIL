# letter_opener_webについて

開発環境でメール送信機能を実装した際に、正常に送れているか確認するためのGem。ブラウザを使ってローカル環境で確認ができる。

# 基本的な使い方
まずはGemをインストール。ローカル環境でのみ使用するため、development環境に追加すること。  
Gemfileに以下のようにコードを記述して`bundle install`。
```rb
group :development do
  gem 'letter_opener_web'
end
```
次に、以下のようにルーティングを追加する。
```rb
Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  # 省略
end
```
最後に、`config/environments/development.rb`を以下のように編集する。
```rb
Rails.application.configure do
  # 省略
  config.action_mailer.delivery_method = :letter_opener_web
end
```
あとはサーバーを立ち上げ http://localhost:3000/letter_opener にアクセスすればOK。

## 参考リンク
- [公式ドキュメント](https://github.com/fgrehm/letter_opener_web)
- [【Rails】letter_opener_webを用いて開発環境で送信したメールを確認する方法](https://techtechmedia.com/letter_opener_web/)
