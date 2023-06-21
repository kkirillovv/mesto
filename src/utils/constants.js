export const initialCards = [
  {
    title: 'Вулкан Тятя',
    link: './images/photo-tyatya.jpg',
    alt: 'Стратовулкан Тятя (1819 метров) типа сомма-везувий («вулкан в вулкане») на острове Кунашир. «Отец-гора»'
  },
  {
    title: 'Вулкан Эбе́ко',
    link: './images/photo-ebeko.jpg',
    alt: 'Действующий вулкан Эбе́ко высотой 1156 метров в 6 км от Северо-Курильска на острове Парамушир'
  },
  {
   title: 'Вулкан Крени́цына',
    link: './images/photo-krinicina.jpg',
    alt: 'Действующий классический сомма вулкан Крени́цына в южной части острова Онекотан высотой 1324 метра'
  },
  {
    title: 'Вулкан Баранского',
    link: './images/photo-baranskogo.jpg',
    alt: 'Действующий вулкан Баранского на острове Итуруп, Курильский архипелаг'
  },
  {
    title: 'Вулкан Ала́ид',
    link: './images/photo-alaid.jpg',
    alt: 'Самый северный и самый высокий вулкан Курильских островов Ала́ид, действующий на острове Атласова (2285 метров)'
  },
  {
    title: 'Вулкан Чикура́чки',
    link: './images/photo-chikurachki.jpg',
    alt: 'Действующий стратовулкан с вершинным кратером Чикура́чки высотой 1816 метров на острове Парамушир Большой Курильской гряды'
  }
];

export const validator = {
  formSelector: '.edit-form',
  setSelector: '.edit-form__set',
  inputSelector: '.edit-form__input-text',
  submitButtonSelector: '.edit-form__button',
  inactiveButtonClass: 'edit-form__button_inactive',
  inputErrorClass: 'edit-form__input-text_type_error',
  errorClass: 'edit-form__input-error_active'
}

// A. Объявляем переменные -------------------------------------------------

export const content = document.querySelector('.content');
export const buttonEditProfile = content.querySelector('.profile-info__edit');
export const buttonAddPhoto = content.querySelector('.profile__add-photo');
export const profileName = content.querySelector('.profile-info__name');
export const profileActivity = content.querySelector('.profile-info__activity');
// Попап формы редактирования
export const popupEditFormProfile = document.querySelector('#edit-profile');
export const inputNameFormProfile = popupEditFormProfile.querySelector('.edit-form__input-text_type_name');
export const inputActivityFormProfile = popupEditFormProfile.querySelector('.edit-form__input-text_type_activity');  
// Попап формы добавления фотографии
export const popupAddPhoto = document.querySelector('#add-photo');
export const inputTitleFormAddNewCard = popupAddPhoto.querySelector('.edit-form__input-text_type_title');
export const inputLinkFormAddNewCard = popupAddPhoto.querySelector('.edit-form__input-text_type_link');