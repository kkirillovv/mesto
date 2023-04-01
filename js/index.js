// A. Объявляем переменные -------------------------------------------------

const cardTemplate = document.querySelector('#article_card').content;
const elements = document.querySelector('.elements');

const content = document.querySelector('.content');
const buttonEditProfile = content.querySelector('.profile-info__edit');
const buttonAddPhoto = content.querySelector('.profile__add-photo');
const profileName = content.querySelector('.profile-info__name');
const profileActivity = content.querySelector('.profile-info__activity');
// Попап формы редактирования
const popupEditForm = document.querySelector('#edit-profile');
const buttonClosePopupEditForm = popupEditForm.querySelector('.popup__close');
// Попап формы добавления фотографии
const popupAddPhoto = document.querySelector('#add-photo');
const buttonClosePopupAddPhoto = popupAddPhoto.querySelector('.popup__close');
// Попап показа фотографий
const popupShowPhoto = document.querySelector('#show');
const buttonClosePopupShowPhoto = popupShowPhoto.querySelector('.popup__close');

// B. Объявляем функции ----------------------------------------------------

function createCard (item) {
  // клонируем содержимое тега template
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const likeElement = element.querySelector('.element__like');
  const trashElement = element.querySelector('.element__trash');
  const photoElement = element.querySelector('.element__photo');
  const titleElement = element.querySelector('.element__title');
  const titleCardDetails = popupShowPhoto.querySelector('.card-details__title');
  const imageCardDetails = popupShowPhoto.querySelector('.card-details__image')

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
  photoElement.addEventListener('click', function () {
    titleCardDetails.textContent = titleElement.textContent;
    imageCardDetails.src = photoElement.src;
    imageCardDetails.alt = photoElement.alt;
    togglePopup(popupShowPhoto);
  });
  return element;
}

function renderCard (item) { 
  // отображаем на странице
  elements.prepend(createCard(item));
}

function togglePopup(item) {
  item.classList.toggle("popup_opened");
}

function editProfileInfo (evt) {
  const textInputName = popupEditForm.querySelector('.edit-form__input-text_type_name');
  const textInputActivity = popupEditForm.querySelector('.edit-form__input-text_type_activity');  

  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = textInputName.value;
  profileActivity.textContent = textInputActivity.value;
  togglePopup(popupEditForm);
}

// 3. Добавление карточки
function makeNewCard (evt) {
  const photoTitle = popupAddPhoto.querySelector('.edit-form__input-text_type_title');
  const photoLink = popupAddPhoto.querySelector('.edit-form__input-text_type_link');

  evt.preventDefault();
  renderCard({
    name: photoTitle.value,
    link: photoLink.value,
    alt: photoTitle.value
  }); 
  togglePopup(popupAddPhoto);
}

function creatFormPopup(form, data) {
  data.forEach(function (item) {
    form.querySelector(item.selector).value = item.value;
  });
  switch (form.id) {
    case "edit-profile":
      form.addEventListener('submit', editProfileInfo);
      break;
    case "add-photo":
      form.addEventListener('submit', makeNewCard);
      break;
  }
}

function editInfo () {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_name',
      value: profileName.textContent,
    },
    {
      selector: '.edit-form__input-text_type_activity',
      value: profileActivity.textContent,
    }
  ];
  creatFormPopup(popupEditForm, inputTextFields);
  togglePopup(popupEditForm);
}

// 2. Форма добавления карточки
function addPhoto () {
  const inputTextFields = [
    {
      selector: '.edit-form__input-text_type_title',
      value: '',
    },
    {
      selector: '.edit-form__input-text_type_link',
      value: '',
    }
  ];
  creatFormPopup(popupAddPhoto, inputTextFields);
  togglePopup(popupAddPhoto);
}

// C. Реализуем добавление обработчиков ------------------------------------

// 1. Шесть карточек «из коробки»
initialCards.forEach(function (item) {
  renderCard(item)
});

// Сниферы 
buttonEditProfile.addEventListener('click', editInfo);
buttonAddPhoto.addEventListener('click', addPhoto);
buttonClosePopupEditForm.addEventListener('click', function () {
  togglePopup(popupEditForm);
});
buttonClosePopupAddPhoto.addEventListener('click', function () {
  togglePopup(popupAddPhoto);
});
buttonClosePopupShowPhoto.addEventListener('click', function () {
  togglePopup(popupShowPhoto);
});