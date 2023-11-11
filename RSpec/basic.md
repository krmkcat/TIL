# 基本的な使い方

## 大まかな流れ
1. FactoryBotを作成
2. FactoryBotの設定
3. ログインなどよく使う一連の操作をマクロとして作成
4. マクロの設定
5. 動作確認用のテストコード作成

## FactoryBotを作成
書き方は以下の例を参照。
```rb
FactoryBot.define do
  factory :ファクトリー名 do
     属性名 { '値'　}
     sequence(:属性名) { |n| "文字列_#{n}" }
  end

  trait :trait名　do
    # ここに設定を書く
  end
end
