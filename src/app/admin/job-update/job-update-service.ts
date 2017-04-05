import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { IJob } from '../jobs/job.interface';
import {
 Http, 
 Response, 
 RequestOptions, 
 Headers
} from '@angular/http';
import { apiIp } from '../../api.config';

@Injectable()
export class JobUpdateService {
   private urlPrefix = 'jobs';

    constructor(private http: Http) { }

     fetchJob(id: String): Observable<IJob> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
       
        return this.http.get(`${apiIp}/${this.urlPrefix}/get-jobs-byId/${id}`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

    updateJobStatus(job: IJob, id: String): Observable<IJob> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.put(`${apiIp}/${this.urlPrefix}/update/${id}`,{"jobStatus":true}, options)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json().error));
    }

    updateJob(job: IJob, id: String): Observable<IJob> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.put(`${apiIp}/${this.urlPrefix}/update/${id}`, job, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }
}
