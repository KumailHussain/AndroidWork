import {Component, OnInit, Input} from '@angular/core';
import {applyJobService} from './applyJob.service'
import { applyJob } from './applyJob'
import {ActivatedRoute} from '@angular/router'
import {isBoolean} from "util";

@Component({
    templateUrl: 'applyJob.component.html',
    styleUrls: ['applyJob.component.css'],
    providers: [applyJobService]

})

export class applyJobComponent implements  OnInit {
  errorString: string;
  @Input() applyjob: applyJob;
  responseStatus: Object = [];
  getvalue:any = [];
  successAlert:boolean;
  id: string;
  message: string;

  constructor(private _applyJobService: applyJobService,private route: ActivatedRoute ) {
      this.successAlert=false;
  }

  submitPost() {

      this._applyJobService.apply_Job(this.getvalue).subscribe(
      data => {
        this.responseStatus = data
      },
      err => err,
    );
      this.successAlert=true;
  }

    ngOnInit() {
    this.applyjob = new applyJob();
      this._applyJobService.getpostresumebyid(this.route.snapshot.params['id']).subscribe(
        data => {
          this.message = data;
          if(this.message==="Can apply to this job") {
            this._applyJobService.getjobbyid(this.route.snapshot.params['id']).subscribe(
              data => {
                this.getvalue = data;
              },
              error => this.errorString = <any> error
            );
          }
        },
        error => this.errorString = <any> error

      );
  }
}
