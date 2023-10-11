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
- <https://railsguides.jp/layouts_and_rendering.html#%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B>
- <https://qiita.com/d0ne1s/items/6f34ae8031bd41085079>
- <https://note.com/izuha0/n/n7ab2f1c430e7>