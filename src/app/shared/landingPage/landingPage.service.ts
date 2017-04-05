import {Injectable} from "@angular/core";
import {Http,Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';
import {apiIp} from "../../api.config";
import {storage} from "../../shared/services/storage.service"
/**
 * Created by kumi on 3/9/2017.
 */
@Injectable()
export class LandingService {
    SearchData:any=[];

  constructor(private http:Http) {
  }

  private _contact = `${apiIp}/contact/contactUs`;

  contactUs(getvalue) {

    return this.http.post(this._contact, getvalue)
      .map(res =>  res.json());
  }
}
