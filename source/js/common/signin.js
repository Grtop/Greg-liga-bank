'use strict';

(function () {

  var init = function (classBlock, loginId, passwordId) {
    // LOGIN
    // LOGIN -- handlers

    var submitFormHandler = function () {
      if (isStorageSuppot) {
        localStorage.setItem('login-name', loginInput.value);
      }
    };

    var onMouseDownBtnHandler = function () {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      }
    };

    var onMouseUpBtnHandler = function () {
      if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
      }
    };

    // LOGIN -- start

    var root = document.querySelector('.' + classBlock);
    var loginInput = root.querySelector('#' + loginId);
    var passwordInput = root.querySelector('#' + passwordId);
    var showPasswordBtn = passwordInput.parentNode.getElementsByTagName('button')[0];

    var isStorageSuppot = true;
    var storageLogin = '';

    try {
      storageLogin = localStorage.getItem('login-name');
    } catch (err) {
      isStorageSuppot = false;
    }

    if (isStorageSuppot) {
      if (storageLogin) {
        loginInput.value = storageLogin;
      }
    }

    loginInput.focus();

    if (showPasswordBtn) {
      showPasswordBtn.onmousedown = onMouseDownBtnHandler;
      showPasswordBtn.onmouseup = onMouseUpBtnHandler;
      showPasswordBtn.ontouchstart = onMouseDownBtnHandler;
      showPasswordBtn.ontouchend = onMouseUpBtnHandler;
    }

    root.getElementsByTagName('form')[0].onsubmit = submitFormHandler;
  };

  window.signin = {
    init: init
  };
})();
