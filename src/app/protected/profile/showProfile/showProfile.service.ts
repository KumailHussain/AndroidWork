/**
 * Created by kumi on 2/20/2017.
 */
import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";
import {profile} from "../profile";
import {FileUploader} from "ng2-file-upload";

@Injectable()
export class showProfileService {
    constructor(private http: Http) {

    }

    private _getProfile = `${apiIp}/users/edit-profile`;//displaying jobs
    private _postUserCv = `${apiIp}/usercv/update-usercv`;//posting a job
    private _getemail = `${apiIp}/usercv/get-UserCv-byEmail`;//displaying jobs

    getemail()
    {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        const options = new RequestOptions({headers});
        return this.http.get(`${this._getemail}/${user.emailAddress}`, options)
            .map(res => res.json())
            .catch(this.handleError);
    }


    getprofile() {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        const options = new RequestOptions({headers});
        return this.http.get(`${this._getProfile}/${user.emailAddress}`, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getUserByEmail(emailAddress)
    {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        const options = new RequestOptions({headers});
        return this.http.get(`${this._getemail}/${emailAddress}`, options)
            .map(res => res.json())
            .catch(this.handleError);
    }


    getProfileByEmail(emailAddress) {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        const options = new RequestOptions({headers});
        return this.http.get(`${this._getProfile}/${emailAddress}`, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

   postprofile(data:profile) {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        const options = new RequestOptions({headers});
        data.emailAddress=user.emailAddress;
        return this.http.put(`${this._postUserCv}`,(data), options)
            .map(res => res.json());
    }
    postcv(data:profile) {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        const options = new RequestOptions({headers});
        data.emailAddress=user.emailAddress;
        return this.http.put(`${this._postUserCv}`,(data), options)
            .map(res => res.json());
    }

    private handleError(error: Response) {
       return Observable.throw(error.json().error || 'Server error');
    }
}
