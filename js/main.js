const getRandomNumber = (from, to) => {
  if (from < 0 || to < 0) {throw new Error();}
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkComLen = (comment, maxLen)  => comment.length <= maxLen;

/* eslint-disable no-console */
try {
  console.log(getRandomNumber(0, 10000));
  console.log(getRandomNumber(10000, 0));
  console.log(getRandomNumber(-1, 10000));
} catch (e) {
  console.log('All numbers must be positive');
}
console.log(checkComLen('Вы запостили кринж!', 20));
console.log(checkComLen('Но на этот раз прощаем вас', 20));
/* eslint-enable no-console */
