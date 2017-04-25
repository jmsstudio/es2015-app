export class HttpService {

    _handleErrors(response) {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response;
    }

    get(url) {
        return fetch(url)
            .then(res => this._handleErrors(res))
            .then(res => res.json());
    }

    post(url, data) {
        return fetch(url, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(res => this._handleErrors(res))
    }
}