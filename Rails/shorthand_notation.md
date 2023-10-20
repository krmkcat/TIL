# 省略記法について

## redirect_to
引数としてモデルオブジェクトを直接渡すと、そのモデルに対応したコントローラのshowアクションを呼び出してくれる（`id=@user.id`というパラメータ付きで）。
```rb
# これを
redirect_to user_path(@user)

# こう書ける
redirect_to @user
```