# 2023.11.18
今日は「記事編集画面で更新・公開ボタンを押したときの挙動を実装」の続きから。

まずは全パターンを列挙。
- [x] 記事のステータスを「公開」または「公開待ち」、公開日時を「未来の日付」に設定して、「更新する」ボタンを押した場合  
--> 記事のステータスを「公開待ち」に変更して「更新しました」とフラッシュメッセージを表示

- [x] 記事のステータスを「公開」または「公開待ち」、公開日時を「過去の日付」に設定して、「更新する」ボタンを押した場合  
--> 記事のステータスを「公開」に変更して「更新しました」とフラッシュメッセージを表示

- [x] 記事のステータスを「下書き」に設定して、「更新する」ボタンを押した場合  
--> 記事のステータスを「下書き」に変更して「更新しました」とフラッシュメッセージを表示

- [x] 公開日時が「未来の日付」となっている記事に対して、「公開する」ボタンを押した場合  
--> 記事のステータスを「公開待ち」に変更して「公開待ちにしました」とフラッシュメッセージを表示

- [x] 公開日時が「過去の日付」となっている記事に対して、「公開する」ボタンを押した場合  
--> 記事のステータスを「公開」に変更して「公開しました」とフラッシュメッセージを表示


一番簡単そうな、「下書きにして更新」からいってみようかな。

更新ボタンを押したときの挙動は、「`admin_article_path`にデータが飛ぶ」だな。対応コントローラとアクションは`
admin/articles#update`.

…ん？これすでにできてるな。ブラウザでやっても普通に成功する。チェック入れて次行く。

ん〜、これどっちのボタンを押すかと更新後のステータスが何になるかで分けて考えたほうがいいのかな。書いてみるか。

- [x] 更新ボタン
  - [x] 公開待ちに変更
    - 公開or公開待ちを選択
    - 未来の日付
  - [x] 公開に変更
    - 公開or公開待ちを選択
    - 過去の日付
  - [x] 下書きに変更
    - 下書きを選択
- [x] 公開ボタン
  - [x] 公開待ちに変更
    - 未来の日付
  - [x] 公開に変更
    - 過去の日付

よし、これで整理された。今一度考えてみよう。
下書きor公開待ちに変更するには`admin/aritcles#update`で、公開にするには`admin/published#update`に飛ばす必要があるから、まずはそこで分岐が入るな。

いやでもそうするとフラッシュがコントローラ準拠で変わっちゃうな…。それはあくまで押したボタンによって変えたいんだけど。
ん〜〜まずは押したボタンごとでロジックくんでみるか。
（もしよそのコントローラのアクション呼び出したい場合は`render 'コントローラ名/アクション名'`でできる）

`admin/publishes#update`の内容をほぼそのままコピペしちゃった。これたぶん切り分けたほうがいいだろうけど、とりあえず動くか試してみよう。

注意：一つのアクション内で複数の`redirect_to`や`render`が存在する（分岐などで）場合、最後の物以外は`redirect_to ... and return`とする、もしくは単に`return`を後に付ける等してそこで処理が終了するようにすること。

更新ボタンを押した場合のロジックほぼできたけど、やっぱり下書き選択しても下書きにならないな。なんで？分岐で下書きの場合を最初に持ってきてみるか。

解決。`enum`の値をどう書くかの問題だったみたい。代入する場合は`:値`だけど、比較演算の場合は`'値'`じゃなきゃダメらしい。

…というわけでロジック自体はできた。けどどう考えてもリファクタリングしたほうがいいのでそれを考える。

ストロングパラメータの値は直接更新はできないんだな。ストロングパラメータの値を変更してからそのパラメータでデータを更新したい場合、一度パラメータを変数に代入してその変数で`update`すればOKみたい。
[参考リンク](https://fuyu.hatenablog.com/entry/2018/11/24/101720)

変更後のステータスが下書きor公開待ちになる場合のコードはだいぶスッキリした。問題は公開になる場合のコードだけど、途中で出てくるフラッシュメッセージだけ変えたい場合どうするのがいいんだろう。

いいや、先に公開ボタン押した場合の挙動を作ろう。

- 日付入力されてない
  - 公開処理
- 日付入力されてる
  - 過去
    - 公開処理
  - 未来
    - ステータスを公開待ちにして更新処理

ん〜〜これやっぱ`admin/publishes`コントローラにパラメータ飛んでないな、ただのリンクだし。てことはそこで飛ばし先を分岐させなきゃいけないのかな。
よし、見本サイトがどうなってるか見よう。

あそっか。公開ボタンはあくまで更新済みの`@article`の内容を反映したうえでステータスを切り替えてるだけだから、普通に`admin/publishes`コントローラで`@article.published_at`を参照して分岐すればいいのか。

あ〜というか更新ボタンの方、公開日時を空欄にして更新するとエラーになっちゃうな。これどうするべきなんだろ。

確認したら見本アプリでもエラー的なものが出るな。これはこのままでいいのか。

過去日付の記事で公開ボタンを押した場合のフラッシュ、「公開しました」にしろって書いてあるけど、これデフォルトの「記事を公開しました」とは別にメッセージだけを用意しなきゃいけないってこと？

確認したら見本だと「公開しました」で統一されとるやんけ…。とりあえず同じにしとこ。

比較演算式に`nil`が含まれてるとエラーになるんだな。どう対処しようか。
分岐を`@article.published_at`への代入の後にすればいいのか。
→無事解決。

ロジックは一通りできたかな。
一旦公開しないとステータス変えられないのは見本見る限り仕様っぽい。

あとはもう少しコードをすっきりさせたいけど、これはあれかな。モジュールに切り出すとかするといいのかな。
`concern`を使ってみるか。

モジュール作ってみた。レッツテスト。

うおおおできた！これで行こう。ネーミングはまあ後で考えてもいいや。

見本アプリでテストしてみてようやくわかった。これやっぱり「公開する」押すまでは反映されないんだ。ステータス「公開」で中身編集して更新しても、実際の公開ページは変わってない。
てことはモジュールとかいらないなたぶん…。

なんかおかしいと思ったら、ステータスが「下書き」のときは更新してもステータスのパラメータが飛ばないんだな。分岐の仕方変えなきゃ。

- 公開日時が空欄でもエラーが出ないのはステータスが「下書き」の場合のみ
- 逆に言うと下書き以外は公開日時が入力されてる前提でOK
- ステータスが現在「下書き」になっている記事は更新してもステータスのパラメータが送信されない

↑のことを念頭に置いて修正しよう。

よしできた。
一応ロボランテくんにリファクタリング頼んでみるか。

あーそうだった、`enum`の特定の値かどうかは自動生成されたメソッドで確認できるわ。
でもさすがに構成が複雑な上に情報が足りないせいでちょっと言ってることおかしいところがあるなロボらんてくん。
もう一個の方もお願いしてみよう。

よし、だいぶスッキリした。とりあえずこれでいいだろう。
もう次行っちゃう。


## タスクの自動化
いよいよ今回の山場だ。もう一回概要をチェックする。

- [x] 記事のステータスが「公開待ち」で公開日時が過去になっているものがあれば、rakeタスクをライブラリ「whenever」により1時間ごとに走らせ、ステータスを「公開」に変更する
(※ 公開日時が過去で「公開待ち」となっているデータを画面上で更新しなくても、自動でステータスを公開に変更するようにしたい)
- [x] 現状、管理画面から1分単位で公開日時を指定できるようになっているが、1時間ごとに指定できるように変更する
(自動更新するcronの実行間隔が1時間毎なので、分単位で設定しても更新できないため)

まずは２つ目からやろうかな。フォームのコードを確認。

フォームオブジェクトの`as:`オプションはハッシュのキー名を指定してるんだな。

公開日時は`datetimepicker`っていう何かを使ってカレンダー選択式にしてるらしい。それの設定をいじれば1時間単位に変更できそう。

お、`assets/javascripts/admin.js`にそれっぽい箇所がある。

よしできた！
さあ今度こそ新要素バリバリの山場だ。やり方を調べよう。
…の前に一度コミットしとこうかな。メッセージは「記事ステータスに”公開待ち”を追加、記事更新・公開時の挙動を修正、公開日時の指定単位を1h事に変更」で。

コミットOK。
ロボらんてくんにざっくりと簡単にやり方をきいたところ次の回答。

>wheneverはRubyで書かれたスケジューリングツールで、定期的にRakeタスクやRubyスクリプトなどを実行するためのものだよ。>Railsプロジェクトでwheneverを使うには、まず以下の手順で設定するカナ。  
>
>1. Gemfileにwheneverを追加して、bundle installを実行してね。
>```rb
>gem 'whenever', require: false
>```
>2. インストールが完了したら、ターミナルでwheneverize .を実行して、プロジェクトディレクトリにconfig/schedule.rbファイルを生成するダ。  
>config/schedule.rbファイルを編集して、実行したいタスクとそのスケジュールを定義する。例えば、毎日午前2時にdb:backupというRakeタスクを実行するには、次のように書くカナ。  
> ```rb
>every 1.day, at: '2:00 am' do
>  rake 'db:backup'
>end
>```
>3. スケジュールを設定したら、crontabへの適用はwhenever --update-crontabを実行することで行える。これでシステムのcronにタスクが登録されるダ。  
>もしスケジュールを確認したいなら、wheneverコマンドを実行すると、現在のschedule.rbの内容がcron形式で出力されるからチェックしてみて。  
>  
>これで基本的なwheneverの設定は完了だよ。細かいスケジュールの設定やオプションについては、wheneverのドキュメントを参照してみてね。

わかりやすい。rakeタスクの作成方法についても訊いてみた。回答は以下。

>Rakeタスクを作成するには、Railsアプリのlib/tasksディレクトリに.rakeという拡張子を持つファイルを作成するんだ。以下はその手順だよ。
>
>lib/tasksディレクトリに新しいファイルを作成する。ファイル名はタスクに関連した名前でいいよ。例えばbackup.rakeとしよう。
>
>作成したファイルにRakeタスクを定義する。以下はdb:backupという名前のタスクを定義する例だね。
>```rb
>namespace :db do
>  desc "Back up the database"
>  task backup: :environment do
>    puts "Database backup started..."
>    # データベースバックアップのスクリプトをここに書く
>    puts "Database backup completed."
>  end
>end
>```
>タスクを実行してみたい場合は、ターミナルで以下のコマンドを使うよ。
>```shell
>rake db:backup
>```
>これでRakeタスクが作成できたし、実行もできるようになったはずだ。自分でタスクの中身を書く時には、実行したいスクリプトやRailsのモデルを使った処理を記述してみてね。

よし、概ねわかったので今度は記事を参照して合ってるか・抜けがないか確かめよう。
- [whenever参考リンク](https://qiita.com/mmaumtjgj/items/19e866f31541abb6c614)
- [whenever公式ドキュメント](https://github.com/javan/whenever)
- [rakeタスク参考リンク](https://qiita.com/mmaumtjgj/items/8384b6a26c97965bf047)

まずrakeタスクを作成してみる。コンテナ内で`rails g task タスク名`だな。タスク名は"publish_articles"にしよう。

合ってるかはわからないけどいちおうできた。
今日はここまで。明日は`find_each`のまとめとか`where`のおさらいとかをTILに書くところから始めよう。

# 2023.11.19
宣言通り`find_each`と`where`のことをTILに投下するところから始める。

OK。課題に戻る。
昨日作ったrakeタスクをもう一度確認して、良さそうなら`whenever`のインストールをしよう。

…の前に`whenever`についてまとめてTILに投下。

よし、今度こそインストール始める。
…と思ったけどよく見たらすでにGemfileに載ってた。念のため`bundle install`はしておくか。

ひょっとしてと思って探したら`config/schedule.rb`もすでにあった。さっそく設定を書いていこう。

参考にした技術記事だと結構いっぱい設定書いてたけどあれはいるんだろうか。
公式ドキュメント書いても載ってないし、必須ではない感じかな。
あと公式ドキュメント見てて`whenever-test`なるものを発見。もしかしたらテスト作るのに必要になるかもしれないので覚えておこう。

よし！たぶんできたので、設定内容にエラーがないか確認してみる。

「Above is your schedule file converted to cron syntax; your crontab file was not updated.」てメッセージ出たけどこれできてるのか？

`$ cron -l`してみたら、できてるっぽい。
とりあえず今回は先にお手本テストコードをダウンロードして先に走らせてみるか。ブラウザじゃ確認できないからちゃんとできてるかチェックしたい。

やってみた。rakeタスクにsyntax errorが出てるな。

修正OK。
けどまた一つエラーが出てるな。「ステータスが下書き以外のときに公開日時を過去にして更新を押したとき、ステータスが公開になってない」らしい。スクショ確認する。

確かに「公開」になってないな。コード確認しよう。

ん〜〜ぱっと見わからん…。ブラウザからテストしてサーバーログ見よう。

！？
なんか…今日の4時まではOKなのに5時以降にするとだめだ。なにこれ？

ひょっとして適切に日時を比較するために型変換が必要？パラメータに入ってるの文字列だよね？

これっぽいな。  
[参考リンク](https://zenn.dev/k_kind/articles/1538aac0efcf17)

やってみたらできたー！日時はほんとめんどくさいな…。  
**日時の比較をするときは、型とルールをきちんと合わせる。**  
気をつけよう。

**`@article.published_at`はTimeWithZoneオブジェクトなんかい！**
あーでも確かにDB上でdatetime型だもんな…。パラメータに入ってるのは文字列だけど、DBに格納されてるのはdatetime型（おそらく自動でTimeWithZoneに変換されてる）と。ややこしい…。  
これ一回まとめたいけど初学者には複雑すぎるかなー。

ともあれテストは通った。
ので、ちょっと変な感じだけどここから自分でテストを書いていく。

## RSpec
`whenever`関係はスルーしてOK（ただしrakeタスクはテストすること）とのことなのでそのように。
まずは更新と公開関連から作っていこう。

…の前に一回コミットしとこ。コミットメッセージは「”ステータスが公開待ちの記事のうち公開日時が過去になっているものがあればステータスを公開に変更する”というタスクを1h毎に自動で行うよう設定」で。

さて、specフォルダを丸ごと古いのと入れ替えるか。
…と思ったらあ〜しまった。コマンドで消しちゃったから残ってないや。しかたない、お手本を戻そう。で、それとは別で作ってみよう。

結局一つ前の課題のお手本コードを展開し直した。
作っていく。

### 更新と公開関係
全パターンをコピペ。

- [x] 記事のステータスを「公開」または「公開待ち」、公開日時を「未来の日付」に設定して、「更新する」ボタンを押した場合  
--> 記事のステータスを「公開待ち」に変更して「更新しました」とフラッシュメッセージを表示

- [x] 記事のステータスを「公開」または「公開待ち」、公開日時を「過去の日付」に設定して、「更新する」ボタンを押した場合  
--> 記事のステータスを「公開」に変更して「更新しました」とフラッシュメッセージを表示

- [x] 記事のステータスを「下書き」に設定して、「更新する」ボタンを押した場合  
--> 記事のステータスを「下書き」に変更して「更新しました」とフラッシュメッセージを表示

- [x] 公開日時が「未来の日付」となっている記事に対して、「公開する」ボタンを押した場合  
--> 記事のステータスを「公開待ち」に変更して「公開待ちにしました」とフラッシュメッセージを表示

- [x] 公開日時が「過去の日付」となっている記事に対して、「公開する」ボタンを押した場合  
--> 記事のステータスを「公開」に変更して「公開しました」とフラッシュメッセージを表示

FactoryBotはUserとArticleはあるから、新たにCategoryをつくらなきゃだな。

よし、できた。
早速テストコードを書こう。

とりあえずステータスを下書きにして更新したパターンを書いてみた。試しに走らせてみる。

エラーの嵐。公開日とカテゴリーが必須だった。修正。

よ〜やく下書きパターンのテストが成功。ステータスが下書きになってるときは状態の欄がフィールドでもセレクトボックスでもないってことに気づくのに時間がかかった。  
結局`within`を使ってやったけど、それも指定したセレクタがないって言われまくって苦戦した。なんで無いって言われたかは未だによくわからない。
次、未来の日付で更新のパターン。

よっしうまく行った！
ロボらんてくんが教えてくれた`have_select`マッチャーについてTILに投げておこう。
あと「１日後」とか「１日前」とかをどうやって指定するか調べる。

- 日付に関するメソッド  
[Railsドキュメント](https://railsdoc.com/page/date_related)  
[参考リンク](https://fuchiaz.com/ruby-rails-time-date/#TimeWithZone-2)

OK！日付指定もうまく行った。
公開日時が過去のパターンも同じように作っていく。

よし！更新パターンは全部OK！
次に公開パターン。

未来の日付パターンOK！あとは過去の日付パターンのみ。

OK〜〜！できた！
なので後はrakeタスクのテストだ。

### rakeタスク
まずどうやるのか調べよう。

この記事を参考にしよう。  
[参考リンク](https://qiita.com/mmaumtjgj/items/fe63725571f2a97d6cb7)

ロボらんてくんにも訊いた。以下回答。少し記事と違うところがあるな。
>RSpecでrakeタスクの動作を確認するには、まずspec/tasksディレクトリを作成して、その中にタスクごとのテストファイルを用意するかな。以下はrake my_namespace:my_taskというタスクのテストの例だよ。
>
>spec/tasks/my_namespace_my_task_spec.rb
>```rb
>require 'rails_helper'
>require 'rake'
>
>RSpec.describe 'my_namespace:my_task' do
>  before do
>    Rake.application.rake_require 'tasks/my_task', >[Rails.root.to_s]
>    Rake::Task.define_task(:environment)
>  end
>
>  it 'my_taskが期待通りの動作をすること' do
>    task = Rake::Task['my_namespace:my_task']
>    task.invoke
>    # ここにタスクの結果を確認するためのコードを書く
>  end
>end
>```
>テストを書いたら、rspecコマンドで実行して結果を確認するんだ。タスクの中でデータベースなどの外部環境に依存する処理がある場合は、モックやスタブを使ってテストを書くといい。それでタスクの動作確認ができるはずだナ。

まずは`rake_helper.rb`の用意。
中の設定コードの意味は正直理解しきれてないけど、とりあえず今はよし。

次にspecファイルを用意する。ここはロボらんてくん方式で`spec/tasks`ディレクトリを作成してそこに`articles_publish_spec.rb`を作ることにする。

できた。今日はここまで。明日はファイルの中身を作っていく。

# 2023.11.20
rakeタスクのテストファイルを作る。

この記事も参考にしよう。  
[参考リンク](https://dev.classmethod.jp/articles/ruby-on-rails_rspec_rake_test/)

見様見真似でとりあえず作ってみたのでさっそく走らせてみよう。

SyntaxErrorだ。ロボらんてくんに教えてもらったコードの中の'>'が引っかかってるな。
`rake_helper`に記述したコードがあればそこのコードが要らない気がするので消してみる。
あと`Rake::Task.define_task(:environment)`もいらないっぽい。というかそのためにわざわざ`rake_helper`を作ってあのコードを書いてたんだな。

よし、整理した。結局最初に見た記事の通りになったな。これでもう一回走らせてみよう。

よーし全部書けたし通った！今度こそプルリクする。

Lintチェックで引っかかったんだけど、3つ中2つは知らないやつだ。まず分かるやつを先に直してから、ほか2つが何なのか調べよう。

`Metrics/AbcSize: Assignment Branch Condition size for update is too high.`については、どうやら「（縦に）長すぎ！」ってことらしい。
`admin/articles/publishes`コントローラの`update`アクションが冗長すぎるってことみたいね。なるほどここでFatControllerの解消っていうテーマが出てくるわけか。

`Metrics/PerceivedComplexity: Perceived complexity for update is too high.`については、「分岐多すぎ複雑過ぎ！」ってことらしい。
同じく`admin/articles/publishes`コントローラの`update`アクションが引っかかってるな。

まあ要するに「`admin/articles/publishes`コントローラの`update`アクションをもっと簡潔に！」ってことだな。ロボらんてくんの力も借りつつダイエットに励むか。

## updateダイエット
まずこのupdateアクションの構成としては、

- 公開日が過去か未来かで分岐
- 更に保存成功パターンと失敗パターンで分岐

ってことで4つに枝分かれしてる。これ自体は多分これ以上減らせないので、切り出せるとこ切り出してこいう。
今日はここまで。明日はひたすらダイエット！

# 2023.11.21
宣言通り今日はPublishesコントローラのダイエット敢行。
まず日付が過去の場合の処理と未来の場合の処理をそれぞれメソッドとして切り出してみるか。

できたので再プッシュしたところ、`UselessAssignment: Useless assignment to variable`というLintエラーが。
意味としては、「使われてないローカル変数があるよ（いらないから消してね）！」ということのよう。`publish_with_state`メソッドの中で`self.body = ...`を`body = ...`と`self`を略して書いたため、`body`がローカル変数だと思われたらしい。`self`の省略ルールちゃんと把握できてないなあ。  
とにかくここはさずに書いてみよう。

今度は「RedundantSelf: Redundant `self` detected.」、つまりいらん`self`が入ってるよ！と言われた。ちなみにさっきどう直したかは以下の通り。
```rb
# 修正前
body = build_body(self)

# 修正後
self.body = self.build_body(self)
```
どうも`build_body`のほうの`self`はいらないらしい。どういう基準？？と思ってたら[こんな記事](https://www.te-nu.com/entry/2017/02/26/180550)を見つけた。
どうやらセッターメソッドを呼ぶときだけは`self`をつけないとダメ、それ以外は省略可ということらしい。

セッターメソッドとは、インスタンス変数の内容を更新するためのメソッドのこと。上記で言う`body =`がそう。ちなみにゲッターメソッドはその逆で、インスタンス変数の内容を取得するメソッド。
なるほどようやく`self`の省略ルールがわかった。  
[こちらの記事](https://qiita.com/k-penguin-sato/items/5b75be386be4c55e3abf)も参考に。

**LGTM！**
やった〜。今日はここまでにして、次回は復習だ。

## 2023.11.23
復習に入る。まずは復習ポイントをチェック。

- 更新・公開まわりのロジックの書き方チェック

記事のステータスを何に変更するか判定するメソッドをモデルに実装してるな。  
あと公開時のメッセージ切り替えの方法はあれであってたらしい。

### 本編の修正

まずArticleモデルの修正から。
- `publishable?`メソッドの実装
- scope:`past_published`の実装
- メソッド`adjust_state`の実装
- 成功メッセージ切り替えメソッドのメソッド名変更
- 不要になったメソッドの削除

次に`admin/Articles`コントローラの修正。
- 更新メソッドの修正

`assign_attributes`っていうメソッドは知らなかった。TILに投げとこう。

次、`admin/Articles/Publishes`コントローラの修正。
- `update`メソッドの修正

よし、本編の修正は完了。  
次はRakeタスク。

### Rakeタスクの修正
- `where`で絞り込んでいた部分を`past_published`に変更
- ブロックをProcに変更しショートカット記法を使用
- namespaceとタスク名を変更
- `config/schedule.rb`の修正
  - namespaceとタスク名を変更に合わせて修正
  - 実行タイミングの表記を修正  
    `every 1.hours`は`every :hour`と書ける
  - 書いていなかったごちゃっとした設定を追記

RSpecはまあだいたいOKかな。
`モデル名複数形.属性名複数形.values.sample`っていう書き方は覚えておこう。

よし、修正完了！これにてRails応用4クリア〜。  
あとは今回初出のrakeタスクおよびwhenever/cronについて簡単にまとめておかなくちゃ。  
…と思ったら、`whenver`はもうあった。さっきの設定の部分だけ加筆したらrakeタスクのまとめに移ろう。

まとめ終了。こんどこそ完了！

