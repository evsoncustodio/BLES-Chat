import { View } from "./View.js";

export class ListAndChatView extends View {
    constructor(element, list, chat) {
        super(element);
        this.list = list;
        this.chat = chat;
    }

    template() {
        return `
        <div class="col-${this.list}" id="listCol">
            
        </div>
        <div class="col-${this.chat}" id="chatCol">
            
        </div>
        `;
    }
}