# データベース関連のコマンドについて

## rails db:migrate:status
どのマイグレーションファイルがup（反映済み）でどれがdown（未反映）なのか、マイグレーションの状況を確認できる。

## rails db:rollback
マイグレーションの状況を巻き戻せる。
`STEP=数値`を末尾につけることで、いくつ前まで戻すか（最新を１として新しい順にいくつdownにするか）指定することができる。

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