'use strict';

function InputPrice(classEl, terms, param) {
  var root = document.querySelector(classEl);

  var Errors = {
    message: 'Некорректное значение',
    color: 'red'
  };

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

  var setErrorMessage = function (element) {
    element.style.border = '1px solid ' + Errors.color;
    element.value = Errors.message;
  };

  var removeErrorMessage = function (element) {
    element.style.border = '';
  };

  // HANDLERS - start

  var increaseSumHandler = function (isEvt) {
    isEvt.preventDefault();

    if (terms.currentSum > terms.minSumTarget) {
      terms.currentSum = Number(terms.currentSum) - Number(terms.stepSumTarget);
      setValueInput(root.querySelector(param.inputEl), terms.currentSum + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = terms.currentSum + ' ' + terms.currency;
      window.initialPrice.update();
    }
  };

  var decreaseSumHandler = function (dsEvt) {
    dsEvt.preventDefault();

    if (terms.currentSum < terms.maxSumTarget) {
      terms.currentSum = Number(terms.currentSum) + Number(terms.stepSumTarget);
      setValueInput(root.querySelector(param.inputEl), terms.currentSum + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = terms.currentSum + ' ' + terms.currency;
      window.initialPrice.update();
    }
  };

  var focusInputHandler = function (fiEvt) {
    fiEvt.preventDefault();

    setValueInput(root.querySelector(param.inputEl), terms.currentSum);
    root.querySelector(param.inputEl).value = terms.currentSum;
    fiEvt.target.setAttribute('type', 'number');
  };

  var blurInputHandler = function (biEvt) {
    biEvt.preventDefault();

    biEvt.target.setAttribute('type', 'text');
    terms.currentSum = getValueInput(biEvt.target);

    if (terms.currentSum < terms.minSumTarget || terms.currentSum > terms.maxSumTarget) {
      if (terms.currentSum < terms.minSumTarget) {
        setErrorMessage(root.querySelector(param.inputEl));
      }
      if (terms.currentSum > terms.maxSumTarget) {
        setErrorMessage(root.querySelector(param.inputEl));
      }
    } else {
      removeErrorMessage(root.querySelector(param.inputEl));
      setValueInput(root.querySelector(param.inputEl), terms.currentSum + ' ' + terms.currency);
      root.querySelector(param.inputEl).value = terms.currentSum + ' ' + terms.currency;
      window.initialPrice.update();
    }
  };

  // init

  var update = function () {
    root.querySelector(param.inputEl).value = terms.minSumTarget + ' ' + terms.currency;
    replaceInnerText(root.querySelector('label'), terms.label);
    replaceInnerText(root.querySelector(param.descEl), terms.desc);
  };

  update();

  root.querySelector(param.btnIncrease).onclick = increaseSumHandler;
  root.querySelector(param.btnDecrease).onclick = decreaseSumHandler;
  root.querySelector(param.inputEl).onfocus = focusInputHandler;
  root.querySelector(param.inputEl).onblur = blurInputHandler;

  window.inputPrice = {
    update: update
  };
}
