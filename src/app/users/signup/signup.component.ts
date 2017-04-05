import { Component } from '@angular/core';
import { UserSignup } from '../users.interface';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    providers: [AuthenticationService]
})

export class SignupComponent {
    public user: UserSignup;
    public notification: string;
    public notificationExist: string;

    response: Object;

   constructor(private auth: AuthenticationService) {
       this.user = this.assignDefaultValues();
       this.notification = '';
       this.notificationExist=''
   }

    assignDefaultValues(){
    return {
        emailAddress: '',
        firstName: '',
        lastName: '',
        password: '',
        dateOfBirth: '',
        phoneNumber: null,

    };
}

    register(value: UserSignup) {
        this.auth.signup(value).subscribe(data => {
            this.response = data;
            if (this.response === 'Email Already Exist') {
                this.notificationExist = 'Email Already Exist';
                this.notification = '';

            }
            else {
                this.notification = 'Successfully registered.';
                this.notificationExist = '';

                this.user = this.assignDefaultValues();
            }

        }
    );
}
}
