import { CreateUserController } from "./controllers/CreateUserController.js";
import { ChatController } from "./controllers/ChatController.js";

let createUserController = new CreateUserController('main-content');

createUserController.getUser(user => {
    let chatController = new ChatController('main-content', user);
});