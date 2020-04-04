'use strict';

(function () {
  var initPage = function () {
    var nojs = document.querySelector('.nojs');
    nojs.classList.remove('nojs');

    if (window.util.browserIe) {
      // for swiper.js - startsWidth
      if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
          position = position || 0;
          return this.substr(position, searchString.length) === searchString;
        };
      }
    }

    var controlItems = {
      signin: 'nav-user__signin',
      nav: 'header__nav-toggle',
      tab: 'service-item__head'
    };

    var body = document.querySelector('body');

    // LOGIN
    // LOGIN -- handlers

    var loginLinkHandler = function (llEvt) {
      llEvt.preventDefault();
      window.modal.open('modal-overlay', 'modal-login');
      window.signin.init('modal-login', 'login-name', 'login-password');
    };

    // LOGIN -- start

    var loginLink = body.querySelector('.' + controlItems.signin);
    if (loginLink) {
      loginLink.addEventListener('click', loginLinkHandler);
    }

    // SLIDER
    // SLIDER - init
    if (body.querySelector('.slider')) {
      var sliderMain = new Swiper('.slider', {
        loop: true,
        autoplay: {
          delay: 4000,
        },
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

    // TABS
    // TABS -- handlers

    var navToggleHandler = function (ntEvt) {
      ntEvt.preventDefault();
      var nav = body.querySelector('.nav-main');

      if (ntEvt.target.classList.contains('header__nav-toggle')) {
        if (ntEvt.target.classList.contains('header__nav-toggle_closed')) {
          ntEvt.target.classList.remove('header__nav-toggle_closed');
          ntEvt.target.classList.add('header__nav-toggle_opened');
          nav.classList.remove('nav-main_closed');
          nav.classList.add('nav-main_opened');
          body.style.overflow = 'hidden';
          return;
        }
        if (ntEvt.target.classList.contains('header__nav-toggle_opened')) {
          ntEvt.target.classList.remove('header__nav-toggle_opened');
          ntEvt.target.classList.add('header__nav-toggle_closed');
          nav.classList.remove('nav-main_opened');
          nav.classList.add('nav-main_closed');
          body.style.overflow = 'scroll';
          return;
        }
      }
    };

    var tabClickHandler = function (tiEvt) {
      tiEvt.preventDefault();

      for (var m = 0; m < tabItems.length; m++) {
        tabItems[m].parentNode.classList.remove(elemItems.tab + '_active');
      }

      var currentTab = tiEvt.currentTarget;
      if (currentTab.classList.contains(controlItems.tab)) {
        currentTab.parentNode.classList.add(elemItems.tab + '_active');
      }
    };

    // TABS -- start

    var TABLET_SIZE = 1008;

    var elemItems = {
      tabList: 'services__list',
      tab: 'service-item'
    };

    var navToggle = body.querySelector('.' + controlItems.nav);
    if (navToggle) {
      navToggle.addEventListener('click', navToggleHandler);
    }

    if (body.offsetWidth > TABLET_SIZE) {
      var tabItems = body.querySelectorAll('.' + controlItems.tab);
      if (tabItems.length > 0) {
        for (var n = 0; n < tabItems.length; n++) {
          tabItems[n].addEventListener('click', tabClickHandler);
          tabItems[n].addEventListener('focus', tabClickHandler);
        }
      }
    }
    if (body.offsetWidth <= TABLET_SIZE) {
      var tabWrapper = body.querySelector('.' + elemItems.tabList);
      if (tabWrapper) {
        tabWrapper.classList.add('swiper-wrapper');
      }
      var tabList = body.querySelectorAll('.' + elemItems.tab);
      if (tabList.length > 0) {
        for (var p = 0; p < tabList.length; p++) {
          tabList[0].classList.remove(elemItems.tab + '_active');
          tabList[0].classList.add('swiper-slide');
        }
      }
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

    // SELECT
    // SELECT -- start
    var NUMBER_START = 10;

    var creditTerms = {};
    var requestParam = {
      number: NUMBER_START
    };

    // SELECT -- handlers
    var selectCreditChange = function (scEvt) {
      scEvt.preventDefault();

      var root = scEvt.target;
      var form = root.form;
      form.reset();

      var hideStepTwo = form.querySelector('.calculator__step-second');
      var hideStepThree = body.querySelector('.request');

      var listStatus = {
        none: 'none',
        mortgage: 'mortgage-loan',
        car: 'car-loan',
        consumer: 'consumer-loan'
      };

      var creditParam = {};

      var updateInitialChange = function (uiEvt) {
        uiEvt.preventDefault();
        window.initialPrice.update();
      };

      var offerLinkHandler = function (olEvt) {
        olEvt.preventDefault();

        var updateRequestBlock = function (classEl) {

          var submitRequestFormHandler = function (sfEvt) {
            sfEvt.preventDefault();

            var setError = function (error) {
              // Need create modal error for this event
            };

            rootEl.classList.remove('request_error');
            if (!nameInput.value) {
              nameInput.focus();
            }
            if (nameInput.value && !phoneInput.value) {
              phoneInput.focus();
            }
            if (nameInput.value && phoneInput.value && !emailInput.value) {
              emailInput.focus();
            }

            if (!nameInput.value || !phoneInput.value || !emailInput.value) {
              rootEl.classList.add('request_error');
              return;
            }

            if (isStorageSupport) {
              localStorage.setItem('name', nameInput.value);
              localStorage.setItem('phone', phoneInput.value);
              localStorage.setItem('email', emailInput.value);
            }

            window.data.send(new FormData(sfEvt.target), function () {
              window.modal.open('modal-overlay', 'modal-request');
            }, setError);
          };

          var rootEl = body.querySelector('.' + classEl);
          rootEl.classList.add(classEl + '_show');

          rootEl.querySelector('.' + classEl + '__number').value = '№ ' + window.util.getCreditNumber(requestParam.number);
          requestParam.number = requestParam.number + 1;
          rootEl.querySelector('.' + classEl + '__target').value = window.util.toUpperFirstSymbol(currentLabels[currentLabels.length - 1]);
          rootEl.querySelector('.' + classEl + '__target-label').innerText = creditTerms.label;
          rootEl.querySelector('.' + classEl + '__target-sum').value = window.util.formatPrice(creditTerms.currentSum) + ' ' + creditTerms.currency;
          rootEl.querySelector('.' + classEl + '__initial-sum').value = window.util.formatPrice(creditTerms.initialSum) + ' ' + creditTerms.currency;
          rootEl.querySelector('.' + classEl + '__period').value = creditTerms.currentPeriod + ' ' + window.util.getLabelPeriod(creditTerms.currentPeriod, creditTerms);


          var nameInput = rootEl.querySelector('#request-name');
          nameInput.focus();
          var phoneInput = rootEl.querySelector('#request-phone');
          var emailInput = rootEl.querySelector('#request-email');

          var isStorageSupport = true;
          var storageName = '';
          var storagePhone = '';
          var storageEmail = '';

          try {
            storageName = localStorage.getItem('name');
            storagePhone = localStorage.getItem('phone');
            storageEmail = localStorage.getItem('email');
          } catch (err) {
            isStorageSupport = false;
          }

          if (isStorageSupport) {
            if (storageName) {
              nameInput.value = storageName;
            }
            if (storagePhone) {
              phoneInput.value = storagePhone;
            }
            if (storageEmail) {
              emailInput.value = storageEmail;
            }
          }

          rootEl.getElementsByTagName('form')[0].onsubmit = submitRequestFormHandler;
        };

        updateRequestBlock('request');
      };

      var updateOfferBlock = function (classEl) {
        var rootEl = body.querySelector('.' + classEl);
        var rootElDeny = body.querySelector('.' + classEl + '__deny');

        if (creditTerms.status === 0) {
          rootEl.classList.remove(classEl + '_show');
          rootElDeny.classList.remove(classEl + '__deny' + '_show');
          return;
        }

        if (creditParam.value < creditParam.minValue) {
          rootEl.classList.remove(classEl + '_show');
          rootElDeny.classList.add(classEl + '__deny' + '_show');
          rootElDeny.querySelector('.offer__deny-target').innerText = creditParam.desc;
          return;
        } else {
          rootEl.classList.add(classEl + '_show');
          rootElDeny.classList.remove(classEl + '__deny' + '_show');
        }

        rootEl.querySelector('.' + classEl + '__label').innerText = creditParam.label;
        rootEl.querySelector('.' + classEl + '__value').innerText = window.util.formatPrice(creditParam.value) + ' ' + creditTerms.currency;
        rootEl.querySelector('.' + classEl + '__rate').innerText = (creditParam.rate * 100).toFixed(2) + '%';
        rootEl.querySelector('.' + classEl + '__payment').innerText = window.util.formatPrice(creditParam.payment) + ' ' + creditTerms.currency;
        rootEl.querySelector('.' + classEl + '__income').innerText = window.util.formatPrice(creditParam.income) + ' ' + creditTerms.currency;
        rootEl.querySelector('.' + classEl + '__link').onclick = offerLinkHandler;
      };

      var updateCredit = function () {

        var creditCalculate = function () {
          var currentInitialValue = creditTerms.initialSum;
          if (creditTerms.parentCapital) {
            currentInitialValue = creditTerms.initialSum + creditTerms.parentCapitalValue;
          }
          return creditTerms.currentSum - currentInitialValue;
        };

        var paymentCalculate = function () {
          var currentPercent = Number((creditParam.rate / 12).toFixed(5));
          var currentPeriod = creditTerms.currentPeriod * 12;
          var result = Math.ceil(creditParam.value * (currentPercent + (currentPercent / (Math.pow((1 + currentPercent), currentPeriod) - 1))));
          return result;
        };

        var interestRateCalculate = function () {
          var percent = (creditTerms.initialSum * 100) / creditTerms.currentSum;
          var rate = {};

          if (creditTerms.status === 1) {
            rate = {
              min: 0.0850,
              max: 0.0940
            };
            if (percent < 15) {
              return rate.max;
            }
            return rate.min;
          }

          if (creditTerms.status === 2) {
            rate = {
              min: 0.1500,
              max: 0.1600,
              low: 0.0350,
              high: 0.0850
            };
            if (creditTerms.insuranceCar && creditTerms.insuranceLife) {
              return rate.low;
            }
            if (creditTerms.insuranceCar || creditTerms.insuranceLife) {
              return rate.high;
            }
            if (creditTerms.currentSum < 2000000) {
              return rate.max;
            }
            return rate.min;
          }

          if (creditTerms.status === 3) {
            rate = {
              min: 0.0950,
              mid: 0.1250,
              max: 0.1500
            };
            var forSalary = 0.005;
            var currentRate = 0;
            if (creditTerms.currentSum < 750000) {
              currentRate = rate.max;
            }
            if (creditTerms.currentSum >= 750000 && creditTerms.currentSum < 2000000) {
              currentRate = rate.mid;
            }
            if (creditTerms.currentSum >= 2000000) {
              currentRate = rate.min;
            }
            if (creditTerms.salaryClient) {
              currentRate = currentRate - forSalary;
            }
          }
          return currentRate;
        };

        creditParam.rate = interestRateCalculate();
        creditParam.value = creditCalculate();
        creditParam.payment = paymentCalculate();
        creditParam.income = Math.ceil(creditParam.payment / 0.45);
        updateOfferBlock('offer');
      };

      window.credit = {
        update: updateCredit
      };

      for (var i = 0; i < root.children.length; i++) {
        if (root.children[i].hasAttribute('selected')) {
          var currentStatus = root.children[i].getAttribute('value');
          var currentLabels = window.util.getDataAttr(root.children[i]);
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
            label: 'Стоимость ' + currentLabels[0].toLowerCase(),
            minSumTarget: 1200000,
            maxSumTarget: 25000000,
            stepSumTarget: 100000,
            initialSum: 0,
            percent: 0.1,
            percentStep: 0.05,
            minPeriod: 5,
            maxPeriod: 30,
            stepPeriod: 1,
            parentCapital: false,
            parentCapitalValue: 470000
          };
          creditParam = {
            label: 'Сумма ' + currentLabels[1].toLowerCase(),
            desc: currentLabels[2],
            minValue: 500000
          };
          break;
        case listStatus.car:
          creditTerms = {
            status: 2,
            label: 'Стоимость ' + currentLabels[0].toLowerCase(),
            minSumTarget: 500000,
            maxSumTarget: 5000000,
            stepSumTarget: 50000,
            initialSum: 0,
            percent: 0.2,
            percentStep: 0.05,
            minPeriod: 1,
            maxPeriod: 5,
            stepPeriod: 1,
            insuranceCar: false,
            insuranceLife: false
          };
          creditParam = {
            label: 'Сумма ' + currentLabels[1].toLowerCase(),
            desc: currentLabels[2],
            minValue: 200000
          };
          break;
        case listStatus.consumer:
          creditTerms = {
            status: 3,
            label: 'Сумма ' + currentLabels[0].toLowerCase(),
            minSumTarget: 500000,
            maxSumTarget: 3000000,
            stepSumTarget: 50000,
            initialSum: 0,
            percent: 0.1,
            percentStep: 0.05,
            minPeriod: 1,
            maxPeriod: 7,
            stepPeriod: 1,
            salaryClient: false
          };
          creditParam = {
            label: 'Сумма ' + currentLabels[1].toLowerCase()
          };
          break;
      }

      if (creditTerms.status !== 0) {
        creditTerms.currency = 'рублей';
        creditTerms.desc = 'от ' + creditTerms.minSumTarget + ' до ' + creditTerms.maxSumTarget + ' ' + creditTerms.currency;
        creditTerms.currentSum = creditTerms.minSumTarget;
        creditTerms.currentPeriod = creditTerms.minPeriod;
        creditTerms.labelPeriod = ['год', 'года', 'лет'];

        hideStepTwo.classList.add('calculator__step-show');

        if (form.querySelector('.input-price__sum')) {
          var targetPrice = new InputPrice('.input-price__sum', creditTerms, {
            inputEl: '#price-target',
            descEl: '.calculator__input-desc',
            btnIncrease: '.input-price__btn_minus',
            btnDecrease: '.input-price__btn_plus'
          });
        }

        if (form.querySelector('.input-price__initial')) {
          var firstPrice = new InitialPrice('.input-price__initial', creditTerms, {
            inputEl: '#price-first',
            rangeEl: '.range__price-first',
            rangeToggleEl: '.range__roller',
            rangeValueEl: '.range__value'
          });
          form.querySelector('#price-target').addEventListener('change', updateInitialChange);
        }

        if (form.querySelector('.input-price__period')) {
          var period = new Period('.input-price__period', creditTerms, {
            inputEl: '#credit-period',
            rangeEl: '.range__credit-period',
            rangeToggleEl: '.range__roller',
            rangeValueMinEl: '.range__limit-start',
            rangeValueMaxEl: '.range__limit-end'
          });
        }

        var paramsEl = form.querySelector('.calculator__params');
        if (paramsEl) {
          var paramElHandler = function (pcEvt) {
            pcEvt.preventDefault();
            if (creditTerms.status === 1) {
              creditTerms.parentCapital = pcEvt.target.checked;
            }
            if (creditTerms.status === 2) {
              if (pcEvt.target.name === 'insurance-car') {
                creditTerms.insuranceCar = pcEvt.target.checked;
              }
              if (pcEvt.target.name === 'insurance-life') {
                creditTerms.insuranceLife = pcEvt.target.checked;
              }
            }
            if (creditTerms.status === 3) {
              creditTerms.salaryClient = pcEvt.target.checked;
            }
            updateCredit();
          };

          var addEvent = function (arrayAdd, handler) {
            for (var j = 0; j < arrayAdd.length; j++) {
              arrayAdd[j].onchange = handler;
            }
          };

          var removeEvent = function (arrayRem) {
            for (var k = 0; k < arrayRem.length; k++) {
              arrayRem[k].onchange = '';
            }
          };

          var calcElements = paramsEl.querySelectorAll('.calculator__param');
          for (var o = 0; o < calcElements.length; o++) {
            calcElements[o].classList.remove('calculator__param_show');
            var inputs = calcElements[o].getElementsByTagName('input');
            removeEvent(inputs, paramElHandler);
          }

          var element;
          if (creditTerms.status === 1) {
            element = paramsEl.querySelector('.calculator__param_capital');
          }
          if (creditTerms.status === 2) {
            element = paramsEl.querySelector('.calculator__param_insurance');
          }
          if (creditTerms.status === 3) {
            element = paramsEl.querySelector('.calculator__param_client');
          }
          element.classList.add('calculator__param_show');
          addEvent(element.getElementsByTagName('input'), paramElHandler);
        }

        window.inputPrice.update();
        window.initialPrice.update();
        window.period.update();
        updateCredit();
      } else {
        updateOfferBlock('offer');
        hideStepTwo.classList.remove('calculator__step-show');
        hideStepThree.classList.remove('request_show');
      }
    };

    // SELECT -- init

    if (body.querySelector('.select')) {
      var credit = new Select('.select', {
        idSelect: '#credit-target',
        classElement: 'select__item',
        classActiveElement: 'select__item_selected'
      });

      body.querySelector('#credit-target').addEventListener('change', selectCreditChange);
    }

    // MAP
    // MAP -- init

    var Map = {
      src: 'https://api-maps.yandex.ru/2.1/',
      api: 'apikey=83f923aa-03af-4069-b04f-28351fa92788',
      param: 'load=package.standard&lang=ru-RU',
      filterClass: '.map__header',
      center: [56.82, 60.59],
      zoom: 5,
      timeout: 2000,
      filters: {}
    };

    setTimeout(function () {
      var mapEl = document.createElement('script');
      mapEl.type = 'text/javascript';
      mapEl.src = Map.src + '?' + Map.api + '&' + Map.param;
      mapEl.onload = getYaMap;
      body.appendChild(mapEl);
    }, Map.timeout);

    function getYaMap() {
      function initMap(filtersList) {
        ymaps.ready(function () {
          var mapObj = new ymaps.Map('map', {
              center: Map.center,
              zoom: Map.zoom,
              controls: []
            }), objectManager = new ymaps.ObjectManager({
              clusterize: true,
              gridSize: 5
            });

          var setError = function () {
            // Need create error for this event
          };

          var update = function (list) {
            mapObj.geoObjects.add(objectManager.setFilter(function (item) {
              var param = item.properties.clusterCaption;
              if (item.properties.clusterCaption === param) {
                return list[param];
              }
            }));
          };

          window.data.load('/data.json', function (data) {
            objectManager.add(data);
          }, setError);

          update(filtersList);

          window.maps = {
            update: update
          };
        });
      }

      var changeFiltersHandler = function () {
        getFilters(Map.filterClass);
        window.maps.update(Map.filters);
      };

      var getFilters = function (classEl) {
        var root = body.querySelector(classEl);
        var controls = root.getElementsByTagName('input');
        for (var l = 0; l < controls.length; l++) {
          controls[l].onchange = changeFiltersHandler;
          var name = window.util.getDataAttr(controls[l]);
          Map.filters[name] = controls[l].checked;
        }
      };

      getFilters(Map.filterClass);
      initMap(Map.filters);
    }
  };

  window.addEventListener('load', initPage);
})();
