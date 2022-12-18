const documentBody = document.querySelector('body');

const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'grayscale',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    style: 'invert',
    unit: '%',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    style: 'sepia',
    unit: '',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    style: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    style: 'brightness',
    unit: '',
  }
};

const showAlert = (message) => {
  const alertTemplate = `
    <div class="alert-container" style="z-index: 100; background-color: rgba(95,86,32,0.62); position: fixed; left: 0; top: 0; bottom: 0; right: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;">
      <div class="alert-block" style="padding: 3%; position: relative; display: flex; justify-content: center; align-items: center; width: 50%; height: 50%; font-size: 25px; line-height: 1.5; text-align: center; background-color: #3c3614; color: #ffe753; border-radius: 10px;">
        ${message}
      </div>
    </div>
  `;

  const template = document.createElement('template');
  template.innerHTML = alertTemplate;

  const alertContainer = template.content.firstElementChild;
  documentBody.appendChild(alertContainer);
};


const isEscKey = (keyCode) => keyCode === 'Escape';

export {isEscKey, EFFECTS, showAlert};


