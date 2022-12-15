const sample = document.querySelector('#picture').content.querySelector('.picture');
const containerPhotos = document.querySelector('.pictures');
const filterElement = document.querySelector('.img-filters');

const RANDOM_FILTER_NAME = 'filter-random';
const DISCUSSED_FILTER_NAME = 'filter-discussed';
const RANDOM_PHOTO_COUNT = 10;

let photoData;

const deletePhotos = () => {
  const photos = containerPhotos.querySelectorAll('.picture');
  photos.forEach((photo) => photo.remove());
};

const getPhotoFragment = (pictureInfo) => {
  const newPhotoFragment = sample.cloneNode(true);
  newPhotoFragment.id = pictureInfo.id;
  newPhotoFragment.querySelector('.picture__img').src = pictureInfo.url;
  newPhotoFragment.querySelector('.picture__likes').textContent = pictureInfo.likes;
  newPhotoFragment.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
  return newPhotoFragment;
};

const renderPhotos = (picturesInfo) => {
  const fragment = document.createDocumentFragment();
  picturesInfo.forEach((pictureInfo) => {
    fragment.append(getPhotoFragment(pictureInfo));
  });
  containerPhotos.appendChild(fragment);
};

const getRandomizePhotoData = () => photoData.slice().sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTO_COUNT);

const getSortedPhotoData = () => photoData.slice().sort((firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length);

const filterPhotos = () => {
  deletePhotos();
  const selectedFilterName = filterElement.querySelector('.img-filters__button--active').id;
  switch (selectedFilterName) {
    case RANDOM_FILTER_NAME:
      renderPhotos(getRandomizePhotoData());
      break;
    case DISCUSSED_FILTER_NAME:
      renderPhotos(getSortedPhotoData());
      break;
    default:
      renderPhotos(photoData);
  }
};

const initializePhotos = (picturesInfo) => {
  photoData = picturesInfo;
  renderPhotos(picturesInfo);
};

export{initializePhotos, filterPhotos};
