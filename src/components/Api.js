export class Api {
  constructor(options) { // инициировали this, сконструировали и вернули его
    this._url = options.baseUrl
    this._headers = options.headers
    this._authorization = options.headers.authorization
  }

  _getStatusData(res) {
    if (res.ok) {
      return res.json() // если все окей, забираем данные в формате json
    } else {
      return Promise.reject(`Ошибка: ${res.status}`) // если ошибка, отклоняем промис
    }
  }

  async getInitialCards() { // получаем карточки с БД сервера
    const res = await fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
    return this._getStatusData(res)
  }

  async addNewCard(card) { // добавляем карточку в БД сервера
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      })
    })
    return this._getStatusData(res)
  }

  async deleteCard (cardId) { // удаляем карточку из БД сервера
    const res = await fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    return this._getStatusData(res)
  }

  async putLike (cardId) { // постановка лайка на карточку в БД сервера
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
    return this._getStatusData(res)
  }

  async deleteLike (cardId) { // удаление лайка из карточки в БД сервера
    const res = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
    return this._getStatusData(res)
  }

  async getUserInfo () { // загрузка информации о пользователе из БД сервера
    const res = await fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
    return this._getStatusData(res)
  }

  async editUserInfo (user) { // редактирование профиля пользователя в БД сервера
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      })
    })
    return this._getStatusData(res)
  }

  async editUserAvatar (user) { // редактирование аватарки пользователя в БД сервера
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: user.avatar,
      })
    })
    return this._getStatusData(res)
  }

  getPageData () {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }
}