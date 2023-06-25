
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
  user!: any;
  allProjects!: any[];
  competencesacquises: any[]=[];
  autre_projets!: any[];
  projetsInscrits!: any[];
  userId?:string

  constructor(
    private userService: UserService,
    private projetService: ProjetService,
    private competenceService: CompetenceService
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
        
        
       
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur connecté', error);
      }
    );
    
     // Charger les compétences depuis le service compétence
     this.projetService.getOtherProjets().subscribe((data: any[]) => {
      this.autre_projets = data;
    });

  }
  sInscrire(projetId: string): void {
    // Récupérer l'ID de l'étudiant actuel
  

    this.projetService.inscriptionProjet(projetId).subscribe(
      () => {
        // Succès de l'inscription au projet
        console.log('Inscription réussie');
        // Effectuer les actions supplémentaires nécessaires, par exemple actualiser la liste des projets, etc.
      },
      (error) => {
        // Erreur lors de l'inscription au projet
        console.error('Erreur lors de l\'inscription au projet', error);
        // Gérer l'erreur et afficher un message approprié à l'utilisateur
      }
    );
  }

}
