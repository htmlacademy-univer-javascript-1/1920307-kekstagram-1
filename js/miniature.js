const sample = document.querySelector('#picture').content.querySelector('.picture');
const containerPhotos = document.querySelector('.pictures');

const renderPhotos = (picturesInfo) => {
  const fragment = document.createDocumentFragment();
  picturesInfo.forEach((pictureInfo) => {
    const newPhoto = sample.cloneNode(true);
    newPhoto.id = pictureInfo.id;
    newPhoto.querySelector('.picture__img').src = pictureInfo.url;
    newPhoto.querySelector('.picture__likes').textContent = pictureInfo.likes;
    newPhoto.querySelector('.picture__comments').textContent = pictureInfo.comments.length;
    fragment.append(newPhoto);
  });
  containerPhotos.appendChild(fragment);
};

export{renderPhotos};
