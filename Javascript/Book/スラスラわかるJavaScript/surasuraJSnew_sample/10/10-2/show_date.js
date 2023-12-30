const today = new Date().toLocaleString('ja-JP', {
  dateStyle: 'long'
});
console.log(today); //❶

const formatter = Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'long'
});
const today = formatter.format(new Date());
console.log(today); //❷