const newElement = document.createElement('p');
newElement.textContent = '先頭に追加します';

const content = document.querySelector('.content');
content.prepend(newElement);
