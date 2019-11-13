'use strict';

(function () {

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

  picturesListElement.addEventListener('click', function (evt) {
    openBigPicture(evt);
  });

  var onLoad = function (data) {
    pictures = data.slice();
    window.filter.init(data);
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
