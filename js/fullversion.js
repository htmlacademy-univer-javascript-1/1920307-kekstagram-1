const bigPicture = document.querySelector('.big-picture');
const commentSample = document.querySelector('.social__comment');

function addBigPhotoClickHandler (photo, pictureInfo) {
  photo.addEventListener('click', () => {
    const img = bigPicture.querySelector('.big-picture__img').querySelector('img');
    const likes = bigPicture.querySelector('.likes-count');
    const commentsCountInfo = bigPicture.querySelector('.social__comment-count');
    const commentsCount = bigPicture.querySelector('.comments-count');
    const comments = bigPicture.querySelector('.social__comments');
    const description = bigPicture.querySelector('.social__caption');
    const commentsLoader = bigPicture.querySelector('.comments-loader');

    img.src = pictureInfo.url;
    likes.textContent = pictureInfo.likes;
    commentsCount.textContent = pictureInfo.comments.length;
    description.textContent = pictureInfo.description;
    addComments(comments, pictureInfo.comments);

    showFullVersion(commentsCountInfo, commentsLoader);
    addClosingClickHandler(commentsCountInfo, commentsLoader);
  });
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

function addClosingClickHandler (commentsCountInfo, commentsLoader) {
  const button = document.querySelector('.big-picture__cancel');
  button.addEventListener('click', () => {
    closeFullVersion(commentsCountInfo, commentsLoader);
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeFullVersion(commentsCountInfo, commentsLoader);
    }
  });
}

function closeFullVersion (commentsCountInfo, commentsLoader) {
  bigPicture.classList.add('hidden');
  commentsCountInfo.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function showFullVersion (commentsCountInfo, commentsLoader) {
  bigPicture.classList.remove('hidden');
  commentsCountInfo.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
}

export {addBigPhotoClickHandler};
