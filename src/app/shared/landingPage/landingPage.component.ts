import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {LandingService} from "./landingPage.service";
import { AuthenticationService } from '../../shared/services/authentication.service';
import {landingPage} from "./landingPage";

@Component({
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css'],
  providers: [AuthenticationService]
})

export class LandingPageComponent {

  @Input() getvalue: landingPage;
  @Input() jobLocation:string;
  @Input() jobType:string;
  @Input() jobPlace:string;
  message:string;

  constructor(private router: Router,private landingService:LandingService, private auth: AuthenticationService) {
    this.getvalue=new landingPage();
    this.message=null;
    if(this.auth.isLoggedIn()){
      this.router.navigate(['/dashboard'])
    }
  }


  searchJobs(){
    this.landingService.SearchData[0]=this.jobLocation;
    this.landingService.SearchData[1]=this.jobType;
    this.landingService.SearchData[2]=this.jobPlace;
    this.router.navigate(['/find-job'])
  }
  contactUs(){

      this.landingService.contactUs(this.getvalue)
      .subscribe(
        data => {
          this.message=data;
        },
      )};

}
