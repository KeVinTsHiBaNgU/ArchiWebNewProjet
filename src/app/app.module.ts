import { AdminDashboardComponent } from './../../components/admin-dashboard/admin-dashboard.component';
import { EnseignantDashboardComponent } from './../../components/enseignant-dashboard/enseignant-dashboard.component';
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
import { CreateCompetenceComponent } from './create-competence/create-competence.component';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { CreateUserComponent } from './create-user/create-user.component';




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
    AdminLoginComponent,
    CreateProjetComponent,
    CreateUserComponent,
    AdminDashboardComponent,
    EnseignantDashboardComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
