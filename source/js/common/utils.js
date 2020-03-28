'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

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

  window.util = {
    KeyCode: KeyCode,
    formatPrice: formatPrice,
    getDataAttr: getDataAttr,
    toUpperFirstSymbol: toUpperFirstSymbol,
    getLabelPeriod: getLabelPeriod,
    getCreditNumber: getCreditNumber
  };
})();
