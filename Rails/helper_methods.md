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