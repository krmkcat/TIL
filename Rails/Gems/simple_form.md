# Simple_formについて

## Simple_formとは
フォームの作成を簡単にできるようにしてくれるGem。

## 使い方
まずはGemをインストール。Gemfileに以下のコードを書いて`bundle install`。
```rb
gem 'simple_form'
```

ビューファイルを書いてコードを生成していく。
```erb
<%= simple_form_for @post do |f| %>
  <%= f.input :title>
  <%= f.input :body, input_html: { class: 'js-autosize' } %>
  <%= f.input :image, as: :file>
  <%= f.input_field :image_align, as: :radio_buttons %>
  <%= f.input :category_id, collection: Category.pluck(:name, :id) %>
  <%= f.input :tag_ids, collection: Tag.pluck(:name, :id), include_blank: false, input_html: { multiple: true } %>
  <%= f.button :submit %>
<% end %>
```

### フォームそのものの生成について
`form_with`の代わりに`simple_form_for`と書く。オプションは基本同じ。

### フィールドの生成について
- 基本的には`f.input :カラム名`とすれば、各カラムのデータ型を元に最適なフィールドを生成してくれる。
- HTMLオプションを指定したい場合は`input_html: { 属性: 値 }`とする。  
  例：`input_html: { data: { turbo_method: 'delete' } }`
- ファイルフィールドにしたい場合は`as: :file`を付ける
- ラジオボタンにしたい場合は`f.input_field :カラム名, as: :radio_buttons`とする
- セレクトボックスにしたい場合は`collection: 選択肢の配列`とする。（`collection`オプションが渡された場合はデフォルトでセレクトボックスになる）
  - 初期選択値を空欄にしたい場合は`include_blank: true`、したくなければ`false`を付ける
- ファイルフィールドやセレクトボックス等を複数選択可能にしたい場合は、`input_html: { multiple: true }`を付ける
- `has_one_attached`や`has_many_attached`関連付けを使う場合は、`f.input :関連名, as: :file`とすればOK
- 他にも色々あるようなので、詳しくは[公式ドキュメント](https://github.com/heartcombo/simple_form)参照

#### 補足情報：select2とは？
- `select2_simple_form`というGemがある
- Select2の機能をラップして単純化し、JS で操作することなくカスタマイズできるカスタム入力…らしい。詳細は割愛。
- それを使っている場合は、`as: :select2`とすることで適用できる（`collection`オプションを渡していても付けなきゃダメ）。

## 参考リンク
- [公式ドキュメント](https://github.com/heartcombo/simple_form)
- [参考記事](https://opiyotan.hatenablog.com/entry/gem_simple_form)