'use strict';

(function () {

  var bigPictureElement = document.querySelector('.big-picture');

  var getCommentMarkup = function (comment) {
    var сommentElement = bigPictureElement.querySelector('.social__comment').cloneNode(true);
    var commentAvatarElement = сommentElement.querySelector('.social__picture');
    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    сommentElement.querySelector('.social__text').textContent = comment.message;

    return сommentElement;
  };

  var getCommentsMarkup = function (picture) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < picture.comments.length; i++) {
      fragment.appendChild(getCommentMarkup(picture.comments[i]));
    }

    return fragment;
  };

  window.preview = {
    render: function (picture) {
      var listComments = getCommentsMarkup(picture);
      var commentsListElement = bigPictureElement.querySelector('.social__comments');
      bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
      bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
      bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
      bigPictureElement.querySelector('.social__caption').textContent = picture.description;
      commentsListElement.innerHTML = '';
      commentsListElement.appendChild(listComments);
    }
  };

})();
