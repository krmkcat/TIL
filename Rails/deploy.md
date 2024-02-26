# デプロイ

Render.comへのデプロイ手順を記録しておく。

## エラー回避のためコマンド実行
```shell
bundle lock --add-platform x86_64-linux
```

## GitHubにリポジトリを作成し紐づけ
割愛

## Renderで先にDBを作成
名前つけてプラン選べばOK。

## DBをアプリに紐づける
作成したDBのExternal URLを環境変数"MY_APP_DATABASE_URL"に設定（`.env.production`）。  
ついでに`RAILS_MASTER_KEY`や`RAILS_SERVE_STATIC_FILES`も設定。  
まだしてなければ`.gitignore`に`.env`系のファイルを追記。

## Renderにアプリをデプロイ
1. Build with GitHub Repository
2. デプロイしたいリポジトリを選ぶ
3. 設定する
   1. Region：一番近いSingapore
   2. Runtime：Docker
   3. Instance Type：適宜選択（今回はStarter）
   4. Environment Variables
      1. `RAILS_MASTER_KEY`
      2. `MY_APP_DATABASE_URL`
      3. `RAILS_ENV`
      4. `RAILS_SERVE_STATIC_FILES`