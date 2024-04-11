// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Конвертація часу
import { convertMs, addLeadingZero } from './convert-time';

const input = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');

const timer = document.querySelector('.timer');
const daysEl = timer.querySelector('[data-days]');
const hoursEl = timer.querySelector('[data-hours]');
const minutesEl = timer.querySelector('[data-minutes]');
const secondsEl = timer.querySelector('[data-seconds]');

let userSelectedDate;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return iziToast.error({
        icon: 'custom-icon',
        iconColor: '#fff',

        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',

        messageColor: '#fff',
        message: 'Please choose a date in the future',
        messageSize: '16px',

        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }

    startBtn.disabled = false;
    input.disabled = true;

    startBtn.classList.add('js-button-hover');

    userSelectedDate = selectedDates[0];
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  startBtn.classList.remove('js-button-hover');

  const intervalId = setInterval(() => {
    const diff = userSelectedDate.getTime() - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      input.disabled = false;
      iziToast.success({
        title: 'OK',
        message: 'your time has come!',
        position: 'topRight',
      });
      return
    }

    const time = convertMs(diff);
    const { days, hours, minutes, seconds } = time;

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});
