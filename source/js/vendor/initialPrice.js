'use strict';

function initialPrice (classEl, terms, param) {
  var root = document.querySelector(classEl);
  var range = root.querySelector(param.rangeEl);
  var line = range.querySelector('.range__line');
  var lineWidth = window.getComputedStyle(line, null).getPropertyValue('width');
  lineWidth = Number(lineWidth.slice(0, lineWidth.length - 2));
  var rangeRoller = range.querySelector(param.rangeToggleEl);
  var rangeRollerWidth = window.getComputedStyle(rangeRoller, null).getPropertyValue('width');
  rangeRollerWidth = Number(rangeRollerWidth.slice(0, rangeRollerWidth.length - 2));
  var rangeValue = range.querySelector(param.rangeValueEl);

  // FUNCTION - start

  var replaceInnerText = function (element, text) {
    if (element) {
      element.innerText = text;
    }
  };

  var getValueInput = function (element) {
    if (element) {
      return element.value;
    }
  };

  var setValueInput = function (element, value) {
    if (element) {
      element.setAttribute('value', value);
    }
  };

  var calculateMinValue = function () {
    return Number(terms.currentSum) * Number(param.percent);
  };

  var calculatePercent = function () {
    var result = (100 / terms.currentSum) * terms.initialSum;
    return Math.ceil(result);
  };

  var calclatePosition = function () {
    var currentPercent = calculatePercent();
    currentPercent = currentPercent - (param.percent * 100 - (currentPercent * param.percent - 1));
    var currentPosition = Math.ceil(lineWidth * (currentPercent / 100));
    return currentPosition;
  };

  // HANDLERS - start

  var focusInputHandler = function (fiEvt) {
    fiEvt.preventDefault();

    setValueInput(root.querySelector(param.inputEl), terms.initialSum);
    root.querySelector(param.inputEl).value = terms.initialSum;
    fiEvt.target.setAttribute('type', 'number');
  };

  var blurInputHandler = function (biEvt) {
    biEvt.preventDefault();

    biEvt.target.setAttribute('type', 'text');
    var currentValue = getValueInput(biEvt.target);

    if (currentValue < calculateMinValue()) {
      setValueInput(root.querySelector(param.inputEl), calculateMinValue() + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = calculateMinValue() + ' ' + terms.currency;
      terms.initialSum = calculateMinValue();
    } else {
      terms.initialSum = Number(currentValue);
      setValueInput(root.querySelector(param.inputEl), currentValue + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = currentValue + ' ' + terms.currency;
    }

    updateRange();
  };

  var mouseDownToggleHandler = function (mdtEvt) {
    mdtEvt.preventDefault();

    var mouseMoveToggleHandler = function (kdtEvt) {
      kdtEvt.preventDefault();

      var leftPos = Math.max(0, Math.min(kdtEvt.pageX, lineWidth - rangeRollerWidth));

      rangeRoller.style.left = leftPos + 'px';
      rangeValue.style.left = leftPos + 'px';
    };

    var mouseUpToggleHandler = function (kutEvt) {
      kutEvt.preventDefault();

      console.log('key up');
      document.removeEventListener('mousemove', mouseMoveToggleHandler);
      document.removeEventListener('mouseup', mouseUpToggleHandler);
    };

    document.addEventListener('mousemove', mouseMoveToggleHandler);
    document.addEventListener('mouseup', mouseUpToggleHandler);
  };

  // init

  var update = function () {
    if (terms.initialSum < calculateMinValue()) {
      setValueInput(root.querySelector(param.inputEl), calculateMinValue() + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = calculateMinValue() + ' ' + terms.currency;
      terms.initialSum = calculateMinValue();
    } else {
      setValueInput(root.querySelector(param.inputEl), terms.initialSum + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = terms.initialSum + ' ' + terms.currency;
    }
    root.querySelector(param.inputEl).onfocus = focusInputHandler;
    root.querySelector(param.inputEl).onblur = blurInputHandler;

    updateRange();
  }

  terms.initialSum = calculateMinValue();

  var updateRange = function () {
    replaceInnerText(rangeValue, calculatePercent() + '%');
    rangeRoller.style.left = calclatePosition() + 'px';
  };

  update();
  rangeRoller.addEventListener('mousedown', mouseDownToggleHandler);

  window.initialPrice = {
    update: update
  };
};
