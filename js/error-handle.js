const errorTemp = document.querySelector('#error').content.querySelector('section');
const errorBlock = errorTemp.cloneNode(true);
const errorMessage = errorBlock.querySelector('.error__title');
const errorReason = errorBlock.querySelector('.error__reason');
const closeErrorButton = errorBlock.querySelector('.error__button');

document.body.appendChild(errorBlock);

closeErrorButton.addEventListener('click', () => {
  errorBlock.classList.add('hidden');
  document.body.removeChild(errorBlock);
});

export function showErrorMessage(message, reason) {
  errorBlock.classList.remove('hidden');
  errorMessage.textContent = message;
  errorReason.textContent = reason === undefined ? '' : reason;
}

errorBlock.addEventListener('click', (evt) => {
  if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
    document.body.removeChild(errorBlock);
    errorBlock.classList.add('hidden');
  }
});
