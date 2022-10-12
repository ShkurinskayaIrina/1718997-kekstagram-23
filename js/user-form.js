import { isEscEvent } from './utils/utils.js';
import { EffectsPreview } from './const.js';
import { sliderElementUpdateOptions, showSlider, hiddenSlider } from './slider.js';

const MIN_HASHTAGS_LENGTH = 2;
const MAX_HASHTAGS_LENGTH = 25;
const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const imgUploadPreview = document.querySelector('.img-upload__preview');

const scaleControlValue = document.querySelector('.scale__control--value');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextarea = document.querySelector('.text__description');

export const onScaleControlSmallerClick = () => {
  const scale =Number(scaleControlValue.value.replace('%','')) - 25;
  if (scale > 0) {
    scaleControlValue.value = `${scale}%`;
    imgUploadPreview.style.transform = `scale(${scale/100})`;
  }
};

export const onScaleControlBiggerClick = () => {
  const scale =Number(scaleControlValue.value.replace('%','')) + 25;
  if (scale <= 100) {
    scaleControlValue.value = `${scale}%`;
    imgUploadPreview.style.transform = `scale(${scale/100})`;
  }
};

export const effectChangeHandler = (evt) => {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    const classNameRemove = imgUploadPreview.classList[1];
    imgUploadPreview.classList.remove(classNameRemove);

    const classNameNew = `effects__preview--${evt.target.value}`;
    if (evt.target.value !== EffectsPreview.None) {
      imgUploadPreview.classList.add(classNameNew);
      showSlider();
    } else {
      hiddenSlider();
    }

    if (evt.target.value === EffectsPreview.Chrome ||
    evt.target.value === EffectsPreview.Sepia) {
      sliderElementUpdateOptions(0, 1, 0.1);
    }

    if (evt.target.value === EffectsPreview.Marvin) {
      sliderElementUpdateOptions(0, 100, 1);
    }

    if (evt.target.value === EffectsPreview.Phobos) {
      sliderElementUpdateOptions(0, 3, 0.1);
    }

    if (evt.target.value === EffectsPreview.Heat) {
      sliderElementUpdateOptions(1, 3, 0.1);
    }
  }
};

hashtagsInput.addEventListener('input', () => {
  const re = '^#[A-Za-zА-Яа-я0-9]+$/';
  hashtagsInput.setCustomValidity('');
  if (hashtagsInput.value.length !== 0) {
    const hashtagsList = hashtagsInput.value.toLowerCase().split(' ');

    hashtagsList.forEach((hashtag) => {
      if (hashtag.toLowerCase() !== '') {
        if (!hashtag.match(/^#/)) {
          hashtagsInput.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
        }

        if (hashtag.length < MIN_HASHTAGS_LENGTH || hashtag.length > MAX_HASHTAGS_LENGTH) {
          hashtagsInput.setCustomValidity(`минимальная длина одного хэш-тега - ${MIN_HASHTAGS_LENGTH} символа, максимальная - ${MAX_HASHTAGS_LENGTH} символов, включая решётку`);
        }

        if (hashtag.match(re)) {
          hashtagsInput.setCustomValidity('хэш-тег должен состоять только из символа # (решётка), букв и чисел');
        }
      }
    });

    const hashtagsListWithoutDuplicates = [...new Set(hashtagsList)];
    if (hashtagsList.length !== hashtagsListWithoutDuplicates.length) {
      hashtagsInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    }

    if (hashtagsList.length > MAX_HASHTAGS_COUNT ) {
      hashtagsInput.setCustomValidity(`нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов. Удалите ${MAX_HASHTAGS_COUNT - hashtagsList.length}`);
    }

    hashtagsInput.reportValidity();
  }
});

descriptionTextarea.addEventListener('input', () => {
  const descriptionLength = descriptionTextarea.value.length;

  if (descriptionLength > MAX_DESCRIPTION_LENGTH) {
    descriptionTextarea.setCustomValidity(descriptionLength - MAX_DESCRIPTION_LENGTH);
  } else {
    descriptionTextarea.setCustomValidity('');
  }

  descriptionTextarea.reportValidity();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

descriptionTextarea.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

