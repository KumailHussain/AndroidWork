import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";

@Injectable()
export class EditInstitutionService {
  constructor(private http:Http) {
  }

  private _institutionsUrl = `${apiIp}/institutions/get-institutions-byEmail`;
  private _editinstitution = `${apiIp}/institutions/edit-institutions-byEmail`;



  getInstitutionByEmail(){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(`${this._institutionsUrl}/${user.emailAddress}`,options)
      .map(res =>  res.json())
      .catch(this.handleError);

  }
  updateInstitution(institution){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
        return this.http.put(`${this._editinstitution}/${user.emailAddress}`,JSON.stringify(institution),options)
      .map(res =>  res.json());

  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
