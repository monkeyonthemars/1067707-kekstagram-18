'use strict';

(function () {

  var mainElement = document.querySelector('main');

  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var successElement = successTemplateElement.cloneNode(true);
  var successButtonElement = successElement.querySelector('.success__button');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var errorElement = errorTemplateElement.cloneNode(true);
  var errorButtonElements = errorElement.querySelectorAll('.error__button');

  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  var onClickSuccessMessageCloseButton = function () {
    window.message.close('success');
  };

  var onSuccessMessageEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      window.message.close('success');
    }
  };

  var onClickSuccessMessageBackground = function (evt) {
    if (evt.target.classList.contains('success')) {
      window.message.close('success');
    }
  };

  var onClickErrorMessageCloseButton = function () {
    window.message.close('error');
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.keyCode === KeyCode.ESC) {
      window.message.close('error');
    }
  };

  var onClickErrorMessageBackground = function (evt) {
    if (evt.target.classList.contains('error')) {
      window.message.close('error');
    }
  };

  window.message = {
    close: function (typeMessage) {
      if (typeMessage === 'success') {
        document.removeEventListener('keydown', onSuccessMessageEscPress);
        successElement.removeEventListener('click', onClickSuccessMessageBackground);
        successButtonElement.removeEventListener('click', onClickSuccessMessageCloseButton);
        mainElement.removeChild(document.querySelector('.success'));
      }
      if (typeMessage === 'error') {
        document.removeEventListener('keydown', onErrorMessageEscPress);
        successElement.removeEventListener('click', onClickErrorMessageBackground);
        errorButtonElements.forEach(function (el) {
          el.removeEventListener('click', onClickErrorMessageCloseButton);
        });
        mainElement.removeChild(document.querySelector('.error'));
      }
    },

    open: function (typeMessage) {
      if (typeMessage === 'success') {
        mainElement.appendChild(successElement);
        successElement.addEventListener('click', onClickSuccessMessageBackground);
        successButtonElement.addEventListener('click', onClickSuccessMessageCloseButton);
        document.addEventListener('keydown', onSuccessMessageEscPress);
      }
      if (typeMessage === 'error') {
        mainElement.appendChild(errorElement);
        errorElement.addEventListener('click', onClickErrorMessageBackground);
        errorButtonElements.forEach(function (el) {
          el.addEventListener('click', onClickErrorMessageCloseButton);
        });
        document.addEventListener('keydown', onErrorMessageEscPress);
      }
    }
  };
})();
