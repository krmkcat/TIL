# 集約関数について

## 集約関数とは
あるカラム全体の数値を渡すことで、何らかの決められた処理をして値を返してくれるもの。`GROUP BY`と組み合わせて使うことも多い。

## 種類
- COUNT
  - 引数によって若干挙動が異なるので注意。特に`NULL`の扱い。
- MAX
- MIN
- SUM
- AVG

## 参考リンク
- [【SQL基礎】集約関数とは](https://tech.pjin.jp/blog/2020/12/28/%E3%80%90sql%E5%85%A5%E9%96%80%E3%80%91%E9%9B%86%E7%B4%84%E9%96%A2%E6%95%B0%E3%81%A8%E3%81%AF/)