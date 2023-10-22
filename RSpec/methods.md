# RSpecで使うメソッドについて

## create_list
- Factory Botのメソッド
- ファクトリーを指定して、複数のオブジェクトを一度に作ることができる
- `create_list(:ファクトリー名, 数)`で生成できる
```rb
# 例
users_list = create_list(:user, 3)
```
### 参考リンク
<https://qiita.com/kodai_0122/items/e755a128f1dade3f53c6>

## accept_confirm
- Capybaraのメソッド
- `expect(page.accept_confirm).to eq('確認メッセージ')`とすることで、メッセージ内容の確認とOKボタンの押下を同時にやってくれる
```rb
# 例
expect(page.accept_confirm).to eq "本当に削除しますか？"
```
### 参考リンク
<https://www.rubydoc.info/github/jnicklas/capybara/Capybara/Session:accept_confirm>
<https://qiita.com/st5e_jp/items/37b3fbfc7ec747f13e8f>