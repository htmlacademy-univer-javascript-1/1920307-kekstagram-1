import {pictures} from './data.js';

const DEFAULT_COMMENTS_COUNT = 5;
const UPLOAD_COMMENTS_COUNT = 5;

const commentSample = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');
const containerPhotos = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentsCountInfo = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const img = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

let currId;

const updateCommentsCountInfo = () => {
  const currentCommentsCount = commentsContainer.children.length;
  if (currentCommentsCount === pictures[currId].comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsCountInfo.innerHTML = '';
  commentsCountInfo.insertAdjacentHTML('beforeend', `${currentCommentsCount} из <span class="comments-count">${pictures[currId].comments.length}</span> комментариев`);
};

const addComments = (commentsInfo) => {
  commentsContainer.innerHTML = '';
  commentsInfo.forEach((commentInfo) => {
    const newComment = commentSample.cloneNode(true);
    newComment.querySelector('.social__picture').src = commentInfo.avatar;
    newComment.querySelector('.social__text').textContent = commentInfo.message;
    commentsContainer.append(newComment);
  });
  updateCommentsCountInfo();
};

const loadMoreComments = () => {
  const currentCommentsCount = commentsContainer.children.length;
  addComments(pictures[currId].comments.slice(0, currentCommentsCount + UPLOAD_COMMENTS_COUNT));
};

const toggleDisplayFullVersion = () => {
  bigPicture.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
};

const showFullVersion = (evt) => {
  if (evt.target.closest('.picture')) {
    currId = evt.target.parentNode.id;
    const currPictureInfo = pictures.find((item) => item.id === Number(currId));
    img.src = currPictureInfo.url;
    likes.textContent = currPictureInfo.likes;
    description.textContent = currPictureInfo.description;
    addComments(currPictureInfo.comments.slice(0, DEFAULT_COMMENTS_COUNT));

    commentsLoader.addEventListener('click', loadMoreComments);

    toggleDisplayFullVersion();
    addClosingHandlers();
    containerPhotos.removeEventListener('click', showFullVersion);
  }
};

const removeFullPhotoClickHandler = () => {
  containerPhotos.removeEventListener('click', showFullVersion);
};

const closeFullVersion = () => {
  toggleDisplayFullVersion();
  removeClosingHandlers();
  addFullPhotoClickHandler();
  commentsLoader.removeEventListener('click', loadMoreComments);
};

const escapeCloseFullVersion = (evt) => {
  if (evt.key === 'Escape') {
    closeFullVersion();
  }
};

function removeClosingHandlers () {
  closeButton.removeEventListener('click', closeFullVersion);
  document.removeEventListener('keydown', escapeCloseFullVersion);
}

function addFullPhotoClickHandler () {
  containerPhotos.addEventListener('click', showFullVersion);
}

function addClosingHandlers () {
  closeButton.addEventListener('click', closeFullVersion);
  document.addEventListener('keydown', escapeCloseFullVersion);
}

export {addFullPhotoClickHandler, removeFullPhotoClickHandler};
