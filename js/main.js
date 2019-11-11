'use strict';

(function () {

  var filterPopularElement = document.getElementById('filter-popular');
  var filterRandomElement = document.getElementById('filter-random');
  var filterDiscussedElement = document.getElementById('filter-discussed');
  var picturesListElement = document.querySelector('.pictures');
  var pictures = [];

  var searchParentElementWithClassname = function (element, clss) {
    if (element.classList.contains(clss)) {
      return element;
    }
    if (element.parentElement === null) {
      return null;
    }
    return searchParentElementWithClassname(element.parentElement, clss);
  };

  var openBigPicture = function (evt) {
    var parentElement = searchParentElementWithClassname(evt.target, 'picture');
    if (parentElement !== null) {
      var clickedPictureSrc = parentElement.querySelector('.picture__img').attributes['src'].value;

      window.preview.render(
          pictures.find(function (element) {
            if (element.url !== clickedPictureSrc) {
              return false;
            }
            return true;
          }));
    }
  };

  var onPictureClick = function (evt) {
    openBigPicture(evt);
  };

  filterPopularElement.addEventListener('click', function () {
    window.filter.onPopularClick(pictures);
  });

  filterRandomElement.addEventListener('click', function () {
    window.filter.onRandomClick(pictures);
  });

  filterDiscussedElement.addEventListener('click', function () {
    window.filter.onDiscussedClick(pictures);
  });

  picturesListElement.addEventListener('click', onPictureClick);

  var onLoad = function (data) {
    pictures = data.slice();
    window.gallery.update(data);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var onError = function (message) {
    var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorElement.querySelector('.error__title').textContent = message;
    document.querySelector('main').appendChild(errorElement);
  };

  window.backend.load(onLoad, onError);

})();
