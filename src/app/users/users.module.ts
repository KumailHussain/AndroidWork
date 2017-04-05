import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [CommonModule, UsersRoutingModule, FormsModule, RouterModule],
  declarations: [SigninComponent, SignupComponent],
  exports: [SigninComponent]
})
export class UsersModule { }
