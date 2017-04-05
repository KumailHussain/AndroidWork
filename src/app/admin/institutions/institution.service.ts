import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Institution } from './institution.interface';
import {
 Http, 
 Response, 
 RequestOptions, 
 Headers
} from '@angular/http';
import { apiIp } from '../../api.config';

@Injectable()
export class InstitutionService {
    private urlPrefix = 'institutions';
    constructor(private http: Http) { }

     fetchInstitutions(): Observable<Institution[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
       
        return this.http.get(`${apiIp}/${this.urlPrefix}/show-institutions`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }

    deleteInstitution(id: String): Observable<Object> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers });
       
        return this.http.put(`${apiIp}/${this.urlPrefix}/delete/${id}`, options)
        .map(res => res.json())
        .catch(err => Observable.throw(err.json().error));
    }
}
