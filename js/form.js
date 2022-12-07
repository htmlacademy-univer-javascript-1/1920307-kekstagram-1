import {getFormValidator} from './form-validate.js';
import {addFullPhotoClickHandler, removeFullPhotoClickHandler} from './fullversion.js';
import {addScaleControlHandlers, setDefaultScaleValue} from './image-zoom.js';
import {addPictureEffectsControl, removePictureEffectsControl} from './image-effects.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const field = form.querySelector('.img-upload__overlay');
const uploadFile = form.querySelector('#upload-file');
const censelButton = form.querySelector('#upload-cancel');
const hashTagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const validator = getFormValidator(form, hashTagsField, descriptionField);
const submitButton = form.querySelector('.img-upload__submit');

const toggleDisplayForm = () => {
  field.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const checkValidateFields = () => {
  if (!validator.validate()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

const showForm = () => {
  toggleDisplayForm();
  uploadFile.removeEventListener('change', toggleDisplayForm);
  descriptionField.addEventListener('input', checkValidateFields);
  hashTagsField.addEventListener('input', checkValidateFields);
  addClosingHandlers();
  setDefaultScaleValue();
  removeFullPhotoClickHandler();
  addScaleControlHandlers();
  addPictureEffectsControl();
};

const closeForm = () => {
  toggleDisplayForm();
  removeClosingHandlers();
  uploadFile.addEventListener('change', showForm);
  addFullPhotoClickHandler();
  setDefaultScaleValue();
  removePictureEffectsControl();
  submitButton.disabled = false;
  validator.reset();
};

const closeWithoutSubmit = () => {
  closeForm();
  form.reset();
  uploadFile.value = '';
};

const escapeCloseForm = (evt) => {
  if (evt.key === 'Escape') {
    closeWithoutSubmit();
  }
};

const stopClosing = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

function addClosingHandlers () {
  censelButton.addEventListener('click', closeWithoutSubmit);
  document.addEventListener('keydown', escapeCloseForm);
  form.addEventListener('submit', closeForm);
  hashTagsField.addEventListener('keydown', stopClosing);
  descriptionField.addEventListener('keydown', stopClosing);
}

function removeClosingHandlers () {
  censelButton.removeEventListener('click', closeWithoutSubmit);
  document.removeEventListener('keydown', escapeCloseForm);
  form.removeEventListener('submit', closeForm);
  hashTagsField.removeEventListener('keydown', stopClosing);
  descriptionField.removeEventListener('keydown', stopClosing);
}

uploadFile.addEventListener('change', showForm);
