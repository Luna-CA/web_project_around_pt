class Api {
  constructor(URL, token) {
    this.URL = URL;
    this.token = token;
  }
  getUserInfo() {
    return fetch(this.URL + "/users/me", {
      method: "GET",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }
  getCards() {
    return fetch(this.URL + "/cards", {
      method: "GET",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  addCard(name, link) {
    return fetch(this.URL + "/cards", {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  updateUserInfo(name, about) {
    return fetch(this.URL + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  changeLikeStatus(cardID, isLiked) {
    return fetch(`${this.URL}/cards/${cardID}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }
  deleteCard(cardID) {
    return fetch(`${this.URL}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }
}

export default Api;
