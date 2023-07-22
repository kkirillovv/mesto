import {Popup} from "./Popup.js"

export class PopupDelete extends Popup {
  constructor(selector, confirmDeletion) {
    super(selector)
    this.submitButton = this._popup.querySelector('.edit-form__button_type_save')
    this._confirmDeletion = confirmDeletion
    this._doSubmit = this._doSubmit.bind(this)
  }

  _doSubmit (evt) {
    evt.preventDefault()
    this.submitButton.textContent = 'Удаление...';
    this._confirmDeletion(evt, this.item_delete)
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