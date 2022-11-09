import {pictures} from './data.js';
import {addBigPhotoClickHandler} from './fullversion.js';

const sample = document.querySelector('#picture').content.querySelector('.picture');
const containerPhotos = document.querySelector('.pictures');

function createMiniaturesFragment (picturesInfo) {
  const fragment = document.createDocumentFragment();
  picturesInfo.forEach((pictureInfo) => {
    const newPhoto = sample.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = pictureInfo.url;
    newPhoto.querySelector('.picture__likes').textContent = pictureInfo.likes;
    newPhoto.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
    addBigPhotoClickHandler(newPhoto, pictureInfo);
    fragment.append(newPhoto);
  });
  return fragment;
}

containerPhotos.append(createMiniaturesFragment(pictures));
