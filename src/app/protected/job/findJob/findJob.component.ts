import {Component, OnInit, Input} from '@angular/core';
import {findJobService} from './findjob.service'
import {LandingService} from "../../../shared/landingPage/landingPage.service";
import {AuthenticationService} from "../../../shared/services/authentication.service";
import * as _ from 'lodash';

@Component({
    templateUrl: 'findJob.component.html',
    styleUrls: ['findJob.component.css'],
    providers: [findJobService,AuthenticationService]
})

export class findJobComponent implements  OnInit {


    searchData:any=[];
    findjob:any;
    jobExist:boolean;
    selectedWorkout1:string;
    selectedWorkout2:string;
    selectedWorkout3:string;
    valuei:any

    constructor(private _findJobService: findJobService,private landingService: LandingService,private auth: AuthenticationService){
    }

    onlocationChange(event:string)
    {
        this.searchData[0]=event;
    }

    onIndustryChange(event:string)
    {
        this.searchData[1]=event;
    }

    searchJobs()
    {
        this._findJobService.searchJobs(this.searchData)
            .subscribe(
                data => {
                    this.findjob = _.filter(data, data => data.jobStatus == true);
                    if(this.findjob.length==0)
                    {
                        this.jobExist=false;
                    }
                    else {
                        this.jobExist=true;
                    }
                },

            );
    }

  onPlaceChange(event:string) {

    this.searchData[2]=event;

  }

  ngOnInit() {
    this.selectedWorkout1="place";
    this.selectedWorkout2="industry";
    this.selectedWorkout3="city";
        this.searchData = this.landingService.SearchData;

        if (this.searchData.length>0) {

            this.searchJobs();
        }
        else {
           {
                this._findJobService.getJobs()
                .subscribe(
                    data => {
                        this.findjob = _.filter(data, data => data.jobStatus == true);
                                           },
                );
            }
        }
    }
}
