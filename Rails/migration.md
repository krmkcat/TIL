# マイグレーションについて

## rails db:resetとrails db:migrate:resetの違い
- `rails db:reset`
  - スキーマファイルを元にして行う。マイグレーションファイルは関係ない
  - テーブルを一度消して作り直す
  - シードファイルの再読み込みも行う
- `rails db:migrate:reset`
  - テーブルを一度消して作り直す
  - その後、`rails db:migrate`を実行する。つまりマイグレーションが1から再度行われる
  - シードファイルは読み込まない
### 参考リンク
<https://qiita.com/ken_ta_/items/9d2dd0d032f530311d2a>