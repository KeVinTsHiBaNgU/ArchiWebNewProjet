import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateProjetComponent } from './create-projet/create-projet.component';
import { ViewProjetComponent } from './view-projet/view-projet.component';
import { ViewCompetenceComponent } from './view-competence/view-competence.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component'; // Importer le composant
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EnseignantDashboardComponent } from './enseignant-dashboard/enseignant-dashboard.component';
import { CreateCompetenceComponent } from './create-competence/create-competence.component';
import { EditProjetComponent } from './edit-projet/edit-projet.component';
import { UserProfileComponent  } from './user-profile/user-profile.component';


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
  { path: "student/dashboard", component:  StudentDashboardComponent },
  { path: 'projet/edit/:id', component: EditProjetComponent },
  { path: 'user/profile', component: UserProfileComponent  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
