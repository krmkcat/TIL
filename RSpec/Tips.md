# RSpecに関するTips

## モジュールのインクルードについて
- 多くのファイルで使うモジュールについては、`rails_helper.rb`の中で`config.include`しておく

## Capybaraのセレクタについて
- CSS準拠
- なのでclassは `.` 、idは `#` で指定する

## 忘れがちなこと
- `let`は`before`の中では使えない。あくまで`describe`や`context`といった具体的なテストケースの中で使うこと
- `create!`や`build!`といったメソッドはない。`let`と間違えないように