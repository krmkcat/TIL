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

## 中身が配列やハッシュであるパラメータの記述方法
- 「配列を許可したければハッシュを、ハッシュを許可したければ配列を渡せ」とのこと
```rb
post = { title: foo, body: bar, tag_ids: [1, 2, 3]}

def post_params
  params.require(:post).permit(:title, :body, { tag_ids: [] })
end
```
```rb
user =
  { name: 'クロ', age: 2, friends: [{ name: 'ミケ', age: 2 }, { name: 'マーチ', age: 7 }]}

def post_params
  params.require(:user).permit(:name, :age, { friends: [:name, :age] } )
end
```