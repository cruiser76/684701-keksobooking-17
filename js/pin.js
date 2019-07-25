'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (notice) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = (notice.location.x - window.data.PIN_WIDTH / 2) + 'px';
    pin.style.top = (notice.location.y - window.data.PIN_HEIGHT) + 'px';

    var picture = pin.querySelector('img');
    picture.src = notice.author.avatar;
    picture.alt = 'Метка объявления';
    pin.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.card.renderCard(notice);
    });
    return pin;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
