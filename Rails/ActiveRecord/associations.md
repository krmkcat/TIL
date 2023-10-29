# アソシエーションについて

## 引数として関連オブジェクトを渡す
アソシエーションが設定してあるモデルのオブエジェクトについては、外部キーの値を直接指定するかわりに関連オブジェクトを渡すことができる。
例えば以下のようなモデルがあるとする。
```like.rb
class Like < ApplicationRecord
  belongs_to :user
  belongs_to :borad
end
```

ここでLikeオブジェクトを生成したい場合`user_id`と`board_id`を指定するのではなく、以下のように書くことができる。
```rb
Like.create(user: userオブジェクト, board: boardオブジェクト)

# ↓と同じ意味になる
Like.create(user_id: userオブジェクト.id, board_id: boardオブジェクト.id)
```

## 便利なメソッド
### build_関連名
関連オブジェクトを生成する

### includes(関連名)
- 関連テーブルを含めて呼び出す。イメージとしては関連テーブルを結合する感じ
- ActiveRecord::Relation（`Post`とか`User`とか）に対して使うメソッドであり、モデルインスタンスに対しては使えないので注意！

## has_many :through時の削除について
- has_many :throughで設定された関連性に対してdeleteやdestroyを使うと、中間テーブルのレコードが削除される
- その際、関連付けられたオブジェクト自体のレコードは削除されない
- ちなみに削除を行う際も、引数として関連オブジェクトを渡すことで削除対象を指定することができる
- たとえば以下のサンプルコードでは、「@postに関連付けられたtags」の中から、tag_id: @tag.idのものを取り除く。消えるのはあくまで中間テーブルのレコードであり、tagsテーブルのレコードには影響しない。
```rb
@post.tags.destroy(@tag)
```

