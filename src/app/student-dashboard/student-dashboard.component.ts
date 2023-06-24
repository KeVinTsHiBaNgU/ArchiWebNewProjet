
import { CompetenceService } from './../../../services/competence.service';

import { UserService} from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import  {User}  from 'backend/models/User';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  user!: User;
  allProjects!: any[];
  competencesacquises: any[]=[];
  projetsInscrits!: any[]

  constructor(
    private userService: UserService,
    private projetService: ProjetService,
    private skillService: CompetenceService
  ) { }

  ngOnInit() {
    // Récupérer les informations de l'utilisateur connecté
    this.userService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;
        if(this.user.CompetencesAcquises !== null && this.user.CompetencesAcquises !== undefined)
        this.competencesacquises=this.user.CompetencesAcquises;
        if(this.user.projetsInscrits !== null && this.user.projetsInscrits !== undefined)
        this.projetsInscrits=this.user.projetsInscrits;
        // Récupérer tous les projets (y compris ceux dans lesquels l'utilisateur est inscrit)
        this.projetService.getProjets().subscribe(
          (projects: any[]) => {
            this.allProjects = projects;
          },
          (error) => {
            console.error('Erreur lors de la récupération de tous les projets', error);
          }
        );
       
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', error);
      }
    );
  }
}
