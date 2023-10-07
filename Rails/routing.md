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