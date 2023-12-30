const newElement = document.createElement('p');
newElement.textContent = '新しく追加しました';

const firstElement = document.querySelector('.first');
firstElement.before(newElement);
