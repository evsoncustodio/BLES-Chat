import { View } from "./View.js";

export class CreateUserView extends View {
    constructor(element) {
        super(element);
    }

    template() {
        return `
        <div class="col-4">
            <div class="card shadow-sm">
                <form class="card-body" id="createUserForm">
                    <div class="form-group">
                        <label class="card-title" for="username">Username:</label>
                        <input class="form-control" type="text" name="username" id="username" placeholder="Entre com o seu username" required>
                    </div>
                    <div class="form-group">
                        <label class="card-title" for="chooseFile">Foto Perfil:</label>
                        <img class="form-control" id="profilePicture" src="./img/default.png" alt="Image Default" style="height: inherit;">
                        <input class="from-control-file" type="file" name="chooseFile" id="chooseFile">
                    </div>
                    <div class="form-group">
                        <input class="form-control btn btn-primary" type="submit" value="Confirmar" id="confirmar" name="confirmar" disabled="disabled">
                    </div>
                </form>
            </div>
        </div>
        `;
    }
}