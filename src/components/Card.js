export class Card {

  constructor (data, templateSelector, handleOpenFullImage, 
    handleDeleteCardPopup, handleButtonLike) {
    this._data = data
    this._id = data._id
    this._title = data.name
    this._link = data.link
    this._alt = data.alt || data.name
    this._templateSelector = templateSelector
    this._handleOpenFullImage = handleOpenFullImage
    this._handleDeleteCardPopup = handleDeleteCardPopup
    this._handleButtonLike = handleButtonLike
    this._articleClass = '.elements' // Класс карточек
    this.selectorLikeActive = 'element__like_active'
    this.like = this.like.bind(this)
    this.trash = this.trash.bind(this)
    this._confirmDeleteCard = this._confirmDeleteCard.bind(this)
  }

  _getTemplate () {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardElement
  }

  createCard () {
    // клонируем содержимое тега template
    this._element = this._getTemplate()
    this.photoElement = this._element.querySelector('.element__photo')
    this.titleElement = this._element.querySelector('.element__title')
    this.likeElement = this._element.querySelector('.element__like')
    this.likeCounter = this._element.querySelector('.element__like-counter');
    this.trashElement = this._element.querySelector('.element__trash')

    // заполняем карточку
    this.titleElement.textContent = this._title
    this.photoElement.src = this._link
    this.photoElement.alt = this._alt
    this.likeCounter.textContent = this._data.likes.length
    this._data.likes.forEach((like) => {
      if (like._id === this._data.userId) {
        this.likeElement.classList.toggle(this.selectorLikeActive)
      }
    })
    this._setEventListeners()
    this._checkOwner()
    return this._element
  }

  trash() {
    this._element.remove()
    this._removeEventListeners()
  }

  like() {
    this._handleButtonLike(this)
  }

  isLiked() {
    return this.likeElement.classList.contains(this.selectorLikeActive)
  }

  _checkOwner () {
    if (this._data.userId !== this._data.owner._id) {
      this.trashElement.remove()
      this.trashElement = null
    }
  }

  _confirmDeleteCard()
  {
    this._handleDeleteCardPopup(this)
  }

  _setEventListeners() {
    this.likeElement.addEventListener('click', this.like) // обробатываем нажатие лайка
    this.trashElement.addEventListener('click', this._confirmDeleteCard) // удаление карточки
    this.photoElement.addEventListener('click', () => this._handleOpenFullImage(this._data)) // открытие попапа с картинкой
  }

  _removeEventListeners() {
    this.likeElement.removeEventListener('click', this.like)
    this.trashElement.removeEventListener('click', this._confirmDeleteCard)
    this.likeElement = null
    this.trashElement = null
  }
}