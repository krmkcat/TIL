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

## invert
ハッシュのキーを値に、値をキーに変換する。

## strftime(format)
- 時刻を指定したフォーマットに沿って変換し文字列として返す
### 参考リンク
<https://docs.ruby-lang.org/ja/latest/method/Time/i/strftime.html>

## where
- 条件にあうレコードをすべて取得し`ActiveRecord::Relation`という配列のようなものをつくる
- そのため、whereで取得したオブジェクトに対して`destroy`メソッドは使えない。やるなら`destroy_all`

## attribute_accessor
「同名のインスタンス変数を戻り値とするメソッドを定義」「同名のインスタンス変数に値を代入するメソッドを定義」を同時に行う。
モデルクラスにこれを設定すると、DBとは紐づかない属性を付与することができる。

## map
- 配列に対して使用する
- `map{ |変数| 処理 }`とすることで、配列の各要素に対して処理をほどこし、その結果で新しい配列を作る

## join
- 配列に対して使う
- 配列の要素をすべてつなげて文字列に変換する
- 引数としてセパレータ（区切り文字）を渡すこともできる
 ```rb
 [a, b, c].join
 # => "abc"

 [a, b, c].join(',')
 # => "a,b,c"
 ```

