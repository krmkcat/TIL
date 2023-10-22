# マッチャーについて

## have_field
- 条件を満たすフィールドがあるか確認する
- `have_field('フィールド名', with: 値)`とすることで、'値'が入力された'フィールド名'というフィールドがあるかどうかを確認してくれる
```rb
# 例
expect(page).to have_filed('Email', with: other_user.email)
```