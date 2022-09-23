function getRandomNumber(from, to) {
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkComLen(comment, maxLen) {
  return comment.length <= maxLen;
}

/* eslint-disable no-console */
console.log(getRandomNumber(0, 10000));
console.log(getRandomNumber(10000, 0));
console.log(checkComLen('Вы запостили кринж!', 20));
console.log(checkComLen('Но на этот раз прощаем вас', 20));
/* eslint-enable no-console */
