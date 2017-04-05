import { Component, DoCheck } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { storage } from '../../shared/services/storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [AuthenticationService]
})
export class HeaderComponent implements DoCheck {
    isLoggedIn: Boolean;
    user: Object;
    isAdmin:Boolean;
    checkRole:Boolean;
    constructor(private auth: AuthenticationService) {
        this.isLoggedIn = this.auth.isLoggedIn();
        this.isAdmin=false;
    }

// TODO: Verify with routing. We donot want to check on any change across the app.
    ngDoCheck() {
        if (this.auth.isLoggedIn()) {
            this.user = storage.get('user');
            this.isLoggedIn = this.auth.isLoggedIn();
            this.checkRole=this.auth.isAdmin();

        }
    }

    logout() {
        storage.clear();
    }

    admin() {
        this.isAdmin=true;
    }
    users() {
        this.isAdmin=false;
    }

}
