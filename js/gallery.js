'use strict';

(function () {

  window.gallery = {
    renderListPictures: function (listPictures) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < listPictures.length; i++) {
        fragment.appendChild(window.picture.renderPicture(listPictures[i]));
      }

      return fragment;
    }
  };

})();
