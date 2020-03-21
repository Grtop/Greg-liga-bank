'use strict';

function InitialPrice(classEl, terms, param) {

  // Elements

  var root = document.querySelector(classEl);

  var range = root.querySelector(param.rangeEl);

  var rangeRoller = range.querySelector(param.rangeToggleEl);
  var rangeRollerWidth = window.getComputedStyle(rangeRoller, null).getPropertyValue('width');
  rangeRollerWidth = Number(rangeRollerWidth.slice(0, rangeRollerWidth.length - 2));

  var line = range.querySelector('.range__line');
  var lineWidth = window.getComputedStyle(line, null).getPropertyValue('width');
  lineWidth = Number(lineWidth.slice(0, lineWidth.length - 2));

  var lineWidthPercent = lineWidth / (1 - terms.percent);

  var offset = Math.ceil(lineWidthPercent * terms.percent);

  var rangeValue = range.querySelector(param.rangeValueEl);

  // FUNCTION - start

  var replaceInnerText = function (element, text) {
    element.innerText = text;
  };

  var getValueInput = function (element) {
    return element.value;
  };

  var setValueInput = function (element, value) {
    element.setAttribute('value', value);
  };

  var calculateMinValue = function () {
    return Number(terms.currentSum) * Number(terms.percent);
  };

  var calculatePosition = function (percent) {
    return Math.ceil((percent * (lineWidth + offset)) - offset);
  };

  var setPosition = function (element, position) {
    element.style.left = position + 'px';
  };

  var calculateRangeSteps = function () {
    var array = [];
    var countPoints = (1 - Number(terms.percent)) / terms.percentStep;
    for (var i = 0; i <= countPoints; i++) {
      array.push({
        count: i,
        percent: Number((terms.percent + terms.percentStep * i).toFixed(2)),
      });
      array[i].position = calculatePosition(array[i].percent);
      array[i].value = Math.floor(array[i].percent * terms.currentSum);
    }
    return array;
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
      var leftMovePos = Math.max(0, Math.min(kdtEvt.pageX, lineWidth - rangeRollerWidth));
      setPosition(rangeRoller, leftMovePos);
      setPosition(rangeValue, leftMovePos);
    };

    var mouseUpToggleHandler = function (kutEvt) {
      kutEvt.preventDefault();

      var leftUpPos = Math.max(0, Math.min(kutEvt.pageX, lineWidth - rangeRollerWidth));

      for (var i = 0; i < rangeSteps.length; i++) {
        if (leftUpPos >= rangeSteps[i].position) {
          setPosition(rangeRoller, rangeSteps[i].position);
          setPosition(rangeValue, rangeSteps[i].position);
          replaceInnerText(rangeValue, (rangeSteps[i].percent * 100).toFixed(0) + '%');
          terms.initialSum = rangeSteps[i].value;
          setValueInput(root.querySelector(param.inputEl), rangeSteps[i].value + ' ' + terms.currency);
          root.querySelector(param.inputEl).value = rangeSteps[i].value + ' ' + terms.currency;
        }
      }

      document.removeEventListener('mousemove', mouseMoveToggleHandler);
      document.removeEventListener('mouseup', mouseUpToggleHandler);
    };

    document.addEventListener('mousemove', mouseMoveToggleHandler);
    document.addEventListener('mouseup', mouseUpToggleHandler);
  };

  // init

  terms.initialSum = calculateMinValue();
  var rangeSteps = calculateRangeSteps();

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

    rangeSteps = calculateRangeSteps();
    updateRange();
  };

  var updateRange = function () {
    var positionRange;
    if (terms.initialSum <= calculateMinValue()) {
      replaceInnerText(rangeValue, (terms.percent * 100) + '%');
      positionRange = calculatePosition(terms.percent);
    } else {
      var actualPercent = Math.ceil(terms.initialSum * (100 / terms.currentSum));
      replaceInnerText(rangeValue, actualPercent + '%');
      positionRange = calculatePosition(actualPercent / 100);
    }
    setPosition(rangeRoller, positionRange);
    setPosition(rangeValue, positionRange);
  };

  rangeRoller.addEventListener('mousedown', mouseDownToggleHandler);

  window.initialPrice = {
    update: update
  };
}
