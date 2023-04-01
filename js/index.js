const initialCards = [
  {
    name: 'Вулкан Тятя',
    link: './images/photo-tyatya.jpg',
    alt: 'Стратовулкан Тятя (1819 метров) типа сомма-везувий («вулкан в вулкане») на острове Кунашир. «Отец-гора»'
  },
  {
    name: 'Вулкан Эбе́ко',
    link: './images/photo-ebeko.jpg',
    alt: 'Действующий вулкан Эбе́ко высотой 1156 метров в 6 км от Северо-Курильска на острове Парамушир'
  },
  {
    name: 'Вулкан Крени́цына',
    link: './images/photo-krinicina.jpg',
    alt: 'Действующий классический сомма вулкан Крени́цына в южной части острова Онекотан высотой 1324 метра'
  },
  {
    name: 'Вулкан Баранского',
    link: './images/photo-baranskogo.jpg',
    alt: 'Действующий вулкан Баранского на острове Итуруп, Курильский архипелаг'
  },
  {
    name: 'Вулкан Ала́ид',
    link: './images/photo-alaid.jpg',
    alt: 'Самый северный и самый высокий вулкан Курильских островов Ала́ид, действующий на острове Атласова (2285 метров)'
  },
  {
    name: 'Вулкан Чикура́чки',
    link: './images/photo-chikurachki.jpg',
    alt: 'Действующий стратовулкан с вершинным кратером Чикура́чки высотой 1816 метров на острове Парамушир Большой Курильской гряды'
  }
];

function makeCard (item) {
  // клонируем содержимое тега template
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  // заполняем карточку
  element.querySelector('.element__title').textContent = item.name;
  element.querySelector('.element__photo').src = item.link;
  element.querySelector('.element__photo').alt = item.alt;
  // отображаем на странице
  elements.prepend(element);
}

const cardTemplate = document.querySelector('#article_card').content;
const elements = document.querySelector('.elements');

// 1. Шесть карточек «из коробки»
initialCards.forEach(function (item) {
  makeCard(item)
});

function handleClickElement(e) { 

// 4. Лайк карточки надо сделать через toggle
  if (e.target.classList.contains("element__like")) {
    e.target.classList.toggle("element__like_active");
  }

// 5. Удаление карточки
  if (e.target.classList.contains("element__trash")) {
    e.target.parentElement.remove();
  }

// 6. Открытие попапа с картинкой
  if (e.target.classList.contains("element__photo")) {
    let title = e.target.nextElementSibling.nextElementSibling.firstElementChild;
    popupShow.querySelector('.card-details__title').textContent = title.textContent;
    popupShow.querySelector('.card-details__image').src = e.target.src;
    popupShow.querySelector('.card-details__image').alt = e.target.alt;
    popupShow.classList.toggle("popup_opened");
  }
}

elements.addEventListener('click', handleClickElement);

let content = document.querySelector('.content');
let editButton = content.querySelector('.profile-info__edit');
let addButton = content.querySelector('.profile__add-photo');
let profileName = content.querySelector('.profile-info__name');
let profileActivity = content.querySelector('.profile-info__activity');
let popupEdit = document.querySelector('#form');
let popupContainer = popupEdit.querySelector('.popup__container');
let closeButtonPopupEdit = popupEdit.querySelector('.popup__close');
let popupShow = document.querySelector('#show');
let closeButtonPopupShow = popupShow.querySelector('.popup__close');

function togglePopupEdit() {
  popupEdit.classList.toggle("popup_opened");
}

function togglePopupShow() {
  popupShow.classList.toggle("popup_opened");
}

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popupEdit.querySelector('.edit-form__input-text_type_name').value;
  profileActivity.textContent = popupEdit.querySelector('.edit-form__input-text_type_activity').value;
  togglePopupEdit();
}

// 3. Добавление карточки
function makeNewCard (evt) {
  evt.preventDefault();
  makeCard({
    name: popupEdit.querySelector('.edit-form__input-text_type_title').value,
    link: popupEdit.querySelector('.edit-form__input-text_type_link').value,
    alt: popupEdit.querySelector('.edit-form__input-text_type_title').value
  }); 
  togglePopupEdit();
}

function creatFormPopup(id, data) {
  const cardTemplate = document.querySelector(id).content;
  const form = cardTemplate.querySelector('.edit-form').cloneNode(true);
  const formElement = popupEdit.querySelector('.edit-form');

  data.forEach(function (item) {
    form.querySelector(item.selector).value = item.value;
  });

  formElement.remove();
  popupContainer.append(form);
  switch (id) {
    case "#edit-profile":
      form.addEventListener('submit', handleFormSubmit);
      break;
    case "#add-photo":
      form.addEventListener('submit', makeNewCard);
      break;
  }
}

function editInfo () {
  let inputTextFields = [
    {
      selector: '.edit-form__input-text_type_name',
      value: profileName.textContent,
    },
    {
      selector: '.edit-form__input-text_type_activity',
      value: profileActivity.textContent,
    }
  ];
  creatFormPopup('#edit-profile', inputTextFields);
  togglePopupEdit();
}

// 2. Форма добавления карточки
function addPhoto () {
  let inputTextFields = [
    {
      selector: '.edit-form__input-text_type_title',
      value: '',
    },
    {
      selector: '.edit-form__input-text_type_link',
      value: '',
    }
  ];
  creatFormPopup('#add-photo', inputTextFields);
  togglePopupEdit();
}

editButton.addEventListener('click', editInfo);
addButton.addEventListener('click', addPhoto);
closeButtonPopupEdit.addEventListener('click', togglePopupEdit);
closeButtonPopupShow.addEventListener('click', togglePopupShow);