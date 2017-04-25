import {Negociacao} from '../model/Negociacao.js';

export class NegociacaoDAO {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                console.error(e.target.error);
                reject('Erro ao adicionar negociação.');
            }            
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            let negociacoes = [];

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();

            cursor.onsuccess = e => {
                let current = e.target.result;

                if (current) {
                    let data = current.value;
                    negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));
                    current.continue();

                } else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                console.error(e.target.error);
                reject('Erro ao listar negociações');
            }
        });
    }

    clearAll() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => {
                resolve('Negociações removidas com sucesso');
            }

            request.onerror = e => {
                console.error(e.target.error);
                reject('Erro ao limpar negociações');
            }
            
        })
    }
}