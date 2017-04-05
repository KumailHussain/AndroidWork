import {Component, OnInit, Input} from '@angular/core';
import {postJobService} from './postJob.service'
import { Job } from './postJob'

@Component({
    templateUrl: 'postJob.component.html',
    styleUrls: ['postJob.component.css'],
    providers: [postJobService]

})

export class postJobComponent implements  OnInit {

  errorString: string;
  @Input() postjob:Job;
  institution: string;
  validInstitution:boolean;
  responseStatus:Object= [];
  status:boolean ;

  constructor(private _postJobService: postJobService,)
  {
    this.status = false;
  }

  submitPost()
  {
    this.postjob.institutionName=this.institution;
    this._postJobService.postJob(this.postjob).subscribe(
      data => (this.responseStatus = data),
      err => err,

    );
    this.postjob=new Job;
    this.status = true;
  }

  ngOnInit() {
    this.postjob = new Job();

    this._postJobService.getInstitutionByEmail()
      .subscribe(
        data => {

          if(data==null) {
            this.validInstitution=false;
          }
          else {
            this.institution = data.institutionName;
            this.validInstitution=true;
               }
        },
        error => this.errorString = <any> error
      );
  }
}
