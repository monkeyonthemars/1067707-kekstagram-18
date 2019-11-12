'use strict';

(function () {

  var picturesListElement = document.querySelector('.pictures');
  var inputImgPathElement = document.querySelector('.img-upload__input');

  var renderListPictures = function (listPictures) {
    var fragment = document.createDocumentFragment();

    listPictures.forEach(function (el) {
      fragment.appendChild(window.picture.renderPicture(el));
    });

    return fragment;
  };

  window.gallery = {
    update: function (data) {
      var delPicturesElement = document.querySelectorAll('.picture');

      delPicturesElement.forEach(function (el) {
        el.remove();
      });
      picturesListElement.appendChild(renderListPictures(data));
      inputImgPathElement.addEventListener('change', window.form.open);
    }
  };

})();
