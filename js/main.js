import {renderPictures} from './draw-miniatures.js';
import {receiveData} from './server-data.js';
import {showAlert} from './utils.js';
import './image-upload.js';

receiveData((pictures) => {
  renderPictures(pictures);
}, () => {
  showAlert('Не удалось загрузить данные. Проверьте подключение к Интернету и попробуйте перезагрузить страницу.');
});
