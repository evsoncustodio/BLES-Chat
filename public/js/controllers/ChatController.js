import { ListAndChatView } from "../views/ListAndChatView.js";
import { ChatView } from "../views/ChatView.js";
import { HttpService } from "../services/HttpService.js";

export class ChatController {
    constructor(rootElementId, user) {
        this.user = user;
        this.messageService = new HttpService('/message');
        this.fileService = new HttpService('/file');

        this.messages = this.messageService.get()
        .then(res => res.json())
        .then(res => {
            this.messages = res;
            console.log(this.messages);
            // Add all messages
        })
        .catch(error => console.log(error));

        this.socket = io.connect('http://127.0.0.1:7777/chat');
        // this.socket = socket;

        this.socket.on('receiver message', body => {
            // Add message remote
            this.addMessageView(body);
        });

        this.view = new ListAndChatView(document.getElementById(rootElementId), 4, 6);
        this.view.update();

        this.listCol = document.getElementById('listCol');
        this.chatCol = document.getElementById('chatCol');

        this.chatView = new ChatView(this.chatCol);
        this.chatView.update();

        this.eListMessages = document.getElementById('listMessages');
        this.eMessage = document.getElementById('message');
        this.eSend = document.getElementById('send');

        this.checkMessageInput = () => {
            return this.eMessage.value.length > 0;
        }

        this.eSend.addEventListener('click', () => {
            if (this.checkMessageInput()) {
                let body = {
                    text: this.eMessage.value,
                    user: this.user
                }

                this.socket.emit('send message', body);
                // Add message local
                this.addMessageView(body);
                this.eMessage.value = "";

                this.messageService.post(JSON.stringify(body))
                .then(res => res.json())
                .then(res => console.log(res))
                .catch(error => console.log(error));
            }
        });
    }

    addMessageView(message) {
        let rootDiv = document.createElement('div');

        rootDiv.setAttribute('class', this.user._id != message.user._id ? 'd-flex flex-row mb-2 col-12' : 'd-flex flex-row-reverse mb-2 col-12');

        let img = document.createElement('img');
        img.setAttribute('class', 'profileImage');
        img.setAttribute('alt', 'Profile Image');

        let profile = message.user.profilePicture;
        if (profile == 'default' || profile.filename == 'default') {
            img.setAttribute('src', './img/default.png');
        }
        else {
            img.setAttribute('src', profile);
        }
        
        let card = document.createElement('div');
        card.setAttribute('class', 'card shadow-sm');

        let cardBody = document.createElement('div');
        cardBody.setAttribute('class', 'card-body');

        let title = document.createElement('h4');
        title.setAttribute('class', 'card-title');
        title.textContent = message.user.name;

        let textMessage = document.createElement('p');
        textMessage.setAttribute('class', 'card-text');
        textMessage.textContent = message.text;
        
        cardBody.appendChild(title);
        cardBody.appendChild(textMessage);
        card.appendChild(cardBody);
        rootDiv.appendChild(img);
        rootDiv.appendChild(card);
        this.eListMessages.appendChild(rootDiv);
    }
}