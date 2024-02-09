'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var ua = navigator.userAgent;
  var browserIe = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;

  var formatPrice = function (num) {
    return Number(num).toLocaleString('ru-RU');
  };

  var getDataAttr = function (element) {
    var str = element.getAttribute('data-value');
    return str.split(',');
  };

  var toUpperFirstSymbol = function (str) {
    if (!str) {
      return 'empty';
    }
    return str[0].toUpperCase() + str.slice(1);
  };

  var getLabelPeriod = function (value, rootObj) {
    var valueStr = String(value);
    var lastNum = Number(valueStr[valueStr.length - 1]);
    if (lastNum === 1 && value !== 11) {
      return rootObj.labelPeriod[0];
    }
    if (lastNum > 1 && lastNum < 5 && value !== 12 && value !== 13 && value !== 14) {
      return rootObj.labelPeriod[1];
    }
    return rootObj.labelPeriod[2];
  };

  var getCreditNumber = function (value) {
    return '00' + value;
  };

  var getPathLocation = function (href) {
    if (href[href.length - 1] !== '/') {
      return href.slice(0, [href.lastIndexOf('/')]);
    }
    return href;
  };

  window.util = {
    KeyCode: KeyCode,
    browserIe: browserIe,
    formatPrice: formatPrice,
    getDataAttr: getDataAttr,
    toUpperFirstSymbol: toUpperFirstSymbol,
    getLabelPeriod: getLabelPeriod,
    getCreditNumber: getCreditNumber,
    getPathLocation: getPathLocation
  };
})();
