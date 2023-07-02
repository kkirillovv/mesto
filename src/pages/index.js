import '../pages/index.css'
import {
  initialCards, 
  validator, 
  buttonEditProfile, 
  buttonAddPhoto, 
  profileName,
  profileActivity,
  formEditProfilePopup,
  formAddPhotoPopup
} from '../utils/constants.js'

import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'

// B. Объявляем функции ----------------------------------------------------

// 1. Попап показа фотографий
const popup = new PopupWithImage('#show')
function handleOpenFullImage (item) {
  popup.open(item)
}

// 2. Сабмит формы редактирования пользователя
function editProfileInfo (evt, formValues) {
  evt.preventDefault()
  userInfo.setUserInfo(formValues)
}

// 3. Сабмит формы добавления карточки
function makeNewCard (evt, formValues) {
  evt.preventDefault()
  const card = new Card(formValues, handleOpenFullImage, '#article_card')
  cardList.addItem(card.createCard())
}


/* Реализация страницы --------------------------------------------------- */

// 1. Шесть карточек «из коробки»
const cardList = new Section({items: initialCards, renderer: (item) => {
    const card = new Card(item, handleOpenFullImage, '#article_card')
    cardList.addItem(card.createCard())
  }
}, '.elements')
cardList.renderItems()

const userInfo = new UserInfo(profileName, profileActivity)

// 2. Сниферы
const popupEditUser = new PopupWithForm('#edit-profile', editProfileInfo)
buttonEditProfile.addEventListener('click', () => {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_name',
      value: userInfo.getUserInfo().name
    },
    {
      selector: '.edit-form__input-text_type_activity',
      value: userInfo.getUserInfo().activity
    }
  ]
  popupEditUser.open(inputTextFields)
  formEditProfile.resetError()
})

const popupAddPhoto = new PopupWithForm('#add-photo', makeNewCard)
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
  ]
  popupAddPhoto.open(inputTextFields)
  formAddPhoto.resetError()
})

const formEditProfile = new FormValidator(validator, formEditProfilePopup)
formEditProfile.enableValidation()
const formAddPhoto = new FormValidator(validator, formAddPhotoPopup)
formAddPhoto.enableValidation()