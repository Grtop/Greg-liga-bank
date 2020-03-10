'use strict';

function Select(classEl, param) {

  var statusList = {
    open: '_open'
  };

  // FUNCTION - start

  var getElement = function (className) {
    return document.querySelector(className);
  };

  var getListValue = function (collection) {
    var listValue = [];
    for (var i = 0; i < collection.length; i++) {
      listValue.push(collection[i].innerText);
    }
    return listValue;
  };

  var removeListValue = function (collection) {
    for (var k = collection.length - 1; k > 0; k--) {
      collection[k].remove();
    }
  };

  var compareListValue = function (selectEl, value) {
    var listElements = selectEl.children;
    for (var i = 0; i < listElements.length; i++) {
      if (listElements[i].innerText === value) {
        listElements[i].selected = true;
      } else {
        listElements[i].selected = false;
      }
    }
  };

  var setListValue = function (arrayItems, firstValue, originalItem) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayItems.length; i++) {
      if (arrayItems[i] === firstValue) {
        originalItem.innerText = firstValue;
        continue;
      } else {
        var element = originalItem.cloneNode();
        element.innerText = arrayItems[i];
        element.setAttribute('data-index', i);
        element.addEventListener('click', clickListElementClick);
        fragment.appendChild(element);
      }
    }
    return fragment;
  };

  var toggleListView = function (block) {
    block.classList.toggle(classEl.slice(1) + statusList.open);
  };

  var initialSelect = function (selectEl, listEl) {

    var listOptions = getListValue(selectEl.children);
    var listItems = getListValue(listEl.children);

    listEl.appendChild(setListValue(listOptions, listItems[0], listEl.children[0]));
    listEl.children[0].classList.add(param.classActiveElement);
    listEl.children[0].addEventListener('click', toggleListClick);
  };

  // FUNCTION - end

  // HANDLER - start

  var toggleListClick = function (tsEvt) {
    tsEvt.preventDefault();
    if (tsEvt.currentTarget.classList.contains(param.classActiveElement)) {
      toggleListView(tsEvt.currentTarget.parentNode);
    }
  };

  var clickListElementClick = function (cleEvt) {
    cleEvt.preventDefault();
    var root = cleEvt.currentTarget.parentNode;

    toggleListView(root);
    var listItems = getListValue(formElement.children);
    removeListValue(root.children);
    root.appendChild(setListValue(listItems, cleEvt.currentTarget.innerText, root.children[0]));
    compareListValue(formElement, cleEvt.currentTarget.innerText);
  };

  // HANDLER - end

  var ulElement = getElement(classEl);
  var formElement = getElement(param.idSelect);

  if (formElement) {
    initialSelect(formElement, ulElement);
  }
}
