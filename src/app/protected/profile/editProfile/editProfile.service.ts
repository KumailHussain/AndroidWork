import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";
import {profile} from "../profile";

@Injectable()
export class editProfileService {
  constructor(private http:Http) {


  }

  private _showuser = `${apiIp}/users/edit-profile`;//displaying user credentials
  private _edituser = `${apiIp}/users/update-profile`;
  private _postUserCv = `${apiIp}/usercv/update-usercv`;//posting a job



  postcv(data:profile) {
    const user = storage.get('user');
    const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
    const options = new RequestOptions({headers});
    data.emailAddress=user.emailAddress;
    return this.http.put(`${this._postUserCv}`,(data), options)
        .map(res => res.json());
  }


  getUser() {
    const user = storage.get('user');
    const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
    const options = new RequestOptions({ headers });
    return this.http.get(`${this._showuser}/${user.emailAddress}`,options)
      .map(res =>  res.json())
      .catch(this.handleError);

  }
updateUserProfile(profile){
  const user = storage.get('user');
  const headers = new Headers({ 'Content-Type': 'application/json','Authorization':user.token});
  const options = new RequestOptions({ headers });
  return this.http.put(`${this._edituser}/${user.emailAddress}`,JSON.stringify(profile),options)
    .map(res =>  res.json());

}

  private handleError (error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
