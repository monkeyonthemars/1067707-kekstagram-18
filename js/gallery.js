'use strict';

(function () {

  var renderListPictures = function (listPictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < listPictures.length; i++) {
      fragment.appendChild(window.picture.renderPicture(listPictures[i]));
    }

    return fragment;
  };

  window.gallery = {
    update: function (data) {
      var picturesListElement = document.querySelector('.pictures');
      var inputImgPath = document.querySelector('.img-upload__input');
      var delPictures = document.querySelectorAll('.picture');

      for (var i = 0; i < delPictures.length; i++) {
        delPictures[i].remove();
      }

      picturesListElement.appendChild(renderListPictures(data));
      inputImgPath.addEventListener('change', window.form.open);
    }
  };

})();
