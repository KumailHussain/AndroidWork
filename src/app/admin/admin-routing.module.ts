import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AdminAuthenticationGuard } from '../shared/services/admin-authentication-guard.service';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminInstitutionComponent } from './institutions/institution.component';
import { AdminJobComponent } from './jobs/job.component';
import { InstitutionUpdateComponent } from './institution-update/institution-update.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import {showProfileComponent} from "../protected/profile/showProfile/showProfile.component";
import {viewAppliedJobComponent} from "./viewAppliedJobs/viewAppliedJob.component";

const protectedRoutes: Routes = [
    { path: 'admin',
      component: AdminComponent,
      canActivate: [AdminAuthenticationGuard],
      children: [
        { path: 'home', component: AdminHomeComponent },
        { path: 'user-update', component: UserUpdateComponent},
        { path: 'institutions', component: AdminInstitutionComponent },
        { path: 'institution/:id', component: InstitutionUpdateComponent },
        { path: 'jobs', component: AdminJobComponent },
        { path: 'job/:id', component: JobUpdateComponent },
        { path: 'view-profile', component: showProfileComponent},
        { path: 'view-appliers/:id', component: viewAppliedJobComponent},

      ]
}];

@NgModule({
    imports: [RouterModule.forChild(protectedRoutes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
