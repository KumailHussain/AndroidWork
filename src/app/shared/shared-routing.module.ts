import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landingPage/landingPage.component';
import {LandingService} from "./landingPage/landingPage.service";

const sharedRoutes: Routes = [
  { path: 'index',  component: LandingPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(sharedRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers:[
    LandingService,
  ]
})

export class SharedRoutingModule { }
