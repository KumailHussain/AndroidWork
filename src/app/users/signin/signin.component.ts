import { Component } from '@angular/core';
import { UserSignin } from '../users.interface';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
    providers: [AuthenticationService]
})

export class SigninComponent {
    public user: UserSignin;
    response:Object;
    validLogin:boolean;
    public notification: string;


    constructor(private auth: AuthenticationService) {
       this.user = this.assignDefaultValues();
   }

    assignDefaultValues() {
    return {
        emailAddress: '',
        password: ''
    };
}

    login(value: UserSignin)
    { this.auth.signin(value).subscribe(data => {
        this.response=data;
        
        if (this.response === 'Incorrect email or password') {
                this.notification = 'Incorrect email or password';
            } else {
                this.notification = '';
                this.auth.initSession(this.response);
            }
        }
      );

    }



 }
