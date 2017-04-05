import {Component, OnInit, Input, NgZone} from '@angular/core';
import {HeaderComponent}from '../../../layout/header/header.component'
import {storage} from "../../../shared/services/storage.service";
import {showProfileService} from "./showProfile.service";
import {profile} from "../profile";
import {apiIp} from "../../../api.config";
import { NgUploaderOptions } from 'ngx-uploader';
import {UploadedFile} from "ng2-uploader";
import {Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'showProfile.component.html',
  styleUrls: ['showProfile.component.css'],
  providers: [showProfileService],
})

export class showProfileComponent implements OnInit{
  editdata:profile;
  user :Object;
  cvData:profile;
  row:boolean;
  row2:boolean;
  fileExist:boolean;
  file:File;
  fileUrl:string;
  options:Object;
  errorString:string;
  responseStatus:Object= [];
  fileUrl2:string;
  disableEditing:boolean;
  private _UserImage = `${apiIp}/images`;//posting a job
  private _UserCv = `${apiIp}/uploads`;//posting a job
  private _PostUserCv = `${apiIp}/file/file-upload`;//posting a job
  emailAddress:any;
  uploadFile: any;
  errorMessage:any;
  sizeLimit:2000;
  fireOnce:Number;

  constructor(private showprofile:showProfileService,private route: ActivatedRoute)
  {
    this.row2=false;
    this.row=false;
    this.fileExist=false;
    this.fireOnce=0;
    const  store=storage.get('user');
    this.options = {
      url:`${this._PostUserCv}/${store.emailAddress}` ,
    };
     }

  handleUpload(data): void {

    if (data && data.response)
    {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      this.editdata.file = this.uploadFile.filename;
      this.fileUrl=`${this._UserCv}/${this.editdata.file}`;

      if(this.fireOnce==0) {
        this.showprofile.postcv(this.editdata).subscribe(

            data => {
              this.responseStatus = data;
                  },

            err => err,
        );

      }

      if(this.fireOnce==1)
      {
        this.fireOnce=0;
      }
      else
      {
        this.fireOnce=1;
      }
    }

  }

  beforeUpload(uploadingFile: UploadedFile): void {
    if (uploadingFile.size > this.sizeLimit)
    {
      uploadingFile.setAbort();
      this.errorMessage = 'File is too large!';
    }
  }
  addSkillRow()
  {
    this.row=true;
  }
  addExpRow()
  {
    this.row2=true;
  }
  addSkill()
  {
    this.row=false;
    let newItems:any[] = [];

    for (var element in this.cvData.skill)
    {  // map over the data type
      let marker = this.cvData.skill[element];
      newItems.push(marker);
    }

    newItems.push(this.editdata.skill)
    this.editdata.skill=newItems;

    this.showprofile.postprofile(this.editdata).subscribe(
        data => (this.responseStatus = data,
        this.loadResume()),
        err => err,
        );
  }

  addExp()
  {
    this.row2=false;
    let newItems:any[] = [];

    for (var element in this.cvData.experience)
    {
      let marker = this.cvData.experience[element];
      newItems.push(marker);
    }

    newItems.push(this.editdata.experience)
    this.editdata.experience=newItems;

    this.showprofile.postprofile(this.editdata).subscribe(
        data => (this.responseStatus = data, this.loadResume()),
        err => err,
    );
  }

  ngOnInit() {

    this.user = new profile();
    this.editdata = new profile();
    this.cvData = new profile();
    this.cvData.file = null;
    this.fileUrl = null;
    this.emailAddress = this.route.snapshot.params['emailAddress'];

    if (this.emailAddress!=null) {

      this.disableEditing=true;
      this.showprofile.getProfileByEmail(this.emailAddress)
          .subscribe(
              data => {

                this.user = data;
              },
              error => this.errorString = <any> error
          );

      this.showprofile.getUserByEmail(this.emailAddress)
          .subscribe(
              data => {
                this.cvData = data;

                if(this.cvData.file!=null)
                {
                  this.fileUrl = `${this._UserCv}/${this.cvData.file}`;//injecting URL to download file
                }
                if(this.cvData.image!=null)
                {
                  this.fileUrl2 = `${this._UserImage}/${this.cvData.image}`;
                }
                if (this.cvData.image== null)
                {
                  this.fileUrl2 = `${this._UserImage}/${"default.png"}`;
                }
              },
              error => this.errorString = <any> error
          );
    }

    else {

      this.disableEditing=false;
      this.loadProfile();
      this.loadResume();
    }
  }
    loadProfile()
    {

      this.showprofile.getprofile()
          .subscribe(
              data => {

                this.user = data;

              },
              error => this.errorString = <any> error
          );
    }
    loadResume()
    {
      this.editdata = new profile();
      this.showprofile.getemail()
          .subscribe(
              data => {
                this.cvData = data;

                if(this.cvData.file!=null)
                {
                  this.fileUrl = `${this._UserCv}/${this.cvData.file}`;//injecting URL to download file
                }
                if(this.cvData.image!=null)
                {
                  this.fileUrl2 = `${this._UserImage}/${this.cvData.image}`;
                }
                if (this.cvData.image== null)
                {
                  this.fileUrl2 = `${this._UserImage}/${"default.png"}`;
                }

              },
              error => this.errorString = <any> error
          );
    }
}
