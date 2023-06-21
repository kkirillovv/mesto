import '../pages/index.css';
import {
  initialCards, 
  validator, 
  buttonEditProfile, 
  buttonAddPhoto, 
  profileName,
  profileActivity,
} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

// B. Объявляем функции ----------------------------------------------------

// 1. Попап показа фотографий
function handleOpenFullImage (item) {
  const popup = new PopupWithImage('#show');
  popup.open(item);
}

// 2. Сабмит формы редактирования пользователя
function editProfileInfo (evt) {
  evt.preventDefault();
  userInfo.setUserInfo(this._formValues);
}

// 3. Сабмит формы добавления карточки
function makeNewCard (evt) {
  evt.preventDefault();
  this._formValues.alt = this._formValues.title;
  const card = new Card(this._formValues, handleOpenFullImage, '#article_card');
  document.querySelector('.elements').prepend(card.createCard());
}


/* Реализация страницы --------------------------------------------------- */

// 1. Шесть карточек «из коробки»
const cardList = new Section({items: initialCards, renderer: (item) => {
    const card = new Card(item, handleOpenFullImage, '#article_card');
    document.querySelector('.elements').prepend(card.createCard());
  }
}, '.elements');
cardList.renderItems();

const userInfo = new UserInfo(profileName, profileActivity);

// 2. Сниферы
buttonEditProfile.addEventListener('click', () => {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_name',
      value: userInfo.userName.textContent
    },
    {
      selector: '.edit-form__input-text_type_activity',
      value: userInfo.userActivity.textContent
    }
  ];
  const popupEditUser = new PopupWithForm('#edit-profile', editProfileInfo);
  popupEditUser.open(inputTextFields);
  formEditProfile.resetError();
});

buttonAddPhoto.addEventListener('click', () => {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_title',
      value: ''
    },
    {
      selector: '.edit-form__input-text_type_link',
      value: ''
    }
  ];
  const popupAddPhoto = new PopupWithForm('#add-photo', makeNewCard);
  popupAddPhoto.open(inputTextFields);
  formAddPhoto.resetError();
});

// 3. Запускаем валидацию
const formList = Array.from(document.querySelectorAll(validator.formSelector));
const formEditProfile = new FormValidator(validator, formList[0]);
formEditProfile.enableValidation();
const formAddPhoto = new FormValidator(validator, formList[1]);
formAddPhoto.enableValidation();