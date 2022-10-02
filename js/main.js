const NAMES = [
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
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const DESCRIPTIONS = [
  'Смотрите какая картинка',
  'Моя лучшая работа!',
  'Я хочу се....анс у психиатра',
  'смотрите какую фотку забацал'
];

const getRandomNumber = (from, to) => {
  if (from < 0 || to < 0) {
    throw new Error();
  }
  const max = Math.max(from, to);
  const min = Math.min(from, to);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkComLen = (comment, maxLen) => comment.length <= maxLen;

const createPhotoDescription = () => {
  let imageId = 0;
  return Array(25).fill().map((elem,index ) => ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[getRandomNumber(0, 3)],
    likes: getRandomNumber(15, 200),
    comments: Array(getRandomNumber(1, 6)).fill().map(() => (
      {
        id: ++imageId,
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message:  checkComLen(COMMENTS[getRandomNumber(0, 5)],1000) ?
          COMMENTS[getRandomNumber(0, 5)] : COMMENTS[getRandomNumber(0, 5)].slice(0,1000),
        name: NAMES[getRandomNumber(0, 24)]
      }
    ))
  }));
};

// eslint-disable-next-line no-console
createPhotoDescription().forEach((photo) => console.log(photo));


