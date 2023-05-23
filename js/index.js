import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// A. Объявляем переменные -------------------------------------------------

const validator = {
  formSelector: '.edit-form',
  setSelector: '.edit-form__set',
  inputSelector: '.edit-form__input-text',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_inactive',
  inputErrorClass: 'edit-form__input-text_type_error',
  errorClass: 'edit-form__input-error_active'
}

const content = document.querySelector('.content');
const buttonEditProfile = content.querySelector('.profile-info__edit');
const buttonAddPhoto = content.querySelector('.profile__add-photo');
const profileName = content.querySelector('.profile-info__name');
const profileActivity = content.querySelector('.profile-info__activity');
// Попап формы редактирования
const popupEditFormProfile = document.querySelector('#edit-profile');
const inputNameFormProfile = popupEditFormProfile.querySelector('.edit-form__input-text_type_name');
const inputActivityFormProfile = popupEditFormProfile.querySelector('.edit-form__input-text_type_activity');  
// Попап формы добавления фотографии
const popupAddPhoto = document.querySelector('#add-photo');
const inputTitleFormAddNewCard = popupAddPhoto.querySelector('.edit-form__input-text_type_title');
const inputLinkFormAddNewCard = popupAddPhoto.querySelector('.edit-form__input-text_type_link');

// B. Объявляем функции ----------------------------------------------------

function editProfileInfo (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = inputNameFormProfile.value;
  profileActivity.textContent = inputActivityFormProfile.value;
  closePopup(popupEditFormProfile);
}

// 3. Добавление карточки
function makeNewCard (evt) {
  evt.preventDefault();
  const card = new Card({
    name: inputTitleFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
    alt: inputTitleFormAddNewCard.value
  }, '#article_card');
  card.renderCard();
  closePopup(popupAddPhoto);
}

function creatFormPopup(form, data) {
  data.forEach(function (item) {
    form.querySelector(item.selector).value = item.value;
  });
}

function handleOpenEditInfo () {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_name',
      value: profileName.textContent
    },
    {
      selector: '.edit-form__input-text_type_activity',
      value: profileActivity.textContent
    }
  ];
  creatFormPopup(popupEditFormProfile, inputTextFields);
  openPopup(popupEditFormProfile);
  const formValidator = new FormValidator(validator, popupEditFormProfile);
  formValidator.resetError();
}

// 2. Форма добавления карточки
function handleOpenNewPhoto () {
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
  creatFormPopup(popupAddPhoto, inputTextFields);
  openPopup(popupAddPhoto);
  const formValidator = new FormValidator(validator, popupAddPhoto);
  formValidator.resetError();
}

// C. Реализуем добавление обработчиков ------------------------------------

// 1. Шесть карточек «из коробки»
initialCards.forEach((item) => {
  const card = new Card(item, '#article_card');
  card.renderCard();
});

// Сниферы 
buttonEditProfile.addEventListener('click', handleOpenEditInfo);
buttonAddPhoto.addEventListener('click', handleOpenNewPhoto);

popupEditFormProfile.addEventListener('submit', editProfileInfo);
popupAddPhoto.addEventListener('submit', makeNewCard);

// Запускаем валидацию
const formList = Array.from(document.querySelectorAll(validator.formSelector));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validator, formElement);
  formValidator.enableValidation();
});