const popupStyle = {
  popup: 'popup',
  activePopup: 'popup_opened',
  buttonCloseSelector: '.popup__close'
}

let popup;

function openPopup(item) {
  item.classList.add(popupStyle.activePopup);
  setListenersClosePopup(item);
}

function closePopup() {
  popup.classList.remove(popupStyle.activePopup);
  removeListenersClosePopup();
}

function keyHandlerPopupClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function clickHandlerOverlayOut(evt) {
  if (evt.target.classList.contains(popupStyle.popup)) {
    closePopup();
  }
}

function setListenersClosePopup(item) {
  const buttonClose = item.querySelector(popupStyle.buttonCloseSelector);
  popup = item;
  buttonClose.addEventListener('click', closePopup); // закрытие popup кликом на кнопке 
  document.addEventListener('keydown', keyHandlerPopupClose); //закрытие popup по нажатию специальной клавиши
  popup.addEventListener('click', clickHandlerOverlayOut); // закрытие popup кликом на оверлей
}

function removeListenersClosePopup() {
  const buttonClose = popup.querySelector(popupStyle.buttonCloseSelector);
  buttonClose.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', keyHandlerPopupClose);
  popup.removeEventListener('click', clickHandlerOverlayOut);
}