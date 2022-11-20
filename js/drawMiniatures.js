import {createPictureDescription} from './util.js';

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

  picturesFragment.append(pictureElement);
};

const renderPictures = () => {
  createPictureDescription().forEach(appendPicture);
  picturesListElem.append(picturesFragment);
};

export {renderPictures};
