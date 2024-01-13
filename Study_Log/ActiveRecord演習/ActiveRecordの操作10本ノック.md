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
Film.joins(inventories: :rentals).select('film.title, count(*)').where(title: 'SUNRISE LEAGUE')
```

今日はここまで。明日も少し続きやる。

# 2024.1.13
昨日の続き。今日こそ問題5をクリアしたい。

```rb
Film.joins(inventories: :rentals).select('film.title, count(*)').where(title: 'SUNRISE LEAGUE')
```

よし、特定のfilmのレンタル回数が出せた。次は特定のカテゴリーのレンタル回数を出す。やりかたとしては、そのカテゴリー内のfilmのレンタル回数を合計すればいいはず。`SUM`使えばいけるかな。書いてみよう。
```rb
Category.select('category.category_id, category.name').find_by(name: 'Sports').films.joins()
# 一旦放棄
```

う〜ん、やっぱりcategoryとrentalが遠すぎるなあ。filmを軸にしてrental側とcategory側の両方と`joins`したほうがいいのか？

というかその前にまず特定のfilmの売上をだしてみよう。さっきのコードをベースにやってみる。
```rb
Film.joins(inventories: :rentals).select('film.title, film.rental_rate, count(*)').find_by(title: 'SUNRISE LEAGUE')
```

集約関数（`count`とか）を使う場合は基本的に`group`も使わなきゃいけないらしい。あと、`group`と`select`を同時に使う場合は`select`するカラムを`group`の対象に含めなきゃいけないらしい。（←**これはちょっとほんとかあやしい**）知らんかった…。それを踏まえてもうちょい考えてみる。
```rb
Film.joins(inventories: :rentals)
  .group(:title, :rental_rate)
  .select('film.title, film.rental_rate, count(*)')
  .find_by(title: 'SUNRISE LEAGUE')
```

↑でとりあえずタイトル・レンタル回数・レンタルレートを同時に表示することに成功。あとは積算をどうやるかだなあ。
```rb
Film.joins(inventories: :rentals)
  .group(:title, :rental_rate)
  .select('film.title, film.rental_rate, count(*) as rental_count, rental_count * film.rental_rate')
  .find_by(title: 'SUNRISE LEAGUE')
```

「SQLではエイリアスを定義した直後にそのエイリアスを同じselectステートメント内で使用することはできない」らしい。なるほど〜。その場合は`select`をチェーンすればOKみたい。やってみる。
```rb
Film.joins(inventories: :rentals)
  .group(:title, :rental_rate)
  .select('film.title, film.rental_rate, count(*)')
  .select('count(*) * film.rental_rate as revenue')
  .find_by(title: 'SUNRISE LEAGUE')
```

できた〜〜！！ようやくここまでこれた…。SQLのルールを知らなすぎたな。あとでまとめなきゃ。  
とりあえずレンタルレートを非表示にしてみよう。それができたらカテゴリ単位での集計に進む。
```rb
Film.joins(inventories: :rentals)
  .select('film.title, count(*) * film.rental_rate as revenue')
  .group(:title, :rental_rate)
  .find_by(title: 'SUNRISE LEAGUE')
```

今気づいたけどこれ問題10解いてることになってるじゃん。難易度：高じゃん。計算結果違ってんじゃん。てことは売上の計算方法違うってことじゃん！
ええ〜？？まじでどういうことなの？？レンタルレートが関わってるのはたぶん間違いないと思うからそれで正解のrevenueを割ってみるか。そうすれば何をかければいいかわかるかも。

割り切れなかったけどだいたい34.22だった。どっからきてんだよこの数字…。

あーーーわかった！rental_idが特定できればpaymentのamountでいいんだ！えええなんでこんな簡単なことに今まで気づかなかったんだろう。自分で自分が理解できない…なぜかpaymentはレンタル料の計算に使えないと思いこんでた…。  
あれか。paymentは1回の会計（複数のfilmを同時にレンタル可能）の合計金額だと思ってたんだたぶん。でもテーブル設計的に1payment=1filmだわこれ。うーわー。

ともあれこれでやり方わかった。もっかい特定のfilmの売上を求めるところから始めよう。filmからpaymentにたどり着かなきゃいけないな。  
ということはやっぱりサブクエリが必要？？  
まずは特定のfilm_idと紐づくrental_id郡を特定。さらに各rental_idのamountの合計をだす。って感じかな。
まずはrental_id群を特定することから始めるか。
```rb
Rental.joins(inventory: :film)
  .select(:rental_id)
  .where(film: { title: 'SUNRISE LEAGUE' })
```

よし。次にamountの合計を出す。
```rb
Rental.joins(inventory: :film).joins(:payments)
  .select('sum(payment.amount)')
  .where(film: { title: 'SUNRISE LEAGUE' })
```

やっぱり`joins`はチェーンできるんだな。

できたーーーー！計算結果一致！あとは見た目を整えるだけ。

```rb
Rental.joins(:payments, inventory: :film)
  .select('film.film_id, film.title, sum(payment.amount) as revenue')
  .group('film.film_id, film.title')
  .having(film: { title: 'SUNRISE LEAGUE' })
```

ほぼできたけど`rental_id`が消えないな。やっぱり頭を`Film`で始めないとだめなのか。めんどいなあ。

なるほど〜！間に挟まるテーブルが２つ以上になる場合は`joins(１つ目の中間テーブル: { ２つ目の中間テーブル: :結合したいテーブル })`って書けばいいんだ！ありがとうロボらんてくん。

```rb
Film.joins(inventories: { rentals: :payments })
  .select('film.film_id, film.title, sum(payment.amount) as revenue')
  .where(title: 'SUNRISE LEAGUE')
  .group(:film_id)
```

おおっしゃついにできたーーーー！問題10クリア！続いて問題9いこう。

```rb
Film.select('film.film_id, film.title, sum(payment.amount) as revenue')
  .joins(:actors, inventories: { rentals: :payments })
  .where(actor: { first_name: 'JOE', last_name: 'SWANK' })
  .group(:film_id)
  .order(revenue: :desc)
  .limit(10)
```

OK！  
`joins`で直結合できるテーブルと中間テーブル介するテーブルがある場合は、直結合の方を先に書けばカンマ区切りで列挙できる。

最後に問題4にとりかかろう。categoryはfilmよりさらにpaymentから遠いから、正直これが一番難しい気がするんだけどなあ。なぜか難易度：中なんだよなあ。

```rb
Category
  .select('category.category_id, category.name, sum(payment.amount) as revenue')
  .joins(film_categories: { film: { inventories: { rentals: :payments } } })
  .group(:category_id)
  .order(revenue: :desc)
  .limit(5)
```

できたーーーー！ついに全クリ！長い道のりだった…。  
というわけで今日はここまで。次は今回学んだことをできる範囲でまとめる。

