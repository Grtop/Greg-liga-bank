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
    var creditTerms = {
      status: 0,
      label: '',
      desc: '',
      minSumTarget: 0,
      maxSumTarget: 0,
      stepSumTarget: 0,
      parentCapital: false
    };

    // SELECT -- handlers
    var selectCreditChange = function (scEvt) {
      scEvt.preventDefault();

      var root = scEvt.target;

      var hideStep = document.querySelector('.calculator__step-second');

      var listStatus = {
        none: 'none',
        mortgage: 'mortgage-loan',
        car: 'car-loan',
        consumer: 'consumer-loan'
      };

      var updateInitialChange = function (uiEvt) {
        uiEvt.preventDefault();
        window.initialPrice.update();
      };

      for (var i = 0; i < root.children.length; i++) {
        if (root.children[i].hasAttribute('selected')) {
          var currentStatus = root.children[i].getAttribute('value');
        }
      }

      switch (currentStatus) {
        case listStatus.none:
          creditTerms = {
            status: 0
          };
          break;
        case listStatus.mortgage:
          creditTerms = {
            status: 1,
            label: 'Стоимость недвижимости',
            minSumTarget: 1200000,
            maxSumTarget: 25000000,
            stepSumTarget: 100000,
            initialSum: 0,
            percent: 0.1,
            percentStep: 0.05,
            minPeriod: 5,
            maxPeriod: 30,
            stepPeriod: 1
          };
          break;
        case listStatus.car:
          creditTerms = {
            status: 2,
            label: 'Стоимость автомобиля',
            minSumTarget: 500000,
            maxSumTarget: 5000000,
            stepSumTarget: 50000,
            initialSum: 0,
            percent: 0.2,
            percentStep: 0.05,
            minPeriod: 1,
            maxPeriod: 5,
            stepPeriod: 1
          };
          break;
        case listStatus.consumer:
          creditTerms = {
            status: 3,
            label: 'Сумма потребительского кредита',
            minSumTarget: 500000,
            maxSumTarget: 3000000,
            stepSumTarget: 50000,
            initialSum: 0,
            percent: 0.1,
            percentStep: 0.05,
            minPeriod: 1,
            maxPeriod: 7,
            stepPeriod: 1
          };
          break;
      };

      if (creditTerms.status !== 0) {
        creditTerms.currency = 'рублей';
        creditTerms.desc = 'от ' + creditTerms.minSumTarget + ' до ' + creditTerms.maxSumTarget + ' ' + creditTerms.currency;
        creditTerms.currentSum = creditTerms.minSumTarget;
        creditTerms.currentPeriod = creditTerms.minPeriod;
        creditTerms.labelPeriod = ['год', 'года', 'лет'];

        hideStep.classList.add('calculator__step-show');

        if (document.querySelector('.input-price__sum')) {
          var targetPrice = new InputPrice('.input-price__sum', creditTerms, {
            inputEl: '#price-target',
            descEl: '.calculator__input-desc',
            btnIncrease: '.input-price__btn_minus',
            btnDecrease: '.input-price__btn_plus'
          });
        }

        if (document.querySelector('.input-price__initial')) {
          var firstPrice = new InitialPrice('.input-price__initial', creditTerms, {
            inputEl: '#price-first',
            rangeEl: '.range__price-first',
            rangeToggleEl: '.range__roller',
            rangeValueEl: '.range__value'
          });
          document.querySelector('#price-target').addEventListener('change', updateInitialChange);
        }

        if (document.querySelector('.input-price__period')) {
          var period = new Period('.input-price__period', creditTerms, {
            inputEl: '#credit-period',
            rangeEl: '.range__credit-period',
            rangeToggleEl: '.range__roller',
            rangeValueMinEl: '.range__limit-start',
            rangeValueMaxEl: '.range__limit-end'
          });
        }

        var parentCapitalEl = document.querySelector('#parent-capital');
        if (parentCapitalEl) {
          // console.dir(parentCapitalEl);
          var parentCapitalHandler = function (pcEvt) {
            pcEvt.preventDefault();
            creditTerms.parentCapital = pcEvt.target.checked;
          };
          parentCapitalEl.addEventListener('change', parentCapitalHandler);
        }

        window.inputPrice.update();
        window.initialPrice.update();
        window.period.update();
      } else {
        hideStep.classList.remove('calculator__step-show');
      }


    };

    // SELECT -- init

    if (document.querySelector('.select')) {
      var credit = new Select('.select', {
        idSelect: '#credit-target',
        classElement: 'select__item',
        classActiveElement: 'select__item_selected'
      });

      document.querySelector('#credit-target').addEventListener('change', selectCreditChange);
    }
  };

  window.addEventListener('load', initPage);
})();
