import { EffectsPreview } from '../const.js';

const ALERT_SHOW_TIME = 5000;

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isEnterEvent = (evt) => evt.key === 'Enter';

export const getEffectName = (classNameEffect) => {
  if ( classNameEffect === EffectsPreview.Chrome) {
    return 'grayscale';
  }
  if (classNameEffect=== EffectsPreview.Sepia) {
    return 'sepia';
  }
  if (classNameEffect === EffectsPreview.Marvin) {
    return 'invert';
  }
  if (classNameEffect === EffectsPreview.Phobos) {
    return 'blur';
  }
  if (classNameEffect === EffectsPreview.Heat) {
    return 'brightness';
  }
};

export const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Не удалось загрузить данные. Перезагрузите страницу';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export const getRandomInt = function (param1, param2) {
  let minRange = Math.abs(param1);
  let maxRange = Math.abs(param2);

  if (minRange > maxRange) {
    [minRange, maxRange] = [maxRange, minRange];
  }

  return Math.floor(Math.random()*(maxRange-minRange+1))+minRange;
};
