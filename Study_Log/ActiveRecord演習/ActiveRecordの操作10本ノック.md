# 2024.1.9

まずはリポジトリをローカルにクローンする。

OK。続いてDockerイメージをビルド。

よし、次にデータベースと利用するテーブルの作成。

よーし準備完了。さっそく問題に取り掛かる。

や〜ばい。前にも思ったけどSQLの書き方マジですーぐ忘れる。パッと見返せるように基本的な部分だけでもTILにまとめないとかも。  
とりあえず今は進む。

えっ、SQLじゃなくてRailsコードで良かったの！？なんだよそうならそうと言ってよ…。この後の問題も特に何も書いてなければ普通にActiveRecord使ってOKってことかな。

テーブル結合して検索するやりかた、TILに書いといてほんとよかった。これは見ないと思い出せない…。  
あとアソシエーションつかったやりかた思いつかなかったのは反省。

`where`の引数にRangeオブジェクトを渡すとSQLの`BETWEEN`が使えるのか。これは便利。

問題4がちょっとわからんので飛ばす。売上の出し方が謎。

問題5はSQLで考えたほうがやりやすそう。
```sql
select category.category_id, category.name, count(*) as number_of_film
from category
inner join film_category
on category.category_id = film_category.category_id
group by category.category_id
having number_of_film>=60
order by number_of_film desc;
```

OK。SQLはできた。あとはこれをRailsコードにしたいんだけど…どうすりゃいいんだ？
とにかくここに書きながら考えるか。
```rb
Category.select(:category_id, :name, 'count(*) as number_of_film').joins(:film_categories).group(:category_id).count
```

ん〜だめだわからん。今日はここまで。明日は休みなので明後日続きやる。…いや明後日も特別講座あるから明々後日か。

# 2024.1.11
特別講座始まるまでの間いちおうやる。

SQLをRailsコードに直すのにてこずってたんだっけ。`select`句の引数をキーじゃなく文字列にして直接SQL書いちゃうか。

```rb
Category.select('category.category_id, category.name, count(*) as number_of_film').joins(:film_categories).group(:category_id).having('number_of_film >= ?', '60').order(number_of_film: :desc)
```

お、いけた！あとはこれを60以上のみに絞り込んで降順表示するだけだ。

できた！`order`の引数の書き方どうにも慣れんなあ。

よし次。問題6。
```rb
Actor.find_by(first_name: 'JOE', last_name: 'SWANK').films.select(:film_id, :title)
```

OK！次、問題7。
```rb
Actor.find_by(first_name: 'JOE', last_name: 'SWANK').films.where('length >= ?', '100').select(:film_id, :title, :length)
```

次、問題8。
```rb
Actor.find_by(first_name: 'JOE', last_name: 'SWANK').films.joins(film_categories: :category).where(category: { name: 'Action' }).select(:film_id, :title)
```

次、問題9。…と思ったら出たよ売上。これの算出方法がわからん。

ロボらんてくんに助言を求めた。`rental_rate`にレンタルされた回数をかければいいのでは？とのこと。それでいってみよう。  
今日はここまで。明日は↑を試すことから始める。

# 2024.1.12
`rental_rate`が1回のレンタルにかかる料金では？とロボらんてくんに助言をもらったので、その説でいってみる。問9じゃなくて飛ばした5からとりかかるか。

というわけで問題4。あるfilmがレンタルされた回数を取得するには、そのfilmのfilm_idを含むinventoryのinventory_idを取得して、そのinventory_idを含むrentalがいくつあるかを調べる。…けっこう複雑じゃないか？ほんとに中級？これをさらにカテゴリごとに集計するんでしょ？？まあいいやとにかく書き始めよう。  
だいぶ複雑な気がするから、まずは"SUNRISE LEAGUE"というfilmのレンタル回数を取得することから始める。
```rb
Rental.joins(inventory: :film).where(film: { title: 'SUNRISE LEAGUE' }).count
```
よし、回数が取得できた。ので、今度はこれに`rental_rate`をかけて売上を取得する。  
…これひょっとして`IN`つかうやつか？一つの表では無理な気がするんだよな。
```rb
Film.joins(inventories: :rental).
```

今日はここまで。明日も少し続きやる。