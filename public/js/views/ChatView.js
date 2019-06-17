import { View } from "./View.js";

export class ChatView extends View {
    constructor(element) {
        super(element);
    }

    template() {
        return `
        <div class="card shadow-sm">
            <div class="card-body">
                <div class="row scrollDivY" id="listMessages">
                    
                </div>
                <div class="row">
                    <input class="col-11" type="text" name="message" id="message" placeholder="Digite aqui...">
                    <button class="col-1 btn btn-primary" name="send" id="send"><i class="far fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
        `;
    }
}