'use strict';

(function () {
  var initPage = function () {
    var nojs = document.querySelector('.nojs');
    nojs.classList.remove('nojs');

    // polyfill for forEach - https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this === null) {
          throw new TypeError(' this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
          T = thisArg;
        }
        k = 0;
        while (k < len) {
          var kValue;
          if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
          }
          k++;
        }
      };
    }

    // for swiper.js - startsWidth
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
      };
    }

    // HANDLERS - start
    var navToggleHandler = function (ntEvt) {
      ntEvt.preventDefault();
      var nav = document.querySelector('.nav-main');

      if (ntEvt.target.classList.contains('header__nav-toggle')) {
        if (ntEvt.target.classList.contains('header__nav-toggle_closed')) {
          ntEvt.target.classList.remove('header__nav-toggle_closed');
          ntEvt.target.classList.add('header__nav-toggle_opened');
          nav.classList.remove('nav-main_closed');
          nav.classList.add('nav-main_opened');
          return;
        }
        if (ntEvt.target.classList.contains('header__nav-toggle_opened')) {
          ntEvt.target.classList.remove('header__nav-toggle_opened');
          ntEvt.target.classList.add('header__nav-toggle_closed');
          nav.classList.remove('nav-main_opened');
          nav.classList.add('nav-main_closed');
          return;
        }
      }
    };

    var tabClickHandler = function (tiEvt) {
      tiEvt.preventDefault();

      tabItems.forEach(function (item) {
        item.parentNode.classList.remove(elemItems.tab + '_active');
      });

      var currentTab = tiEvt.currentTarget;
      if (currentTab.classList.contains(controlItems.tab)) {
        currentTab.parentNode.classList.add(elemItems.tab + '_active');
      }
    };
    // HANDLERS - end

    var TABLET_SIZE = 1008;

    var controlItems = {
      nav: 'header__nav-toggle',
      tab: 'service-item__head'
    };

    var elemItems = {
      tabList: 'services__list',
      tab: 'service-item'
    };

    var navToggle = document.querySelector('.' + controlItems.nav);
    if (navToggle) {
      navToggle.addEventListener('click', navToggleHandler);
    }

    if (document.body.offsetWidth > TABLET_SIZE) {
      var tabItems = document.querySelectorAll('.' + controlItems.tab);
      if (tabItems.length > 0) {
        tabItems.forEach(function (item) {
          item.addEventListener('click', tabClickHandler);
        });
      }
    } else {
      var tabWrapper = document.querySelector('.' + elemItems.tabList);
      if (tabWrapper) {
        tabWrapper.classList.add('swiper-wrapper');
      }
      var tabList = document.querySelectorAll('.' + elemItems.tab);
      if (tabList.length > 0) {
        tabList.forEach(function (tab) {
          tab.classList.remove(elemItems.tab + '_active');
          tab.classList.add('swiper-slide');
        });
      }
    }

    // SLIDER - start
    if (document.querySelector('.slider')) {
      var sliderMain = new Swiper('.slider', {
        loop: true,
        pagination: {
          el: '.slider-pagination',
          type: 'bullets',
          bulletElement: 'button',
          clickable: true,
          bulletClass: 'slider-pagination__item',
          bulletActiveClass: 'slider-pagination__item_active'
        },
      });
    }

    if (document.body.offsetWidth <= TABLET_SIZE) {
      if (document.querySelector('.services__slider')) {
        var sliderService = new Swiper('.services__slider', {
          loop: true,
          pagination: {
            el: '.services-pagination',
            type: 'bullets',
            bulletElement: 'button',
            clickable: true,
            bulletClass: 'services-pagination__item',
            bulletActiveClass: 'services-pagination__item_active'
          },
        });
      }
    }

    // SELECT - start
    if (document.querySelector('.select')) {
      var credit = new Select('.select', {
        idSelect: '#credit-target',
        classElement: 'select__item',
        classActiveElement: 'select__item_selected'
      });
    }
  };

  window.addEventListener('load', initPage);
})();
