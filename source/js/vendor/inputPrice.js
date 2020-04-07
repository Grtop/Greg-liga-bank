'use strict';

function InputPrice(classEl, terms, param) {

  // Elements

  var root = document.querySelector(classEl);

  var inputEl = root.querySelector(param.inputEl);

  var Errors = {
    MESSAGE: 'Некорректное значение',
    COLOR: 'red'
  };

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

  var setErrorMessage = function (element) {
    element.style.border = '1px solid ' + Errors.COLOR;
    element.value = Errors.MESSAGE;
  };

  var removeErrorMessage = function (element) {
    element.style.border = '';
  };

  // HANDLERS - start

  var increaseSumHandler = function (isEvt) {
    isEvt.preventDefault();

    if (terms.currentSum > terms.minSumTarget) {
      terms.currentSum = Number(terms.currentSum) - Number(terms.stepSumTarget);
      setValueInput(inputEl, window.util.formatPrice(terms.currentSum) + ' ' + terms.currency);
      inputEl.value = window.util.formatPrice(terms.currentSum) + ' ' + terms.currency;
      if (terms.status !== 3) {
        window.initialPrice.update();
      }
      window.credit.update();
    }
  };

  var decreaseSumHandler = function (dsEvt) {
    dsEvt.preventDefault();

    if (terms.currentSum < terms.maxSumTarget) {
      terms.currentSum = Number(terms.currentSum) + Number(terms.stepSumTarget);
      setValueInput(inputEl, window.util.formatPrice(terms.currentSum) + ' ' + terms.currency);
      inputEl.value = window.util.formatPrice(terms.currentSum) + ' ' + terms.currency;
      if (terms.status !== 3) {
        window.initialPrice.update();
      }
      window.credit.update();
    }
  };

  var focusInputHandler = function (fiEvt) {
    fiEvt.preventDefault();

    setValueInput(inputEl, terms.currentSum);
    inputEl.value = terms.currentSum;
    fiEvt.target.setAttribute('type', 'number');
  };

  var blurInputHandler = function (biEvt) {
    biEvt.preventDefault();

    biEvt.target.setAttribute('type', 'text');
    terms.currentSum = getValueInput(biEvt.target);

    if (terms.currentSum < terms.minSumTarget || terms.currentSum > terms.maxSumTarget) {
      if (terms.currentSum < terms.minSumTarget) {
        setErrorMessage(inputEl);
      }
      if (terms.currentSum > terms.maxSumTarget) {
        setErrorMessage(inputEl);
      }
    } else {
      removeErrorMessage(inputEl);
      setValueInput(inputEl, window.util.formatPrice(terms.currentSum) + ' ' + terms.currency);
      inputEl.value = window.util.formatPrice(terms.currentSum) + ' ' + terms.currency;
      if (terms.status !== 3) {
        window.initialPrice.update();
      }
      window.credit.update();
    }
  };

  // init

  var update = function () {
    setValueInput(inputEl, window.util.formatPrice(terms.minSumTarget) + ' ' + terms.currency);
    inputEl.value = window.util.formatPrice(terms.minSumTarget) + ' ' + terms.currency;
    replaceInnerText(root.querySelector('label'), terms.label);
    replaceInnerText(root.querySelector(param.descEl), terms.desc);
  };

  update();

  root.querySelector(param.btnIncrease).onclick = increaseSumHandler;
  root.querySelector(param.btnDecrease).onclick = decreaseSumHandler;
  inputEl.onfocus = focusInputHandler;
  inputEl.onblur = blurInputHandler;

  window.inputPrice = {
    update: update
  };
}
