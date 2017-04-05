import {Component, OnInit, Input} from '@angular/core';
import {editProfileService} from './editProfile.service'
import {editProfile} from "./editProfile";
import {storage} from "../../../shared/services/storage.service";
import {profile} from "../profile";
import {UploadedFile} from "ng2-uploader";
import {showProfileService} from "../showProfile/showProfile.service";
import {apiIp} from "../../../api.config";

@Component({
    templateUrl: 'editProfile.component.html',
    styleUrls: ['editProfile.component.css'],
  providers: [editProfileService,showProfileService]

})

export class editProfileComponent {

    uploadFile: any;
    options:Object;
    private _UserImage = `${apiIp}/images`;//posting a job
    private _PostUserImage = `${apiIp}/file/image-upload`;//posting a job
    editdata:profile;
    responseStatus:Object= [];
    errorString:string;
    errorMessage:any;
    sizeLimit:20000;
    imageUrl:string;
    cvData:profile;
    fireOnce:Number;
    profileInfo:Object= [];
    notification:string;
  @Input() updatedInfo: editProfile;

  constructor(private _editProfileService: editProfileService,private showprofile:showProfileService) {
        this.notification=null;
         const  store=storage.get('user');
         this.fireOnce=0;
         this.options = {
         url:`${this._PostUserImage}/${store.emailAddress}` ,
          }
  }

    handleUpload(data): void {

        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            this.editdata.image=this.uploadFile.filename;
            this.imageUrl=`${this._UserImage}/${this.editdata.image}`;

            if(this.fireOnce==0) {
                  this._editProfileService.postcv(this.editdata).subscribe(
                  data => (this.responseStatus = data),
                  err => err,
              );
          }

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

    beforeUpload(uploadingFile: UploadedFile): void {
        if (uploadingFile.size > this.sizeLimit)
        {
            uploadingFile.setAbort();
            this.errorMessage = 'File is too large!';
        }
    }


  submitPost()
  {
      this.notification=null;

      this._editProfileService.updateUserProfile(this.updatedInfo).subscribe(
      data => {
        this.updatedInfo = data;
        let user = storage.get('user');
          user=Object.assign({},user,{firstName: data.firstName, lastName: data.lastName });
          storage.set('user',user);
          this.notification="done";
          this.loadProfile();


      },
          err => err,
    );
  }

  ngOnInit() {

    this.updatedInfo= new editProfile();
    this.editdata=new profile();
    this.cvData=new profile();
    this.imageUrl=null;
    this.loadResume();
    this.loadProfile();

  }
  loadProfile(){
      this._editProfileService.getUser()
          .subscribe(
              data => {
                  this.profileInfo=data;
              },
              error => this.errorString = <any> error
          );

  }
    loadResume()
    {
        this.showprofile.getemail()
            .subscribe(
                data => {
                    this.cvData = data;
                    if (this.cvData.image != null) {

                        this.imageUrl = `${this._UserImage}/${this.cvData.image}`;
                    }
                    if (this.cvData.image== null){
                        this.imageUrl = `${this._UserImage}/${"default.png"}`;
                    }

                },
                error => this.errorString = <any> error
            );
    }
}
