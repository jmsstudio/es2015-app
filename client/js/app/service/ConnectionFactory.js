const dbName = 'exampledb';
const dbVersion = 3;
const stores = ['negociacoes'];
let _connection = null;
let _close = null;

export class ConnectionFactory {
    constructor() {
        throw new Error('Não é possível instanciar ConnectionFactory');
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            if (_connection) {                    
                resolve(_connection);
            } else {

                let openrequest = window.indexedDB.open(dbName, dbVersion);

                openrequest.onupgradeneeded = e => {
                    console.log('Cria ou altera o banco');
                    ConnectionFactory._createStores(e.target.result);
                };

                openrequest.onsuccess = e => {
                    console.log('Conexao obtida com sucesso');
                    _connection = e.target.result;
                    _close = _connection.close.bind(_connection);
                    _connection.close = function () {
                        throw new Error('Para fechar a conexão utilize o método closeConnection');
                    };

                    resolve(_connection);
                };

                openrequest.onerror = e => {
                    console.error(e.target.error);
                    reject(e.target.error.name);
                };
            }

        });
    }

    static closeConnection() {
        if (_connection) {
            _close();
            _connection = null;
        }
    }

    static _createStores(connection) {
        stores.forEach(store => {
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, {autoIncrement: true});

            console.log('Criou object store! ' + store);
        });
    }
}