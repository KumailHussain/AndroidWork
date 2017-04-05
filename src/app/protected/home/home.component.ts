import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {HomeService} from './home.service'
import { Home } from './home'
import {templateVisitAll} from "@angular/compiler";
import {Job} from "../job/postJob/postJob";
import {ActivatedRoute,Params} from '@angular/router'
import {storage} from "../../shared/services/storage.service";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [HomeService]
})

export class HomeComponent implements  OnInit {
    jobData: any;
    institutionData: any;
    errorString: string;
    responseStatus: Object = [];
    status: boolean;
    options: Object;
    user: any;

    constructor(private _homeService: HomeService) {
        this.user = storage.get('user');
    }

    ngOnInit() {
        this._homeService.getJobs()
            .subscribe(
                data => {
                    this.jobData = data;
                },
                error => this.errorString = <any> error
            );

        this._homeService.getInstitution()
            .subscribe(
                data => {
                    this.institutionData = data;
                },
                error => this.errorString = <any> error
            );
    }
}
