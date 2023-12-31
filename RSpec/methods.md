# RSpecで使うメソッドについて

## 検証メソッド
```rb
expect(テスト対象).to マッチャー(期待する値)
```

## 変数宣言
- `let(:変数) { 代入する値 }`
  - 宣言のみ。参照されて初めて初期値が評価される（変数が作られる）
- `let!(:変数) { 代入する値 }`
  - 宣言と同時に即初期値が評価される（変数が作られる）

## 事前処理
- `before { ブロック }`で各テストケースの実行前にブロック内の共通処理を行う。ブロックなので、もちろん`do 〜 end`も使える

## Capybaraメソッド

### visit
- `visit アクセス先`とすることで、指定のURLやパスにアクセスする

### click_on, click_link, click_button
- `click_xxx '文字列'`で、指定の文字列が設定されたボタンやリンクをクリックする
- `click_on`はリンク、ボタンを区別しない

### fill_in
- `fill_in 'ラベル名等', with: '値'`で、指定のフィールドに指定の値を入力する

### find
- `find('セレクタ')`で、指定したセレクタの要素を探す。
  ```rb
  # 例。classがtitleの要素を探す
  find('.title')
  ```

### select
- `select '選択肢', from: 'セレクトボックス'`で指定のセレクトボックスから指定の選択肢を選ぶ

### accept_confirm
- `expect(page.accept_confirm).to eq('確認メッセージ')`とすることで、メッセージ内容の確認とOKボタンの押下を同時にやってくれる
```rb
# 例
expect(page.accept_confirm).to eq "本当に削除しますか？"
```
#### 参考リンク
<https://www.rubydoc.info/github/jnicklas/capybara/Capybara/Session:accept_confirm>
<https://qiita.com/st5e_jp/items/37b3fbfc7ec747f13e8f>

### within
- `within('セレクタ') { ブロック }`でセレクタを指定してブロック内の処理を行える
```rb
# 例。classがbreadcrumbの要素に対しブロック内の処理を実行
within('.breadcrumb') do
  expect(page).to have_content('タグ')
end
```

### choose
- `choose '選択肢'`で指定したラジオボタンを選択

### attach_file
- `attach_file 'フィールド名等', ファイルパス`で指定したファイル選択フィールドで指定したファイルを選択
- ファイルパスを配列にすれば複数ファイルを同時に選択することができる

### fixture_file_upload
- `fixture_file_upload('ファイルパス', 'ファイルタイプ')`でファイルのアップロードをシミュレートできる
- 例えば`file = fixture_file_upload('spec/fixtures/sample.png', 'image/png')`で、fileオブジェクトをフォームにファイルが添付されたときのパラメータと同じように扱える
- ファイルパスの設定は`rails_helper.rb`等のヘルパーファイル内に`config.fixture_path = "#{::Rails.root}/spec/fixtures"`のように記述する
- 参考リンク：[RSpecでテストデータ用にファイルを読み込む](https://woshidan.hatenadiary.jp/entry/2021/01/03/195432)

### sleep
- `sleep 秒数`で指定の秒数Capybaraを一時停止させられる
- 処理が追いつかなかった結果テストが失敗するのを避けるために使うが、現在はあまり推奨されていない模様
- 例えばページ遷移を待ってから次の処理をしたい場合は、`sleep`を使う代わりに遷移後のページに含まれる要素が存在するかの確認を間にはさむなどすると良い

### save_and_open_page
- `save_and_open_page`で、その時点でのページをブラウザで開く。テストが上手く動かないときのデバッグに便利
- ローカル環境の設定によっては使えないようだ

## その他
### status_code
- `page.status_code`とすることで現在のページのステータスコードを取得できる
- `expect(page.status_code).to eq(ステータスコード)`で現在のページのステータスコードが指定のものであるか確認できる

## 参考リンク
- [参考記事](https://easyramble.com/form-tests-with-capybara.html)