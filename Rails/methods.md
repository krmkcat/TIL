# メソッド

<details>
  <summary>文字列関連</summary>

  ## split
  - 文字列に対して使う
  - 文字列を半角スペースを区切りとして配列に変換する
  - 引数として半角スペース以外のセパレータ（区切り文字）を指定することもできる
  ```rb
  'a,b,c'.split(',')
  # => [a, b, c]
  ```
</details>

<details>
  <summary>その他</summary>

  ## controller_path
  - コントローラのパスを返す
    ```rb
    Admin::UsersController.controller_path
    # =>'admin/users'
    ```
  - レシーバなしの場合は現在のページのコントローラを返す

  ## is_a?(クラスやモジュール)
  - 引数がクラスである場合、レシーバーであるオブジェクトが指定したクラスもしくはそのサブクラスのインスタンである場合にtrue、そうでければfalseを返す
  - 引数がモジュールである場合、レシーバーであるオブジェクトが指定したモジュールを含むクラスもしくはそのサブクラスのインスタンスである場合にtrue、そうでなければfalseを返す

  ## strftime(format)
  - 時刻を指定したフォーマットに沿って変換し文字列として返す
  ### 参考リンク
  <https://docs.ruby-lang.org/ja/latest/method/Time/i/strftime.html>

  ## attribute_accessor
  「同名のインスタンス変数を戻り値とするメソッドを定義」「同名のインスタンス変数に値を代入するメソッドを定義」を同時に行う。  
  モデルクラスにこれを設定すると、DBとは紐づかない属性を付与することができる。
</details>