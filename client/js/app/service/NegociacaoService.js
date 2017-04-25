import {HttpService} from '../service/HttpService.js';
import {ConnectionFactory} from '../service/ConnectionFactory.js';
import {NegociacaoDAO} from '../dao/NegociacaoDAO.js';
import {Negociacao} from '../model/Negociacao.js';


export class NegociacaoService {

    constructor() {
        this._httpService = new HttpService();
    }

    importarNegociacoesDaSemana() {
        return this._httpService.get('negociacoes/semana')
            .then(dados => dados.map(data => new Negociacao(new Date(data.data), data.quantidade, data.valor)))
            .catch(err => {
                console.error(err);
                throw new Error('Ocorreu um erro ao importar negociações.');
            });
    }

    importarNegociacoesDaSemanaAnterior() {
        return this._httpService.get('negociacoes/anterior')
            .then(dados => dados.map(data => new Negociacao(new Date(data.data), data.quantidade, data.valor)))
            .catch(err => {
                console.error(err);
                throw new Error('Ocorreu um erro ao importar negociações.');
            });
    }

    importarNegociacoesDaSemanaRetrasada() {
        return this._httpService.get('negociacoes/retrasada')
            .then(dados => dados.map(data => new Negociacao(new Date(data.data), data.quantidade, data.valor)))
            .catch(err => {
                console.error(err);
                throw new Error('Ocorreu um erro ao importar negociações.');
            });
    }

    obterNegociacoes() {
        return Promise.all([
            this.importarNegociacoesDaSemana(),
            this.importarNegociacoesDaSemanaAnterior(),
            this.importarNegociacoesDaSemanaRetrasada()
        ]).then(negociacoes =>
            negociacoes.reduce((flattenArray, array) => flattenArray.concat(array), [])
        ).catch(err => {
            throw new Error(err)
        });
    }

    adiciona(negociacao) {
        return ConnectionFactory.getConnection()
            .then(conn => new NegociacaoDAO(conn))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(error => {
                console.error(error);
                throw new Error('Não foi possível adicionar a negociação');
            });
    }

    clearAll() {
        return ConnectionFactory.getConnection()
            .then(conn => new NegociacaoDAO(conn))
            .then(dao => dao.clearAll())
            .then(() => 'Negociações removidas com sucesso')
            .catch(error => {
                console.error(error);
                throw new Error('Não foi possível remover as negociações');
            });
    }

    list() {
        return ConnectionFactory.getConnection()
            .then(conn => new NegociacaoDAO(conn))
            .then(dao => dao.list())
            .catch(error => {
                console.error(error);
                throw new Error('Não foi possível listar as negociações');
            });
        
    }

    import(negociacoesExistentes) {
        return this.obterNegociacoes()
            .then(negociacoes => 
                negociacoes.filter(negociacao => 
                    !negociacoesExistentes.some(negociacaoExistente =>
                        negociacao.isEquals(negociacaoExistente)
                    )
                )
            )        
            .catch(error => {
                console.error(error);
                throw new Error('Não foi possível importar as negociações');
            });
    }
}