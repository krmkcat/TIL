# 開発ログ

## 2023.12.31
ブランチ周りがごちゃっとしてしまったので一から作り直すことに。`rails new`→GitHub連携→Renderでデプロイまで済。
旧ディレクトリから諸々移植する。

移植OK！コミットプッシュしてmainブランチに反映まで済。
次は結果ページを作る。…か、もしくは`game_play.html.erb`のままで表示だけ変えてもいいかも。JSとRailsで変数の受け渡しみたいなことってできるんだろうか。

sessionを使えばできるっぽいけどなんかよくわからんな…。

[JavaScriptでページ遷移＆値渡し！5つの使い方を徹底解説](https://jp-seemore.com/web/4885/)

URLパラメータが一番簡単そう。

一応できた！けどURLいじれば結果いじれちゃうと思うとちょっと微妙だよな〜。というわけで`sessionStorage`を使ってみようと思う。受取もJSになっちゃうけど。

おしできた！見栄え的にこのほうがいいな。

今の時点で直したいところ
- タイムアップ後もボタンが押せてしまう
- ブラウザバックしたときにタイムアップ直前の状態のままになっている
- 猫ケツをクリックしたときに動かしたい

# 2024.1.2
今日はクリック時にケツを動かす。ただそのためにはまずCSS設定しなきゃいけないんよなー。
SCSSはわからんからとりあえず普通のCSSかいてみるか。というかまずHTMLを整えなきゃか。

# 2024.1.4
現状ビューファイルにベタ書きしているJavaScriptを別ファイルに切り出すべく、Import mapについて調べた。

- [Rails 7.0 で標準になった importmap-rails とは何なのか？](https://zenn.dev/takeyuwebinc/articles/996adfac0d58fb)

デフォルトの設定を活かして、`app/javascript/controllers`を作ってその中に`games`コントローラ用のJSファイルを作ってみよう。

うん、なんとなく予想はしてたけどうまくいかないな。特定のビューで特定のJSファイルだけをピンポイントで読み込む方法を調べてみよう。
正直importmapはめんどくさそうだから、普通にバンドルするタイプのほうが良さそうな気がする。

確認したらSprocketsが入ってるっぽい。ので、`app/assets/javascripts`を作ればそこに入れてビューで読み込めるかも？

できた〜！わざわざ`app/assets/`にディレクトリ作る必要なかった。Rails7ではSprocketsもデフォルトで`app/javascript/`を読み込むようになってるんだ！で、読み込みたい場所で`<%= javascript_include_tag 'ファイル名' %>`すればOKと。  
ただ、今回は超ミニアプリだからこれだけでいいけど、もうちょいちゃんとしたのを作るときは全部自動で`application.js`にまとめられちゃう機能をオフにしないと余計な処理が走っちゃうんだな。まあ今回はいいや。いちおうやりたくなったときのために参考リンクメモ↓
- [Ruby on Railsでjavascriptを読み込む方法3選](https://papael14.com/ruby-on-rails-javascript/)

よし、全体に中央揃えにして見た目もある程度ましになった。  
次はタイマー開始ちょい遅い問題を解決したい。ボタン押したらスタートにしようかな。

最低限動くようになったし応募するか〜！と思って詳細ページ見に行ったんだけど、応募済みの作品群見てやめた。思ったよりずっとハイレベルだった…。ちょっと思ってたのと違ったわ。  
というわけでミニアプリ開発これにて終了。虚無感がすごい…なんのためにこんなことしたんだ…いやまあ気分転換やJSの勉強にはなったけども。はあ。