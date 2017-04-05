import {Component, OnInit, Input} from '@angular/core';
import {EditInstitutionService} from "./editInstitution.service";
import {Institution} from '../institution';

@Component({
    templateUrl: 'editInstitution.component.html',
    styleUrls: ['editInstitution.component.css'],
  providers: [EditInstitutionService]
})

export class EditInstitutionComponent implements OnInit{
  institutionInfo:Object= [];
  @Input() updatedInfo: Institution;
  errorString:string;
  notification:string;

  constructor(private _editInstitutionService: EditInstitutionService){
  this.notification=null;
  }


  submitPost(){
      this.notification=null;

      this._editInstitutionService.updateInstitution(this.updatedInfo)
      .subscribe(
        data => {
          this.updatedInfo=data;
          this.getInstituion();
          this.notification="done";
        },
        error => this.errorString = <any> error
      );

  }
  ngOnInit(){

    this.updatedInfo= new Institution();
    this.getInstituion();

}
getInstituion()
{
    this._editInstitutionService.getInstitutionByEmail()
        .subscribe(
            data => {
                this.institutionInfo=data;
            },
            error => this.errorString = <any> error
        );
}

}
