// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

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
      title: 'Caution',
      message: 'enter a number greater than 999',
      position: 'topRight',
    });
    formEl.reset();
    return;
  }
  formEl.reset();

  createPromise(state, seconds)
    .then(response => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${seconds}`,
        position: 'topRight',
      });
    })
    .catch(eror => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${seconds}`,
        position: 'topRight',
      });
    });
}
