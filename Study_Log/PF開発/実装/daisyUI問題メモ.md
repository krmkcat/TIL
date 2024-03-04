## 目的
daisyUIの挙動が不安定なのを解決したい。

## 状況
PF制作中。CSSフレームワークとしてTailWind CSSを利用しており、そのプラグインであるdaisyUIも利用。ほかのCSSフレームワークは導入していない。  
- Docker使用
- Ruby 3.2.2
- Rails 7.0.8.1
- Tailwind 3.4.1
- daisyUI 4.7.2

## 問題の詳細
- 変更を加えた後、コンテナごと立ち上げ直さないと反映されない。そういう仕様？？
- 開発環境・本番環境ともにdaisyUIのコンポーネントが適用される部分とされない部分がある
  - 適用されない部分はフラッシュメッセージの表示に使っているAlertの色。`.alert`は適用されている（ブラウザの開発者ツールで確認）が`.alert-error`が適用されていない。
  - 開発環境では、上述のAlertをコピーして増やしコンテナを立ち上げ直したところなぜか適用された。そのままコピーを消してブラウザリロードしたら適用された状態のままだったが、コンテナを立ち上げ直したらまた適用されなくなった。
  ```erb
  <% flash.each do |message_type, message| %>
    <div role="alert" class="alert alert-<%= message_type %>" >
      <%= message %>
    </div>
  <% end %>
  <!-- ↑だと適用されないが、 -->

  <% flash.each do |message_type, message| %>
    <div role="alert" class="alert alert-error" >
      <%= message %>
    </div>
  <% end %>
  <!-- ↑だと適用される。クラス名に変数を使ったものと使っていないもの2つとも記述すると両方適用される -->
  ```

## 仮説
正直検討もつかない…。