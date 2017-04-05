import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { SelectedUser } from './selected-user.interface';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { AdminHomeComponent } from './admin-home.component';
import { apiIp } from '../../api.config';

@Injectable()
export class EditUserService {
   public selectedUser: SelectedUser;
   private urlPrefix = 'users';

    constructor(private http: Http) { }

     fetchUsers(): Observable<SelectedUser[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.get(`${apiIp}/${this.urlPrefix}/fetch-users`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

    removeUser(id: String): Observable<Object> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.post(`${apiIp}/${this.urlPrefix}/delete/${id}`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

    updateUser(user: SelectedUser): Observable<SelectedUser> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.put(`${apiIp}/${this.urlPrefix}/update-profile/${user.emailAddress}`, user, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }
}
