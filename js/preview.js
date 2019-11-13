'use strict';

(function () {

  var COMMENTS_COUNT_PER_ONE_TIME = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = document.querySelector('.big-picture__cancel');
  var commentsListElement = bigPictureElement.querySelector('.social__comments');
  var сommentElementTemplate = bigPictureElement.querySelector('.social__comment').cloneNode(true);
  var currentCommentsCount = 0;
  var currentPicture;

  var getCommentMarkup = function (comment) {
    var сommentElement = сommentElementTemplate.cloneNode(true);
    var commentAvatarElement = сommentElement.querySelector('.social__picture');
    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    сommentElement.querySelector('.social__text').textContent = comment.message;

    return сommentElement;
  };

  var loadComments = function () {
    var listComments = getCommentsMarkup(currentCommentsCount);
    commentsListElement.appendChild(listComments);
  };

  var onButtonLoadCommentsClick = function () {
    loadComments();
  };

  var commentsLoaderElement = document.querySelector('.comments-loader');
  commentsLoaderElement.addEventListener('click', onButtonLoadCommentsClick);

  var getCommentsMarkup = function (startPosition) {
    var fragment = document.createDocumentFragment();
    var commentsCount = currentPicture.comments.length;

    currentCommentsCount = startPosition + COMMENTS_COUNT_PER_ONE_TIME;

    if (currentCommentsCount >= commentsCount) {
      currentCommentsCount = commentsCount;
      commentsLoaderElement.remove();
    }

    for (startPosition; startPosition < currentCommentsCount; startPosition++) {
      fragment.appendChild(getCommentMarkup(currentPicture.comments[startPosition]));
    }

    bigPictureElement.querySelector('.social__comment-count').textContent = '' + currentCommentsCount + ' из '
      + commentsCount + ' комментариев';

    return fragment;
  };

  var closeBigPicture = function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
    bigPictureCancelElement.removeEventListener('click', onCloseBigPictureClick);
    bigPictureElement.classList.add('hidden');
  };

  var onCloseBigPictureClick = function () {
    closeBigPicture();
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      closeBigPicture();
    }
  };

  window.preview = {
    render: function (picture) {
      currentPicture = picture;
      currentCommentsCount = 0;
      commentsListElement.innerHTML = '';
      loadComments();
      bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
      bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
      bigPictureElement.querySelector('.social__caption').textContent = picture.description;
      bigPictureElement.classList.remove('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);
      bigPictureCancelElement.addEventListener('click', onCloseBigPictureClick);
    }
  };

})();
