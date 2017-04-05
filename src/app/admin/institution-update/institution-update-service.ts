import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Institution } from '../institutions/institution.interface';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { apiIp } from '../../api.config';

@Injectable()
export class InstitutionUpdateService {
   private urlPrefix = 'institutions';

    constructor(private http: Http) { }

     fetchInstitution(id: String): Observable<Institution> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.get(`${apiIp}/${this.urlPrefix}/institution/${id}`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

    updateInstitution(institution: Institution, id: String): Observable<Institution> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });

        return this.http.put(`${apiIp}/${this.urlPrefix}/update/${id}`, institution, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

}
