# FactoryBotのメソッド
## create
- ファクトリーを指定してオブジェクトを生成しDBに保存する
- `create(:ファクトリー名)`で生成
- データの中身を上書きしたい場合は`create(:ファクトリー名, 属性名: '値')`とすればOK。属性と値はもちろん複数指定できる

## create_list
- ファクトリーを指定して、複数のオブジェクトを一度に生成しDBに保存する
- `create_list(:ファクトリー名, 数)`で生成できる
```rb
# 例
users_list = create_list(:user, 3)
```
### 参考リンク
<https://qiita.com/kodai_0122/items/e755a128f1dade3f53c6>

## build
- `create`のDBに保存しないバージョン