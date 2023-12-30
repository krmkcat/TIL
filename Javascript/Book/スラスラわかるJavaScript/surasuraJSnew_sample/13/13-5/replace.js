const newElement = document.createElement('p');
newElement.textContent = '置き換える要素です';

const firstElement = document.querySelector('.first');
firstElement.replaceWith(newElement);
