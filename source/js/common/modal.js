'use strict';

(function () {

  var openModal = function (overlayClass, modalClass) {

    var setCloseClickHandler = function (sccEvt) {
      sccEvt.preventDefault();
      var btnClose = sccEvt.target;
      if (btnClose.classList.contains(modalClass + '__close') || btnClose.parentNode.classList.contains(modalClass + '__close') || btnClose.parentNode.parentNode.classList.contains(modalClass + '__close')) {
        overlay.classList.remove(overlayClass + '_show');
        modal.classList.remove(modalClass + '_show');
        document.body.style.overflow = 'scroll';
      }
    };

    var setCloseEcsHandler = function (sceEvt) {
      sceEvt.preventDefault();
      if (sceEvt.keyCode === window.util.KeyCode.ESC) {
        overlay.classList.remove(overlayClass + '_show');
        modal.classList.remove(modalClass + '_show');
        document.body.style.overflow = 'scroll';
      }
      window.removeEventListener('keydown', setCloseEcsHandler);
    };

    var overlay = document.querySelector('.' + overlayClass);
    var modal = document.querySelector('.' + modalClass);
    var modalClose = modal.querySelector('.' + modalClass + '__close');

    document.body.style.overflow = 'hidden';

    if (overlay) {
      overlay.classList.add(overlayClass + '_show');
    }

    if (modal) {
      modal.classList.add(modalClass + '_show');
      modalClose.addEventListener('click', setCloseClickHandler);
      window.addEventListener('keydown', setCloseEcsHandler);
    }
  };

  window.modal = {
    open: openModal
  };
})();
