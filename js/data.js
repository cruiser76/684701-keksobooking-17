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

  // var getRandomNumber = function (min, max) {
  //   return (Math.random() * (max - min) + min);
  // };

  // var offers = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];

  window.data = {
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MIN_WINDOW_HEIGHT: MIN_WINDOW_HEIGHT,
    MAX_WINDOW_HEIGHT: MAX_WINDOW_HEIGHT,
    WINDOW_WIDTH: WINDOW_WIDTH,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT
  };

})();
