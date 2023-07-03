import {Popup} from "./Popup.js"
import {fillFieldsForm} from "../utils/utils.js"

export class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector)
    this._submitForm = submitForm
    this._doSubmit = this._doSubmit.bind(this)
  }

  open(fields) {
    fillFieldsForm(this._popup, fields)
    super.open()
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.edit-form__input-text')
    const formValues = {}
    this._inputList.forEach(input => {
      formValues[input.name] = input.value
    })
    return formValues
  }

  _doSubmit (evt) {
    evt.preventDefault()
    const formValues = this._getInputValues()
    this._submitForm(evt, formValues)
    this.close()
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