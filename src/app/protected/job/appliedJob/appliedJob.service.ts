import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import { appliedJobComponent } from './appliedJob.component';
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";
@Injectable()

export class AppliedJobService {

  constructor(private http:Http) {
  }

  private _jobUrl = `${apiIp}/postresumes/get-jobs-byEmail`;
  private _showIns  = `${apiIp}/institutions/show-institutions`;

  getJobsByEmail(){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(`${this._jobUrl}/${user.emailAddress}`,options)
      .map(res =>res.json())
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
