'use strict';

(function () {

  var mainElement = document.querySelector('main');
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplateElement.cloneNode(true);
  var successButtonElement = successElement.querySelector('.success__button');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplateElement.cloneNode(true);
  var errorButtonElements = errorElement.querySelectorAll('.error__button');

  var onSuccessMessageCloseButtonClick = function () {
    window.message.close('success');
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      window.message.close('success');
    }
  };

  var onSuccessOverlayClick = function (evt) {
    if (evt.target.classList.contains('success')) {
      window.message.close('success');
    }
  };

  var onErrorMessageCloseButtonClick = function () {
    window.message.close('error');
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC) {
      window.message.close('error');
    }
  };

  var onErrorOverlayClick = function (evt) {
    if (evt.target.classList.contains('error')) {
      window.message.close('error');
    }
  };

  var closeSuccessMessage = function () {
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    successElement.removeEventListener('click', onSuccessOverlayClick);
    successButtonElement.removeEventListener('click', onSuccessMessageCloseButtonClick);
    mainElement.removeChild(document.querySelector('.success'));
  };

  var closeErrorMessage = function () {
    document.removeEventListener('keydown', onErrorMessageEscPress);
    successElement.removeEventListener('click', onErrorOverlayClick);
    errorButtonElements.forEach(function (el) {
      el.removeEventListener('click', onErrorMessageCloseButtonClick);
    });
    mainElement.removeChild(document.querySelector('.error'));
  };

  var openSuccessMessage = function () {
    mainElement.appendChild(successElement);
    successElement.addEventListener('click', onSuccessOverlayClick);
    successButtonElement.addEventListener('click', onSuccessMessageCloseButtonClick);
    document.addEventListener('keydown', onSuccessMessageEscPress);
  };

  var openErrorMessage = function () {
    mainElement.appendChild(errorElement);
    errorElement.addEventListener('click', onErrorOverlayClick);
    errorButtonElements.forEach(function (el) {
      el.addEventListener('click', onErrorMessageCloseButtonClick);
    });
    document.addEventListener('keydown', onErrorMessageEscPress);
  };

  window.message = {
    close: function (typeMessage) {
      if (typeMessage === 'success') {
        closeSuccessMessage();
      }
      if (typeMessage === 'error') {
        closeErrorMessage();
      }
    },

    open: function (typeMessage) {
      if (typeMessage === 'success') {
        openSuccessMessage();
      }
      if (typeMessage === 'error') {
        openErrorMessage();
      }
    }
  };
})();
