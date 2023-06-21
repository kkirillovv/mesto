export class Popup {
  constructor(selector) {
    this._popupStyle = {
      popup: 'popup',
      activePopup: 'popup_opened',
      buttonCloseSelector: '.popup__close'
    }
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector(this._popupStyle.buttonCloseSelector);
  }

  open() {
    this._popup.classList.add(this._popupStyle.activePopup);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(this._popupStyle.activePopup);
    // this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _clickHandlerOverlayOut(evt) {
    if (evt.target.classList.contains(this._popupStyle.popup)) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close()); // закрытие popup кликом на кнопке 
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt)); //закрытие popup по нажатию специальной клавиши
    this._popup.addEventListener('click', (evt) => this._clickHandlerOverlayOut(evt)); // закрытие popup кликом на оверлей
  }

  // _removeEventListeners() {
  //   this._buttonClose.removeEventListener('click', this.close);
  //   document.removeEventListener('keydown', this._handleEscClose);
  //   this._popup.removeEventListener('click', this._clickHandlerOverlayOut);
  // }
}