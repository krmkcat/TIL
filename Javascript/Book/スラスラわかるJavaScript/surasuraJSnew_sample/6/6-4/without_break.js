const ranking = 2;

switch (ranking) {
  case 1:
    console.log('金メダル');
    break;
  case 2: // このケースの中に break が存在しない
    console.log('銀メダル');
  case 3:
    console.log('銅メダル');
    break; // ここでようやく処理が止まる
  default:
    console.log('メダルなし');
}
