# 単一テーブル継承について

## 単一テーブル継承とは
英語だと"Single Table Inheritance（STI）"。  
全く同じカラム構成のテーブルを複数作る代わりに、ベースとなる共通テーブルを一つ用意し、それを継承した疑似テーブル（モデル）を複数作ってそれらで共通テーブルを共有するというやり方。  
疑似テーブルはあくまで擬似であって、モデルとしては存在するがDB上のテーブルとしては存在しない。疑似テーブルたちの実際のレコードはすべて共通テーブルに格納される。  
共通テーブルには`type`カラムが必須であり、そこに各疑似テーブルの名前が格納されるため、どの疑似テーブルのデータなのか見分けがつくようになっている。

## やり方
以下のような状況を想定。
- 以下のモデルが存在する
  - 動物を表すAnimalモデル
  - 猫を表すCatsモデル
  - 犬を表すDogモデル
  - 鳥を表すBirdモデル

まず各疑似テーブルのベースとなる共通テーブルを生成する。データ型が`string`の`type`カラムを必ずもたせること。
```shell
$ rails g model Animals type:string name:string age:integer
```

次に、Animalsを継承して3つのモデルをそれぞれ生成する。既存のモデルを継承させて新しいモデルを生成する場合、　`--parent=親モデル`というオプションが使える。
```shell
$ rails g model Cat --parent=Animal
$ rails g model Dog --parent=Animal
$ rails g model Bird --parent=Animal
```

これでAnimalクラスを継承したCat、Dog、Birdクラスがそれぞれ生成され、インスタンスの保存や取得の際に自動的に`type`の値が指定されるようになる。

## 参考リンク
- [Railsガイド](https://railsguides.jp/association_basics.html#%E5%8D%98%E4%B8%80%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E7%B6%99%E6%89%BF-%EF%BC%88sti%EF%BC%89)
- [参考記事](https://qiita.com/niwa1903/items/218713c076fb0075712f)