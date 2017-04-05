import {Component, OnInit, Input} from '@angular/core';
import {InstitutionHomeService} from './institutionHome.service';
import {Institution} from '../institution';
import {profile} from "../../profile/profile";

@Component({
    templateUrl: 'institutionHome.component.html',
    styleUrls: ['institutionHome.component.css'],
    providers: [InstitutionHomeService]
})

export class InstitutionHomeComponent implements OnInit {
  errorString: string;
  profileInfo: any;
  jobs:any;
  validatePostedJob:boolean;
  validateInstituion:boolean;
  @Input()  jobTitle:string;

  constructor(private _institutionService: InstitutionHomeService) {
      this.validatePostedJob=true;

  }

  public deletejob(job) {
    this._institutionService.deletejobbyid(job)
      .subscribe(
        error => this.errorString = <any> error
      );
this.getjobsbyemail();
  }

  public getjobsbyemail() {
    this._institutionService.getjobbyEmail()
      .subscribe(
        data => {
          this.jobs = data;
        },
        error => this.errorString = <any> error
      );
  }

  ngOnInit() {
    this.jobTitle=null;
    this._institutionService.getInstitutionByEmail()
      .subscribe(
        data => {
            if(data==null)
            {
                this.validateInstituion=false
            }
            else
            {
                this.profileInfo = data;
                this.validateInstituion=true;


            }

        },
        error => this.errorString = <any> error
      );

    this._institutionService.getjobbyEmail()
      .subscribe(
        data => {
          this.jobs = data;
          if(this.jobs.length>0) {
             this.validatePostedJob=true;
          }
          else {
              this.validatePostedJob=false;
          }

        },
        error => this.errorString = <any> error
      );
  }
}
