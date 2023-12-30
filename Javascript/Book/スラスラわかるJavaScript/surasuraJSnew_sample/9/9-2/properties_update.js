const book = { title: '吾輩は猫である' };
book.author = '夏目漱石'; // 新しいプロパティを追加
book['pages'] = 620; // 新しいプロパティを追加
console.log(book); // ①

const person = { name: 'Alice', age: 20 };
person.name = 'Bob'; // プロパティを上書き
person['age'] = 25; // プロパティを上書き
console.log(person); // ②
