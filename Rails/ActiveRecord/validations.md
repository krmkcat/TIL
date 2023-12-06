# バリデーションについて

## `numericality`
- `numeriality: true`とすることで、属性に数値のみが使われていることをチェックする
- デフォルトでは`nil`は許容されない。許容したければ`allow_nil: true`オプションを使うこと
- オプションを使って数値の内容にも制約をかけられる。以下例
  - `greater_than`：指定の値より大きくなくてはならない
  - `greater_than_or_equal_to`：指定の値以上でなくてはならない
  - `less_than`：指定の値より小さくなくてはならない
  - `less_than_or_equal_to`：指定の値以下でなくてはならない
  - `in(最小値..最大値)`：最小値以上、最大値以下でなくてはならない
```rb
# 例
validates :width, numericality: { in(100..999) }, allow_nil: true
```
### 参考リンク
[Railsガイド](https://railsguides.jp/active_record_validations.html#numericality)

## `allow_blank`
- 空欄（つまり`nil`）を許容するかどうかを設定できる
- オプションによってはデフォルトでこれが`false`になっていることがある