import {View} from './View.js';

export class MensagemView extends View{
    
    constructor(element) {
        super(element);
    }

    template(mensagem) {
        return mensagem.texto ? `<p class='alert alert-info'>${mensagem.texto}</p>` : '';
    }

}