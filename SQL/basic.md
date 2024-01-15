# 基本文法について

文末にセミコロンが必要。
```sql
SELECT カラム名 FROM テーブル名;
```

## WHERE
```sql
SELECT カラム名
FROM テーブル1
WHERE 条件;
```
- `GROUP BY`と組み合わせて使った場合、グループ化前に条件による絞り込みが行われる

## LIKE

## INNER JOIN
```sql
SELECT カラム名
FROM テーブル1
INNER JOIN テーブル2
ON テーブル1.キーとなるカラム名 = テーブル2.キーとなるカラム名;
```

## ORDER BY
```sql
SELECT カラム名
FROM テーブル1
ORDER BY ソートするカラム名1 ASC/DESC, ソートするカラム名2 ASC/DESC ...;
```

## GROUP BY
```sql
SELECT カラム名
FROM テーブル1
GROUP BY グループ化するカラム名;
```
- `GROUP BY`を使った場合、`SELECT`するカラムは`GROUP BY`したカラム（あるいはその集計関数）でなくてはならない

## HAVING
- `GROUP BY`と組み合わせて使った場合、グループ化後に条件による絞り込みが行われる

## BETWEEN
```sql
SELECT カラム名
FROM テーブル1
WHERE カラム名 BETWEEN 最小値 AND 最大値;
```

## IN
大きく分けて2通りの使い方がある。  
1つ目は、複数の条件判定をまとめて行う（つまりIN句のなかのどれかの値に当てはまればOK）という使い方。
```sql
SELECT カラム名
FROM テーブル1
WHERE カラム名 IN([値1,値2,...]);
```
もう一つはサブクエリとしての使いかた。  
`IN`の中に`SELECT`文を入れることで、その文の結果を条件判定に使うことができる。
```sql
SELECT カラム名
FROM テーブル1
WHERE カラム名 IN(
  SELECT カラム名
  FROM テーブル名
);
```

## NOT IN
`IN`の逆。どれにも該当しなければOKという判定になる。

## データベースコンソール
`rails dbconsole`でデータベースコンソールを使用できる。

## 参考リンク
- [SQL– category –](https://www.sejuku.net/blog/category/programming-language/sql)
