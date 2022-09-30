const getRandomNumber = (from, to) => {
  if (from < 0 || to < 0) {
    throw new Error();
  }
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const allNames = [
  'Александр',
  'Иван',
  'Максим',
  'Егор',
  'Михаил',
  'Андрей',
  'Марк',
  'Сергей',
  'Роман',
  'Владимир',
  'Матвей',
  'Денис',
  'Павел',
  'Степан',
  'Глеб',
  'Григорий',
  'Руслан',
  'Кирилл',
  'Вадим',
  'Константин',
  'Олег',
  'Ярослав',
  'Антон',
  'Виктор',
  'Артём'
];
const allComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const allDescriptions = [
  'Смотрите какая картинка',
  'Моя лучшая работа!',
  'Я хочу се....анс у психиатра',
  'смотрите какую фотку забацал'
];
//const checkComLen = (comment, maxLen) => comment.length <= maxLen;

const createPhotoDescription = () => {
  const commentsArray =[];
  const commentsFill = () => {
    for (let i = 0; i < getRandomNumber(1, 5); i++) {
      commentsArray.push({
        id: i,
        avatar: `img/avatar-${getRandomNumber(0, 5)}.svg`,
        message: allComments[getRandomNumber(0, 5)],
        name: allNames[getRandomNumber(0, 24)],
      });
    }
    return commentsArray;
  };
  let lastImageId = 1;
  return Array(25).fill(undefined).map(() => ({
    id: lastImageId,
    url: `photos/${lastImageId++}.jpg`,
    description:  allDescriptions[getRandomNumber(0,3)],
    likes: getRandomNumber(15, 200),
    comments: commentsFill(),
  }));
};

// eslint-disable-next-line no-console
console.log(createPhotoDescription());
