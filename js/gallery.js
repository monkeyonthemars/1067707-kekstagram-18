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
      var bigPictureElement = document.querySelector('.big-picture');
      var uploadFileInput = document.querySelector('.img-upload__start input[id=upload-file]');
      var delPictures = document.querySelectorAll('.picture');

      for (var i = 0; i < delPictures.length; i++) {
        delPictures[i].remove();
      }

      picturesListElement.appendChild(renderListPictures(data));

      window.preview.renderBigPicture(data[0]);
      bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

      uploadFileInput.addEventListener('change', window.form.openImgUpload);
    }
  };

})();
