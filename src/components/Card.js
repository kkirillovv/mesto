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

  // 4. Лайк карточки надо сделать через toggle / Слушатель события
  like() {
    this.likeElement.classList.toggle("element__like_active")
    this._handleButtonLike(this)
  }

  _listenLike () {
    this.likeElement.addEventListener('click', this.like)
  }

  _checkOwner () {
    if (this._data.userId !== this._data.owner._id) {
      this.trashElement.remove()
      this.trashElement = null
    }
  }

  // 5. Удаление карточки / Слушатель события
  trash() {
    this._element.remove()
    this.trashElement.removeEventListener('click', this._confirmDeleteCard)
    this.likeElement.removeEventListener('click', this.like)
    this.trashElement = null
    this.likeElement = null
  }

  _confirmDeleteCard()
  {
    this._handleDeleteCardPopup(this)
  }

  _listenTrash () {
    this.trashElement.addEventListener('click', this._confirmDeleteCard)
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
    this.likeCounter = this._element.querySelector('.element__like-counter');
    this.trashElement = this._element.querySelector('.element__trash')

    // заполняем карточку
    titleElement.textContent = this._title
    photoElement.src = this._link
    photoElement.alt = this._alt
    this.likeCounter.textContent = this._data.likes.length
    this._data.likes.forEach((like) => {
      if (like._id === this._data.userId) {
        this.likeElement.classList.toggle("element__like_active")
      }
    })
    this._listenLike()
    this._listenTrash()
    this._checkOwner()
    this._listenOpenFullImage(photoElement)
    return this._element
  }
}