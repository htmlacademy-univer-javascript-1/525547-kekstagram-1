import {isEscKey} from './utils.js';

const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const closeOverlay = () => {
  uploadImage.value = '';
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onOverlayEscKeydown = (evt) => {
  if (isEscKey(evt.key) && evt.target !== hashtagInput && evt.target !== commentInput) {
    closeOverlay();
  }
};

const openOverlay = () => {
  document.addEventListener('keydown', onOverlayEscKeydown);
  closeButton.addEventListener('click', closeOverlay, {once: true});

  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');
};

uploadImage.addEventListener('change', openOverlay);

// Validation
const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;

const isCorrectHashtag = (value) => regexHashtag.test(value);
const isCorrectComment = (value) => value.length < 140;

const validateHashtag = (value) => {
  const hashtags = value.split(' ');
  return hashtags.every(isCorrectHashtag);
};

const validateComment = (value) => isCorrectComment(value);

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, true);

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  'Хэштэг задан неправильно'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не должна превышать 140 символов'
);

form.addEventListener('submit', () => {
  pristine.validate();
});
