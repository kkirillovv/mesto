import {Popup} from "./Popup.js";
import {fillFieldsForm} from "../utils/utils.js";

export class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._submitForm = submitForm;
  }

  open(fields) {
    fillFieldsForm(this._popup, fields);
    super.open();
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.edit-form__input-text');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitForm(evt);
      // this._popup.reset();
      this.close();
    });
  }
}