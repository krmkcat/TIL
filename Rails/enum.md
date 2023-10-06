# enumについて
## なに？
属性に選択肢を設定するメソッド

## 使いかた
```rb
enum :属性名, [値1, 値2, ...]
```

## 宣言すると自動生成されるもの
1. enum値のいずれかの値を持つ（またはもたない）すべてのオブジェクトを検索するスコープ  
```rb:/models/task.rb
enum :status [:todo, :in_progress, :done]
```
```rb
Task.done
# statusがdoneであるTaskオブジェクトをすべて検索
```
1. あるオブジェクトがenumの特定の値を持つかどうかを判定できるインスタンスメソッド
```rb
task = Task.first
task.done?
# taskのstatusがdoneであればtrue、そうでなければfalse
```
1. あるオブジェクトのenum値を変更するインスタンスメソッド
```rb
task = Task.first
task.done!
# taskのstatusをdoneに変更
```