export class Card {

  constructor (data, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._articleClass = '.elements'; // Класс карточек
  }

  _getTemplate () {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  // 4. Лайк карточки надо сделать через toggle / Слушатель события    
  _listenLike () {
    const likeElement = this._element.querySelector('.element__like');
    likeElement.addEventListener('click', function () {
      likeElement.classList.toggle("element__like_active");
    });
  }

  // 5. Удаление карточки / Слушатель события
  _listenTrash () {
    const trashElement = this._element.querySelector('.element__trash');
    trashElement.addEventListener('click', function () {
      trashElement.parentElement.remove();
    });
  }

  _handleOpenFullImage (item) {
    // Попап показа фотографий
    const popupShowPhoto = document.querySelector('#show');
    const titleCardDetails = popupShowPhoto.querySelector('.card-details__title');
    const imageCardDetails = popupShowPhoto.querySelector('.card-details__image')
    titleCardDetails.textContent = item.name;
    imageCardDetails.src = item.link;
    imageCardDetails.alt = item.alt;
    openPopup(popupShowPhoto);
  }

  // 6. Открытие попапа с картинкой / Слушатель события
  _listenOpenFullImage (element) {
    element.addEventListener('click', () => this._handleOpenFullImage(this._data));
  }

  createCard () {
    // клонируем содержимое тега template
    this._element = this._getTemplate();
    const photoElement = this._element.querySelector('.element__photo');
    const titleElement = this._element.querySelector('.element__title');
  
    // заполняем карточку
    titleElement.textContent = this._name;
    photoElement.src = this._link;
    photoElement.alt = this._alt;
    this._listenLike();
    this._listenTrash();
    this._listenOpenFullImage(photoElement);

    return this._element;
  }

  renderCard () { 
    // отображаем на странице
    document.querySelector(this._articleClass).prepend(this.createCard());
  }
}