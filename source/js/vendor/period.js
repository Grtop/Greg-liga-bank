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

  var getLabelPeriod = function (value) {
    var valueStr = String(value);
    var lastNum = Number(valueStr[valueStr.length - 1]);
    if (lastNum === 1 && value !== 11) {
      return terms.labelPeriod[0];
    }
    if (lastNum > 1 && lastNum < 5 && value !== 12 && value !== 13 && value !== 14) {
      return terms.labelPeriod[1];
    }
    return terms.labelPeriod[2];
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
      setValueInput(inputEl, terms.minPeriod + ' ' + getLabelPeriod(terms.minPeriod));
      inputEl.value = terms.minPeriod + ' ' + getLabelPeriod(terms.minPeriod);
      terms.currentPeriod = terms.minPeriod;
    }
    if (currentValue > terms.maxPeriod) {
      setValueInput(inputEl, terms.maxPeriod + ' ' + getLabelPeriod(terms.maxPeriod));
      inputEl.value = terms.maxPeriod + ' ' + getLabelPeriod(terms.maxPeriod);
      terms.currentPeriod = terms.maxPeriod;
    }
    if (currentValue >= terms.minPeriod && currentValue <= terms.maxPeriod) {
      setValueInput(inputEl, currentValue + ' ' + getLabelPeriod(currentValue));
      inputEl.value = currentValue + ' ' + getLabelPeriod(currentValue);
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
      for (var i = 0; i < rangeSteps.length; i++) {
        if (leftUpPos >= rangeSteps[i].position) {
          setPosition(rangeRoller, rangeSteps[i].position);
          terms.currentPeriod = rangeSteps[i].value;
          setValueInput(inputEl, rangeSteps[i].value + ' ' + getLabelPeriod(rangeSteps[i].value));
          inputEl.value = rangeSteps[i].value + ' ' + getLabelPeriod(rangeSteps[i].value);
          window.credit.update();
        }
      }

      document.removeEventListener('mousemove', mouseMoveToggleHandler);
      document.removeEventListener('mouseup', mouseUpToggleHandler);
    };

    document.addEventListener('mousemove', mouseMoveToggleHandler);
    document.addEventListener('mouseup', mouseUpToggleHandler);
  };

  // init

  var rangeSteps = calculateRangeSteps();

  var update = function () {
    if (labelMin) {
      replaceInnerText(labelMin, terms.minPeriod + ' ' + getLabelPeriod(terms.minPeriod));
    }

    if (labelMax) {
      replaceInnerText(labelMax, terms.maxPeriod + ' ' + getLabelPeriod(terms.maxPeriod));
    }

    if (terms.currentPeriod < terms.minPeriod) {
      setValueInput(inputEl, terms.minPeriod + ' ' + getLabelPeriod(terms.minPeriod));
      inputEl.value = terms.minPeriod + ' ' + getLabelPeriod(terms.minPeriod);
      terms.currentPeriod = terms.minPeriod;
    }
    if (terms.currentPeriod > terms.maxPeriod) {
      setValueInput(inputEl, terms.maxPeriod + ' ' + getLabelPeriod(terms.maxPeriod));
      inputEl.value = terms.maxPeriod + ' ' + getLabelPeriod(terms.maxPeriod);
      terms.currentPeriod = terms.maxPeriod;
    }
    if (terms.currentPeriod >= terms.minPeriod && terms.currentPeriod <= terms.maxPeriod) {
      setValueInput(inputEl, terms.currentPeriod + ' ' + getLabelPeriod(terms.currentPeriod));
      inputEl.value = terms.currentPeriod + ' ' + getLabelPeriod(terms.currentPeriod);
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

  window.period = {
    update: update
  };
}
