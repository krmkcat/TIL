// 上手く動作しないコード
const person = {
  name: 'Alice',
  greet: function() {
    console.log(`こんにちは、私は${name}です。`); // 意図した動作にならない
  }
}

person.greet();
