// const elements = document.querySelector('.elements');

let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit');
let profileName = content.querySelector('.profile-info__name');
let profileActivity = content.querySelector('.profile-info__activity');

let popupWindow = document.querySelector('.popup');
let formElement = popupWindow.querySelector('.edit-form');
let nameInput = popupWindow.querySelector('.edit-form__input-text_type_name');
let activityInput = popupWindow.querySelector('.edit-form__input-text_type_activity');
let closeButton = popupWindow.querySelector('.popup__close');

function editProfileInfo() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;

  if (!popupWindow.classList.contains("popup_opened")) {
    popupWindow.classList.add("popup_opened");
  } else {
    popupWindow.classList.remove("popup_opened");
  }
}

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  editProfileInfo();
}

// function handleClickElement(e) {
//   if (e.target.classList.contains("element__like")) {
//     if (!e.target.classList.contains("element__like_active")) {
//       e.target.classList.add("element__like_active");
//     } else {
//       e.target.classList.remove("element__like_active");
//     }
//   }
// }

editButton.addEventListener('click', editProfileInfo);
closeButton.addEventListener('click', editProfileInfo);
formElement.addEventListener('submit', handleFormSubmit);

// elements.addEventListener('click', handleClickElement);