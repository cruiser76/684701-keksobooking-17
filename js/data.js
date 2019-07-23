'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_WINDOW_HEIGHT = 130;
  var MAX_WINDOW_HEIGHT = 630;

  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 82;
  var WINDOW_WIDTH = 1200;

  var getRandomNumber = function (min, max) {
    return (Math.random() * (max - min) + min);
  };

  var offers = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  // временно
  var makeNotices = function (count) {
    var noticesList = [];
    for (var i = 0; i < count; i += 1) {
      var notice = {};

      notice.author = {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      };

      notice.offer = {
        type: offers[Math.floor(getRandomNumber(0, offers.length))],
        price: Math.round(getRandomNumber(1, 100000)),
        rooms: Math.round(getRandomNumber(1, 3)),
        guests: Math.round(getRandomNumber(0, 2)),
        features: ['dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
      };


      notice.location = {
        x: Math.round(getRandomNumber(0, WINDOW_WIDTH - PIN_WIDTH)),
        y: Math.round(getRandomNumber(MIN_WINDOW_HEIGHT, MAX_WINDOW_HEIGHT - PIN_HEIGHT))
      };
      noticesList.push(notice);
    }
    return noticesList;
  };
  window.data = {
    noticesList: makeNotices, // временно
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_WINDOW_HEIGHT: MIN_WINDOW_HEIGHT,
    MAX_WINDOW_HEIGHT: MAX_WINDOW_HEIGHT,
    WINDOW_WIDTH: WINDOW_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT
  };

})();
