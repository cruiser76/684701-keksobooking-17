'use strict';
(function () {
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (notice) {
    var card = cardTemplate.cloneNode(true);
    var title = card.querySelector('.popup__title');
    title.innerHTML = notice.offer.title;
    return card;
  };

  window.card = {
    renderCard: renderCard
  };
})();
