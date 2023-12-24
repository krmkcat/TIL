
# 便利なメソッド

## 関連名
- `モデルオブジェクト.関連名`で、対応する`ActiveStorage::Attached`オブジェクトを返す
- 基本的にはこの後ろにさらにメソッドをチェインすることで、`Attached`を介して添付ファイルにアクセスし様々な処理を実行する

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
- `ActiveStorage::Attached`オブジェクトに対して実行すると、対応するファイルのメタデータを取得できる
- 例として、`metadata[:width]`とすればそのファイルの`width`の値が取り出せる
### 参考リンク
- [参考記事](https://qiita.com/ma2yama/items/b1f138cf92d4fc6a7635)

## id
- `ActiveStorage::Attached`オブジェクトに対して実行すると、対応する`ActiveStorage::Attachment`オブジェクトのidを返す

## [n]
- `ActiveStorage::Attached::Manyオブジェクト[数値]`とすると、対応する`ActiveSrorage::Attachment`オブジェクトのコレクションからn番目のものを抜き出せる（もちろん0番始まり）
- (メソッドではない気がするがとりあえずここに載せておく)

## purge
- `ActiveStorage系のオブジェクト.purge`で、対応するファイルとそのメタデータをストレージから削除する
- 基本的には他のメソッド同様`Attached`に対して使うことが多いが、ほか2種に対しても使えるには使える
- とはいえBlobには通常使わない。BlobがAttachmentを介して紐づけられていない場合（どんな状況？）は`blob.purge`も可能

## url_for
- 引数としてBlob（`Attached`でもOK、むしろこちらのほうが一般的）を渡すと、永続的なblob URLを生成できる
### 参考リンク
- [Railsガイド](https://railsguides.jp/active_storage_overview.html#%E3%83%AA%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88%E3%83%A2%E3%83%BC%E3%83%89)