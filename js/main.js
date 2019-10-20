'use strict';

var filterPopularElement = document.getElementById('filter-popular');
var filterRandomElement = document.getElementById('filter-random');
var filterDiscussedElement = document.getElementById('filter-discussed');
var pictures = [];

filterPopularElement.addEventListener('click', function () {
  window.filter.onPopularClick(pictures);
});

filterRandomElement.addEventListener('click', function () {
  window.filter.onRandomClick(pictures);
});

filterDiscussedElement.addEventListener('click', function () {
  window.filter.onDiscussedClick(pictures);
});

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
