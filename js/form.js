'use strict';

(function () {
  var BUNGALO_MIN_PRICE = 0;
  var HOUSE_MIN_PRICE = 5000;
  var FLAT_MIN_PRICE = 1000;
  var PALACE_MIN_PRICE = 10000;

  var noticeForm = document.querySelector('.ad-form');
  var houseTypeField = noticeForm.querySelector('#type');
  var priceField = noticeForm.querySelector('#price');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');

  var changeMinPrice = function (houseType) {
    if (houseType === 'palace') {
      priceField.min = PALACE_MIN_PRICE;
      priceField.placeholder = PALACE_MIN_PRICE;
    } else if (houseType === 'flat') {
      priceField.min = FLAT_MIN_PRICE;
      priceField.placeholder = FLAT_MIN_PRICE;
    } else if (houseType === 'house') {
      priceField.min = HOUSE_MIN_PRICE;
      priceField.placeholder = HOUSE_MIN_PRICE;
    } else if (houseType === 'bungalo') {
      priceField.min = BUNGALO_MIN_PRICE;
      priceField.placeholder = BUNGALO_MIN_PRICE;
    }
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
})();