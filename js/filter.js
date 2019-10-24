'use strict';

(function () {

  var RANDOM_PICTURES_COUNT = 10;
  var filterPopularElement = document.querySelector('#filter-popular');
  var filterRandomElement = document.querySelector('#filter-random');
  var filterDiscussedElement = document.querySelector('#filter-discussed');
  var classnameImgFilterActive = 'img-filters__button--active';

  var changeActiveButton = function (element) {
    filterPopularElement.classList.remove(classnameImgFilterActive);
    filterRandomElement.classList.remove(classnameImgFilterActive);
    filterDiscussedElement.classList.remove(classnameImgFilterActive);

    element.classList.add(classnameImgFilterActive);
  };

  window.filter = {
    onPopularClick: window.debounce(function (pictures) {
      changeActiveButton(filterPopularElement);
      window.gallery.update(pictures);
    }),

    onRandomClick: window.debounce(function (pictures) {
      var sourcePictures = pictures.slice();
      var randomPictures = [];

      for (var i = 0; randomPictures.length < RANDOM_PICTURES_COUNT; i++) {
        var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
        var randomElement = sourcePictures[randomIndex];
        randomPictures.push(randomElement);
        sourcePictures.splice(randomIndex, 1);
      }

      changeActiveButton(filterRandomElement);
      window.gallery.update(randomPictures);
    }),

    onDiscussedClick: window.debounce(function (pictures) {
      var discussedPictures = pictures.slice();

      for (var i = 0; i < discussedPictures.length - 1; i++) {
        for (var j = 0; j < discussedPictures.length - 1 - i; j++) {
          if (discussedPictures[j].comments.length < discussedPictures[j + 1].comments.length) {
            var min = discussedPictures[j];
            discussedPictures[j] = discussedPictures[j + 1];
            discussedPictures[j + 1] = min;
          }
        }
      }

      changeActiveButton(filterDiscussedElement);
      window.gallery.update(discussedPictures);
    })
  };

})();
