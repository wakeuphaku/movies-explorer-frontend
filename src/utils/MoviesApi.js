const MOVIES_URL_API = ' https://api.nomoreparties.co/beatfilm-movies';

class MoviesApi {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    getMovies() {
        return fetch(this._baseUrl, {
            headers: this._headers,
        })
            .then(this._getResponseData)
    }
}

const moviesApi = new MoviesApi({
    baseUrl: MOVIES_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;