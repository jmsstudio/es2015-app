import {View} from './View.js';
import {DateHelper} from '../helper/DateHelper.js';
import {getNegociacaoControllerInstance} from '../controller/NegociacaoController.js';

export class NegociacaoView extends View{
    
    constructor(element) {
        super(element);

        element.addEventListener('click', function(event) {
            if (event.target.nodeName === 'TH') {
                let columnName = event.target.dataset.column;
                getNegociacaoControllerInstance().sort(columnName);
            }
        });
    }

    template(listaNegociacoes) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th data-column='data'>DATA</th>
                        <th data-column='quantidade'>QUANTIDADE</th>
                        <th data-column='valor'>VALOR</th>
                        <th data-column='volume'>VOLUME</th>
                    </tr>
                </thead>
                
                <tbody>
                    ${listaNegociacoes.negociacoes.map(negociacao => 
                        `
                            <tr>
                                <td>${DateHelper.dateToText(negociacao.data)}</td>
                                <td>${negociacao.quantidade}</td>
                                <td>${negociacao.valor}</td>
                                <td>${negociacao.volume}</td>
                            </tr>
                        `
                    ).join('')}
                </tbody>
                
                <tfoot>
                    <td colspan="3"></td>
                    <td>
                        ${listaNegociacoes.volumeTotal}
                    </td>
                </tfoot>
            </table>
        `;
    }
}