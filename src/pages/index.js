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
      popupEditUser.close()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupEditUser.renderLoading(false)
    })
}

function editAvatar (evt, formValues) {
  evt.preventDefault()
  api.editUserAvatar(formValues)
  .then((res) => {
    userInfo.setAvatar(res)
    popupEditAvatar.close()
  })
  .catch((err) => {
    console.error(`Что-то пошло не так: ${err}`)
  })
  .finally(() => {
    popupEditAvatar.renderLoading(false)
  })
}

// 3. Сабмит формы добавления карточки
function makeNewCard (evt, formValues) {
  evt.preventDefault()
  api.addNewCard(formValues)
  .then((res) => {
    res.userId = res.owner._id
    const card = instantiateCard(res);
    cardList.addItem(card);
    popupAddPhoto.close()
  })
  .catch((err) => {
    console.error(`Что-то пошло не так: ${err}`)
  })
  .finally(() => {
    popupAddPhoto.renderLoading(false)
  })
}

// 4. Запрос на удаление карточки и открытия попапа удаления
function handleDeleteCardPopup (item) {
  popupDeleteCard.open()
  popupDeleteCard.itemDelete = item
}

function confirmDeletion(evt, itemDelete) {
  evt.preventDefault()
  api.deleteCard(itemDelete._id)
    .then((res) => {
      itemDelete.trash()
      popupDeleteCard.close()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
    .finally(() => {
      popupDeleteCard.renderLoading(false)
    })
}

// 5. Обработка кнопки like
function handleButtonLike(item) {
  if (item.isLiked()) {
    api.deleteLike(item._id)
      .then((res) => {
        item.likeCounter.textContent = res.likes.length
        item.likeElement.classList.toggle(item.selectorLikeActive)
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  } else {
    api.putLike(item._id)
      .then((res) => {
        item.likeCounter.textContent = res.likes.length
        item.likeElement.classList.toggle(item.selectorLikeActive)
      })
      .catch((err) => {
        console.error(`Что-то пошло не так: ${err}`)
      })
  }
}

// 6. Истанцирование класса Card
function instantiateCard (item) {
  const card = new Card(item, '#article_card', handleOpenFullImage,
    handleDeleteCardPopup, handleButtonLike)
  const element = card.createCard()
  return element
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
    const card = instantiateCard(item);
    cardList.addItem(card);
  }
}, '.elements')

const popupDeleteCard = new PopupDelete('#delete-photo', confirmDeletion)
const userInfo = new UserInfo(profileAvatar, profileName, profileActivity)

// 2. Сниферы
const popupEditUser = new PopupWithForm('#edit-profile', editProfileInfo)
buttonEditProfile.addEventListener('click', () => {
  const {activity, name} = userInfo.getUserInfo()
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_name',
      value: name
    },
    {
      selector: '.edit-form__input-text_type_activity',
      value: activity
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