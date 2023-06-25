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
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ViewProjetComponent } from './view-projet/view-projet.component';
import { ViewCompetenceComponent } from './view-competence/view-competence.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';




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
    EnseignantDashboardComponent,
    StudentDashboardComponent,
    ViewProjetComponent,
    ViewCompetenceComponent,
    EditProjetComponent,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
