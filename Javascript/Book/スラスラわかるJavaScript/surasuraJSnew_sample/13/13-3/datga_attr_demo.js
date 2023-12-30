const scoreElement = document.querySelector('.score');
const score = scoreElement.dataset.score;
if (score >= 80) {
  scoreElement.style.color = 'blue';
}
