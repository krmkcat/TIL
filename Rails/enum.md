# enumについて
## なに？
属性に値の選択肢を設定するメソッド

## 使いかた
```rb
enum :属性名, [値1, 値2, ...]
```

## 宣言すると自動生成されるもの
- enum値のいずれかの値を持つ（またはもたない）すべてのオブジェクトを検索するスコープ  
```ruby:/models/task.rb
enum :status [:todo, :in_progress, :done]
```
```rb
Task.done
# statusがdoneであるTaskオブジェクトをすべて検索
```
- あるオブジェクトがenumの特定の値を持つかどうかを判定できるインスタンスメソッド
```rb
task = Task.first
task.done?
# taskのstatusがdoneであればtrue、そうでなければfalse
```
- あるオブジェクトのenum値を変更するインスタンスメソッド
```rb
task = Task.first
task.done!
# taskのstatusをdoneに変更
```
いずれも属性名（上記例ではstatus）はつけないので注意。

- あるオブジェクトのenum値（DBに保存されている整数値）を取得するメソッド
```rb
task = Task.first
task.done!
task.status_before_type_cast
# => 2
```

## 宣言する際に注意すること
enumを定義する際の順番について。
配列ではなくハッシュを使う場合、プログラムの動作という意味では順番や割り当てる数値はどうなっていても大丈夫。
ただし、デフォルト値になりうる0には **重要なもの（例えば管理者権限など）を割り当ててはいけない。**

## 値の表記に関する注意
代入する際は`オブジェクト.status = :値`と値をキーで記述するが、取り出した値は`'値'`と文字列になっているので、比較演算等する場合は注意。