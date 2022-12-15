import { getData } from './api.js';
import { initializePhotos, filterPhotos } from './photo.js';
import { initializeFullVersionRender } from './fullversion.js';
import { showDownloadErrorMessage } from './message.js';
import { initializeForm } from './form.js';
import { initializeFilterControls } from './filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  initializePhotos(photos);
  initializeFullVersionRender(photos);
  initializeForm();
  initializeFilterControls(debounce(
    () => filterPhotos(),
    RERENDER_DELAY
  ));
}, showDownloadErrorMessage);
