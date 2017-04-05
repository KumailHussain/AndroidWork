import {storage} from "../shared/services/storage.service";
import {Headers, RequestOptions} from "@angular/http";
/**
 * Created by kumi on 2/19/2017.
 */
export class HeaderInfo {
    options: Object;

    constructor() {
        const user = storage.get('user');
        const headers = new Headers({'Content-Type': 'application/json', 'Authorization': user.token});
        this.options = new RequestOptions({headers});
    }
}
