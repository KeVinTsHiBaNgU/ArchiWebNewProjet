import { CompetenceService } from './../../../services/competence.service';

import { UserService} from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import  {User}  from 'backend/models/User';
import {projet} from 'backend/models/projet';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  user!: User;
  allProjects!: Projet[];
  

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private skillService: SkillService
  ) { }

  ngOnInit() {
    // Récupérer les informations de l'utilisateur connecté
    this.userService.getCurrentUser().subscribe(
      (user: User) => {
        this.user = user;
        // Récupérer les projets dans lesquels l'utilisateur est inscrit
        this.projectService.getSubscribedProjects(user.id).subscribe(
          (projects: Project[]) => {
            this.subscribedProjects = projects;
          },
          (error) => {
            console.error('Erreur lors de la récupération des projets inscrits', error);
          }
        );
        // Récupérer tous les projets (y compris ceux dans lesquels l'utilisateur est inscrit)
        this.projectService.getAllProjects().subscribe(
          (projects: Project[]) => {
            this.allProjects = projects;
          },
          (error) => {
            console.error('Erreur lors de la récupération de tous les projets', error);
          }
        );
        // Récupérer les compétences acquises par l'utilisateur
        this.skillService.getAcquiredSkills(user.id).subscribe(
          (skills: Skill[]) => {
            this.acquiredSkills = skills;
          },
          (error) => {
            console.error('Erreur lors de la récupération des compétences acquises', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', error);
      }
    );
  }
}
