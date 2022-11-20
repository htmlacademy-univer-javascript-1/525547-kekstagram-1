const bigPictureElement = document.querySelector('.big-picture');
const bigPicture = document.querySelector('.big-picture__img img');

const bigPictureSocial = document.querySelector('.big-picture__social');
const bigPictureDescription =  bigPictureSocial.querySelector('.social__caption');
const bigPictureLikesCount = bigPictureSocial.querySelector('.likes-count');

const bigPictureCommentsCount = document.querySelector('.social__comment-count');
const bigPictureCommentsTotalCount = bigPictureCommentsCount.querySelector('.comments-count');

const commentsListElement = document.querySelector('.social__comments');
const commentsTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsLoader = document.querySelector('.social__comments-loader');

const buttonCloseElement = document.querySelector('#picture-cancel');


const closePictureModal = () => {
  bigPictureCommentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const renderComments = (picture) => {
  commentsListElement.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  picture.comments.forEach(({avatar, name, message}) => {
    const commentElement = commentsTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentElement);
  });
  commentsListElement.append(commentsFragment);
};

const initBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  bigPictureCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureDescription.textContent = picture.description;
  bigPicture.src = picture.url;
  bigPicture.likes = picture.likes;

  bigPictureLikesCount.textContent = picture.likes;
  bigPictureCommentsTotalCount.textContent = picture.comments.length.toString();

  renderComments(picture);

  document.addEventListener('keydown',  (evt) => {
    if (evt.key === 'Escape') {
      closePictureModal();
    }
  });
  buttonCloseElement.addEventListener('click' , () => closePictureModal(), {once: true});
};


export {initBigPicture};
