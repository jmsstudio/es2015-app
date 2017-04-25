import {getNegociacaoControllerInstance} from './controller/NegociacaoController.js';

let negociacaoController = getNegociacaoControllerInstance();
document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.getElementById('btn-delete').onclick = negociacaoController.clear.bind(negociacaoController);