2024/3/25　Day 236
学習時間：4h(週計4h/累計849h)

**学習内容**
パスワードリセット（開発環境）

**コメント**
開発環境でのパスワードリセット成功。明日は本番環境でAction Mailerを使うためにしなきゃいけないことを調べる。

Rails基礎をやったときは気づかなかったけど、sorceryのパスワードリセットは新パスワード設定のときにパスワードを空欄にして送信押すと無条件でバリエーションをすり抜けてしまうらしいことを知った。最初自分がなにかミスってるのかと思ったけど（調べても全然出てこないし）、どうやらそういう仕様っぽい。  
対策としては、カスタムコンテクストを利用して`change_password`する前に明示的にパスワードが入力されてるかのバリデーションチェックをすることで解決できる。毎度のことながらGPTくんありがとう。
具体的にはこんな感じ↓
```rb
# Usersモデル内で通常のバリデーションとは別に以下を追加
valildates :password, presence: true, on: :reset_password
```
```rb
# PasswordResetsコントローラ
def update
  @token = params[:id]
  @user = User.load_from_reset_password_token(params[:id])
  not_authenticated if @user.blank?

  # 新しい'password'と'password_confirmation'をセット
  @user.password = params[:user][:password]
  @user.password_confirmation = params[:user][:password_confirmation]

  # 設定したカスタムコンテクストを使って明示的にバリデーションを実行
  if @user.valid?(:reset_password) && @user.change_password(params[:user][:password])
    redirect_to login_path, success: t('.success')
  else
    flash.now[:error] = t('.failure')
    render :edit, status: :unprocessable_entity
  end
end
```

バリデーションの`on`オプション詳細については[こちら](https://railsguides.jp/v7.0/active_record_validations.html#on)のRailsガイドを参照。
sorcery使ってパスワードリセット機能つくる人は一応確認したほうが良いかも。もしこんなことしなくても普通にバリデーションチェックでパスワード未入力弾いてくれたよ！って方いたら教えて下さい〜。その場合私が何かを間違えてたってことなので

**本日の目標と達成状況**
目標：パスワードリセット（開発環境）実装完了
状況：達成

**明日の目標**
本番環境でAction Mailerを使うために必要なことを調べる