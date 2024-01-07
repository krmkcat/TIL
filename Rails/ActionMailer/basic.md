# 基本的な使い方

## メーラーを生成する
まず`rails g mailer メーラー名UCC メソッド名`でメーラーを生成する。

## メーラーを編集する
生成されたメーラーにメソッドを作成する。以下、一例。
```rb
class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email
    @user = params[:user]
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: '私の素敵なサイトへようこそ')
  end
end
```
コントローラと同じように、メーラーのメソッド内で定義されたインスタンス変数はそのままメーラービューで使える。

## メーラービューを作成する
HTML版とプレーンテキスト版の2種類がある。両方作成しておくと安心。

## メーラーを呼び出して送信する
呼び出したい場所で以下のように記述する。
```rb
メーラー名UCC.送信メソッド名.deliver_later # もしくは deliver_now
```
メーラービューにパラメータを渡したい場合は`with`を使う。以下、一例。
```rb
UserMailer.with(user: @user).welcome_email.deliver_later
```
上記の場合ならビューでは`params[:user]`で受け取れる。

### `deliver_later`と`deliver_now`について
- `deliver_later`：Active Jobによるメールキューにメールを登録し、非同期処理で送信する。そのため送信完了を待たずに次の行が実行される。
- `deliver_now`：同期処理で即送信する。送信が完了するまで次の行は実行されない。cronjobなどから今すぐ送信したい場合に良い

## ビューでURLを生成したい場合
メーラーのインスタンスはサーバーが受信するHTTPリクエストのコンテキストと無関係なため、ホスト情報を明示しておかないとヘルパーメソッドによるURL生成ができない。（`_path`はメール内で一切使用できないので`_url`を使うこと）  
そのため、`config/application.rb`に以下のように記述してホスト情報を設定しておく。
```rb
config.action_mailer.default_url_options = { host: 'ホスト名' }
```
なお、環境によってホスト名を使い分けたい場合Gemの`config`を使うと良い。

## 参考リンク
- [Railsガイド](https://railsguides.jp/action_mailer_basics.html)