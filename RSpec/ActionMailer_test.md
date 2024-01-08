# ActionMailer周りのテストについて

ActionMailerを使ったメール送信機能のテストは、 大まかに以下のような流れになる。
1. テスト対象となる変数(`subject`)を用意し、メール送信のメソッド（返り値は送ったメールの情報そのもの）を代入
2. それを使って`expect`を書く

以下は一例。
```rb
RSpec.describe ArticleMailer, type: :mailer do
  let(:mail) { ArticleMailer.report_summary.deliver_now }
  let(:check_sent_mail) {
    expect(mail.present?).to be_truthy, 'メールが送信されていません'
    expect(mail.to).to eq(['admin@example.com']), 'メールの送信先が正しくありません'
    expect(mail.subject).to eq('公開済記事の集計結果'), 'メールのタイトルが正しくありません'
  }

  # 省略

end
```
また、メール本文の内容についてテストする場合は、`eq`ではなく`match`を使う。`body`には本文だけでなく他の情報も含まれているため。
また`to`や`from`の中身は配列になっていることにも注意が必要（どちらも複数になりえるため）。

## Rakeタスクとしてテストしたい場合
メールの情報を以下のように取得する。

1. `Rake.application['namespace:タスク名']`を変数に代入
2. `変数.invoke`でタスクを実行
3. `ActionMailer::Base.deliveries.last`で最後に送ったメールの情報を取得

`invoke`の返り値がメール情報にならないため、改めて情報を取得する必要がある。

## 参考リンク
- [Rails6のActionMailer機能をRSpecでテストする方法](https://qiita.com/hiroki_tanaka/items/f8c7759682539d7330cd)