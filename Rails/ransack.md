# ransack関連

## 検索フォームの基本
```erb
<%= search_form_for @q, url: 送信先URL do |f| do %>
  <%= f.search_field :検索対象と条件, placeholder: テキスト%>
  <%= f.select :検索対象と条件, 選択肢,  include_blank: 未選択の場合に表示するテキスト %>
  <%= f.date_field :検索対象と条件 %>
<% end %>
```