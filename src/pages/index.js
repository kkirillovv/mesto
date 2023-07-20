import '../pages/index.css'
// A. Импортируем переменные и классы --------------------------------------

import {
  validator,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddPhoto,
  profileAvatar,
  profileName,
  profileActivity,
  formEditProfilePopup,
  formEditAvatarPopup,
  formAddPhotoPopup
} from '../utils/constants.js'

import {Card} from '../components/Card.js'
import {FormValidator} from '../components/FormValidator.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {PopupDelete} from '../components/PopupDelete.js'
import {UserInfo} from '../components/UserInfo.js'
import {Api} from '../components/Api.js'

// B. Объявляем функции ----------------------------------------------------

// 1. Попап показа фотографий
const popupShowImage = new PopupWithImage('#show')
function handleOpenFullImage (item) {
  popupShowImage.open(item)
}

// 2. Сабмиты форм редактирования пользователя и аватара
function editProfileInfo (evt, formValues) {
  evt.preventDefault()
  api.editUserInfo(formValues)
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupEditUser.submitButton.textContent = 'Сохранить'
    })
}

function editAvatar (evt, formValues) {
  evt.preventDefault()
  api.editUserAvatar(formValues)
  .then((res) => {
    userInfo.setAvatar(res)
  })
  .catch((err) => {
    console.error(`Что-то пошло не так: ${err}`)
  })
  .finally(() => {
    popupEditAvatar.submitButton.textContent = 'Сохранить'
  })
}

// 3. Сабмит формы добавления карточки
function makeNewCard (evt, formValues) {
  evt.preventDefault()
  api.addNewCard(formValues)
  .then((res) => {
    res.userId = res.owner._id
    const card = new Card(res, '#article_card', handleOpenFullImage, 
    handleDeleteCardPopup, handleButtonLike)
    cardList.addItem(card.createCard())
  })
  .catch((err) => {
    console.error(`Что-то пошло не так: ${err}`)
  })
  .finally(() => {
    popupAddPhoto.submitButton.textContent = 'Сохранить'
  })
}

// 4. Запрос на удаление карточки и открытия попапа удаления
function handleDeleteCardPopup (item) {
  popupDeleteCard.open()
  popupDeleteCard.item_delete = item
}

function confirmDeletion(evt, item_delete) {
  evt.preventDefault()
  api.deleteCard(item_delete._id)
    .then((res) => {
      item_delete.trash()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupDeleteCard.submitButton.textContent = 'Да'
    })
}

// 5. Обработка кнопки like
function handleButtonLike(item) {
  if (!item.likeElement.classList.contains('element__like_active')) {
    api.deleteLike(item._id)
      .then((res) => {
        item.likeCounter.textContent = res.likes.length
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  } else {
    api.putLike(item._id)
      .then((res) => {
        item.likeCounter.textContent = res.likes.length
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }
}

// C. Объявляем Api --------------------------------------------------------

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: 'a149f600-eebc-47f5-a0ad-e57bcbf61195', 
    'Content-Type': 'application/json'
  }
})

api.getPageData()
  .then(([user, initialCards]) => {
    userInfo.setUserInfo(user)
    userInfo.setAvatar(user)
     initialCards.forEach((item) => {
      item.userId = user._id
    })
    cardList.renderItems(initialCards)
  })
  .catch((err) => {
    console.error(`Что-то пошло не так: ${err}`)
  })

/* Реализация страницы --------------------------------------------------- */

// 1. Задаем контейнер начальных данных
const cardList = new Section({ renderer: (item) => {
  const card = new Card(item, '#article_card', handleOpenFullImage,
    handleDeleteCardPopup, handleButtonLike)
    cardList.addItem(card.createCard())
  }
}, '.elements')
const popupDeleteCard = new PopupDelete('#delete-photo', confirmDeletion)
const userInfo = new UserInfo(profileAvatar, profileName, profileActivity)

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

const popupEditAvatar = new PopupWithForm('#edit-avatar', editAvatar)
buttonEditAvatar.addEventListener('click', () => {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_link',
      value: userInfo.getUserInfo().avatar
    },
  ]
  popupEditAvatar.open(inputTextFields)
  formEditAvatar.resetError()
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

// 3. Валидация форм
const formEditProfile = new FormValidator(validator, formEditProfilePopup)
formEditProfile.enableValidation()
const formEditAvatar = new FormValidator(validator, formEditAvatarPopup)
formEditAvatar.enableValidation()
const formAddPhoto = new FormValidator(validator, formAddPhotoPopup)
formAddPhoto.enableValidation()