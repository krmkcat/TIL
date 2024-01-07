# マッチャーについて

## eq
- `eq(指定の値)`とすることで指定した値に等しいか確認する

### 参考リンク
- [RSpecのequal, eql, eq, be の違い](https://engineerflies.blogspot.com/2012/06/rspecequal-eql-eq-be.html)

## be系
- `be truthy`：true判定かどうか確認する
  - 厳密に`true`そのものかどうか確認したければ`eq(true)`を使う
- `be falsey`/`be_falsy`：false判定かどうか確認する
  - 厳密に`false`そのものかどうか確認したければ`eq(false)`を使う
- `be_nil`：nilかどうか確認する。アンダーバーが必要なので注意
- `be_empty`：配列や文字列、ハッシュ等が空であるかどうかを確認する
- `be_valid`：オブジェクトがバリデーションに通るかどうか確認する
- `be_invalid`：`be_valid`の逆

## have系

### have_content
- `have_content('文字列')`で、指定の文字列を含む要素が存在するか確認する

### have_field
- `have_field('フィールド名', with: 値)`で、指定の値が入力された指定の名前のフィールドがあるかどうかを確認する
```rb
# 例
expect(page).to have_filed('Email', with: other_user.email)
```

### have_select
- `have_select('セレクトボックス名', selected: 値)`で、指定の値が選択された指定の名前のセレクトボックスがあるかどうかを確認する。
- セレクトボックス名は`id`や`name`属性で指定

### have_selector
- `have_selector('文字列')`で、指定のセレクタを含む要素が存在するか確認する

### have_http_status
- ドライバーによってはサポートしておらず使えないので注意（RackTestなら使える）
- `have_http_status(ステータスコード)`でステータスコードが指定のものであるか確認できる