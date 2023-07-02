export class Card {

  constructor (data, handleOpenFullImage, templateSelector) {
    this._data = data;
    this._title = data.title;
    this._link = data.link;
    this._alt = data.alt || data.title;
    this._handleOpenFullImage = handleOpenFullImage;
    this._templateSelector = templateSelector;
    this._articleClass = '.elements'; // Класс карточек
    this.like = this.like.bind(this)
    this.trash = this.trash.bind(this)
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
  like() {
    this.likeElement.classList.toggle("element__like_active")
  }

  _listenLike () {
    this.likeElement.addEventListener('click', this.like)
  }

  // 5. Удаление карточки / Слушатель события
  trash() {
    this.trashElement.parentElement.remove()
    this.trashElement.removeEventListener('click', this.trash)
    this.likeElement.removeEventListener('click', this.like)
    this.trashElement = null
    this.likeElement = null
  }

  _listenTrash () {
    this.trashElement.addEventListener('click', this.trash)
  }

  // 6. Открытие попапа с картинкой / Слушатель события
  _listenOpenFullImage (element) {
    element.addEventListener('click', () => this._handleOpenFullImage(this._data));
  }

  createCard () {
    // клонируем содержимое тега template
    this._element = this._getTemplate()
    const photoElement = this._element.querySelector('.element__photo')
    const titleElement = this._element.querySelector('.element__title')
    this.likeElement = this._element.querySelector('.element__like')
    this.trashElement = this._element.querySelector('.element__trash')

    // заполняем карточку
    titleElement.textContent = this._title
    photoElement.src = this._link
    photoElement.alt = this._alt
    this._listenLike()
    this._listenTrash()
    this._listenOpenFullImage(photoElement)

    return this._element
  }
}