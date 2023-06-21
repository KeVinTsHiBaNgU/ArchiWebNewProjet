import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component';
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';
import { UserModalComponent } from '../../components/user-modal/user-modal.component';
import { CreateCompetenceComponent } from './create-competence/create-competence.component';



@NgModule({
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    DataTablesModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    CreateCompetenceComponent,
    UserModalComponent,
    AdminLoginComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
