import {getFormValidator} from './form-validate.js';
import {addScaleControlHandlers, setDefaultScaleValue} from './image-zoom.js';
import {addPictureEffectsControl, resetPictureEffectsControl} from './image-effects.js';
import {sendData} from './api.js';
import {isEscapeKey} from './util.js';
import {openMessage} from './message.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const field = form.querySelector('.img-upload__overlay');
const uploadFile = form.querySelector('#upload-file');
const censelButton = form.querySelector('#upload-cancel');
const hashTagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');
const validator = getFormValidator(form, hashTagsField, descriptionField);

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const fieldInputHandler = () => {
  if (!validator.validate()) {
    blockSubmitButton();
  } else {
    unblockSubmitButton();
  }
};

const resetForm = () => {
  resetPictureEffectsControl();
  submitButton.disabled = false;
  validator.reset();
  form.reset();
  uploadFile.value = '';
  setDefaultScaleValue();
};

const closeForm = () => {
  field.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
  resetForm();
};

const showForm = () => {
  field.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
  addPictureEffectsControl();
};

function documentKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    closeForm();
  }
}

const censelButtonClickHandler = () => closeForm();

const fileChangeHandler = () => showForm();

const fieldKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const addClosingHandlers = () => {
  censelButton.addEventListener('click', censelButtonClickHandler);
  hashTagsField.addEventListener('keydown', fieldKeydownHandler);
  descriptionField.addEventListener('keydown', fieldKeydownHandler);
};

const initializeForm = () => {
  uploadFile.addEventListener('change', fileChangeHandler);
  descriptionField.addEventListener('input', fieldInputHandler);
  hashTagsField.addEventListener('input', fieldInputHandler);
  addClosingHandlers();
  addScaleControlHandlers();

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(
      () => {
        closeForm();
        unblockSubmitButton();
        openMessage(true);
      },
      () => {
        openMessage(false);
        unblockSubmitButton();
      },
      new FormData(evt.target)
    );
  });
};

export {initializeForm};
