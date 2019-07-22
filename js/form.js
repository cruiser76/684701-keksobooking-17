'use strict';

(function () {
  var MinPrice = {
    BUNGALO: 0,
    HOUSE: 5000,
    FLAT: 1000,
    PALACE: 10000
  };

  var noticeForm = document.querySelector('.ad-form');
  var houseTypeField = noticeForm.querySelector('#type');
  var priceField = noticeForm.querySelector('#price');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var capacity = noticeForm.querySelector('#capacity');
  var roomNumber = noticeForm.querySelector('#room_number');

  var changeMinPrice = function (houseType) {
    priceField.min = MinPrice[houseType.toUpperCase()];
    priceField.placeholder = MinPrice[houseType.toUpperCase()];
  };

  changeMinPrice(houseTypeField.value);
  houseTypeField.addEventListener('change', function () {
    changeMinPrice(houseTypeField.value);
  });

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });
  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var changeCapacityAvailable = function () {
    for (var i = 0; i < capacity.options.length; i += 1) {
      capacity.options[i].disabled = true;
      if (parseInt(capacity.options[i].value, 10) <= parseInt(roomNumber.value, 10) && capacity.options[i].value !== '0' && roomNumber.value !== '100') {
        capacity.options[i].disabled = false;
        capacity.options[2].selected = true;
      } else if (roomNumber.value === '100' && capacity.options[i].value === '0') {
        capacity.options[i].disabled = false;
        capacity.options[i].selected = true;
      }
    }
  };

  changeCapacityAvailable();

  var onRoomNumberChange = function () {
    changeCapacityAvailable();
  };

  roomNumber.addEventListener('change', onRoomNumberChange);
})();
