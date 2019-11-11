'use strict';

(function () {

  var pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

  window.picture = {
    renderPicture: function (picture) {
      var pictureElement = pictureTemplateElement.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = picture.url;
      pictureElement.querySelector('.picture__likes').textContent = picture.likes;
      pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

      return pictureElement;
    }
  };

})();
