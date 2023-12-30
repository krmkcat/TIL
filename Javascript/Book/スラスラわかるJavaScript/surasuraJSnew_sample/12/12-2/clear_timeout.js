function delayTask () {
  console.log('1秒後に実行する');
}

const timerId = setTimeout(delayTask, 5000);
clearTimeout(timerId);