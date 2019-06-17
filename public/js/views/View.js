export class View {
    constructor(element) {
        this._element = element;
    }

    template() {
        throw new Error(`'template' method is not implemented!`);
    }

    clean() {
        this._element.innerHTML = "";
    }

    update(model) {
        this._element.innerHTML = this.template(model);
    }
}