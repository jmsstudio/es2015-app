export class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    get volumeTotal() {
        return this._negociacoes.reduce((total, neg) => total + neg.volume, 0);
    }

    adiciona(negociacao) {
        this._negociacoes = [].concat(this._negociacoes, negociacao);
    }

    sort(criteria) {
        this._negociacoes.sort(criteria);
    }

    reverse() {
        this._negociacoes.reverse();
    }

    clear() {
        this._negociacoes = [];
    }
}