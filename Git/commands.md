# コマンドについて

## ブランチを強制削除する
```shell
$ git branch -D ブランチ名
```
- ちなみに`-d`だと、対象のブランチがリモートブランチにプッシュおよびマージ済みの場合のみ削除を実行する。
- `-D`は本当に無条件での強制削除なので使う際は注意。

## 2つのブランチを一本の更新ログに統合する
```shell
$ git rebase ベースにする方のブランチ名
```
- ちなみに`git rebase`は複数のコミットを一つにまとめるという機能も持つ。
- 更新ログを一本化せずに統合する場合は`git merge` を使う

## 直前のコミットメッセージを修正する
```shell
$ git commit --amend -m '新しいコミットメッセージ'
```

## リモートのブランチを確認する
```shell
$ git branch -a
```
- `-a` なしだとローカルのブランチ確認になる

## リモートリポジトリの最新の履歴を取得
```shell
$ git fetch
```
- `pull`と違ってマージはされない
- 取得したコミットは名前の無いブランチとして取り込まれ、FETCH_HEADという名前でチェックアウトすることができる」
- 実は`pull`は内部で`fetch`＋`merge`をしている
### 参考リンク
https://backlog.com/ja/git-tutorial/stepup/15/

## ローカルのブランチ名を変更する
名前を変更したいブランチに移動したうえで以下のコマンドを実行。
```shell
$ git branch -m 変更後の名前
``````