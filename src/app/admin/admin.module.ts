import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAuthenticationGuard } from '../shared/services/admin-authentication-guard.service';
import { AdminInstitutionComponent } from './institutions/institution.component';
import { InstitutionUpdateComponent } from './institution-update/institution-update.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { EditUserService } from './admin-home/edit-user.service';
import { StatsService } from './admin-home/stats.service';
import { InstitutionService } from './institutions/institution.service';
import { AdminJobService } from './jobs/job.service';
import { InstitutionUpdateService } from './institution-update/institution-update-service';
import { JobUpdateService } from './job-update/job-update-service';
import { JobUpdateComponent } from './job-update/job-update.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AdminJobComponent } from './jobs/job.component';
import {viewAppliedJobComponent} from "./viewAppliedJobs/viewAppliedJob.component";

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, AdminRoutingModule],
  declarations: [AdminComponent, AdminHomeComponent, UserUpdateComponent,
    AdminInstitutionComponent, InstitutionUpdateComponent, AdminJobComponent, JobUpdateComponent,viewAppliedJobComponent],
  exports: [],
  providers: [EditUserService, StatsService, InstitutionService, InstitutionUpdateService, AdminJobService, JobUpdateService, AdminAuthenticationGuard]
})
export class AdminModule { }
