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