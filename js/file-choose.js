import { FILE_TYPES } from './utils.js';

const fileChooser = document.querySelector('input[type=file]');
const preview = document.querySelector('.img-upload__preview').querySelector('img');

let objectUrl;

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    objectUrl = URL.createObjectURL(file);
    preview.src = objectUrl;
  }
});
