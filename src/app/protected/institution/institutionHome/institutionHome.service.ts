import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import { InstitutionHomeComponent } from './institutionHome.component';
import {Institution} from "../institution";
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";
@Injectable()

export class InstitutionHomeService {

  constructor(private http:Http) {
  }

  private _institutionsUrl = `${apiIp}/institutions/get-institutions-byEmail`;
  private _getJobs = `${apiIp}/jobs/get-jobs-byEmail`;
  private _deleteJobs = `${apiIp}/jobs//delete`;


  deletejobbyid(job){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.delete(`${this._deleteJobs}/${job._id}`,options)
      .map(res => res.json())
      .catch(this.handleError);
  }


  getInstitutionByEmail(){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(`${this._institutionsUrl}/${user.emailAddress}`,options)
      .map(res => <Institution> res.json())
      .catch(this.handleError);

  }
  getjobbyEmail(){

    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(`${this._getJobs}/${user.emailAddress}`,options)
      .map(res => res.json())
      .catch(this.handleError);
  }


  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
