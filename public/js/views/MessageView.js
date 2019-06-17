import { View } from "./View.js";

export class ChatView extends View {
    constructor(element) {
        super(element);
    }

    template(model) {
        return `
        <div class="d-flex flex-row mb-2 col-12">
            <img class="profileImage" src="./img/default.png" alt="Default Image">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h4 class="card-title">Nome do Larápio</h4>
                    <p class="card-text">Mensagem</p>
                </div>
            </div>
        </div>
        `;
    }
}