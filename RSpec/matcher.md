# マッチャーについて

## eq
- `eq(指定の値)`とすることで指定した値に等しいか確認する

## be系
- `be true`：trueかどうか確認する
- `be false`：falseかどうか確認する
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