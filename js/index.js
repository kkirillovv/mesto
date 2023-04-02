// A. Объявляем переменные -------------------------------------------------

const cardTemplate = document.querySelector('#article_card').content;
const elements = document.querySelector('.elements');

const content = document.querySelector('.content');
const buttonEditProfile = content.querySelector('.profile-info__edit');
const buttonAddPhoto = content.querySelector('.profile__add-photo');
const profileName = content.querySelector('.profile-info__name');
const profileActivity = content.querySelector('.profile-info__activity');
// Попап формы редактирования
const popupEditFormProfile = document.querySelector('#edit-profile');
const buttonClosePopupEditForm = popupEditFormProfile.querySelector('.popup__close');
const inputNameFormProfile = popupEditFormProfile.querySelector('.edit-form__input-text_type_name');
const inputActivityFormProfile = popupEditFormProfile.querySelector('.edit-form__input-text_type_activity');  
// Попап формы добавления фотографии
const popupAddPhoto = document.querySelector('#add-photo');
const buttonClosePopupAddPhoto = popupAddPhoto.querySelector('.popup__close');
const inputTitleFormAddNewCard = popupAddPhoto.querySelector('.edit-form__input-text_type_title');
const inputLinkFormAddNewCard = popupAddPhoto.querySelector('.edit-form__input-text_type_link');
// Попап показа фотографий
const popupShowPhoto = document.querySelector('#show');
const buttonClosePopupShowPhoto = popupShowPhoto.querySelector('.popup__close');
const titleCardDetails = popupShowPhoto.querySelector('.card-details__title');
const imageCardDetails = popupShowPhoto.querySelector('.card-details__image')

// B. Объявляем функции ----------------------------------------------------

function handleOpenFullImage (item) {
  titleCardDetails.textContent = item.name;
  imageCardDetails.src = item.link;
  imageCardDetails.alt = item.alt;
  openPopup(popupShowPhoto);
} 

function createCard (item) {
  // клонируем содержимое тега template
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const likeElement = element.querySelector('.element__like');
  const trashElement = element.querySelector('.element__trash');
  const photoElement = element.querySelector('.element__photo');
  const titleElement = element.querySelector('.element__title');

  // заполняем карточку
  titleElement.textContent = item.name;
  photoElement.src = item.link;
  photoElement.alt = item.alt;

  // 4. Лайк карточки надо сделать через toggle / Слушатель события
  likeElement.addEventListener('click', function () {
    likeElement.classList.toggle("element__like_active");
  });
  // 5. Удаление карточки / Слушатель события
  trashElement.addEventListener('click', function () {
    trashElement.parentElement.remove();
  });
  // 6. Открытие попапа с картинкой / Слушатель события
  photoElement.addEventListener('click', () => handleOpenFullImage(item));

  return element;
}

function renderCard (container, item) { 
  // отображаем на странице
  container.prepend(createCard(item));
}

function openPopup(item) {
  item.classList.add("popup_opened");
}

function closePopup(item) {
  item.classList.remove("popup_opened");
}

function editProfileInfo (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = inputNameFormProfile.value;
  profileActivity.textContent = inputActivityFormProfile.value;
  closePopup(popupEditFormProfile);
}

// 3. Добавление карточки
function makeNewCard (evt) {
  evt.preventDefault();
  renderCard(elements, {
    name: inputTitleFormAddNewCard.value,
    link: inputLinkFormAddNewCard.value,
    alt: inputTitleFormAddNewCard.value
  }); 
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
}

// C. Реализуем добавление обработчиков ------------------------------------

// 1. Шесть карточек «из коробки»
initialCards.forEach(function (item) {
  renderCard(elements, item)
});

// Сниферы 
buttonEditProfile.addEventListener('click', handleOpenEditInfo);
buttonAddPhoto.addEventListener('click', handleOpenNewPhoto);
buttonClosePopupEditForm.addEventListener('click', function () {
  closePopup(popupEditFormProfile);
});
buttonClosePopupAddPhoto.addEventListener('click', function () {
  closePopup(popupAddPhoto);
});
buttonClosePopupShowPhoto.addEventListener('click', function () {
  closePopup(popupShowPhoto);
});
popupEditFormProfile.addEventListener('submit', editProfileInfo);
popupAddPhoto.addEventListener('submit', makeNewCard);