const MAIN_URL_API = 'https://api.diplom.haku.nomoredomainsmonster.ru';

class MainApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers

    }
    _getHeaders() {
        return { authorization: `Bearer ${localStorage.getItem('jwt')}`, "Content-Type": "application/json" };
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ name, email, password })
        })
            .then(this._getResponseData)
            .then((data) => {
                return data;
            })

    };

    login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ email, password })
        })
            .then(this._getResponseData)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }
            })

    };

    updateProfile = (name, email) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({ name, email }),
        })
            .then(this._getResponseData)
    };
    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._getResponseData)
    }

    checkToken(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            }

        })
            .then(this._getResponseData)

    };
    getMovies(jwt) {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            .then(this._getResponseData)
    };


    saveMovies(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.url}`,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
            })
        })
            .then(this._getResponseData)
    };
    deleteMovies(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

        })
            .then(this._getResponseData)
    };
}

const api = new MainApi({
    baseUrl: MAIN_URL_API,
    headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
    },
});

export default api;
