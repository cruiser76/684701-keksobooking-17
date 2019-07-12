'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MIN_WINDOW_HEIGHT = 130;
  var MAX_WINDOW_HEIGHT = 630;

  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 75;

  var map = document.querySelector('.map');
  var WINDOW_WIDTH = map.clientWidth;

  var getRandomNumber = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var offers = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

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


  window.data = {
    noticesList: makeNotices,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_WINDOW_HEIGHT: MIN_WINDOW_HEIGHT,
    MAX_WINDOW_HEIGHT: MAX_WINDOW_HEIGHT,
    WINDOW_WIDTH: WINDOW_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT
  };
})();
