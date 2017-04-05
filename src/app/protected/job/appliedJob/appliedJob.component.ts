import {Component, OnInit, Input} from '@angular/core';
import {AppliedJobService} from "./appliedJob.service";
import {takeUntil} from "rxjs/operator/takeUntil";

@Component({
    templateUrl: 'appliedJob.component.html',
    styleUrls: ['appliedJob.component.css'],
  providers: [AppliedJobService]
})

export class appliedJobComponent implements OnInit{
  jobData: any=[];
errorString:string;
institutions:any;
appliedNotification:boolean;
  constructor(private _appliedJobService: AppliedJobService){

  }

  ngOnInit() {
      this.jobData=null;

      this._appliedJobService.getJobsByEmail()
      .subscribe(
        data => {
          this.jobData=data;
          if(this.jobData.length>0)
          {
              this.appliedNotification=false;
          }
          else {
              this.appliedNotification=true;
          }
        },
        error => this.errorString = <any> error
      );

    this._appliedJobService.getInstitution()
      .subscribe(
        data => {
          this.institutions=data;
        },
        error => this.errorString = <any> error
      );
}
}

