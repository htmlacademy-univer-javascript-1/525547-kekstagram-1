import {showErrorMessage} from './error-handle.js';

const SERVER_RECEIVE_FROM = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER_SEND_TO = 'https://26.javascript.pages.academy/kekstagram';
const LOAD_ERROR = 'Ошибка загрузки фотографий';
const UPLOAD_ERROR = 'Ошибка загрузки фотографии';

async function receiveData(receivePostsFun) {
  try {
    const response = await fetch(SERVER_RECEIVE_FROM);
    if (response.ok) {
      const posts = await response.json();
      receivePostsFun(posts);
    } else {
      showErrorMessage(LOAD_ERROR, reasonFromResponse(response));
    }
  } catch (reason) {
    showErrorMessage(LOAD_ERROR, reason);
  }
}

async function sendData(formData, success, error) {
  try {
    const response = await fetch(SERVER_SEND_TO, {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      success();
    } else {
      error(`${UPLOAD_ERROR} ${reasonFromResponse(response)}`);
    }
  } catch (reason) {
    error(`${UPLOAD_ERROR} ${reason}`);
  }
}

function reasonFromResponse(response) {
  return `${response.status} ${response.statusText}`;
}

export {receiveData, sendData};
