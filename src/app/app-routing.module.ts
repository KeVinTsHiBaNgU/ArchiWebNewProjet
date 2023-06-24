import { CreateUserComponent } from './create-user/create-user.component';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component'; // Importer le composant
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';
import { CreateCompetenceComponent } from './create-competence/create-competence.component';

const routes: Routes = [
  { path: "login", component: AdminLoginComponent },
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "competence/new", component:  CreateCompetenceComponent },
  { path: "projet/new/:id", component:  CreateProjetComponent },
  { path: "user/new", component:  CreateUserComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
