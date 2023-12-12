# Rubyのメソッドについて

## case-when
- 条件分岐を行える
- 一つのオブジェクトに対して複数の候補の中で一致するものを探すような場合には`if`文よりこちらのほうが便利
```rb
case 対象オブジェクト
when 値1
  値1と一致する場合に行う処理
when 値2
  値2と一致する場合に行う処理
when 値3
  値3と一致する場合に行う処理
else
  どの値にも一致しない場合に行う処理
end
```
- なお条件となる値は複数指定することも可。その場合はいずれかに合致すれば条件を満たしたことになる
```rb
case 対象オブジェクト
when 値1, 値2
  値1もしくは値2と一致する場合に行う処理
...
end
```
### 参考リンク
- [Rubyリファレンスマニュアル](https://docs.ruby-lang.org/ja/latest/doc/spec=2fcontrol.html#case)
- [参考記事](https://www.javadrive.jp/ruby/if/index9.html)