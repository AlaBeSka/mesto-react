export class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }

  getInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  createCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  editProfile({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  changeAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  setLike(id) {
    return fetch(
      `${this._url}/cards/likes/${id}`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(
      `${this._url}/cards/likes/${id}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(this._handleResponse);
  }
}

