import {getFormValidator} from './form-validate.js';
import {addFullPhotoClickHandler, removeFullPhotoClickHandler} from './fullversion.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const field = form.querySelector('.img-upload__overlay');
const uploadFile = form.querySelector('#upload-file');
const censelButton = form.querySelector('#upload-cancel');
const hashTagsField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const validator = getFormValidator(form, hashTagsField, descriptionField);

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

function escapeCloseForm (evt) {
  if (evt.key === 'Escape') {
    closeWithoutSubmit();
  }
}

function stopSubmit (evt) {
  if (!validator.validate()) {
    evt.preventDefault();
  }
}

function stopClosing (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function closeWithoutSubmit () {
  closeForm();
  form.reset();
  uploadFile.value = '';
}

function closeForm () {
  toggleDisplayForm();
  removeClosingHandlers();
  uploadFile.addEventListener('change', showForm);
  form.removeEventListener('submit', stopSubmit);
  addFullPhotoClickHandler();
}

function showForm () {
  toggleDisplayForm();
  uploadFile.removeEventListener('change', toggleDisplayForm);
  form.addEventListener('submit', stopSubmit);
  addClosingHandlers();
  removeFullPhotoClickHandler();
}

function toggleDisplayForm () {
  field.classList.toggle('hidden');
  body.classList.toggle('modal-open');
}

uploadFile.addEventListener('change', showForm);
