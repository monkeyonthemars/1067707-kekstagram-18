'use strict';

(function () {

  window.backend = {
    load: function (onLoad, onError) {

      var URL = 'https://js.dump.academy/kekstagram/data';
      var TIMEOUT = 10000;
      var xhr = new XMLHttpRequest();
      var StatusCode = {
        OK: 200
      };

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL);
      xhr.send();
    }
  };

})();
