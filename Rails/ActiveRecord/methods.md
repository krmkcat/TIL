# ActiveRecord関連のメソッドについて

## errors.added?
- 引数に属性名とエラータイプを指定することで、あるモデルオブジェクトの特定の属性に特定のタイプのエラーが出ているかどうか確認できる。
```rb
モデルオブジェクト.errors.added?(:属性, :エラーのタイプ)
# => true もしくは false
```

## where
- 条件にあうレコードをすべて取得し`ActiveRecord::Relation`という配列のようなものをつくる
- そのため、whereで取得したオブジェクトに対して`destroy`メソッドは使えない。やるなら`destroy_all`

## attribute_accessor
「同名のインスタンス変数を戻り値とするメソッドを定義」「同名のインスタンス変数に値を代入するメソッドを定義」を同時に行う。
モデルクラスにこれを設定すると、DBとは紐づかない属性を付与することができる。

## find_or_create_by(条件)
- モデル（正確にはActiveRecord::Relations？）に対して使う
- 条件に当てはまるレコードがあれば取得し、なければ生成＆保存する

## find_or_initialize_by(条件)
- 上記`find_or_create_by`の保存しない版