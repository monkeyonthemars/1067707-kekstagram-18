'use strict';

(function () {

  var RANDOM_PICTURES_COUNT = 10;
  var CLASS_NAME_IMG_FILTER_ACTIVE = 'img-filters__button--active';
  var filterPopularElement = document.querySelector('#filter-popular');
  var filterRandomElement = document.querySelector('#filter-random');
  var filterDiscussedElement = document.querySelector('#filter-discussed');

  var makeButtonActive = function (element) {
    filterPopularElement.classList.remove(CLASS_NAME_IMG_FILTER_ACTIVE);
    filterRandomElement.classList.remove(CLASS_NAME_IMG_FILTER_ACTIVE);
    filterDiscussedElement.classList.remove(CLASS_NAME_IMG_FILTER_ACTIVE);

    element.classList.add(CLASS_NAME_IMG_FILTER_ACTIVE);
  };

  var onPopularClick = window.debounce(function (pictures) {
    makeButtonActive(filterPopularElement);
    window.gallery.update(pictures);
  });

  var onRandomClick = window.debounce(function (pictures) {
    var sourcePictures = pictures.slice();
    var randomPictures = [];

    for (var i = 0; randomPictures.length < RANDOM_PICTURES_COUNT; i++) {
      var randomIndex = Math.round(Math.random() * (sourcePictures.length - 1));
      var randomElement = sourcePictures[randomIndex];
      randomPictures.push(randomElement);
      sourcePictures.splice(randomIndex, 1);
    }

    makeButtonActive(filterRandomElement);
    window.gallery.update(randomPictures);
  });

  var onDiscussedClick = window.debounce(function (pictures) {
    makeButtonActive(filterDiscussedElement);
    window.gallery.update(pictures.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    }));
  });

  window.filter = {
    init: function (pictures) {
      filterPopularElement.addEventListener('click', function () {
        onPopularClick(pictures);
      });

      filterRandomElement.addEventListener('click', function () {
        onRandomClick(pictures);
      });

      filterDiscussedElement.addEventListener('click', function () {
        onDiscussedClick(pictures);
      });
    }
  };

})();
