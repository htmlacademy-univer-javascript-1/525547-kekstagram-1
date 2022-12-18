import {isEscKey, EFFECTS} from './utils.js';
import {sendData} from './server-data.js';

const documentBody = document.querySelector('body');

const successfulSubmission = document.querySelector('#success').content.querySelector('.success');
const errSubmission = document.querySelector('#error').content.querySelector('.error');
const successButton = successfulSubmission.querySelector('.success__button');
const errorButton = errSubmission.querySelector('.error__button');

const uploadImage = document.querySelector('#upload-file');
const overlayImage = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const scaleControl = overlayImage.querySelector('.scale__control--value');
const previewImage = overlayImage.querySelector('.img-upload__preview');
const scaleControlSmaller = overlayImage.querySelector('.scale__control--smaller');
const scaleControlBigger = overlayImage.querySelector('.scale__control--bigger');

const effectLevelInput = overlayImage.querySelector('.effect-level__value');
const sliderField = overlayImage.querySelector('.img-upload__effect-level');
const effects = overlayImage.querySelector('.effects__list');
const slider = overlayImage.querySelector('.effect-level__slider');

let selectedEffect;

const MAX_HASHTAGS_NUMBER = 5;
const MAX_COMMENT_LENGTH = 140;

const pristine = new Pristine(form, {
  classTo: 'text',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, true);

const onScaleControlSmallerClick = () => {
  const newValue = Math.max(parseInt(scaleControl.value, 10) - 25, 25);
  scaleControl.value = `${newValue}%`;
  previewImage.style.transform = `scale(${newValue / 100})`;
};

const onScaleControlBiggerClick = () => {
  const newValue = Math.min(parseInt(scaleControl.value, 10) + 25, 100);
  scaleControl.value = `${newValue}%`;
  previewImage.style.transform = `scale(${newValue / 100})`;
};

const applyEffectOnImage = (evt) => {
  selectedEffect = evt.target.value;
  const effectConfig = EFFECTS[selectedEffect];
  if (!effectConfig) {
    previewImage.style.filter = 'none';
    sliderField.classList.add('hidden');
    return;
  }
  sliderField.classList.remove('hidden');

  const {min, max, step} = effectConfig;

  slider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
  });

  previewImage.className = 'img-upload__preview';
  const effectsPreview = evt.target.parentNode.querySelector('.effects__preview');
  previewImage.classList.add(effectsPreview.getAttribute('class').split('  ')[1]);
};

const changeEffectIntensity = () => {
  const sliderValue = slider.noUiSlider.get();
  effectLevelInput.value = sliderValue;
  const effectConfig = EFFECTS[selectedEffect];
  if (!effectConfig) {
    return;
  }
  previewImage.style.filter = `${effectConfig.style}(${sliderValue}${effectConfig.unit})`;
};

const closeOverlay = () => {
  uploadImage.value = '';
  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');

  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerClick);

  effects.removeEventListener('change', applyEffectOnImage);
  slider.noUiSlider.destroy();

  overlayImage.classList.add('hidden');
  document.body.classList.remove('modal-open');

  pristine.destroy();
};

const onOverlayEscKeydown = (evt) => {
  if (isEscKey(evt.key) && evt.target !== hashtagInput && evt.target !== commentInput) {
    document.removeEventListener('keydown', onOverlayEscKeydown);
    closeOverlay();
  }
};

uploadImage.addEventListener('change', () => {
  document.addEventListener('keydown', onOverlayEscKeydown);
  closeButton.addEventListener('click', closeOverlay, {once: true});

  document.body.classList.add('modal-open');
  overlayImage.classList.remove('hidden');

  scaleControl.value = '100%';
  previewImage.style.transform = 'scale(1)';
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerClick);

  selectedEffect = 'effect-none';
  previewImage.className = 'img-upload__preview';
  previewImage.classList.add('effects__preview--none');
  effects.addEventListener('change', applyEffectOnImage);

  sliderField.classList.add('hidden');
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower'
  });
  slider.noUiSlider.on('update', changeEffectIntensity);
});

const regexHashtag = /(^\s*$)|(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)/;

const splitHashtags = (values) => values.split(' ');

const isCorrectHashtag = (value) => regexHashtag.test(value);
const isCorrectComment = (value) => value.length <= MAX_COMMENT_LENGTH;
const isCorrectHashtagsNumber = (values) => {
  const hashtags = splitHashtags(values);
  return hashtags.length <= MAX_HASHTAGS_NUMBER;
};

const hasNoDuplicates = (values) => {
  const hashtags = splitHashtags(values);
  const lowerCaseHashtags = [];
  for (const hashtag of hashtags) {
    lowerCaseHashtags.push(hashtag.toLowerCase());
  }
  return !((new Set(lowerCaseHashtags)).size !== lowerCaseHashtags.length);
};

const validateHashtags = (values) => {
  if (values === '') {
    return true;
  }
  const hashtags = splitHashtags(values);
  return hashtags.every(isCorrectHashtag);
};

const validateComment = (value) => isCorrectComment(value);

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Идет публикация...';
};

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

pristine.addValidator(
  hashtagInput,
  (value) => validateHashtags(value),
  'Хэштэг задан неправильно',
  3
);

pristine.addValidator(
  hashtagInput,
  (value) => hasNoDuplicates(value),
  'Хэштэги должны быть уникальными'
);

pristine.addValidator(
  hashtagInput,
  (value) => isCorrectHashtagsNumber(value),
  'Хэштэгов не должно быть больше 5',
  1
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не должна превышать 140 символов'
);

const closeMessages = () => {
  if (documentBody.contains(successfulSubmission)) {
    documentBody.removeChild(successfulSubmission);
  }
  if (documentBody.contains(errSubmission)) {
    overlayImage.classList.remove('hidden');
    documentBody.removeChild(errSubmission);
  }
  removeEventListenersMsg();
};

const onCloseSuccessMsgClick = (evt) => {
  if (evt.target === successfulSubmission) {
    closeMessages();
  }
};

const onCloseErrorMsgClick = (evt) => {
  if (evt.target === errSubmission) {
    closeMessages();
  }
};

const onErrorMsgEscKeydown = (evt) => {
  if (isEscKey(evt.key)) {
    closeMessages();
  }
};

function removeEventListenersMsg() {
  document.removeEventListener('keydown', onErrorMsgEscKeydown);
  document.removeEventListener('click', onCloseSuccessMsgClick);
  successButton.removeEventListener('click', closeMessages);
  document.removeEventListener('click', onCloseErrorMsgClick);
  errorButton.removeEventListener('click', closeMessages);
}

const successFunc = () => {
  closeOverlay();
  enableSubmitButton();
  successButton.addEventListener('click', closeMessages);
  document.addEventListener('keydown', onErrorMsgEscKeydown);
  document.addEventListener('click', onCloseSuccessMsgClick);
  documentBody.appendChild(successfulSubmission);
};

const errorFunc = () => {
  overlayImage.classList.add('hidden');
  enableSubmitButton();
  errorButton.addEventListener('click', closeMessages);
  document.addEventListener('keydown', onErrorMsgEscKeydown);
  document.addEventListener('click', onCloseErrorMsgClick);
  documentBody.appendChild(errSubmission);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValidForm = pristine.validate();
  if (isValidForm) {
    disableSubmitButton();
    sendData(
      errorFunc,
      successFunc,
      new FormData(evt.target)
    );
  }
});
