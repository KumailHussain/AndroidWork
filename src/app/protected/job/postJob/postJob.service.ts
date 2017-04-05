import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import { Job } from './postJob'
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";

@Injectable()
export class postJobService {
  constructor(private http:Http) {

  }

  private _showJobs = `${apiIp}/jobs/show-jobs`;//displaying jobs
  private _postJobs = `${apiIp}/jobs/add-job`;//posting a job
  private _institutionsUrl = `${apiIp}/institutions/get-institutions-byEmail`;

  getJobs() {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(this._showJobs,options)
      .map(res =>  res.json())
      .catch(this.handleError);

  }

  postJob(job:Job) {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    job.emailAddress=user.emailAddress;
    return this.http.post(this._postJobs, job, options)
      .map(res =>  res.json());
  }

  getInstitutionByEmail(){
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(`${this._institutionsUrl}/${user.emailAddress}`,options)
      .map(res =>  res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
