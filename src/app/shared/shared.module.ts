import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { ChasingDotsComponent } from './spinners/chasing-dots.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { AsyncComponent } from './components/async.component';
import { TableComponent } from  './components/table.component';
import { KeysPipe } from './pipes/transform-keys.pipe';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [FormsModule,CommonModule, SharedRoutingModule],
  declarations: [ChasingDotsComponent, LandingPageComponent, AsyncComponent, TableComponent, KeysPipe ],
  providers: [KeysPipe],
  exports: [AsyncComponent, TableComponent, LandingPageComponent]
})
export class SharedModule { }
