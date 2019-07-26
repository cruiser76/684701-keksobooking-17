'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');
  var cardFragment = document.createDocumentFragment();

  // поищем существующую карточку и удалим ее если она есть
  var removeCard = function () {
    var currentCard = map.querySelector('.map__card');
    if (currentCard) {
      document.removeEventListener('keydown', onCardEscPress);
      map.removeChild(currentCard);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
  };

  var HouseType = {
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
    'bungalo': 'Бунгало'
  };

  var renderCard = function (notice) {
    removeCard();
    // создаем новый шаблон карточки и заполняем его
    var card = cardTemplate.cloneNode(true);
    var title = card.querySelector('.popup__title');
    var price = card.querySelector('.popup__text--price');
    var adress = card.querySelector('.popup__text--address');
    var type = card.querySelector('.popup__type');
    var capacity = card.querySelector('.popup__text--capacity');
    var times = card.querySelector('.popup__text--time');
    var features = card.querySelector('.popup__features');
    var description = card.querySelector('.popup__description');
    var photos = card.querySelector('.popup__photos');
    var photo = card.querySelector('.popup__photo');
    var avatar = card.querySelector('.popup__avatar');

    var closeButton = card.querySelector('.popup__close');

    price.textContent = notice.offer.price + ' ₽/ночь';
    title.textContent = notice.offer.title;
    adress.textContent = notice.offer.adress;
    type.textContent = HouseType[notice.offer.type];
    capacity.textContent = notice.offer.rooms + ' комнаты для ' + notice.offer.guests + ' гостей';
    times.textContent = 'Заезд после ' + notice.offer.checkin + ', выезд до ' + notice.offer.checkout;
    description.textContent = notice.offer.description;
    // заполняем фичи
    var featuresFragment = new DocumentFragment();
    notice.offer.features.forEach(function (featureEl) {
      if (features.querySelector('.popup__feature--' + featureEl)) {
        featuresFragment.appendChild(features.querySelector('.popup__feature--' + featureEl));
      }
    });
    features.innerHTML = '';
    features.appendChild(featuresFragment);
    // загружаем фоточки
    var photoFragment = new DocumentFragment();
    notice.offer.photos.forEach(function (photoEl) {
      var newPhoto = photo.cloneNode(true);
      newPhoto.src = photoEl;
      photoFragment.appendChild(newPhoto);
    });
    photos.innerHTML = '';
    photos.appendChild(photoFragment);

    avatar.src = notice.author.avatar;

    cardFragment.appendChild(card);

    // вешаем обработчики закрытия
    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      map.removeChild(card);
    });
    document.addEventListener('keydown', onCardEscPress);

    // вставляем переред фильтрами на карту
    map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
  };

  window.card = {
    renderCard: renderCard
  };
})();
