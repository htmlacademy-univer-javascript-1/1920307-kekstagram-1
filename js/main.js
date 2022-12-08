import { getData } from './api.js';
import { renderPhotos } from './miniature.js';
import { initializeFullVersionRender } from './fullversion.js';
import { showDownloadErrorMessage } from './message.js';
import { initializeForm } from './form.js';


getData((photos) => {
  renderPhotos(photos);
  initializeFullVersionRender(photos);
}, showDownloadErrorMessage);

initializeForm();
