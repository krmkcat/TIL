// 関数スコープ
function sample() {
  const x = 10;
  console.log(x); // sample関数内部からxを参照することはできる
}
sample(); // ①
console.log(x); // ②sample関数外部からxは参照できないためエラーになる
