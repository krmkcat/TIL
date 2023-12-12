# HTMLタグについて

## iframe
- Inline FRAME の略
- `src`で指定した他のページを画面中にインラインで表示することができる
### 参考リンク
- [参考記事](https://www.tohoho-web.com/html/iframe.htm)
- [参考記事](https://developer.mozilla.org/ja/docs/Web/HTML/Element/iframe)

## blockquote
- 他のサイトや書籍などからコンテンツを引用する際に使用する
- 該当箇所が引用であることを明示し、引用元を記載することができる
- twitterの埋め込みなどはJavaScriptを使って`blockquote`タグを`iframe`に置き換えることで実現している

## script
- JavaScriptやVBScriptなどのスクリプトを文書内に埋め込んだり外部スクリプトを読み込んだりするために使用する
- スクリプトの言語のタイプを示す`type`属性の値には、JavaScript、VBScriptなどのスクリプト言語名を指定する。なお、`type`属性は必須
- `async`属性について
  - HTMLの`script`要素に`async`属性を設定すると、スクリプトの実行とページの読み込み、表示処理を並行して行うことができる
  - `async`は“asynchronous”（非同期の）の略
  - `async`属性は、`script`要素に`src`属性を指定した場合にのみ指定できる
  - `async`属性と`defer`属性の違いは、`async`は読み込みが完了するとすぐ実行されるが`defer`はそうではない点
### 参考リンク
[クロノドライブのHTML辞典](https://html-coding.co.jp/annex/dictionary/html/script/)