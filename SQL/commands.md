# SQLコマンド

## 使用するDBを指定
```shell
USE FB名;
```

## カレントDBに含まれるテーブル一覧を取得
```shell
SHOW TABLES;
```

## 特定のテーブルに含まれるカラム一覧を取得
```shell
SHOW COLUMNS FROM テーブル名;

SHOW COLUMNS WHERE句;

SHOW COLUMNS LIKE句;
```

## 参考リンク
- [カラムに関する情報を取得する](https://www.javadrive.jp/mysql/table/index3.html)