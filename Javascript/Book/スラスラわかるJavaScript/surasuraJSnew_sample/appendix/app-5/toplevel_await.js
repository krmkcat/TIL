const response = await fetch('http://127.0.0.1:5500/15/sample.json');
const json = await response.json();
const resultBox = document.querySelector('.result');
resultBox.textContent = json.text;
