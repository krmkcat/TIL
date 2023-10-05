# 初めて知ったgitコマンド
## リモートのブランチを確認する
```shell
git branch -a
```
- `-a` なしだとローカルのブランチ確認になる

## リモートリポジトリの最新の履歴を取得
```shell
git fetch
```
- `pull`と違ってマージはされない
- 取得したコミットは名前の無いブランチとして取り込まれ、FETCH_HEADという名前でチェックアウトすることができる」
- 実は`pull`は内部で`fetch`＋`merge`をしている

### 参考リンク
https://backlog.com/ja/git-tutorial/stepup/15/