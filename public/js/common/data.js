'use strict';

(function () {
  var Url = {
    SERVER: 'https://echo.htmlacademy.ru'
  };

  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status);
      }
    });
    return xhr;
  };

  var load = function (url, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения..');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('GET', url);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);
    xhr.open('POST', Url.SERVER);
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.send(data);
  };

  window.data = {
    load: load,
    send: send
  };
})();
