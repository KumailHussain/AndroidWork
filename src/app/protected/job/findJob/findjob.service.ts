import { Injectable }     from '@angular/core';
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {apiIp} from "../../../api.config";
import {storage} from "../../../shared/services/storage.service";

@Injectable()
export class findJobService {
    constructor(private http: Http) {}

    private _getJobs = `${apiIp}/jobs/get-jobs-byloc`;//posting a job
    private _getIndustry = `${apiIp}/jobs/get-jobs-byInd`;//posting a job
    private _showJobs = `${apiIp}/show-jobs`;//displaying jobs
    private _searchApi = `${apiIp}/get-Search`;//displaying jobs

    getJobs() {
        return this.http.get(this._showJobs)
            .map(res => res.json())
    }

    searchJobs(location: Object) {
        return this.http.get(`${this._searchApi}/${location[0]}/${location[1]}/${location[2]}`)
            .map(res => res.json())
    }
}
