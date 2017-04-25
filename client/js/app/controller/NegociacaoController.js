import {Binder} from '../helper/Binder.js';
import {ListaNegociacoes} from '../model/ListaNegociacoes.js';
import {Mensagem} from '../model/Mensagem.js';
import {Negociacao} from '../model/Negociacao.js';
import {NegociacaoView} from '../view/NegociacaoView.js';
import {MensagemView} from '../view/MensagemView.js';
import {NegociacaoService} from '../service/NegociacaoService.js';
import {DateHelper} from '../helper/DateHelper.js';

class NegociacaoController {
    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._btnApagar = $('#apagar');

        this._listaNegociacoes = Binder.bind(
            new ListaNegociacoes(), 
            new NegociacaoView($('#lista-negociacoes')), 
            'adiciona', 'clear', 'sort', 'reverse'
        );

        this._mensagem = Binder.bind(
            new Mensagem(),
            new MensagemView($('#msgView')),
            'texto'
        );

        this._currentSort = '';

        this._negociacaoService = new NegociacaoService();
        this._init();
    }

    _init() {
        this._negociacaoService.list()
            .then(negociacoes => negociacoes.forEach(neg => this._listaNegociacoes.adiciona(neg)))
            .catch(error => this._mensagem.texto = error);

        setInterval(() => this.importarNegociacoes(), 3000);
    }

    _criaNegociacao(data, qtde, valor) {
        return new Negociacao(DateHelper.textToDate(data), qtde, valor);
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = '';
        this._inputValor.value = '';
        this._inputData.focus();
    }

    adiciona(event) {
        event.preventDefault();

        let negociacao = this._criaNegociacao(this._inputData.value, this._inputQuantidade.value, this._inputValor.value);       
        
        this._negociacaoService.adiciona(negociacao)
            .then((msg) => {
                this._listaNegociacoes.adiciona(negociacao);
                this._mensagem.texto = msg;
                this._clearForm();
            })
            .catch(error => {
                this._mensagem.texto = error;
            });
    }

    clear() {
        this._negociacaoService.clearAll()
            .then(msg => {
                this._mensagem.texto = msg;
                this._listaNegociacoes.clear();
            })
            .catch(error => {
                this._mensagem.texto = error;
            });

    }

    sort(column) {
        if (this._currentSort === column) {
            this._listaNegociacoes.reverse();
        } else {
            this._listaNegociacoes.sort((v1, v2) => v1[column] - v2[column]);
        }
        this._currentSort = column;
    }

    importarNegociacoes() {
        this._negociacaoService.import(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = 'Negociações importadas com sucesso.';
            })
            .catch(err => {
                this._mensagem.texto = err;
            });
    }
}

const negociacaoController = new NegociacaoController();

export function getNegociacaoControllerInstance() {
    return negociacaoController;
}