'use strict';
var MIN_WINDOW_HEIGHT = 130;
var MAX_WINDOW_HEIGHT = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var WINDOW_WIDTH = map.offsetWidth;

var offers = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var getRandomNumber = function (min, max) {
  return Math.random() * (max - min) + min;
};

var makeNotice = function (i) {
  var notice = {};
  notice.author = {
    avatar: 'img/avatars/user0' + (i + 1) + '.png'
  };

  notice.offer = {
    type: offers[Math.floor(getRandomNumber(0, offers.length))]
  };

  notice.location = {
    x: Math.round(getRandomNumber(0, WINDOW_WIDTH)),
    y: Math.round(getRandomNumber(MIN_WINDOW_HEIGHT, MAX_WINDOW_HEIGHT))
  };

  return notice;
};

var mockNotices = [];

for (var i = 0; i < 8; i += 1) {
  mockNotices.push(makeNotice(i));
}

var pinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var fragment = document.createDocumentFragment();

var renderPin = function (notice) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = (notice.location.x - PIN_WIDTH / 2) + 'px';
  pin.style.top = (notice.location.y - PIN_HEIGHT) + 'px';

  var picture = pin.querySelector('img');
  picture.src = notice.author.avatar;
  picture.alt = 'Метка объявления';

  fragment.appendChild(pin);
};

mockNotices.forEach(renderPin);
pinsList.appendChild(fragment);
