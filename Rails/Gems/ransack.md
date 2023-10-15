# ransack関連

## 検索フォームの基本
```erb
<%= search_form_for @q, url: 送信先URL do |f| do %>
  
  <!-- ワード検索 -->
  <%= f.search_field :検索対象と条件, placeholder: テキスト%>

  <!-- プルダウン選択 -->
  <%= f.select :検索対象と条件, [['表示する文字列1', 保存する値1], ['表示する文字列2', 保存する値2], ...],  include_blank: 未選択の場合に表示するテキスト %>

  <!-- 日付選択 -->
  <%= f.date_field :検索対象と条件 %>

<% end %>
```
### 参考リンク
  <https://qiita.com/daichi0713/items/412ad0c6fc4fad8140e0>
  <https://qiita.com/mmaumtjgj/items/34117cd07e9b7aa72585>

## enumを利用したプルダウン選択について
- 詳細は下記リンク参照
- 使うもの
  - enum_helpというGem（翻訳後の属性の値一覧をハッシュで取得するメソッドが使えるようになる）
  - `invert`メソッド（ハッシュのキーと値を逆にする）
  - `map`メソッド（既存のハッシュを加工して`[[表示する文字列, 保存する値], ...]`という形の新たなハッシュを作る）
### 参考リンク
  <https://qiita.com/mmaumtjgj/items/34117cd07e9b7aa72585>