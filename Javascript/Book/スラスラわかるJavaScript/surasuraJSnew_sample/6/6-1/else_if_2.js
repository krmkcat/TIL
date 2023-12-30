const weight = 300;

if (weight < 1000) {
  console.log('配送料600円');
} else if (weight < 500) {
  console.log('配送料400円');
} else if (weight < 250) {
  console.log('配送料200円');
} else {
  console.log('取扱いできません');
}
