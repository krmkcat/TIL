# Rakeタスクのテストについて

## やり方
まず、`spec/rake_helper.rb`を作成しテスト全体に関わる設定を記述する.
```rb
require 'rails_helper'
require 'rake'

RSpec.configure do |config|
  config.before(:suite) do
    Rails.application.load_tasks #全てのrakeタスクを読み込む
  end

  config.before(:each) do
    Rake.application.tasks.each(&:reenable) # Remove persistency between examples
  end
end
```
記述内容の細かい意味については[こちらの記事](https://qiita.com/mmaumtjgj/items/fe63725571f2a97d6cb7)参照。

次に`spec/tasks`下にテストファイルを作成。以下は例。
```rb
require 'rake_helper'

describe 'article_state:change_to_published' do
  subject(:task) { Rake.application['article_state:change_to_published'] }

  before do
    create(:article, state: :publish_wait, published_at: Time.current - 1.day)
    create(:article, state: :draft)
  end

  it 'change_to_published' do
    expect { task.invoke }.to change { Article.published.size }.from(0).to(1)
  end
end
```
`subjec`は変数を宣言するメソッド。`let`との違いは、`expect`の引数になるか否か。つまりその変数の中身がテスト対象かどうか。（[参考リンク](https://kei-p3.hatenablog.com/entry/2016/05/25/235124)）

## 参考リンク
- https://qiita.com/mmaumtjgj/items/fe63725571f2a97d6cb7
- https://dev.classmethod.jp/articles/ruby-on-rails_rspec_rake_test/ （上記の記事と合わせて読むと、`rake_helper.rb`がなぜ必要なのかわかる）
- https://kei-p3.hatenablog.com/entry/2016/05/25/235124