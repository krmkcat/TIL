# 画像にまつわるテストについて

## 画像の配置場所
`spec/fixtures/images/`下に配置するのが慣例っぽい。

## 画像の表示を確認する方法
`have_selector`や`have_css`などのマッチャーを使って、画像のタグが存在することや、特定のsrc属性を持つことをチェックできる。
```rb
# have_selector を使ったやり方
# "$="は指定した属性値で終わる要素を選択するCSSセレクタ
expect(page).to have_selector('img[src$="sample-image.jpg"]')
```
```rb
# have_css を使ったやり方
# "*="は、部分一致する属性値を持つ要素を選択するCSSセレクタ
expect(page).to have_css('img[src*="sample-image.jpg"]')
```
注意事項として、これらのマッチャーを使ってテストを書くときには、画像がロードされるまで少し時間がかかることがあるから、`Capybara.default_max_wait_time` の設定を確認したり、必要に応じて待機時間を調整することも重要。