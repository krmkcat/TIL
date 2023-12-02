# config関連について

- `config.action_dispatch.rescue_responses[:エラークラス名] = ステータスコード`で、任意のエラーに任意のステータスコードを割り振れる
- `config.consider_all_requests_local`について
  - 値が`true`：エラー発生時、エラーページではなく、詳細なエラー情報やトレース情報がブラウザ上に表示される。開発およびテスト環境のデフォルト設定。
  - 値が`false`：エラー発生時、エラーページが表示される。本番環境のデフォルト設定。