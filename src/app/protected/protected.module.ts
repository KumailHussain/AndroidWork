import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { postJobComponent } from './job/postJob/postJob.component';
import { applyJobComponent } from './job/applyJob/applyJob.component';
import { appliedJobComponent} from './job/appliedJob/appliedJob.component'
import { findJobComponent } from './job/findJob/findJob.component';
import { AddInstitutionComponent } from './institution/addInstitution/addInstitution.component';
import { EditInstitutionComponent } from './institution/editInstitution/editInstitution.component';
import { InstitutionHomeComponent } from './institution/institutionHome/institutionHome.component';
import { showProfileComponent} from './profile/showProfile/showProfile.component';
import { FormsModule } from '@angular/forms';
import { ProtectedRoutingModule } from './protected-routing.module';
import { AuthenticationService } from '../shared/services/authentication.service';
import { AuthenticationGuard } from '../shared/services/authentication-guard.service';
import { CommonModule } from '@angular/common'
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
import { SharedModule } from '../shared/shared.module';
import {editProfileComponent} from "./profile/editProfile/editProfile.component";

@NgModule({
  imports: [FormsModule, ProtectedRoutingModule, SharedModule, CommonModule],

  declarations: [UPLOAD_DIRECTIVES,HomeComponent, AddInstitutionComponent, applyJobComponent, postJobComponent, InstitutionHomeComponent, findJobComponent, showProfileComponent, editProfileComponent,
                 appliedJobComponent,EditInstitutionComponent],
  exports: [HomeComponent, AddInstitutionComponent, applyJobComponent, postJobComponent, InstitutionHomeComponent, findJobComponent, showProfileComponent, editProfileComponent],
  providers: [AuthenticationService, AuthenticationGuard],
})
export class ProtectedModule { }
