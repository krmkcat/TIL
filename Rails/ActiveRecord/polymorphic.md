# ポリモーフィック関連付けについて

## ポリモーフィック関連付けとは
ざっくりいうと「 異なるモデルを一つのグループとして扱えるようにする機能」。グループ化する際の名称は`***able`にする事が多い？

## 使い方
例として以下のような状況を想定。
- 以下の3つのモデルがある
  - 従業員のデータを扱う`Employee`
  - 商品のデータを扱う`Products`
  - 写真を扱う`Picture`
- 写真は従業員もしくは商品のどちらかに従属する（従業員の写真、もしくは商品の写真である）
- `Employee`と`Product`を`imageable`という名前でグループ化する

まず、複数のモデルに従属する側（ここでは`Picture`）のテーブルには外部キーのカラムと型のカラムをセットで作成しておく必要がある。  
マイグレーションファイルに`t.references :グループ名, polymorphic: true`と記述しておけば自動で生成してくれる。
```rb
class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string  :name
      t.references :imageable, polymorphic: true
      t.timestamps
    end
  end
end
```

これで`pictures`テーブルのカラム構成は以下のようになる。
- id: integer/bigint
- name: string
- imageable_id: integer/bigint
- imageable_type: string
- created_at: datetime
- updated_at: datetime

`imageable_type`（グループ内のどのモデルか）と`imageable_id`（モデル内のどのレコードか）の組み合わせで、どのレコードに属しているのかを判別できる。

そのうえで、各モデルで以下のようにアソシエーションを設定する。
```rb
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end

class Employee < ApplicationRecord
  has_many :pictures, as: :imageable
end

class Product < ApplicationRecord
  has_many :pictures, as: :imageable
end
```

従属する側は`belongs_to :グループ名, polymorphic: true`とし、される側は普通にアソシエーションの記述をしたうえで、オプションとして`as: :グループ名`を追記する。

なおこのグループ名は`has_many through`の`source`に設定することもできるので、多対多の関係でもポリモーフィック関連付けは使える。その場合は`source_type`もセットで指定すること。

## 参考リンク
[Railsガイド](https://railsguides.jp/association_basics.html#%E3%83%9D%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E9%96%A2%E9%80%A3%E4%BB%98%E3%81%91)