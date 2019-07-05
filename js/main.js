'use strict';
var MIN_WINDOW_HEIGHT = 130;
var MAX_WINDOW_HEIGHT = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var NOTICES_NUMBER = 8;
var BUNGALO_MIN_PRICE = 0;
var HOUSE_MIN_PRICE = 5000;
var FLAT_MIN_PRICE = 1000;
var PALACE_MIN_PRICE = 10000;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var WINDOW_WIDTH = map.offsetWidth;
var noticeForm = document.querySelector('.ad-form');
var houseTypeField = noticeForm.querySelector('#type');
var priceField = noticeForm.querySelector('#price');
var timein = noticeForm.querySelector('#timein');
var timeout = noticeForm.querySelector('#timeout');

var fieldsets = document.querySelectorAll('fieldset');
var selects = document.querySelectorAll('select');

var address = document.querySelector('#address');

var offers = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

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

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

var makeNotices = function (count) {
  var noticesList = [];
  for (var i = 0; i < count; i += 1) {
    var notice = {};

    notice.author = {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    };

    notice.offer = {
      type: offers[Math.floor(getRandomNumber(0, offers.length))]
    };

    notice.location = {
      x: Math.round(getRandomNumber(0, WINDOW_WIDTH - PIN_WIDTH)),
      y: Math.round(getRandomNumber(MIN_WINDOW_HEIGHT, MAX_WINDOW_HEIGHT - PIN_HEIGHT))
    };
    noticesList.push(notice);
  }
  return noticesList;
};

var mockNotices = makeNotices(NOTICES_NUMBER);

var renderPin = function (notice) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = (notice.location.x + PIN_WIDTH / 2) + 'px';
  pin.style.top = (notice.location.y + PIN_HEIGHT) + 'px';

  var picture = pin.querySelector('img');
  picture.src = notice.author.avatar;
  picture.alt = 'Метка объявления';

  fragment.appendChild(pin);
};

var changeDisable = function (item, status) {
  for (var i = 0; i < item.length; i += 1) {
    item[i].disabled = status;
  }
};

var deactivatePage = function () {
  changeDisable(fieldsets, true);
  changeDisable(selects, true);
  map.classList.add('map--faded');
  noticeForm.classList.add('ad-form--disabled');
};

deactivatePage();

var activatePage = function () {
  changeDisable(fieldsets, false);
  changeDisable(selects, false);
  map.classList.remove('map--faded');
  noticeForm.classList.remove('ad-form--disabled');
  mockNotices.forEach(renderPin);
  pinsList.appendChild(fragment);
};

address.value = '' + parseInt(mainPin.style.left, 10) + ',' + parseInt(mainPin.style.top, 10);

mainPin.addEventListener('click', function () {
  activatePage();
});

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
