import {pictures} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const commentSample = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const commentsCountInfo = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const containerPhotos = document.querySelector('.pictures');

function addFullPhotoClickHandler () {
  containerPhotos.addEventListener('click', showFullVersion);
}

function showFullVersion (evt) {
  const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const likes = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const comments = bigPicture.querySelector('.social__comments');
  const description = bigPicture.querySelector('.social__caption');

  if (evt.target.closest('.picture')) {
    const id = evt.target.parentNode.id;
    img.src = pictures[id].url;
    likes.textContent = pictures[id].likes;
    commentsCount.textContent = pictures[id].comments.length;
    description.textContent = pictures[id].description;
    addComments(comments, pictures[id].comments);

    toggleDisplayFullVersion();
    addClosingClickHandler();
    containerPhotos.removeEventListener('click', showFullVersion);
  }
}

function addComments (container, commentsInfo) {
  container.innerHTML = '';
  commentsInfo.forEach((commentInfo) => {
    const newComment = commentSample.cloneNode(true);
    newComment.querySelector('.social__picture').src = commentInfo.avatar;
    newComment.querySelector('.social__text').textContent = commentInfo.message;
    container.append(newComment);
  });
}

function addClosingClickHandler () {
  closeButton.addEventListener('click', clickCloseFullVersion);
  document.addEventListener('keydown', escapeCloseFullVersion);
}

function escapeCloseFullVersion (evt) {
  if (evt.key === 'Escape') {
    toggleDisplayFullVersion();
  }
  this.removeEventListener('keydown', escapeCloseFullVersion);
  containerPhotos.addEventListener('click', showFullVersion);
}

function clickCloseFullVersion () {
  toggleDisplayFullVersion();
  this.removeEventListener('click', clickCloseFullVersion);
  containerPhotos.addEventListener('click', showFullVersion);
}

function toggleDisplayFullVersion () {
  bigPicture.classList.toggle('hidden');
  commentsCountInfo.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
}

export {addFullPhotoClickHandler};
