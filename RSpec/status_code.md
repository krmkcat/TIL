# ステータスコードを用いるテストについて

RSpecでは各ドライバー毎にサポートしているメソッドやマッチャーが異なる。  
ステータスコードに関するメソッドおよびマッチャーについては`RackTest`が対応しているので、ステータスコードを用いたテストを行いたい場合はドライバーを`RackTest`に設定する必要がある。

## ドライバーを指定する方法
全体に適用したい場合は設定ファイルに記述したほうがいいが、特定のテストでのみ適用したい場合は、そのspecファイルに以下のように記述する。
```rb
require 'rails_helper'

RSpec.describe "AdminPolicies", type: :system do
  let(:writer) { create(:user, :writer) }
  let(:editor) { create(:user, :editor) }
  let(:admin) { create(:user, :admin) }
  let!(:category) { create(:category) }
  let!(:tag) { create(:tag) }
  let!(:author) { create(:author) }

  # ↓を記述する
  before { driven_by(:rack_test) }
  ...

end
```

## 使えるメソッド・マッチャー
### `status_code`メソッド
- `page.status_code`とすることで現在のページのステータスコードを取得できる
- `expect(page.status_code).to eq(ステータスコード)`で現在のページのステータスコードが指定のものであるか確認できる

### `have_http_status`マッチャー
- `expect(page).to have_http_status(ステータスコード)`で現在のページのステータスコードが指定のものであるか確認できる