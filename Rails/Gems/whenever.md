# wheneverについて

Rubyで書かれたスケジューリングツールで、定期的にRakeタスクやRubyスクリプトなどを実行するためのもの。`cron`とセットで使う。  
（※`cron`：UNIX系のOSに標準で備わっているスケジューリングツール。定期的にプログラムを実行したい場合にそのスケジュールを設定するために使われる。設定は`crontab`というファイルに書く）

## 使いかた
### 導入方法
まずはGemをインストール。Gemfileに以下のように記述し、`bundle install`。
```rb
gem 'whenever', require: false
```
※require: falseはRailsの内部でwheneverを使うわけではないため、Railsの実行時に読み込まないようにするため

次にプロジェクトディレクトリに`config/schedule.rb`を生成する。コンテナ内で以下のコマンドを実行。
```shell
$ bundle exec wheneverize .
```

### 設定ファイルを編集
生成した設定ファイルに実行したいタスクとそのスケジュールを定義する。例えば、毎日午前2時に`db:backup`というRakeタスクを実行するには、次のように書く。
```rb
every 1.day, at: '2:00 am' do
 rake 'db:backup'
end
```

### crontabへの適用
コンテナ内で以下のコマンドを実行すると、システムのcronにタスクが登録される。
```shell
$ bundle exec whenever --update-crontab
```
必要に応じて以下のコマンドも活用。
```shell
# 設定内容にエラーがないか確認
$ bundle exec whenever

# 設定されているcronを見る
$ crontab -l

# crontabの設定削除（定期実行をやめる）
$ bundle exec whenever --clear-crontab
```