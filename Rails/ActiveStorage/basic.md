# 基本的な使い方

## ActiveStorageとは
クラウドストレージサービスへのファイルのアップロードや、ファイルをActive Recordオブジェクトにアタッチする機能を提供する。開発及びテスト環境ではクラウドストレージサービスの変わりにローカルディスクを利用することもできる。

## 導入方法
[Railsガイド](https://railsguides.jp/active_storage_overview.html)を参照

## ファイルをレコードに紐づける方法
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
### イメージ的には…
Attachedに「このファイル〇〇したいんだけど」って言うと裏でBlobやAttachmentとなんかいい感じに連携してストレージ上にあるファイルの実体をどうこうしてくれる

## signed_idとは
URLの生成等に使う推測しづらいid。uuidのようなもの。直接Blobにアクセスするのではなく`signed_id`を使って参照するようにするとより安全。


## 参考リンク
- [Railsガイド](https://railsguides.jp/active_storage_overview.html)
- [variantについての記事](https://prograshi.com/framework/rails/active-storage_variant/)
- [`processed`についての記事](https://zenn.dev/meimei_kr/articles/50138b90cbdde8)