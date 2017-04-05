import { CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule  } from 'ng2-bootstrap';
import { LayoutModule } from './layout/layout.module';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProtectedModule } from './protected/protected.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { PageNotFoundComponent } from './shared/components/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    LayoutModule,
    AdminModule,
    ProtectedModule,
    SharedModule,
    UsersModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
