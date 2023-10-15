# enum_help

enum_helpをインストールすると、`属性名_i18n`というメソッドが使えるようになる。これで属性の値を翻訳済の状態で取得できる。
```rb
user = User.first

user.role
# => 'general'

user.role_i18n
# => '一般'
```