'use strict';

(function () {
  var NOTICES_NUMBER = 8;
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var mainPin = map.querySelector('.map__pin--main');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');
  var pinsList = document.querySelector('.map__pins');

  var isActive = false;
  var mockNotices = window.data.noticesList(NOTICES_NUMBER);
  var address = document.querySelector('#address');

  var fragment = document.createDocumentFragment();
  var changeDisable = function (item, status) {
    for (var i = 0; i < item.length; i += 1) {
      item[i].disabled = status;
    }
  };

  var deactivatePage = function () {
    isActive = false;
    changeDisable(fieldsets, true);
    changeDisable(selects, true);
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');
  };

  deactivatePage();

  var activatePage = function () {
    isActive = true;
    changeDisable(fieldsets, false);
    changeDisable(selects, false);
    map.classList.remove('map--faded');
    noticeForm.classList.remove('ad-form--disabled');
    mockNotices.forEach(function (notice) {
      fragment.appendChild(window.pin.renderPin(notice));
    });
    pinsList.appendChild(fragment);
  };

  address.value = '' + parseInt(mainPin.style.left, 10) + ',' + parseInt(mainPin.style.top, 10);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (!isActive) {
      activatePage();
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y >= window.data.MIN_WINDOW_HEIGHT && mainPin.offsetTop - shift.y < window.data.MAX_WINDOW_HEIGHT) {
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
})();
