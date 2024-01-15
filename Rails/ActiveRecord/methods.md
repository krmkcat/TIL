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
- 引数にRangeオブジェクトを渡すとSQLにおける`BEWTEEN`を使える
  ```rb
  User.where(age: 15..20)
  ```
  - 参考リンク：[ActiveRecordのwhereでBETWEENを実現する](https://qiita.com/Kta-M/items/3a8d6bd36e7b4368dbbc)
- `joins`を使って結合したテーブルの属性を使いたい場合はこのような書き方になる
  ```rb
  # 例
  Article.joins(:tags).where(tags: { name: 'tag1' })
  ```
  - 中間テーブルを介して結合したテーブルの属性を使いたい場合は以下のような書き方になる。
    ```rb
    Article.joins(article_category: :categories).where(categories: { name: 'category1' })
    ```

## joins(:関連名)
- テーブルを`INNER JOIN`する
- `has_〇〇_through`を設定していないテーブルを中間テーブルを介して結合する場合は`joins(中間テーブルの関連名: :結合したいテーブルの関連名)`のようにする
  - この場合の"結合したいテーブルの関連名"は、直接つながる中間テーブルからみた関連名
  - 経由するテーブルが2つ以上になる場合は、`joins(中間テーブル1関連名: { 中間テーブル2関連名: :結合したいテーブルの関連名 })`と入れ子にする。経由テーブルが増えれば入れ子も増える
- 関連名単体だけで結合できるテーブルと中間テーブルを明示しないと結合できないテーブル、両方結合したい場合。以下の2通りのやり方がある
  - 中間テーブル明示必須のものを最後に持ってくるようにして、カンマ区切りで列挙（明示必須のほうが2つ以上ある場合はこの手は使えないかも？）
  - 別々に`joins`してチェーンする

## select(カラムを指定)
- SQLの`SELECT`句を発行する
- 引数はシンボル及び文字列を渡せる
- 取得したいカラムがレシーバとなるモデルのものであればシンボルでいいが、そうでない場合は`select('table_a.user_id, table_a.user_name')`のように直接文字列で指定する
- `select`に`select`をチェーンすることも可能。1つ目の`select`で特定のカラムにエイリアスを設定して、2つ目のカラムでそれを利用するというようなことができる

## order(カラム名: :asc/desc)
- 特定のカラムの値でレコードを並べ替える
- `:asc`が昇順、`:desc`が降順

## group(:カラム名)
- SQLの`GROUP BY`句を発行する

## having(条件)
- SQLの`HAVING`句を発行する
- `group`とセットで使う
- 条件の書き方は基本`where`と同じ

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

## assign_attributes(ハッシュ)
- 特定の属性（複数可）の値を変更するメソッド
- 変更したい属性と値の組み合わせハッシュを引数として渡す
- ただしセットされるだけでDBへの保存はされない。したければ別途`save`メソッドを使用すること
- [参考リンク](https://terakura-aina.hatenablog.com/entry/2020/12/03/112326)

## update_attributes(ハッシュ)
- 上記`assign_attributes`の保存する版
- 単なる`update`との違いは引数の渡し方と、`update_attributes`はバリデーションチェックがされない点
- [参考リンク](https://terakura-aina.hatenablog.com/entry/2020/12/03/112326)

## pluck(:カラム名)
- モデルに対して使う
- 引数で指定したカラムの値をすべて取得し配列を作る
- 引数を複数指定すると、二次元配列を返す
  ```rb
  User.pluck(:id, :name)
  # => [[1, "クロ"], [2, "ミケ"]]
  ```

## distinct
- レコードの重複を取り除く
- `distinct`を呼び出した時点で重複を取り除くのではなく、発行されるSQL文が`SELECT DISTINCT * ...`になる
- そのため、`distinct`の後に`where`などをメソッドチェーンしても、きちんと最終的な結果から重複レコードを取り除いたオブジェクトが返る

## select(カラム名1, ...)
- SQLの`SELECT`句を発行する（指定したカラムのみを抽出する）

## 【番外】関連性の高いメソッド
- [`attribute_accessor`](../methods.md#attribute_accessor)