import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { ViewProjetComponent } from './view-projet/view-projet.component';
import { ViewCompetenceComponent } from './view-competence/view-competence.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from '../../components/admin-login/admin-login.component'; // Importer le composant
import { AdminDashboardComponent } from '../../components/admin-dashboard/admin-dashboard.component';
import { EnseignantDashboardComponent } from '../../components/enseignant-dashboard/enseignant-dashboard.component';
import { CreateCompetenceComponent } from './create-competence/create-competence.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: "login", component: AdminLoginComponent },
  { path: "admin/dashboard", component: AdminDashboardComponent },
  { path: "enseignant/dashboard", component: EnseignantDashboardComponent },
  { path: "competence/new", component:  CreateCompetenceComponent },
  { path: "projet/new", component:  CreateProjetComponent },
  { path: "view/projet", component:  ViewProjetComponent },
  { path: "view/competence", component:  ViewCompetenceComponent },
  { path: "user/new", component:  CreateUserComponent },
  { path: "student/dashboard", component:  StudentDashboardComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
