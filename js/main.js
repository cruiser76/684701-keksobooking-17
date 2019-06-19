'use strict';
var MIN_WINDOW_HEIGHT = 130;
var MAX_WINDOW_HEIGHT = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mainPin = map.querySelector('.map__pin--main');

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var WINDOW_WIDTH = map.offsetWidth;
var noticeForm = document.querySelector('.ad-form');
var fieldsets = document.querySelectorAll('fieldset');
var selects = document.querySelectorAll('select');

var address = document.querySelector('#address');

var offers = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

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

var mockNotices = makeNotices(8);

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

changeDisable(fieldsets, true);
changeDisable(selects, true);

address.value = '' + parseInt(mainPin.style.left, 10) + ',' + parseInt(mainPin.style.top, 10);
mainPin.addEventListener('click', function () {
  changeDisable(fieldsets, false);
  changeDisable(selects, false);
  map.classList.remove('map--faded');
  noticeForm.classList.remove('ad-form--disabled');
  mockNotices.forEach(renderPin);
  pinsList.appendChild(fragment);
});

