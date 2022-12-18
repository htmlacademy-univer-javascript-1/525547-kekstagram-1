const SERVER_RECEIVE_FROM = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER_SEND_TO = 'https://26.javascript.pages.academy/kekstagram';
const LOAD_ERROR = 'Ошибка загрузки фотографий';
const UPLOAD_ERROR = 'Ошибка загрузки фотографии';

const receiveData = (onSuccess, onFail) => {
  fetch(SERVER_RECEIVE_FROM)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Not OK response');
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      onFail(LOAD_ERROR);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SERVER_SEND_TO, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error('Not OK response');
      }
    })
    .catch(() => {
      onFail(UPLOAD_ERROR);
    });
};

export {receiveData, sendData};
