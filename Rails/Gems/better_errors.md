# better_errorsについて

## 導入方法
Gemfileに以下のように記述
```rb
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
end
```
その後、`bundle install`。
さらにDockerを使用している場合は、「app/config/environments/development.rb」に以下の記述を追加（エラー回避のため）
```rb
BetterErrors::Middleware.allow_ip! "0.0.0.0/0"
```