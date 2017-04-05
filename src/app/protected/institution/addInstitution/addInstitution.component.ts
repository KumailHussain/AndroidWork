import {Component, OnInit, Input} from '@angular/core';
import {AddInstitutionService} from './addInstitution.service';
import {Institution} from '../institution';
import {InstitutionHomeService} from "../institutionHome/institutionHome.service";
import {Router} from '@angular/router'

@Component({
    templateUrl: 'addInstitution.component.html',
    styleUrls: ['addInstitution.component.css'],
  providers: [AddInstitutionService,InstitutionHomeService]
})

export class AddInstitutionComponent implements OnInit{
  institutions: any=[];
  errorString: string;
  institutionCheck: Object;
  validateInstitution:boolean;
  addNotification:boolean;
  customCityValidation:boolean;
  customIndustryValidation:boolean;

  @Input() institution:Institution;

  constructor(private _institutionService: AddInstitutionService,private _institutionHomeService: InstitutionHomeService,private router:Router){
  }
  
  ngOnInit() {
    this.addNotification=false;
    this.institution= new Institution();
    this.institution.industryType="Select Industry";
    this.institution.cityName="Select City";
    this.checkInstitution();
  }

    removeIndustryValidation()
    {
        this.customIndustryValidation=false;
    }

    removeCityValidation()
    {
        this.customCityValidation=false;
    }

   onSubmit(){
      if (this.institution.industryType=="Select Industry"){
          this.customIndustryValidation = true;
      }
      else if (this.institution.cityName=="Select City"){
           this.customCityValidation= true;
       }
      else {
          this.customIndustryValidation=false;
          this.customCityValidation=false;
          this._institutionService.postApi(this.institution).subscribe();
          this.addNotification=true;
          this.validateInstitution=true;
      }
   }

  checkInstitution()
  {
    this._institutionHomeService.getInstitutionByEmail()
        .subscribe(
            data => {
              this.institutionCheck = data;
              if(this.institutionCheck==null)
              {
                this.validateInstitution=true;
              }
              else
              {
                this.validateInstitution=false;
              }
            },
            error => this.errorString = <any> error
        );
  }
}
