import {Popup} from "./Popup.js"

export class PopupDelete extends Popup {
  constructor(selector, confirmDeletion) {
    super(selector)
    this._submitButton = this._popup.querySelector('.edit-form__button_type_save')
    this._submitButtonText = this._submitButton.textContent
    this._confirmDeletion = confirmDeletion
    this._doSubmit = this._doSubmit.bind(this)
  }

  renderLoading(isLoading, loadingText='Удаление...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText
    } else {
      this._submitButton.textContent = this._submitButtonText
    }
  }

  _doSubmit (evt) {
    evt.preventDefault()
    this.renderLoading(true)
    this._confirmDeletion(evt, this.itemDelete)
  }

  _setEventListeners() {
    super._setEventListeners()
    this._popup.addEventListener('submit', this._doSubmit)
  }

  _removeEventListeners() {
    super._removeEventListeners()
    this._popup.removeEventListener('submit', this._doSubmit)
  }
}