import { Component } from '@angular/core';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../app/shared/services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})

export class AppComponent {
  public isLoggedIn: Boolean;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.bind(['verifyAuth']);
    router.events.forEach(this.verifyAuth);
}

bind(methods) {
  if (Array.isArray(methods)) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }
}
  verifyAuth(e) {
    if (e instanceof NavigationEnd) {
       const isAnonymous: Boolean = e.url !== '/signin' && e.url !== '/signup';
       if (isAnonymous) {
          this.isLoggedIn = this.auth.isLoggedIn();
       }
    }
  }
  getDefaultStyles() {
    if (this.auth.isLoggedIn()) {
      return {
        paddingTop: '10px',
        paddingLeft:'45px',
      }; 
    } else {
        return {
          paddingTop: '10px',
          paddingLeft:'0px'
      };
    }
  }
}
