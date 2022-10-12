import { isEscEvent } from './utils/utils.js';
import { hiddenSlider } from './slider.js';
import { onScaleControlBiggerClick, onScaleControlSmallerClick, effectChangeHandler} from './user-form.js';
import { sendData } from './api.js';

const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');

const imgUploadPreload = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview');// дублируется, посмотреть

const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlButtonSmaller = document.querySelector('.scale__control--smaller');
const scaleControlButtonBigger = document.querySelector('.scale__control--bigger');

const effectsList = document.querySelector('.effects__list');

const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionTextarea = document.querySelector('.text__description');

const selectImageForm = document.querySelector('.img-upload__form');

const errorTemplate = body.querySelector('#error').content.querySelector('.error');
const successTemplate = body.querySelector('#success').content.querySelector('.success');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    closeUserModal();
  }
};

const resetData = () => {
  const classNameRemove = imgUploadPreview.classList[1];
  imgUploadPreview.classList.remove(classNameRemove);

  uploadFileInput.value = '';
  hashtagsInput.value = '';
  descriptionTextarea.value = '';
  scaleControlValue.value = `${100}%`;
  imgUploadPreview.style = '';
  document.querySelector('input[id="effect-none"]').checked = true;
};

export const closeUserModal = () => {
  imgUploadPreload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  scaleControlButtonSmaller.removeEventListener('click', onScaleControlSmallerClick);
  scaleControlButtonBigger.removeEventListener('click', onScaleControlBiggerClick);
  effectsList.removeEventListener('click', effectChangeHandler);
  uploadCancelButton.removeEventListener('click', closeUserModal);
  resetData();
};

const openUserModal = () => {
  hiddenSlider();
  scaleControlButtonSmaller.addEventListener('click', onScaleControlSmallerClick);
  scaleControlButtonBigger.addEventListener('click', onScaleControlBiggerClick);
  effectsList.addEventListener('click', effectChangeHandler);
  uploadCancelButton.addEventListener('click', closeUserModal);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const onMessageBlockEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    removeMessageBlock();
  }
};

const removeMessageBlock = () => {
  let blockClose = document.querySelector('.success');
  if (!blockClose) {
    blockClose = document.querySelector('.error');
  }
  body.removeChild(blockClose);
  document.removeEventListener('keydown', onMessageBlockEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onMessageBlockClick);
};

const onMessageBlockClick = (evt) => {
  evt.preventDefault();
  removeMessageBlock();
};

const showMessage = function (message) {
  imgUploadPreload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  let buttonMessage;
  let messageBlock;

  if (message === 'error') {
    buttonMessage = errorTemplate.querySelector('.error__button');
    messageBlock = errorTemplate.cloneNode(true);
  } else {
    buttonMessage = successTemplate.querySelector('.success__button');
    messageBlock = successTemplate.cloneNode(true);
  }
  body.appendChild(messageBlock);

  document.addEventListener('click', onMessageBlockClick);
  document.addEventListener('keydown',onMessageBlockEscKeydown);
  buttonMessage.addEventListener('click',onMessageBlockClick);
};

export const addNewPhoto = () => {
  showMessage('success');
  closeUserModal();
};

export const setFormSubmit = (onSuccess) => {
  selectImageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => showMessage('error'),
      new FormData(evt.target),
    );
  });
};

export const setUploadFileInput = () => {
  uploadFileInput.addEventListener('input', () => {
    imgUploadPreload.classList.remove('hidden');
    body.classList.add('modal-open');
    openUserModal();
  });
};
