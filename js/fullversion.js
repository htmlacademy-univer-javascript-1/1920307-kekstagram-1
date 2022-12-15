import {isEscapeKey} from './util.js';

const DEFAULT_COMMENTS_COUNT = 5;
const UPLOAD_COMMENTS_COUNT = 5;

const body = document.querySelector('body');
const photoContainer = body.querySelector('.pictures');
const bigPicture = body.querySelector('.big-picture');
const commentSample = bigPicture.querySelector('.social__comment');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCountInfo = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const img = bigPicture.querySelector('.big-picture__img img');
const likes = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');

let currId;
let photoData;

const getCurrentCommentsCount = () => commentsContainer.children.length;

const updateCommentsCountInfo = () => {
  const currentCommentsCount = getCurrentCommentsCount();
  if (currentCommentsCount === photoData[currId].comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsCountInfo.innerHTML = '';
  commentsCountInfo.insertAdjacentHTML('beforeend', `${currentCommentsCount} из <span class="comments-count">${photoData[currId].comments.length}</span> комментариев`);
};

const renderComments = (commentData) => {
  commentsContainer.innerHTML = '';
  commentData.forEach((commentInfo) => {
    const newComment = commentSample.cloneNode(true);
    newComment.querySelector('.social__picture').src = commentInfo.avatar;
    newComment.querySelector('.social__text').textContent = commentInfo.message;
    commentsContainer.append(newComment);
  });
  updateCommentsCountInfo();
};

const commentsLoaderClickHandler = () => {
  const currentCommentsCount = getCurrentCommentsCount();
  renderComments(photoData[currId].comments.slice(0, currentCommentsCount + UPLOAD_COMMENTS_COUNT));
};

const toggleDisplayFullVersion = () => {
  bigPicture.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullVersion();
  }
};

const closeButtonClickHandler = () => {
  closeFullVersion();
};

const photoContainerClickHandler = (evt) => {
  if (evt.target.closest('.picture')) {
    currId = evt.target.parentNode.id;
    const currPictureInfo = photoData.find((item) => item.id === Number(currId));
    img.src = currPictureInfo.url;
    likes.textContent = currPictureInfo.likes;
    description.textContent = currPictureInfo.description;
    renderComments(currPictureInfo.comments.slice(0, DEFAULT_COMMENTS_COUNT));

    document.addEventListener('keydown', documentKeydownHandler);
    toggleDisplayFullVersion();
  }
};

function closeFullVersion () {
  toggleDisplayFullVersion();
  document.removeEventListener('keydown', documentKeydownHandler);
}

const initializeFullVersionRender = (pictureData) => {
  photoData = pictureData;
  photoContainer.addEventListener('click', photoContainerClickHandler);
  commentsLoader.addEventListener('click', commentsLoaderClickHandler);
  closeButton.addEventListener('click', closeButtonClickHandler);
};

export { initializeFullVersionRender };
