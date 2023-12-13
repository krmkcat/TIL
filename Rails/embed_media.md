# 埋め込みメディアについて

## YouTube動画を埋め込む方法
`<iframe>`タグを使い、`src`属性に`https://www.youtube.com/embed/動画のID`を指定する。
```erb
<!-- 例 -->
<%= content_tag 'iframe', nil, width: width, height: height,
  src: "https://www.youtube.com/embed/動画のID", frameborder: 0,
  gesture: 'media', allow: 'encrypted-media', allowfullscreen: true
%>
```

## Twitterのツイートを埋め込む方法
`<script>`タグと`<blockquote>`タグ、`<a>`タグを使う。  
- `<script>`タグ
  - `charset`属性に`"utf-8"`、`src`属性に`"https://platform.twitter.com/widgets.js"`を指定することで、`<blockquote>`を`<iframe>`に変換して表示する
  - `async`属性の指定は必要に応じてでOK？
- `<blockquote>`
  - `class`を`"twitter-tweet"`とし、中に`<a>`タグを入れる  
- `<a>`タグ
  - リンク先はツイートのリンクURLの"x.com"を"twitter.com"に変換したもの
- `<blockquote>`を`<div class="embed-twitter">`で囲む（必須ではないかも？）
```erb
<!-- 例 -->
<script async="" charset="utf-8" src="https://platform.twitter.com/widgets.js"></script>
<div class="embed-twitter">
  <blockquote class="twitter-tweet">
    <a href="変換済のツイートURL"></a>
  </blockquote>
</div>

```