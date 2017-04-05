/**
 * Created by kumi on 2/6/2017.
 */
import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";

@Injectable()
export class applyJobService {
  constructor(private http:Http) {
  }

  private _showJobs = `${apiIp}/jobs/show-jobs`;//displaying jobs
  private _applyJobs = `${apiIp}/postresumes/apply-job`;//posting a job
  private _getJobs = `${apiIp}/jobs/get-jobs-byId`;//posting a job
  private _alreadyapplied = `${apiIp}/postresumes/get-postresume-byId`;


  getJobs() {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });

    return this.http.get(this._showJobs,options)
      .map(res =>  res.json())
      .catch(this.handleError);
  }

  getpostresumebyid(id){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });

    return this.http.get(`${this._alreadyapplied}/${id}/${user.emailAddress}`,options)
      .map(res =>  res.json())
      .catch(this.handleError);
  }

getjobbyid(id){
  const user = storage.get('user');
  const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
  const options = new RequestOptions({ headers });

  return this.http.get(`${this._getJobs}/${id}`,options)
    .map(res =>  res.json())
    .catch(this.handleError);
}

  apply_Job(getvalue) {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    getvalue.emailAddress=user.emailAddress;

    return this.http.post(this._applyJobs, getvalue,options)
      .map(res =>  res.json());
  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
