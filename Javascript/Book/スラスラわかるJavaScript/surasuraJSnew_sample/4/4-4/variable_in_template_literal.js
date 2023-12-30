const name = 'Alice';

// + を用いたコード
const text1 = '私の名前は' + name + 'です';
console.log(text1); // ①

// テンプレートリテラルを用いて書き換えたコード
const text2 = `私の名前は${name}です`;
console.log(text2); // ②
