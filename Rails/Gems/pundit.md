# Punditについて

## Punditとは
認可(Authorization)の仕組みを提供してくれるGem。モデルごとに制限をかけられる（”どのような条件を満たせばこのモデルのオブジェクトに特定のアクションを起こせるのか”を設定する）のが特徴。

## 使い方
まずはGemをインストールする。以下のコードをGemfileに追加し、`bundle install`。
```rb
gem 'pundit'
```

次に、利用したいコントローラでPunditを`include`する。アプリ全体で使うなら`ApplicationController`でOK。
```rb
class ApplicationController < ActionController::Base
  include Pundit

  ...

end
```

以下のコマンドを実行し、`app/policies/application_policy.rb`を生成する。
```shell
$ rails g pundit:install
```

↑を継承して、各モデルのpolicyファイルを`app/policies/`下に作る。
例として以下のような状況を想定。
- Postモデルのpolicyを作成
- adminもしくはeditorであるユーザーのみ`update`アクションを実行できるようにしたい
```rb
# app/policies/post_policy.rb

class PostPolicy < ApplicationPolicy
  def update?
    user.admin? || user.editor?
  end
end
```

上記のように、
- ファイル名は`対象のモデル名_policy.rb`
- クラス名は`対象のモデル名Policy`
- `def アクション名?`でルールを定義

とすることでpolicyを定義する。

最後に、定義したpolicyを適用するため、コントローラで呼び出す。  
アクションの中で`authorize インスタンス`とすることで、policyを適用しアクションに制限をかけることができる。
```rb
class PostController < ApplicationController
  def update
    @post = Post.find(params[:id])
    authorize @post
    ...
  end
end
```

また、policy側でインスタンスの情報を使用せずユーザーの情報のみで制限をかけている場合は、`authorize モデル名`と書くこともできる。

## 権限がない場合に指定のエラーを`raise`したい
`authorize`の結果が`false`だった（制限に引っかかった）場合は`Pundit::NotAuthorizedError`が起こる。
これをもとに「制限に引っかかった場合に指定のエラーページを表示する」ことが可能。  
やりかたは大きくわけて２つ。

1. 共通レイアウトを無視して丸ごとエラーページを表示
2. 共通レイアウトの中でエラーページを表示

### 共通レイアウトを無視する場合
まずは表示したいエラーページを`public/ステータスコード.html`として作成。今回はステータスコード403にしたいので`403.html`にする。  
共通レイアウトを使用しないので、`<html>`や`<head>`も含めフルでHTMLファイルを作成すること。

次に、アプリの設定で`Pundit::NotAuthorizedError`を捕捉してステータスコード403を返すようにする。  
`config/application.rb`に以下の記述を追加。
```rb
# :forbidden はステータスコード403を表す
config.action_dispatch.rescue_responses["Pundit::NotAuthorizedError"] = :forbidden
```

これだけだと開発環境でエラーページが表示されないので、確認のため一時的に`config/environments/development.rb`を編集して開発環境の設定を変える。  
エラーページが表示されることを無事確認できたら元に戻しておくこと。
```rb
# デフォルトではtrueになっている
  config.consider_all_requests_local = false
```

### 共通レイアウトの中で表示する場合
まずエラーページを作成するのは同じだが、レイアウトを使うので通常のビューファイルとして作成する。`<body>`タグの中だけ書けばよいし、配置も`app/view/`以下になる。

次にアプリ全体の設定をいじるのではなく、`ApplicationController`に`rescue`処理を記述する。
```rb
class ApplicationController < ActionController::Base
  include Pundit

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    render 'エラーページのパス', status: :forbidden
  end
end
```

## 補足情報
`config.action_dispatch.rescue_responses["Pundit::NotAuthorizedError"] = :forbidden`というコードの詳細な意味について、ロボらんてくんに解説してもらった。回答は以下。

>- `config`: Railsアプリケーションの設定をするためのオブジェクトだ。ここで設定を行うことで、アプリケーション全体に影響を及ぼすことができる。
>
>- `action_dispatch`: Railsのルーティングやリクエスト、レスポンスの処理を担当するモジュールだ。ここには、アプリケーションがHTTPリクエストをどのように扱うかに関する設定が含まれている。
>
>- `rescue_responses`: エラーが発生したときに、どのようなレスポンスを返すかを定義するハッシュマップだ。Railsは特定のエラーに対してデフォルトのHTTPステータスコードを返すけど、この設定を使って変更することができる。
>
>- `"Pundit::NotAuthorizedError"`: Pundit gemにおける認可が失敗した時に投げられるエラークラスを指定している文字列だ。ユーザーが許可されていないアクションをしようとしたときにこのエラーが発生する。
>
>- `:forbidden`: シンボルで、HTTPステータスコードの403 Forbiddenを表している。このコードは「クライアントはコンテンツへのアクセス権を持っていない」という意味を持つ。
>
>組み合わせると、この一行のコードはRailsに対して、「Punditで認可が失敗したときには、デフォルトのエラーレスポンスではなく、HTTPステータスコードとして403を返せ」と指示していることになる。これにより、ユーザーには「アクセス権がない」という情報が明確に伝わるんだ。

さらに`config.consider_all_requests_local = false`についても訊いてみた。以下回答。

>この設定は、Railsアプリケーションがエラーに遭遇したときにどう振る舞うかをコントロールするもんだ。config.consider_all_requests_local = false と設定すると、ローカルリクエストでない限り、エラーが発生した際にデバッグ情報を表示しないようにする。
>
>通常、開発環境では config.consider_all_requests_local = true と設定されていて、エラーが発生したときに詳細なエラー情報やトレース情報がブラウザ上に表示される。これは開発者がエラーの原因を簡単に特定できるようにするためだね。
>
>でも、falseに設定されていると、開発環境でも本番環境のように振る舞って、エラーページを表示するだけになるんだ。これはセキュリティ上の理由で重要で、デバッグ情報を外部に晒したくない場合に使う。ただし、普通は開発中にはtrueにしておいて、外部に公開するときだけfalseに設定することが多いカナ。

まとめると、
- `config.action_dispatch.rescue_responses[:エラークラス名] = ステータスコード`で、任意のエラーに任意のステータスコードを割り振れる
- `config.consider_all_requests_local`について
  - 値が`true`：エラー発生時、エラーページではなく、詳細なエラー情報やトレース情報がブラウザ上に表示される。開発およびテスト環境でのデフォルト設定。
  - 値が`false`：エラー発生時、エラーページが表示される。

## 参考リンク
- [公式ドキュメント](https://github.com/varvet/pundit)
- [参考記事](https://qiita.com/yutaro50/items/52484b7ae4ca87aa99a2)
- [参考記事](https://zenn.dev/yusuke_docha/articles/7b4b2f3f1bb203)