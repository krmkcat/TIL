# gretelについて

## gretelとは
breadcrumb（パンくずリスト）を使うためのGem.

## breadcrumbとは
ユーザーが”自分が今サイトのどの位置にいるのか”がわかるように表示する階層構造リストのこと。例↓
```
Top > マイページ > ユーザー情報 > ユーザー情報編集
```

## gretelの使い方
### 導入方法
まずGemをインストールする。Gemfileに以下のように記述し、
```rb
gem 'gretel'
```
`bundle install`を実行。  
さらに以下のコマンドを実行。
```shell
rails g gretel:install
```
`config/breadcrumbs.rb`が生成されればインストール成功。

### 設定ファイルの編集
先ほど生成された`config/breadcrumb.rb`にbreadcrumbの設定を記述していく。
```rb
crumb 'ページ名' do
  link 'ビューに表示する名前', リンク先
  parent :親ページ名
end
```
ここでいうページ名とは、ビューでbreadcrumbを呼び出すときや、他のページの設定で親ページとして指定するときに使う名前のこと。  
`link`では実際にパンくずリストに表示される名前やと、それをクリックしたときのリンク先を指定する。  
親ページにはそのページの一つ上の階層にあたるページをページ名で指定する。

なおリンク先や表示名を動的に生成したい場合は以下のようにブロックを使って書く。
```rb
crumb 'my_page' do |user|
  link "#{user.name}さんのマイページ", user_path(user)
  parent :親ページ名
end
```
ちなみにこの例で`my_page`を親ページに設定しているページがある場合、`parent :my_page, user`というように引数を渡さなければならないので注意。

### ビューでの呼び出し
パンくずリストを表示させたい箇所（全ページに表示するなら`layouts/application.html.erb`）に以下のコードを記述。
```erb
<%= breadcrumbs separator: '区切り文字' %>
```
なお区切り文字の種類によっては特殊文字を使用すること。  
また`bootstrap`を使っている場合はそれに合わせて`style`や`class`を指定する。([参考リンク](https://zenn.dev/yukihaga/articles/789d0c6c736335))


さらにパンくずリストを設定した各ページに以下のようにコードを追加する。
```erb
<%= breadcrumb :ページ名 %>
```
リンク先や表示名を動的に生成したい場合は、以下のようにブロック変数に代入したい値を引数として渡す。
```erb
<%= breadcrumb :ページ名, ブロック変数に代入する値 %>

<!-- 先ほどのmy_pageであれば以下のようになる -->
<%= breadcrumb :my_page, @user %>
```

## 参考リンク
<https://pikawaka.com/rails/gretel>
<https://zenn.dev/yukihaga/articles/789d0c6c736335>