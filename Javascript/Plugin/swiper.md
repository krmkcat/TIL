# Swiperについて

## Swiperとは
jQueryのプラグイン。画像等をスライダー表示にできる。

## 導入方法の一例
※環境によって結構違いがあるようなのであくまでもひとつの例として参考に  
ここでは`yarn`を使う。
まずはパッケージをインストール。
```shell
$ yarn add swiper
$ yarn install
```
成功すると、`node_modules/`下に`swiper/`が生成される。  

SwiperはJSおよびCSSファイルを読み込む必要があるので、アセットパイプラインで検索されるように`node_modules`のPATHを通す。  
`config/initializers/assets.rb`に以下のように追記。
```rb
Rails.application.config.assets.paths << Rails.root.join('node_modules')
```

JS、CSSファイルの読み込み設定をする。
`app/javascript/application.js`に以下を追記。
```js
// import Swiper JS
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/css/bundle';

// 以下はSwiperを初期化するコード
document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
    delay: 3000
    },
  })
});
```

最後にビューのコード。`swiper`、`swiper-wrapper`、`swiper-slide`の3つのクラスを記述し、スライドさせたい要素はそれぞれ`swiper-slide`クラスの中に配置する。
```erb
<div class="swiper">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
</div>
```

必要であればCSSの記述も行う。

## 注意事項
一部オプション項目（`autoplay`等）は対応するモジュールをインクルードしていないと使えないので、目当てのモジュールをインクルードするか、それが含まれるバンドルを`include`すること。わからなければ`swiper/bundle`（全部入りのバンドル）をインポートしておくのが安牌。

## 参考リンク
- [公式ドキュメント](https://swiperjs.com/get-started)
- [【Ruby on Rails】jQueryを使用せず、railsでv7のSwiperを導入する方法](https://wild-outdoorlife.com/ruby-on-rails/swiper/)
- [RailsでSwiperを導入する方法（Swiperは2020年7月にバージョンアップし、従来と設定方法が変わりました！）](https://qiita.com/miketa_webprgr/items/0a3845aeb5da2ed75f82)
- [swiperをyarnで導入して、画像をスライダー形式にする！](https://qiita.com/ken_ta_/items/bdf04d8ecab6a855e50f)