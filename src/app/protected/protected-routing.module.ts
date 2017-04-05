import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthenticationGuard } from '../shared/services/authentication-guard.service';
import { HomeComponent } from './home/home.component';
import { applyJobComponent} from './job/applyJob/applyJob.component'
import { appliedJobComponent} from './job/appliedJob/appliedJob.component'
import { postJobComponent} from './job/postJob/postJob.component'
import { FormsModule }   from '@angular/forms';
import { AddInstitutionComponent } from './institution/addInstitution/addInstitution.component';
import { EditInstitutionComponent } from './institution/editInstitution/editInstitution.component';
import {InstitutionHomeComponent} from "./institution/institutionHome/institutionHome.component";
import { findJobComponent} from './job/findJob/findJob.component'
import { showProfileComponent} from './profile/showProfile/showProfile.component'
import {editProfileComponent} from "./profile/editProfile/editProfile.component";

const protectedRoutes: Routes = [
  { path: 'dashboard',  component: HomeComponent,canActivate: [AuthenticationGuard]},
  { path: 'add-institution',  component: AddInstitutionComponent,canActivate: [AuthenticationGuard] },
  { path: 'apply-job', component: applyJobComponent,canActivate: [AuthenticationGuard]},
  { path: 'applied-job', component: appliedJobComponent,canActivate: [AuthenticationGuard]},
  { path: 'post-job', component: postJobComponent,canActivate: [AuthenticationGuard]},
  { path: 'find-job', component: findJobComponent},
  { path: 'institution', component: InstitutionHomeComponent,canActivate: [AuthenticationGuard]},
  { path: 'show-profile', component: showProfileComponent,canActivate: [AuthenticationGuard]},
  { path: 'edit-profile', component: editProfileComponent,canActivate: [AuthenticationGuard]},
  { path: 'edit-institution', component: EditInstitutionComponent,canActivate: [AuthenticationGuard]},

];

@NgModule({
  imports: [
    RouterModule.forChild(protectedRoutes),
    [FormsModule],
  ],
  exports: [
    RouterModule
  ]
})

export class ProtectedRoutingModule { }
