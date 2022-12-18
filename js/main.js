export {faker} from 'https://cdn.skypack.dev/@faker-js/faker';
import {initialRenderPictures} from './draw-miniatures.js';
import {receiveData} from './server-data.js';
import {showAlert} from './utils.js';
import './image-upload.js';

receiveData((pictures) => {
  initialRenderPictures(pictures);
}, () => {
  showAlert('Не удалось загрузить данные. Проверьте подключение к Интернету и попробуйте перезагрузить страницу.');
});
