import { CreateUserView } from "../views/CreateUserView.js";
import { HttpService } from "../services/HttpService.js";

export class CreateUserController {
    constructor(rootElementId) {
        this.view = new CreateUserView(document.getElementById(rootElementId));
        this.view.update();

        this.fileService = new HttpService('/file');
        this.userService = new HttpService('/user');

        this.eCreateUserForm = document.getElementById('createUserForm');
        this.eUsername = document.getElementById('username');
        this.eChooseFile = document.getElementById('chooseFile');
        this.eProfilePicture = document.getElementById('profilePicture');
        this.eConfirmar = document.getElementById('confirmar');

        this.checkUser = () => {
            if (this.eUsername.value.length) {
                this.eConfirmar.removeAttribute('disabled');
            }
            else {
                this.eConfirmar.setAttribute('disabled', 'disabled');
            }
        };

        this.eUsername.addEventListener('input', this.checkUser);

        this.eCreateUserForm.addEventListener('submit', event => {
            event.preventDefault();
            this.fileService.post(this.blob, {
                'Content-type': 'application/octet-stream',
                filename: this.file ? this.file.name : 'default'
            })
            .then(res => res.json())
            .then(res => this.userService.post(JSON.stringify({
                name: this.eUsername.value,
                profilePicture: res._id
            })))
            .then(res => res.json())
            .then(res => {
                this.user = res;
                this.user.profilePicture = this.urlBlob;
                this.cb(this.user);
                // this.user.profilePicture = this.blob;
            })
            .catch(error => console.log(error));
        });

        this.eChooseFile.addEventListener('change', event => {
            this.file = event.target.files[0];
        
            let reader = new FileReader();
            reader.readAsArrayBuffer(this.file);
        
            reader.onloadstart = () => {
                this.checkUser();
            }
        
            reader.onload = () => {
                this.blob = new Blob([reader.result], { type: 'application/octet-stream' });
                this.eConfirmar.removeAttribute('disabled');
                this.urlBlob = URL.createObjectURL(this.blob);
                this.eProfilePicture.src = this.urlBlob;
            }
        });
    }

    getUser(cb) {
        this.cb = cb;
    }
}