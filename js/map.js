'use strict';

(function () {
  var NOTICES_NUMBER = 5;
  var InitialCoordinats = {
    TOP: 375,
    LEFT: 570
  };
  var noticesList;
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var pinsList = document.querySelector('.map__pins');
  var isActive = false;
  var address = document.querySelector('#address');

  var filters = document.querySelector('.map__filters');
  var filtersList = filters.querySelectorAll('.map__filter');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var checkBoxList = filters.querySelectorAll('.map__checkbox');

  var Price = {
    LOW: 10000,
    HIGH: 50000
  };

  var changeDisable = function (item, status) {
    for (var i = 0; i < item.length; i += 1) {
      item[i].disabled = status;
    }
  };

  var removePins = function () {
    var pins = pinsList.querySelectorAll('.map__pin');

    pins.forEach(function (el) {
      if (!el.classList.contains('map__pin--main')) {
        el.remove();
      }
    });
  };

  var deactivatePage = function () {
    isActive = false;
    changeDisable(fieldsets, true);
    changeDisable(selects, true);
    document.querySelector('.ad-form').reset();
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');
    address.value = '' + InitialCoordinats.LEFT + ', ' + InitialCoordinats.TOP;
    removePins();
    window.card.removeCard();
    mainPin.style.left = InitialCoordinats.LEFT + 'px';
    mainPin.style.top = InitialCoordinats.TOP + 'px';
  };

  var placePins = function (pins) {
    var fragment = document.createDocumentFragment();
    pins.slice(0, NOTICES_NUMBER).forEach(function (notice) {
      fragment.appendChild(window.pin.renderPin(notice));
    });
    pinsList.appendChild(fragment);
  };

  var onDataLoad = function (notices) {
    noticesList = notices;
    notices.slice(0, NOTICES_NUMBER).forEach(function (notice) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.pin.renderPin(notice));
      pinsList.appendChild(fragment);
    });
  };

  var onErrorAppearance = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorForm = errorTemplate.cloneNode(true);
    var errorText = errorForm.querySelector('.error__message');
    var errorButton = errorForm.querySelector('.error__button');
    errorText.textContent = errorMessage;

    var removeErrorForm = function () {
      document.removeEventListener('keydown', onErrorFormEscPress);
      document.removeEventListener('mousedown', onErrorFormClick);
      errorForm.parentNode.removeChild(errorForm);
      deactivatePage();
    };

    var onErrorFormEscPress = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.data.ESC_KEY_CODE) {
        removeErrorForm();
      }
    };
    var onErrorFormClick = function (evt) {
      evt.preventDefault();
      removeErrorForm();
    };

    var onErrorButtonClick = function (evt) {
      evt.preventDefault();
      removeErrorForm();
    };
    document.addEventListener('keydown', onErrorFormEscPress);
    document.addEventListener('mousedown', onErrorFormClick);
    errorButton.addEventListener('click', onErrorButtonClick);
    document.body.insertAdjacentElement('afterbegin', errorForm);
  };

  deactivatePage();

  var activatePage = function () {
    isActive = true;
    window.backend.load(onDataLoad, onErrorAppearance);
    changeDisable(fieldsets, false);
    changeDisable(selects, false);
    map.classList.remove('map--faded');
    noticeForm.classList.remove('ad-form--disabled');
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (!isActive) {
        activatePage();
      }
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y >= (window.data.MIN_WINDOW_HEIGHT - window.data.MAIN_PIN_HEIGHT) && mainPin.offsetTop - shift.y <= window.data.MAX_WINDOW_HEIGHT - window.data.MAIN_PIN_HEIGHT) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if (mainPin.offsetLeft - shift.x >= 0 && mainPin.offsetLeft - shift.x <= (window.data.WINDOW_WIDTH - window.data.MAIN_PIN_WIDTH)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      address.value = '' + (parseInt(mainPin.style.left, 10) + window.data.MAIN_PIN_WIDTH / 2) + ',' + (parseInt(mainPin.style.top, 10) + window.data.MAIN_PIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // получим число фильтров объявления, значения которых совпадает с фильтрами формы
  var getNumberNoticeFilter = function (notice) {
    var filtersAmount = 0;

    // совпадает тип жилья
    if (notice.offer.type === housingType.value) {
      filtersAmount += 1;
    }

    // совпадает диапазон цены
    if (notice.offer.price < Price.LOW && housingPrice.value === 'low') {
      filtersAmount += 1;
    } else if (notice.offer.price >= Price.HIGH && housingPrice.value === 'high') {
      filtersAmount += 1;
    } else if (notice.offer.price >= Price.LOW && notice.offer.price < Price.HIGH && housingPrice.value === 'middle') {
      filtersAmount += 1;
    }

    // совпадает число комнат
    if (notice.offer.rooms === +housingRooms.value) {
      filtersAmount += 1;
    }

    // совпадает число гостей
    if (notice.offer.guests === +housingGuests.value) {
      filtersAmount += 1;
    }

    // есть совпадающие чекбоксы
    notice.offer.features.forEach(function (fitureEl) {
      // создаем массив
      var checkboxArray = Array.from(checkBoxList);
      // выбираем значения нажатых чекбоксов на форме и создаем из них массив
      var mapArr = checkboxArray.map(function (checkboxEl) {
        if (checkboxEl.checked) {
          return checkboxEl.value;
        }
        return false;
      });
      // проверяем для списка фич из объявлений есть ли нажатые чекбоксы на форме
      if (mapArr.indexOf(fitureEl) >= 0) {
        filtersAmount += 1;
      }
    });

    return filtersAmount;
  };

  // число установленных фильтров на форме
  var getAmountFormFilters = function () {
    var filtersArray = Array.from(filtersList);
    var checkboxArray = Array.from(checkBoxList);

    var totalFilters = filtersArray.reduce(function (acc, el) {
      acc += (el.value === 'any' ? 0 : 1);
      return acc;
    }, 0) + checkboxArray.reduce(function (acc, el) {
      acc += el.checked ? 1 : 0;
      return acc;
    }, 0);

    return totalFilters;
  };

  var onFilterChange = window.debounce(function () {
    removePins();
    var amountFormFilters = getAmountFormFilters();

    // выбираем объявления которые совпадают по количеству фильтров с количеством фильтров на форме
    var filtered = noticesList.filter(function (notice) {
      if (amountFormFilters === getNumberNoticeFilter(notice)) {
        return true;
      }
      return false;
    });

    placePins(filtered);
  });


  filtersList.forEach(function () {
    addEventListener('change', onFilterChange);
  });
  checkBoxList.forEach(function () {
    addEventListener('change', onFilterChange);
  });

  window.map = {
    onErrorAppearance: onErrorAppearance,
    deactivatePage: deactivatePage
  };
})();
