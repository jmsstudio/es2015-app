export class View {
    constructor(element) {
        this._element = element;
    }

    template() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}