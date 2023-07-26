import {Popup} from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector)
    this._form = this._popup.querySelector('.edit-form')
    this._inputList = this._popup.querySelectorAll('.edit-form__input-text')
    this._submitButton = this._popup.querySelector('.edit-form__button_type_save')
    this._submitButtonText = this._submitButton.textContent
    this._submitForm = submitForm
    this._doSubmit = this._doSubmit.bind(this)
  }

  open(fields) {
    fields.forEach(item => {
      this._popup.querySelector(item.selector).value = item.value;
    })
    super.open()
  }

  close() {
    super.close()
    this._form.reset()
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText
    } else {
      this._submitButton.textContent = this._submitButtonText
    }
  }

  _getInputValues() {
    const formValues = {}
    this._inputList.forEach(input => {
      formValues[input.name] = input.value
    })
    return formValues
  }

  _doSubmit (evt) {
    evt.preventDefault()
    this.renderLoading(true)
    const formValues = this._getInputValues()
    this._submitForm(evt, formValues)
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