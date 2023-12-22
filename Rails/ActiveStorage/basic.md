# 基本的な使い方

# ActiveStorageとは
クラウドストレージサービスへのファイルのアップロードや、ファイルをActive Recordオブジェクトにアタッチする機能を提供する。開発及びテスト環境ではクラウドストレージサービスの変わりにローカルディスクを利用することもできる。

# 導入方法
[Railsガイド](https://railsguides.jp/active_storage_overview.html)を参照

# ファイルをレコードに紐づける方法
例として、「Userモデルにavatarという関連名で画像を紐づける」とする。
Userモデル内に以下のように記述する
```rb
`has_one_attached :avatar`
```

フォームにファイル選択フィールドを生成し、`attach`メソッドを使ってレコードに添付する。
```erb
<%= form_with @user do %>
  <%= f.file_field :avatar %>
  ...
```
```rb
@user.attach(params[:avatar])
```

# 便利なメソッド
## attached?
- `@user.avatar.attached?`で`@user`に`avatar`が添付されていれば`true`、されていなければ`false`を返す

## variant(:バリアント名, 処理)
- Gem・`image_processing`必須
- 添付可能オブジェクトをレシーバとして呼び出すことで、バリアント（指定の処理を施した別バージョン）を取得できる
- ビューで直接指定してもいいし、モデル側で定義してもいい

ビューで直接指定している例↓
```erb
<%= image_tag user.avatar.variant(resize_to_limit: [100, 100]) %>
```

モデル側でバリアント名を付けて定義して、ビューでは呼び出しのみ行っている例↓
```rb
class User < ApplicationRecord
  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize_to_limit: [100, 100]
  end
end
```
```erb
<%= image_tag user.avatar.variant(:thumb) %>
```

## processed
- `variant`の後ろにつけると既に同じ加工を施したデータがないかを確認し、存在する場合はそれを呼び出す。そのため高速化できる
- ただし、内部に`blob.open`という処理を含んでいるため、ファイルがまだアップロードされていない（`blob`が存在しない）状態だと`ActiveStorage::FileNotFoundError`が出てしまう。  
  その場合の解決方法は主に３つ。2については[こちらの記事](https://zenn.dev/meimei_kr/articles/50138b90cbdde8#%E3%82%A8%E3%83%A9%E3%83%BC%E3%82%92%E8%A7%A3%E6%B6%88%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF%EF%BC%9F)を、3については[Railsガイド](https://railsguides.jp/active_storage_overview.html#%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89)を参照。
    1. `processed`の使用自体をやめる
    2. `blob.open`が実行される前に、BlobがDBに保存されているかチェックする
    3. ダイレクトアップロードを利用する

## metadata[:属性名]
- ファイルのメタデータを取得できる
- 例として、`metadata[:width]`とすればそのファイルの`width`の値が取り出せる
### 参考リンク
[参考記事](https://qiita.com/ma2yama/items/b1f138cf92d4fc6a7635)

## 関連するクラス
### ActiveStorage::Attachment
 - アップロードされたファイル（画像、動画など）とRailsのモデルを繋げる「中間」のオブジェクト
 - たとえば、ユーザーのプロフィール画像や商品の写真など、モデルに関連付けられたファイルがある場合、その関連を管理するのがこいつ
### ActiveStorage::Attached
- Railsモデルにファイルが添付されているかどうかを管理するためのモジュール
- 例えば、ユーザーモデルにhas_one_attached :avatarと書くと、そのユーザーには一つのアバター画像が添付されることになる。Attachedはその添付されたファイルを扱うためのインターフェースを提供する
### ActiveStorage::Blob
- アップロードされたファイルの実際の内容やメタデータ（ファイル名やファイルタイプなど）を持っているオブジェクト
- ファイルの実データはストレージサービス（Amazon S3やGoogle Cloud Storageなど）に保存され、Blobはそのデータへの参照を持っている


## 参考リンク
- [Railsガイド](https://railsguides.jp/active_storage_overview.html)
- [variantについての記事](https://prograshi.com/framework/rails/active-storage_variant/)
- [`processed`についての記事](https://zenn.dev/meimei_kr/articles/50138b90cbdde8)