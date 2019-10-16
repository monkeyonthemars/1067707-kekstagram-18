'use strict';

var picturesListElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var uploadFileInput = document.querySelector('.img-upload__start input[id=upload-file]');

var onLoad = function (listPictures) {
  picturesListElement.appendChild(window.gallery.renderListPictures(listPictures));

  window.preview.renderBigPicture(listPictures[0]);
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

  uploadFileInput.addEventListener('change', window.form.openImgUpload);
};

var onError = function (message) {
  var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  errorElement.querySelector('.error__title').textContent = message;
  document.querySelector('main').appendChild(errorElement);
};

window.backend.load(onLoad, onError);
