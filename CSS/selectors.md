# セレクタについて

## 要素型セレクタ
指定されたノード名を持つすべての要素を選択する。  
### 構文
`elementname`
### 例
`input`：すべての`<input>`要素を選択

## クラスセレクタ
指定された`class`属性を持つすべての要素を選択する。  
### 構文
`.classname`
### 例
- `.index`："index"クラスを持つすべての要素を選択
- `.index.red`："index"クラスおよび"red"クラスの両方をもつ要素を選択

## IDセレクタ
`id`属性の値に基づいて要素を選択する。  
### 構文
`#idname`
### 例
`#toc`："toc"という`id`を持つ要素を選択

## 属性セレクタ
指定された属性を持つ要素をすべて選択する。  
### 構文
`[attr]` `[attr=value]` `[attr~=value]` `[attr|=value]` `[attr^=value]` `[attr$=value]` `[attr*=value]`
### 例
- `[src]`：`src`属性が（どんな値でも）設定されているすべての要素を選択
- `[src="hoge"]`：`src`属性の値が`"hoge"`であるすべての要素を選択
- `img[src$="hoge"]`：`src`属性の値が`"hoge"`で終わるすべての`<img>`要素を選択
- `img[name*="hoge"]`：`src`属性の値に`"hoge"`が含まれる（部分一致）すべての要素を選択
- ほかは割愛。[こちらの記事](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors)参照

## 参考リンク
[参考記事](https://developer.mozilla.org/ja/docs/Web/CSS/CSS_selectors)