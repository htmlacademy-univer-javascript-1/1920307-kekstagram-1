import {pictures} from './data.js';

const DEFAULT_COMMENTS_COUNT = 5;
const UPLOAD_COMMENTS_COUNT = 5;

const commentSample = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const containerPhotos = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentsCountInfo = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

let currId;

function addFullPhotoClickHandler () {
  containerPhotos.addEventListener('click', showFullVersion);
}

function removeFullPhotoClickHandler () {
  containerPhotos.removeEventListener('click', showFullVersion);
}

function showFullVersion (evt) {
  if (evt.target.closest('.picture')) {
    currId = evt.target.parentNode.id;
    img.src = pictures[currId].url;
    likes.textContent = pictures[currId].likes;
    description.textContent = pictures[currId].description;
    addComments(pictures[currId].comments.slice(0, DEFAULT_COMMENTS_COUNT));

    commentsLoader.addEventListener('click', loadMoreComments);

    toggleDisplayFullVersion();
    addClosingHandlers();
    containerPhotos.removeEventListener('click', showFullVersion);
  }
}

function updateCommentsCountInfo () {
  const currentCommentsCount = commentsContainer.children.length;
  if (currentCommentsCount === pictures[currId].comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsCountInfo.innerHTML = '';
  commentsCountInfo.insertAdjacentHTML('beforeend', `${currentCommentsCount} из <span class="comments-count">${pictures[currId].comments.length}</span> комментариев`);
}

function loadMoreComments () {
  const currentCommentsCount = commentsContainer.children.length;
  addComments(pictures[currId].comments.slice(0, currentCommentsCount + UPLOAD_COMMENTS_COUNT));
}

function addComments (commentsInfo) {
  commentsContainer.innerHTML = '';
  commentsInfo.forEach((commentInfo) => {
    const newComment = commentSample.cloneNode(true);
    newComment.querySelector('.social__picture').src = commentInfo.avatar;
    newComment.querySelector('.social__text').textContent = commentInfo.message;
    commentsContainer.append(newComment);
  });
  updateCommentsCountInfo();
}

function addClosingHandlers () {
  closeButton.addEventListener('click', closeFullVersion);
  document.addEventListener('keydown', escapeCloseFullVersion);
}

function removeClosingHandlers () {
  closeButton.removeEventListener('click', closeFullVersion);
  document.removeEventListener('keydown', escapeCloseFullVersion);
}

function escapeCloseFullVersion (evt) {
  if (evt.key === 'Escape') {
    closeFullVersion();
  }
}

function closeFullVersion () {
  toggleDisplayFullVersion();
  removeClosingHandlers();
  addFullPhotoClickHandler();
  commentsLoader.removeEventListener('click', loadMoreComments);
}

function toggleDisplayFullVersion () {
  bigPicture.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
}

export {addFullPhotoClickHandler, removeFullPhotoClickHandler};
