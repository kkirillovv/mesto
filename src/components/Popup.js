export class Popup {
  constructor(selector) {
    this._popupStyle = {
      popup: 'popup',
      activePopup: 'popup_opened',
      buttonCloseSelector: '.popup__close'
    }
    this._popup = document.querySelector(selector)
    this._buttonClose = this._popup.querySelector(this._popupStyle.buttonCloseSelector)
    this.close = this.close.bind(this)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._clickHandlerOverlayOut = this._clickHandlerOverlayOut.bind(this)
  }

  open() {
    this._popup.classList.add(this._popupStyle.activePopup)
    this._setEventListeners()
  }

  close() {
    this._popup.classList.remove(this._popupStyle.activePopup)
    this._removeEventListeners()
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _clickHandlerOverlayOut(evt) {
    if (evt.target.classList.contains(this._popupStyle.popup)) {
      this.close()
    }
  }

  _setEventListeners() {
    this._buttonClose.addEventListener('click', this.close) // закрытие popup кликом на кнопке 
    document.addEventListener('keydown', this._handleEscClose) //закрытие popup по нажатию специальной клавиши
    this._popup.addEventListener('mousedown', this._clickHandlerOverlayOut) // закрытие popup кликом на оверлей
  }

  _removeEventListeners() {
    this._buttonClose.removeEventListener('click', this.close)
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.removeEventListener('mousedown', this._clickHandlerOverlayOut)
  }
}