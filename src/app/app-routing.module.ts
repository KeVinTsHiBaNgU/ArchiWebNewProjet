import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component'; // Importer le composant
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';
import { CreateCompetenceComponent } from './create-competence/create-competence.component';

const routes: Routes = [
  { path: "login", component: AdminLoginComponent },
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "competence/new/he", component:  CreateCompetenceComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
