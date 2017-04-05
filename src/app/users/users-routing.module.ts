import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const usersRoutes: Routes = [
  { path: 'signin',  component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UsersRoutingModule { }
