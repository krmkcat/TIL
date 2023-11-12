# 基本的な使い方

## 大まかな流れ
1. FactoryBotを作成
2. FactoryBotの設定
3. よく使う一連の操作をモジュールとして作成
4. マクロの設定
5. 動作確認用のテストコード作成

## FactoryBotを作成
書き方は以下の例を参照。
```rb
FactoryBot.define do
  factory :user do
     introduce { '自己紹介です。'　}
     sequence(:name) { |n| "user_#{n}" }
     role { :general }
  end

  trait :admin　do
    role { :admin }
  end
end
```

## FactoryBotの設定
Factory生成時に'FactoryBot'という文言を省略できるように、設定ファイルに記述を追加する。
```rb
# /spec/rails_helper.rbに追記

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

## よく使う一連の操作をモジュールとして作成
- `/spec/support`に配置するのが一般的
- 以下ログインマクロの例。
  ```rb
  module LoginMacros
     def login(user)
       visit login_path
       fill_in 'user[name]', with: user.name
       click_button('次へ')
       # DB上では暗号化されて crypted_password に保存されているため user.password で取り出せないので、直接文字列で password を渡す
       fill_in 'user[password]', with: 'password'
       click_button('ログイン')
     end
   end
  ```

## モジュールの設定
作成したモジュールを使えるように設定ファイルに追記。
```rb
# /spec/rails_helper.rbに追記

RSpec.configure do |config|
  config.include LoginMacros
end
```

## 動作確認用のテストコード作成
- モデルのテスト（バリデーションチェックなど）は`/spec/models`、ロジックのテストは`/spec/system`に格納するのが基本
- ↑に合わせて`type`の値を変える
- メソッドやマッチャーについては別ファイル参照
- 大まかな書き方については以下の例を参照。`describe`、`context`、`it`は好きなように入れ子にしてOK。
  ```rb
  require 'rails_helper'

  RSpec.describe 'テスト対象' type: :system do
    context '条件、状態など' do
      it 'テスト内容' do
        ...
        ...
      end
    end
  end
  ```