// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// icon
import checkMark from '../img/check-mark.svg';
import cautionIcon from '../img/check-mark.svg';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitForm);

function createPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.toLowerCase() === 'rejected') {
        reject();
      } else if (state.toLowerCase() === 'fulfilled') {
        resolve();
      }
    }, delay);
  });
}

function onSubmitForm(event) {
  event.preventDefault();

  const seconds = formEl.querySelector('[name="delay"]').value;
  const state = formEl.querySelector('[name="state"]:checked').value;

  //   const seconds = event.target.elements.delay.value;
  //   const state = event.target.elements.state.value;

  if (seconds < 999 || isNaN(seconds)) {
    iziToast.warning({
      iconUrl: cautionIcon,
      title: 'Caution',
      titleColor: '#fff',

      message: 'enter a number greater than 999',
      messageColor: '#fff',
      messageSize: '16px',

      backgroundColor: '#ffa000',

      position: 'topRight',
    });
    formEl.reset();
    return;
  }
  formEl.reset();

  createPromise(state, seconds)
    .then(response => {
      iziToast.success({
        iconUrl: checkMark,

        title: 'OK',
        titleColor: '#fff',

        message: `Fulfilled promise in ${seconds}`,
        messageColor: '#fff',
        messageSize: '16px',

        backgroundColor: '#59a10d',

        position: 'topRight',
      });
    })
    .catch(eror => {
      iziToast.error({
        icon: 'custom-icon',

        title: 'Error',
        titleColor: '#fff',

        message: `Rejected promise in ${seconds}`,
        messageColor: '#fff',
        messageSize: '16px',

        backgroundColor: '#ef4040',

        position: 'topRight',
      });
    });
}
