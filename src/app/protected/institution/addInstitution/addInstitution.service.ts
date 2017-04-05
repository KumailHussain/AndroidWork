import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import { AddInstitutionComponent } from './addInstitution.component';
import {Institution} from "../institution";
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";

@Injectable()
export class AddInstitutionService {

  constructor(private http:Http) {
  }

  private    _addUrl =`${apiIp}/institutions/add-institution`;
  private _institutionsUrl = `${apiIp}/institutions/show-institutions`;//displaying jobs


  getInstitutions() {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });

    return this.http.get(this._institutionsUrl,options)

      .map(res => res.json())
      .catch(this.handleError);

  }
  postApi(institution:Institution) {
/*
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options= new RequestOptions({headers})
*/
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    institution.emailAddress=user.emailAddress;
    return this.http.post(this._addUrl, institution,options)

      .map(res => res.json())
      .catch(this.handleError);

  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
