import {isEscKey} from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img img');

const bigPictureSocial = document.querySelector('.big-picture__social');
const bigPictureDescription = bigPictureSocial.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');

const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsTotalCount = bigPictureCommentsCount.querySelector('.comments-count');

const commentsListElement = document.querySelector('.social__comments');
const commentsTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsLoader = document.querySelector('.social__comments-loader');

const buttonCloseElement = document.querySelector('#picture-cancel');

let picComments;
let loadCounter = 0;

const renderComment = (comment) => {
  const commentElement = commentsTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

const initRenderComments = () => {
  const allComments = ` из ${picComments.length} комментариев`;
  const commentsNumber = picComments.length < 6 ? picComments.length : 5;
  bigPictureCommentsCount.textContent = `${commentsNumber}${allComments}`;
  for (let i = 0; i < commentsNumber; i++) {
    const comment = renderComment(picComments[i]);
    commentsListElement.appendChild(comment);
    loadCounter = i + 1;
  }
};

const onCommentsLoaderClick = () => {
  for (let i = loadCounter; i < loadCounter + 5; i++) {
    const allComments = ` из ${picComments.length} комментариев`;
    if (i === picComments.length - 1) {
      commentsLoader.classList.add('hidden');
    }
    if (i >= picComments.length) {
      break;
    }
    const comment = renderComment(picComments[i]);
    commentsListElement.appendChild(comment);
    bigPictureCommentsCount.textContent = `${i + 1}${allComments}`;
  }
  loadCounter += 5;
};

const closeBigPicture = () => {
  bigPictureCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

const initBigPicture = ({url, likes, comments, description}) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCommentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  bigPicture.src = url;
  bigPictureDescription.textContent = description;
  bigPictureLikesCount.textContent = likes;
  bigPictureCommentsTotalCount.textContent = comments.length;

  commentsListElement.textContent = '';
  loadCounter = 0;
  picComments = comments;

  if (picComments.length <= 5) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  }
  initRenderComments();

  buttonCloseElement.addEventListener('click', closeBigPicture, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscKey(evt.key)) {
      closeBigPicture();
    }
  });
};

export {initBigPicture};
