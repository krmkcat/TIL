# レイアウト関連

## レイアウトの使い分け
- `render`メソッドのオプションとして指定する
- コントローラ単位で指定する
といったことができる。

### renderメソッドのオプションとして指定する
```rb
# '/layouts/user.html.erb'をレイアウトとして使用する
render user_path, layout: 'user'
```

ちなみにコントローラのアクション名に連動するレンダリングの場合はオプションのみの表記でOK
```rb
# index.html.erbをレンダリングする場合
def index
  render layout: 'user'
end
```

### コントローラ単位で指定する
コントローラ内に以下のように記述する。
```rb
# '/layouts/user.html.erb'をレイアウトとして使用する
layout 'user'
```

### 参考リンク
<https://qiita.com/d0ne1s/items/6f34ae8031bd41085079>