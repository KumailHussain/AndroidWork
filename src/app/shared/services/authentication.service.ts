import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SigninComponent } from '../../users/signin/signin.component';
import { SignupComponent } from '../../users/signup/signup.component';
import {
 Http, 
 Response, 
 RequestOptions, 
 Headers
} from '@angular/http';
import { storage } from './storage.service';
import { apiIp } from '../../api.config';

@Injectable()
export class AuthenticationService {
    private urlPrefix = 'users';

    private urlPrefix2 = 'usercv';

    constructor(private http: Http, private router: Router) {
        this.initSession = this.initSession.bind(this);
    }

    initSession(user: any) {
        storage.set('user', user);
        
        if (this.isAdmin()) {
            this.router.navigate(['admin/home']);
        } else {
            this.router.navigate(['dashboard']);  
        }
    }

    isLoggedIn() {
        return Boolean(storage.get('user'));
    }

    isAdmin() : Boolean {
        const user = storage.get('user');
        return _.includes(user.roles, 'admin');
    }
    
    signin(credentials: Object): Observable<SigninComponent> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
       
        return this.http.post(`${apiIp}/${this.urlPrefix}/signin`, credentials, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }
    
    signup(credentials: Object): Observable<SignupComponent> {
        // Keep it dry
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.post(`${apiIp}/${this.urlPrefix}/signup`, credentials, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }


}
