# ヘルパーメソッド関連

## human_attribute_name
- 以下のように記述するとモデルの属性名を表示できる
  ```erb
  モデル名.human_attribute_name(:属性名)
  ```
- ただし、厳密に言うとあくまで`activerecord.attributes.モデル名.属性名`というキーに合致するロケールを探して表示しているに過ぎず、実はモデルの内容に紐づいているわけではない
- そのため属性名は実在するカラム名である必要はなく、極端な話、全くモデルに関係のないキーを当て込むことも可能である

## local_assigns
- パーシャルにローカル変数を引数として渡したときに、定義されたすべてのローカル変数をハッシュとして返す
- `local_assigns[:key]`とすれば、`:key`に対応する値を返す
- あるパーシャルで特定の変数が渡されたかどうかをチェックできる
### 参考リンク
<https://wild-outdoorlife.com/ruby-on-rails/local_assigns/>

## content_tag
- 以下のように記述するとHTMLタグを生成できる
  ```rb
  content_tag(:要素, 'コンテンツ', オプション...)

  # 例
  content_tag(:p, 'テキスト', class: 'test-text')
  # =>
  # <p class="test-text">テキスト</p>
  ```
- ブロックを使って入れ子にすることもできる
  ```rb
  content_tag(:div, id: 'text1') do
    content_tag(:p, 'テキスト1', class: 'test-text')
  end

  # =>
  # <div id="text1">
  #   <p class="test-text">テキスト1</p>
  # </div>
  ```
- コンテンツなしの場合は第2引数を`nil`にすること。`nil`を書かずにオプションを書くとおかしなことになる
### 参考リンク
- [参考記事](https://shinmedia20.com/rails-content-tag)

## button_toとlink_toの違い
- link_to：`<a>`タグを生成する。デフォルトのHTTPメソッドはGET
- button_to：`<form>`タグが生成され、その中に`<input>`タグでボタンが生成される。デフォルトのHTTPメソッドはPOST

## link_toにパラメータを付与する方法
- パスやURLの後ろに`(キー: 値, ...)`とつければOK
- URIパターンに`:id`が含まれる場合（メンバールーティング）は、キー無しで値のみ書くと自動的にidの値とみなされる
  - このパターンの場合、値はidそのものではなくモデルインスタンスでもOK（そのほうが一般的）
-  ### 参考リンク
- [【Rails】link_toに任意のパラメータを付与する方法](https://310nae.com/linkto-param/)

## 自作メソッドをヘルパーメソッド化する方法
- コントローラ内で`helper_method :メソッド名`と記述する