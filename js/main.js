'use strict';

var picturesListElement = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var uploadFileInput = document.querySelector('.img-upload__start input[id=upload-file]');

var listPictures = window.data.getPictures();
picturesListElement.appendChild(window.gallery.renderListPictures(listPictures));

window.preview.renderBigPicture(listPictures[0]);
bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

uploadFileInput.addEventListener('change', window.form.openImgUpload);
