# 2023.12.08
ブランチ切ったのでまずは概要把握。

いまいちイメージしづらいので、見本アプリで実際に埋め込みをやってみる。

TwitterもYoutubeもURL貼り付ければ埋め込める状態にすればいいわけだ。
TwitterのURLはコピペしたら普通に`X`じゃなくて`twitter`になってたけどこれは課題のアップデートより後にまた仕様がかわったとかか？

とにかく現状把握から始めるか。関係するモデルやビューを見てみよう。

`Embed`モデルを見てみた。`enum`にtwitterを追加するのはまず1つやらなきゃいけないことだな。

次はビューを見てみるか。

simple_formの`collection`って`collect`でもいいの？！知らんかった…。  
ほかに特に変わったところはないかな。

次、ブロックの表示パーシャル。
`_insert_block.html.slim`がブロックタイプ選択画面で、`_edit_embed.html.slim`が埋め込みメディア編集画面で、`_show_embed.html.slim`が同表示画面かな。

おおまかな実装方針としては、
- モデルの修正
- アイコンの修正
- Twitter表示用のビュー作成
って感じかな。

もうちょい細かくすると、
- [x] モデル
  - [x] enum
- [ ] ビュー
  - [ ] アイコン
    - [ ] ブロックヘッダー
    - [ ] ブロックタイプボタン
  - [x] `show_embed.html.slim`の分岐処理
  - [ ] Twitter表示用ビューの作成

こんなもんか。

モデルのenumは追加したから、ついでにロケールも追加してしまおう。

よし、次は分岐処理行くか。

OK。続いて表示用ビューの作成。まずYoutubeのをコピペして、それからTwitter埋め込みのやり方調べて修正しよう。

とりあえずビューファイル作ったけど、見本アプリのHTMLと見比べてもいまいちどうなってるのかよくわからんなあ。`iframe`ってやつがなんか関係してそう。まずこっちを調べてみるか。

インラインフレーム要素！なるほど。ページ内に別のページを埋め込むためのタグだったのか。

今日はここまで。明日は表示用ビューの作成の続きをやる。

# 2023.12.09
表示用ビュー作成の続き。今度こそTwitter埋め込みのやり方を調べる。 

ん〜〜ネタバレっぽい記事が多くて開くの躊躇するなあ。埋め込み用のリンクがどんな構成なのか知りたかったんだけど、見本アプリ見るか。

X公式にやり方載ってたので試した。生成されたURLが以下。
```html
<blockquote class="twitter-tweet">
  <p lang="ja" dir="ltr">
    【悲報】データサイエンティストの仕事が残念になってる件について。
    <br><br>
    ロースキル案件の魔の手がデータサイエンティストにも伸びたんですかね。
  </p>&mdash; ひさじゅ@Web系転職に強いプログラミングスクールRUNTEQ (@hisaju01)
  <a href="https://twitter.com/hisaju01/status/1732625835067322395?ref_src=twsrc%5Etfw">December 7, 2023</a>
</blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

ん〜見本とは違うな。  
素のツイートURLは`?`の直前までっぽい。`https://twitter.com/hisaju01/status/1732625835067322395`だな。

あ〜なるほど！`<blockquote>`の部分が実際にブラウザで表示されるときは`<iframe>`に置き換えられるんだ！（[参考記事](https://ameblo.jp/personwritep/entry-12622203736.html)）  
`<p lang...>`から`(@hisaju01)`までは代替テキストとかかな？…いやそういうわけでもないか？  
とにかく試しにこのコードを実際に表示するとどう変わるのか見てみたいな。

できた。実際に表示したときのコードが以下。
```html
<div class="twitter-tweet twitter-tweet-rendered" style="display: flex; max-width: 550px; width: 100%; margin-top: 10px; margin-bottom: 10px;">
  <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 949px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=e30%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1732625835067322395&amp;lang=en&amp;origin=file%3A%2F%2F%2FUsers%2Fmanaha%2FProjects%2F36477_krmkcat_runteq_curriculum_advanced%2Fapp%2Fviews%2Fshared%2Ftest.html&amp;theme=light&amp;widgetsVersion=b2c2611296916%3A1702048662315&amp;width=550px" data-tweet-id="1732625835067322395"></iframe>
</div>
```

URLがクソ長いのはいらんパラメータがいっぱいあるからかな。そこ削ればいけそう。  
あと見本だと`<scrypt async...>`が一つ上の要素である`<div class="box-body">`に入ってるんだけど、こいつがどこで生成されてるのかわからん…。

とにかく一旦どのパラメータが要らないのか確認するか。

見本のコード↓
```html
<div class="twitter-tweet twitter-tweet-rendered" style="display: flex; max-width: 550px; width: 100%; margin-top: 10px; margin-bottom: 10px;">
  <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 485px; height: 628px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1733002873846595967&amp;lang=en&amp;origin=https%3A%2F%2Frunteq-advanced-curriculum.herokuapp.com%2Fadmin%2Farticles%2F20ff2c3b-1908-486e-bbcc-1015bf0d32ef%2Fedit&amp;sessionId=517f43a9eb43121a9f9ff175d19805c1302d1179&amp;theme=light&amp;widgetsVersion=b2c2611296916%3A1702048662315&amp;width=550px" data-tweet-id="1733002873846595967">
  </iframe>
</div>
```

自分で生成したコード再掲↓
```html
<div class="twitter-tweet twitter-tweet-rendered" style="display: flex; max-width: 550px; width: 100%; margin-top: 10px; margin-bottom: 10px;">
  <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 949px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?dnt=false&amp;embedId=twitter-widget-0&amp;features=e30%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1732625835067322395&amp;lang=en&amp;origin=file%3A%2F%2F%2FUsers%2Fmanaha%2FProjects%2F36477_krmkcat_runteq_curriculum_advanced%2Fapp%2Fviews%2Fshared%2Ftest.html&amp;theme=light&amp;widgetsVersion=b2c2611296916%3A1702048662315&amp;width=550px" data-tweet-id="1732625835067322395">
  </iframe>
</div>
```

`<div class="twitter-tweet...`のオプションは同じだな。ここはいじらなくてよし。

…これやっぱり`<iframe>`じゃなくてさっきの`<blockquote>`の状態で書くべきなんじゃ？？それかURLの部分だけ簡略化して書くのか？？

というかそもそもYoutubeの方はどうやってるんだ？

そうだった〜〜現状はURLじゃなくてIDを入力する方式になってるんだった！だからああなってるんだ。
てことはまずTwitterよりもYoutubeの改修を先にやったほうがいいかも。ヒントになるし。そうしよう。

入力されたURLからIDだけ抜き出して保存すればよさそうだよね。まずそれを試してみよう。

例として、`https://www.youtube.com/watch?v=y3nqSfGwLEg`から`y3nqSfGwLEg`を抜き出す。  
…か、あるいは`https://www.youtube.com/watch?v=y3nqSfGwLEg`を`https://www.youtube.com/embed/y3nqSfGwLEg`に変えるか。  
まあでもTwitterと揃えなきゃいけないこと考えると前者のほうがいいかな。ID抜き出し方式でまずはやってみよう。デコレーター使うのがいいのかな？

`active_decorator`というGemを使っているらしい。こいつの使い方を調べてみる。  
[公式ドキュメントの翻訳記事](https://note.com/emetselch1984/n/n09cb62606516)があった。  
`rails g decorator embed`してみよう。

ダメだまじで頭働かない…URLからIDを抜き出す方法が全然組み立てられない。

もう手っ取り早くロボらんてくんに訊いた。以下解答。

>そのURLからYouTubeのビデオIDを抜き出すにはRubyの正規表現を使えばいいね。以下のようなコードを書くと、y3nqSfGwLEgを抜き出せる。
>
>```rb
>url = 'https://www.youtube.com/watch?v=y3nqSfGwLEg'
>video_id = url[/v=([^&]+)/, 1] # => "y3nqSfGwLEg"
>```
>この正規表現はv=の後に続くどんな文字列でも&にぶつかるまでをキャプチャするんだ。そして、そのキャプチャされた部分がビデオIDになるんだね。

さすが〜。後ろにパラメータがついててもいいように「`&`にぶつかるまで」っていう条件まで勝手につけてくれた。  
正規表現については後から時間取って確認することにして、今はとりあえず進めてしまおう。

あ、投稿時のURL形式が想定してたのとは別だった。そっちに変えなきゃ。

ん〜？？見本だとURLの形式が違っても普通に投稿できるなあ。ってことはID抜き出し方式じゃないのかやっぱり？？

いやでもやっぱりそれしかやりよう無い気もする…複数パターンのURL形式に対応すればいいのか？

ロボらんてくんに訊いてみた。以下解答。

>そういう場合も正規表現を使って対応できるよ。たとえばこんな感じでコードを書けば、どちらのURL形式からもビデオIDを抜き出せる。
>
>```rb
>url = 'https://youtu.be/y3nqSfGwLEg?si=2coOJrfv6cjXetmQ'
>video_id = url[/youtu\.be\/([^?&]+)|v=([^&]+)/, 1] || url[/youtu\.be\/([^?&]+)|v=([^&]+)/, 2]
>```
>この正規表現はyoutu.be/の後に続く文字列と、パラメータv=の後に続く文字列の両方にマッチするようになっているから、どちらのURL形式でも対応できるってわけだ。

あいかわらず正規表現の意味についてはわかってないけどそれは後回しにする。まずはこのコードでやってみよう。

ええ〜？？なぜか`to_id`メソッドが使えない…`undefind`とか言われる…デコレーターじゃダメならと思って普通にモデルに定義したのに。なぜ？？

お、メソッドとして切り出さずに普通に素で書いたら行けた。とはいえこれは絶対良くないのでどうにかしなきゃ。

あそっかよく考えたらデコレーターにしろモデルメソッドにしろレシーバはモデルオブジェクトそのものじゃなきゃダメじゃん。それだ。

あ〜できたーーー。やばいわほんとありえないミスとか勘違いが多すぎる。寝不足が続きすぎてるんだなたぶん…。勉強時間よりまず睡眠時間優先しなくちゃだなしばらくは。

ともあれ今は進めよう。今度こそTwitterだ。

さっきの記事見る感じ、やっぱり`<blockquote>`じゃなくて`<iframe>`を直接書くべきに思える。そっちでいこう。

まずはもうURLだけTwitterの形式に変えてほかはYoutubeのコードそのまま流用してやってみよう。

URL、パラメータ全部抜きにしたら`"https://platform.twitter.com/embed/id=ここにID"`でいいのでは。やってみよ。

う〜んエラーが出て止まったりはしないけど"AccessDenied"って出たな。なにが問題だろう。  
わからんのでとりあえずTwitterバージョンの`<iframe>`タグのほうをパクってみるか。

お、なんかちょっと変わった。"AccessDenied"は出ずになんか枠だけが出てる。

今度はなーぜかルーティングエラー。なんでだよ…ルーティングに関わる部分なんもいじってないよ…。

なんかごちゃごちゃやってたけど急にできた！！`content_tag :iframe`のあとに`, nil`が必要だったらしい…なんでかは知らん。今はそこ追究する気力もない…あとでやる。

課題ページ見直して、Youtubeのリンクは共有ボタン押したときのほうでOKとわかったのでそこを直す。

よし、アイコン行く。

できた！一旦見本テストコード落として走らせてみよう。

よし！要件は満たせてる。一旦ここでコミットしとこう。

## RSPec
さてテストに移る。一つ前の課題の分に戻して、早速書き始めよう。

今日はここまで。明日はテストコード作成の続きから。