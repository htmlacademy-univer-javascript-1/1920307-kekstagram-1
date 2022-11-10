const bigPicture = document.querySelector('.big-picture');
const commentSample = document.querySelector('.social__comment');
const closeButton = document.querySelector('.big-picture__cancel');

const commentsCountInfo = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

function addBigPhotoClickHandler (photo, pictureInfo) {
  photo.addEventListener('click', () => {
    const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
    const likes = bigPicture.querySelector('.likes-count');
    const commentsCount = bigPicture.querySelector('.comments-count');
    const comments = bigPicture.querySelector('.social__comments');
    const description = bigPicture.querySelector('.social__caption');

    img.src = pictureInfo.url;
    likes.textContent = pictureInfo.likes;
    commentsCount.textContent = pictureInfo.comments.length;
    description.textContent = pictureInfo.description;
    addComments(comments, pictureInfo.comments);

    toggleDisplayFullVersion();
  });
  addClosingClickHandler();
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
  closeButton.addEventListener('click', toggleDisplayFullVersion);
  document.addEventListener('keydown', EscapeCloseFullVersion);
}

function EscapeCloseFullVersion (evt) {
  if (evt.key === 'Escape') {
    toggleDisplayFullVersion();
  }
}

function toggleDisplayFullVersion () {
  bigPicture.classList.toggle('hidden');
  commentsCountInfo.classList.toggle('hidden');
  commentsLoader.classList.toggle('hidden');
  document.querySelector('body').classList.toggle('modal-open');
}

export {addBigPhotoClickHandler};
