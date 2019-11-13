'use strict';

(function () {

  var TIMEOUT = 10000;
  var StatusCode = {
    OK: 200
  };

  var getXMLHttpRequest = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();

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

    return xhr;

  };

  window.backend = {
    load: function (onLoad, onError) {

      var xhr = getXMLHttpRequest(onLoad, onError);
      xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
      xhr.send();

    },
    save: function (data, onLoad, onError) {

      var xhr = getXMLHttpRequest(onLoad, onError);
      xhr.open('POST', 'https://js.dump.academy/kekstagram');
      xhr.send(data);

    }
  };

})();
