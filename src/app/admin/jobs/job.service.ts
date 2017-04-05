import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { IJob } from './job.interface';
import {
 Http, 
 Response, 
 RequestOptions, 
 Headers
} from '@angular/http';
import { apiIp } from '../../api.config';

@Injectable()
export class AdminJobService {
    private urlPrefix = 'jobs';
    constructor(private http: Http) { }

     fetchJobs(): Observable<IJob[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
       
        return this.http.get(`${apiIp}/${this.urlPrefix}/show-jobs`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

    deleteJob(id: String): Observable<Object> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.delete(`${apiIp}/${this.urlPrefix}/delete/${id}`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }
}
