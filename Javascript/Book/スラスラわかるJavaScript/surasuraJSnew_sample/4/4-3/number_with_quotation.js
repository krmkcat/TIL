const a = 1;
const b = 2;
const c = '2'; // 文字列として認識される

console.log(a + b); // ①数値同士で正しく計算される
console.log(a + c); // ②数値と文字列の計算は、予想外の結果になる
