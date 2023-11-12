# エラーについて
種類ごとの解決方法メモ

## ArgumentError
引数に問題がある場合に出る。
### Nil location provided. Can't build URI.
- 意味：ロケーションがnilのためURIを生成できません
- どこが`nil`になっているのかコンソール等で確認
- 基本は`nil`にならないようにするか、`nil`でも問題なく動くようにするかの２択

## TypeError
データ型に問題がある場合に出る。
### No implicit conversion of nil into String
- 意味：`nil`から`string`への暗黙の変換は行われません
- 本来`string`型でないといけない値が`nil`になっている
- どこが`nil`になっているかコンソール等で確認
- `nil`ではなく`string`型になるように処理する

## Nilがどうこう言われた場合
- 基本的にまずはどこが`nil`になっているのかを確認する