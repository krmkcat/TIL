# ルーティング関連

## namespace
名前空間を作る=グループ化する ということ。
URLおよびファイル構成において階層をひとつ追加することができる。
### 使い方
```rb:routes.rb
namespace :admin do
  resources :articles, :comments
end
```
### 参考リンク
<https://railsguides.jp/routing.html#%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%A9%E3%81%AE%E5%90%8D%E5%89%8D%E7%A9%BA%E9%96%93%E3%81%A8%E3%83%AB%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0>

## ブラウザでルーティングを確認
以下のURLにアクセスすればOK   
[ルーティングを確認](http://localhost:3000/rails/info/routes)

## 各入れ子ルーティングの違い
- namespace
  - URLでもファイル構成でもスコープを分けたいときに使う
- module
  - ファイル構成のみでスコープを分けたいときに使う
- scope
  - URLのみでスコープを分けたいときに使う
### 参考リンク
- [Railsガイド](https://railsguides.jp/routing.html#%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%A9%E3%81%AE%E5%90%8D%E5%89%8D%E7%A9%BA%E9%96%93%E3%81%A8%E3%83%AB%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0)
- [【Rails】 ルーティングのnamespace, module, scopeの違い](https://zenn.dev/kanazawa/articles/37e22059af576f)
- [DHH流のルーティングで得られるメリットと、取り入れる上でのポイント](https://tech.kitchhike.com/entry/2017/03/07/190739)