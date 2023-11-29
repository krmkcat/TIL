# FactoryBotのメソッド
## create
- ファクトリーを指定してオブジェクトを生成しDBに保存する
- `create(:ファクトリー名)`で生成
- データの中身を上書きしたい場合は`create(:ファクトリー名, 属性名: '値')`とすればOK。属性と値はもちろん複数指定できる

## create_list
- ファクトリーを指定して、複数のオブジェクトを一度に生成しDBに保存する
- `create_list(:ファクトリー名, 数)`で生成できる
```rb
# 例
users_list = create_list(:user, 3)
```
### 参考リンク
<https://qiita.com/kodai_0122/items/e755a128f1dade3f53c6>

## build
- `create`のDBに保存しないバージョン

## transient
- FactoryBotで使われるブロックの一種
- ここに書かれた属性はデータベースに保存されるオブジェクトの属性としては使用されない
- 一時的な属性やアソシエーションを設定している別のテーブルの属性、テスト実行中にだけ必要な計算用の値等を設定するのに使われる
```rb
FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "title_#{n}" }
    sequence(:body) { |n| "body_#{n}" }
  end

  trait :with_author do
    transient do 
      sequence(:author_name) { |n| "author_#{n}" }
      # 実際のarticlesテーブルには存在しない"author_name"という属性を作っている
    end
  end
end
```

## after
- FactoryBotでオブジェクトが生成された後に特定のアクションを実行するためのコールバック
- オブジェクトがデータベースに保存された後に関連するオブジェクトを作成したり、何かの属性を変更したりするのに使われる
- `evaluator`
  - transientブロック内で定義された属性にアクセスするために使われるオブジェクト
  - `evaluator.属性名`とすることで属性の値を取り出せる
- `after(:createや:build) { |ファクトリー名, evaluator| 処理 }`とすることで、オブジェクトが生成された直後に特定の処理を行うことができる
```rb
FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "title_#{n}" }
    sequence(:body) { |n| "body_#{n}" }
  end

  trait :with_author do
    transient do 
      sequence(:author_name) { |n| "author_#{n}" }
    end

    after(:build) do |article, evaluator|
      article.author = build(:author, name: evaluator.author_name)
    end
  end
end
```