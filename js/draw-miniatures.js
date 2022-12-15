import {createPictureDescription} from './utils.js';
import {initBigPicture} from './show-full-size-picture.js';

const picturesListElem = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const appendPicture = (picture) => {
  const {url, likes, comments} = picture;

  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', () =>  initBigPicture(picture));

  picturesFragment.append(pictureElement);
};

const renderPictures = () => {
  createPictureDescription().forEach(appendPicture);
  picturesListElem.append(picturesFragment);
};

export {renderPictures};
