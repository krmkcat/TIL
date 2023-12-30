// 上手く動作するコード！
const person = {
  name: 'Alice',
  greet: function() {
    console.log(`こんにちは、私は${this.name}です。`); // 意図した動作をする
  } 
}

person.greet();
