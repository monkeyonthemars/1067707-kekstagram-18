'use strict';

(function () {

  var RANDOM_PICTURES_COUNT = 10;
  var CLASS_NAME_IMG_FILTER_ACTIVE = 'img-filters__button--active';
  var filterPopularElement = document.querySelector('#filter-popular');
  var filterRandomElement = document.querySelector('#filter-random');
  var filterDiscussedElement = document.querySelector('#filter-discussed');

  var changeActiveButton = function (element) {
    filterPopularElement.classList.remove(CLASS_NAME_IMG_FILTER_ACTIVE);
    filterRandomElement.classList.remove(CLASS_NAME_IMG_FILTER_ACTIVE);
    filterDiscussedElement.classList.remove(CLASS_NAME_IMG_FILTER_ACTIVE);

    element.classList.add(CLASS_NAME_IMG_FILTER_ACTIVE);
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
