import {Popup} from "./Popup.js"

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._titleCardDetails = this._popup.querySelector('.card-details__title')
    this._imageCardDetails = this._popup.querySelector('.card-details__image')
  }

  open(item) {
    this._titleCardDetails.textContent = item.title
    this._imageCardDetails.src = item.link
    this._imageCardDetails.alt = item.alt || item.title
    super.open()
  }
}