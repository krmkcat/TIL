if (true) {
  const x = 10;
  console.log(x);　// ①ブロック内部から変数xを参照することはできる
}
console.log(x); // ②ブロック外部から変数xは参照できないためエラーになる
