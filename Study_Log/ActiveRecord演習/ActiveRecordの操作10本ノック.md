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