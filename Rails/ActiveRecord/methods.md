# ActiveRecord関連のメソッドについて

## errors.added?
- 引数に属性名とエラータイプを指定することで、あるモデルオブジェクトの特定の属性に特定のタイプのエラーが出ているかどうか確認できる。
```rb
モデルオブジェクト.errors.added?(:属性, :エラーのタイプ)
# => true もしくは false
```

## where(条件)
- 条件にあうレコードをすべて取得し`ActiveRecord::Relation`という配列のようなものをつくる
- そのため、whereで取得したオブジェクトに対して`destroy`メソッドは使えない。やるなら`destroy_all`
- 条件は文字列もしくはシンボルで指定できる。ただしSQLインジェクション対策として、 **条件が一つなら通常はシンボルで指定する**
  ```rb
  # 文字列で指定
  User.where("name = 'クロ'")

  # シンボルで指定
  User.where(name: 'クロ')
  ```
- プレースホルダを使う書き方も可能。比較条件を使うときはこちらを使う
  ```rb
  User.where("name = ?", 'ミケ')
  User.where("age < ?", 5)
  User.where("name = ? and age < ?", 'ミケ', 5)
  ```
- 比較が含まれていなければ、`and`や`or`による検索もシンボルを使って書ける
  ```rb
  User.where(name: 'マーチ', age: 7)
  User.where(name: 'マーチ').or(User.where(name: 'ハナ'))
  ```
- not検索、NOT NULL検索は以下の通り
  ```rb
  # not検索
  モデル.where.not(条件)

  # NOT NULL検索
  モデル.where.not(カラム名: nil)
  ```
- 条件に複数の値を指定する場合は配列を使う
  ```rb
  User.where(id: [1, 2])
  ```
- あいまい検索は`LIKE`を使い文字列で条件指定する
  ```rb
  モデル.where('カラム名 LIKE?', '検索したい文字列')
  ```
  なお検索したい文字列は`%`と`_`を使って指定する。
    - `%`：空白文字を含む任意の複数文字列
    - `_`：任意の一文字
- not LIKE 検索は以下の通り
  ```rb
  モデル.where('カラム名 not LIKE?', '検索したい文字列')
  ```

## attribute_accessor
「同名のインスタンス変数を戻り値とするメソッドを定義」「同名のインスタンス変数に値を代入するメソッドを定義」を同時に行う。
モデルクラスにこれを設定すると、DBとは紐づかない属性を付与することができる。

## find_or_create_by(条件)
- モデル（正確にはActiveRecord::Relations？）に対して使う
- 条件に当てはまるレコードがあれば取得し、なければ生成＆保存する

## find_or_initialize_by(条件)
- 上記`find_or_create_by`の保存しない版

## find_each { ブロック }
- 分割してレコードを取得し１件ずつ処理をする
- 大きなデータを持つモデルを処理するときなどにメモリの節約の為に使う
- `where`と組み合わせて使うことも可能
- 容量の大きくない（目安として1000件以下？）データを処理するなら`each`でOK
- [参考リンク](https://pikawaka.com/rails/find_each)  
  [Railsドキュメント](https://railsdoc.com/page/find_each)