import {DESCRIPTIONS, COMMENTS, NAMES} from './data.js';

const getRandomNumber = (from, to) => {
  if (from < 0 || to < 0) {
    throw new Error();
  }
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkComLen = (comment, maxLen) => comment.length <= maxLen;

const fillComments = () => {
  let commentId = 0;
  const comments = [];
  for (let i = 0; i < getRandomNumber(5, 20); i++) {
    const comment = COMMENTS[getRandomNumber(0, 5)];
    comments.push(
      {
        id: ++commentId,
        avatar: `img/avatar-${getRandomNumber(2, 6)}.svg`,
        message: checkComLen(comment, 1000) ? comment : comment.slice(0, 1000),
        name: NAMES[getRandomNumber(0, 25)]
      });
  }
  return comments;
};

const createPicture = () => Array(25).fill(undefined, undefined, undefined).map((elem, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, 3)],
  likes: getRandomNumber(15, 200),
  comments: fillComments()
}));

const createPictureDescription = () => createPicture();

export {createPictureDescription};


