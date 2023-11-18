# ストロングパラメータについて

## 値の上書き
ストロングパラメータの値は直接上書きできない。
```rb
# これだと値は変更されない
user_params[:name] = 'クロ'
@user.update(user_params)
```
値を変更したうえで、そのパラメータでデータを更新したいという場合は、一度変数に代入してその変数で更新する。
```rb
# これはOK
up = user_params
up[:name] = 'クロ'
@user.update(up)
```