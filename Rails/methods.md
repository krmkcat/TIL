# メソッド

## controller_path
- コントローラのパスを返す
```rb
Admin::UsersController.controller_path
# =>'admin/users'
```
- レシーバなしの場合は現在のページのコントローラを返す

## any?
- 配列などのコレクションの要素に1つでも真があればtrueを返し、全ての要素が偽ならfalseを返すメソッド
- ブロックを伴う場合は、各要素に対してブロックを評価し、すべての結果が偽である場合にfalseを、一つでも真があればtrueを返す。
  ### 参考リンク
  <https://docs.ruby-lang.org/ja/latest/method/Enumerable/i/any=3f.html>