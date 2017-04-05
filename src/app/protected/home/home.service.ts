/**
 * Created by kumi on 2/6/2017.
 */
import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import { apiIp } from '../../api.config';
import {storage} from "../../shared/services/storage.service";
@Injectable()
export class HomeService {
  constructor(private http:Http) {


  }

  options:any;
  private _showJobs = `${apiIp}/jobs/show-jobs`;
  private _showIns  = `${apiIp}/institutions/show-institutions`;

  getJobs() {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(this._showJobs,options)
      .map(res =>  res.json())
      .catch(this.handleError);

  }

  getInstitution() {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });

    return this.http.get(this._showIns,options)
        .map(res =>  res.json())
        .catch(this.handleError);

  }


  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
