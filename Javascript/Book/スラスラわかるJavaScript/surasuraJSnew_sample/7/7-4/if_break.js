for (i = 0; i < 10; i++) {
  if (i == 3) { // iが3になったタイミングでbreakが実行される
    break; // break文
  }
  console.log(`${i}回目の処理`);
}