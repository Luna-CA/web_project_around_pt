class Api {
  constructor(URL, token) {
    this.URL = URL;
    this.token = token;
  }
  getUserInfo() {
    return fetch(this.URL + "/users/me", {
      headers: {
        authorization: this.token,
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
      headers: {
        authorization: this.token,
      },
    }).then((res) => res.json());
  }

  addCard(name, link) {
    return fetch(this.URL + "/cards", {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    }).then((res) => res.json());
  }

  updateUserInfo(name, job) {
     return fetch(this.URL + "/users/me", {
        method: "PATCH",
        headers: {
            authorization: this.token,
            "Content-type": "application/json",
        },
        body: JSON.stringify({name, about}),
     }).then((res) => res.json()); 
    }

  changeLikeStatus() {
    "isLiked": false
  };

}

export default Api;
