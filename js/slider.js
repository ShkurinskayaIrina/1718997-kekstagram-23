import { getEffectName } from './utils/utils.js';

const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');

const imgUploadPreview = document.querySelector('.img-upload__preview');// дублируется, посмотреть

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) { //нужен для форматирования значения из слайдера и вывода его где-либо
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) { //нужен для форматирования значения для слайдера.
      return parseFloat(value);
    },
  },
});

const getMeasurement = (param) => {
  if (param === 'invert') {
    return '%';
  }
  if (param === 'blur') {
    return 'px';
  }
  return '';
};

sliderElement.noUiSlider.on('update', (values, handle) => {
  sliderValue.value = values[handle];
  const fullNameEffectClass = imgUploadPreview.classList[1];
  if (fullNameEffectClass) {
    const nameEffectClass = fullNameEffectClass.substring(fullNameEffectClass.indexOf('--')+2, fullNameEffectClass.length);
    const effectName = getEffectName(nameEffectClass);
    imgUploadPreview.style.filter = `${effectName}(${sliderValue.value}${getMeasurement(effectName)})`;
  }
});

export const sliderElementUpdateOptions = (rangeMin, rangeMax, rangeStep) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    step: rangeStep,
  });
  sliderElement.noUiSlider.set(rangeMin);
};

export const showSlider = () => {
  sliderElement.removeAttribute('hidden');
};

export const hiddenSlider = () => {
  sliderElement.setAttribute('hidden', true);
  imgUploadPreview.style.filter = '';
  sliderValue.value = '';
};
