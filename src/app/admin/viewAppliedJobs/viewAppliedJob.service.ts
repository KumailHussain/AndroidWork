import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import {apiIp} from "../../api.config";
import {storage} from "../../shared/services/storage.service";
@Injectable()

export class viewAppliedJobService {
  private _viewAppliedJobs = `${apiIp}/postresumes/get-viewAppliedJobs`;//displaying jobs

  constructor(private http:Http) {
  }

  getAppliedJobs(id) {
    const user = storage.get('user');
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
    const options = new RequestOptions({headers});
    return this.http.get(`${this._viewAppliedJobs}/${id}`, options)
        .map(res => res.json())
  }

}
