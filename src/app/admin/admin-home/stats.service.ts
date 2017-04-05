import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { IStats } from './selected-user.interface';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { apiIp } from '../../api.config';

@Injectable()
export class StatsService {

    constructor(private http: Http) { }

     fetchStats(): Observable<IStats> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.get(`${apiIp}/stats`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }
}
