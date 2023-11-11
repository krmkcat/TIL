# SQLにまつわるTIPS

## 範囲指定
数値や日時などを範囲指定したい場合、`BETWEEN`と`AND`が使える。
```sql
SELECT salary
FROM salaries
WHERE
  emp_no = '40000'
  AND from_date BETWEEN '1996-01-01' AND  '1996-12-31';
```