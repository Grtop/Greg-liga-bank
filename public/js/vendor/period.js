'use strict';

function Period(classEl, terms, param) {

  // Elements

  var root = document.querySelector(classEl);

  var inputEl = root.querySelector(param.inputEl);

  var range = root.querySelector(param.rangeEl);

  var rangeRoller = range.querySelector(param.rangeToggleEl);
  var rangeRollerWidth = window.getComputedStyle(rangeRoller, null).getPropertyValue('width');
  rangeRollerWidth = Number(rangeRollerWidth.slice(0, rangeRollerWidth.length - 2));

  var line = range.querySelector('.range__line');
  var lineWidth = window.getComputedStyle(line, null).getPropertyValue('width');
  lineWidth = Number(lineWidth.slice(0, lineWidth.length - 2));
  var lineOffsetLeft = line.offsetParent.offsetLeft;

  var labelMin = range.querySelector(param.rangeValueMinEl);
  var labelMax = range.querySelector(param.rangeValueMaxEl);

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

  var setPosition = function (element, position) {
    element.style.left = position + 'px';
  };

  var calculateRangeSteps = function () {
    var array = [];
    var countPoints = (terms.maxPeriod - terms.minPeriod) / terms.stepPeriod;
    var widthStep = lineWidth / countPoints;
    for (var i = 0; i <= countPoints; i++) {

      array.push({
        count: i,
        value: terms.minPeriod + i
      });

      if (i === 0) {
        array[i].position = 0;
      } else if (i === countPoints) {
        array[i].position = lineWidth - rangeRollerWidth;
      } else {
        array[i].position = Math.ceil(widthStep * i) - (rangeRollerWidth / 2);
      }
    }
    return array;
  };

  var updateRangeRoller = function (mousePosition) {
    for (var i = 0; i < rangeSteps.length; i++) {
      if (mousePosition >= rangeSteps[i].position) {
        setPosition(rangeRoller, rangeSteps[i].position);
        terms.currentPeriod = rangeSteps[i].value;
        setValueInput(inputEl, rangeSteps[i].value + ' ' + window.util.getLabelPeriod(rangeSteps[i].value, terms));
        inputEl.value = rangeSteps[i].value + ' ' + window.util.getLabelPeriod(rangeSteps[i].value, terms);
        window.credit.update();
      }
    }
  };

  // HANDLERS - start

  var focusInputHandler = function (fiEvt) {
    fiEvt.preventDefault();

    setValueInput(inputEl, terms.currentPeriod);
    inputEl.value = terms.currentPeriod;
    fiEvt.target.setAttribute('type', 'number');
  };

  var blurInputHandler = function (biEvt) {
    biEvt.preventDefault();

    biEvt.target.setAttribute('type', 'text');
    var currentValue = getValueInput(biEvt.target);

    if (currentValue < terms.minPeriod) {
      setValueInput(inputEl, terms.minPeriod + ' ' + window.util.getLabelPeriod(terms.minPeriod, terms));
      inputEl.value = terms.minPeriod + ' ' + window.util.getLabelPeriod(terms.minPeriod, terms);
      terms.currentPeriod = terms.minPeriod;
    }
    if (currentValue > terms.maxPeriod) {
      setValueInput(inputEl, terms.maxPeriod + ' ' + window.util.getLabelPeriod(terms.maxPeriod, terms));
      inputEl.value = terms.maxPeriod + ' ' + window.util.getLabelPeriod(terms.maxPeriod, terms);
      terms.currentPeriod = terms.maxPeriod;
    }
    if (currentValue >= terms.minPeriod && currentValue <= terms.maxPeriod) {
      setValueInput(inputEl, currentValue + ' ' + window.util.getLabelPeriod(currentValue, terms));
      inputEl.value = currentValue + ' ' + window.util.getLabelPeriod(currentValue, terms);
      terms.currentPeriod = currentValue;
    }

    updateRange();
    window.credit.update();
  };

  var mouseDownToggleHandler = function (mdtEvt) {
    mdtEvt.preventDefault();

    var mouseMoveToggleHandler = function (kdtEvt) {
      kdtEvt.preventDefault();
      var leftMovePos = Math.max(0, Math.min(kdtEvt.pageX - lineOffsetLeft, lineWidth - rangeRollerWidth));
      setPosition(rangeRoller, leftMovePos);
    };

    var mouseUpToggleHandler = function (kutEvt) {
      kutEvt.preventDefault();

      var centerRoller = kutEvt.pageX + (rangeRollerWidth / 2);
      var leftUpPos = Math.max(0, Math.min(centerRoller - lineOffsetLeft, lineWidth));
      updateRangeRoller(leftUpPos);

      document.removeEventListener('mousemove', mouseMoveToggleHandler);
      document.removeEventListener('mouseup', mouseUpToggleHandler);
    };

    document.addEventListener('mousemove', mouseMoveToggleHandler);
    document.addEventListener('mouseup', mouseUpToggleHandler);
  };

  var touchStartToggleHandler = function () {
    var actualPosition = 0;

    var touchMoveToggleHandler = function (tmtEvt) {
      actualPosition = Math.max(0, Math.min(tmtEvt.touches[0].pageX - lineOffsetLeft, lineWidth));
      setPosition(rangeRoller, actualPosition);
    };

    var touchEndToggleHandler = function () {
      actualPosition = actualPosition + (rangeRollerWidth / 2);
      updateRangeRoller(actualPosition);
      document.removeEventListener('touchmove', touchMoveToggleHandler);
      document.removeEventListener('touchend', touchEndToggleHandler);
    };

    document.addEventListener('touchmove', touchMoveToggleHandler);
    document.addEventListener('touchend', touchEndToggleHandler);
  };

  // init

  var rangeSteps = calculateRangeSteps();

  var update = function () {
    if (labelMin) {
      replaceInnerText(labelMin, terms.minPeriod + ' ' + window.util.getLabelPeriod(terms.minPeriod, terms));
    }

    if (labelMax) {
      replaceInnerText(labelMax, terms.maxPeriod + ' ' + window.util.getLabelPeriod(terms.maxPeriod, terms));
    }

    if (terms.currentPeriod < terms.minPeriod) {
      setValueInput(inputEl, terms.minPeriod + ' ' + window.util.getLabelPeriod(terms.minPeriod, terms));
      inputEl.value = terms.minPeriod + ' ' + window.util.getLabelPeriod(terms.minPeriod, terms);
      terms.currentPeriod = terms.minPeriod;
    }
    if (terms.currentPeriod > terms.maxPeriod) {
      setValueInput(inputEl, terms.maxPeriod + ' ' + window.util.getLabelPeriod(terms.maxPeriod, terms));
      inputEl.value = terms.maxPeriod + ' ' + window.util.getLabelPeriod(terms.maxPeriod, terms);
      terms.currentPeriod = terms.maxPeriod;
    }
    if (terms.currentPeriod >= terms.minPeriod && terms.currentPeriod <= terms.maxPeriod) {
      setValueInput(inputEl, terms.currentPeriod + ' ' + window.util.getLabelPeriod(terms.currentPeriod, terms));
      inputEl.value = terms.currentPeriod + ' ' + window.util.getLabelPeriod(terms.currentPeriod, terms);
    }

    inputEl.onfocus = focusInputHandler;
    inputEl.onblur = blurInputHandler;

    rangeSteps = calculateRangeSteps();
    updateRange();
    window.credit.update();
  };

  var updateRange = function () {
    for (var i = 0; i < rangeSteps.length; i++) {
      if (Number(terms.currentPeriod) === rangeSteps[i].value) {
        setPosition(rangeRoller, rangeSteps[i].position);
      }
    }
  };

  rangeRoller.addEventListener('mousedown', mouseDownToggleHandler);
  if (!window.util.browserIe) {
    rangeRoller.ontouchstart = touchStartToggleHandler;
  }

  window.period = {
    update: update
  };
}
