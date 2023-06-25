
import { ActivatedRoute } from '@angular/router';
import { ResultatService } from './../../../services/resultat.service';
import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projet-student',
  templateUrl: './projet-student.component.html',
  styleUrls: ['./projet-student.component.css']
})
export class ProjetStudentComponent implements OnInit {
  projet!: any;
  resultats: any[]=[];
  user!: any;

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private resultatService: ResultatService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const projetId = params['id'];
      this.projetService.getProjetById(projetId).subscribe(
        (projet: any) => {
          this.projet = projet;
          console.log(this.projet);
          
          for (let competence of this.projet.competences) {
            this.resultatService.getResultat(competence._id).subscribe(
              (result: any) => {
                this.resultats.push(result);
              },
              error => {
                console.error(error);
                // Gérer l'erreur de récupération des détails du projet
              }
            );
          }
        },
        error => {
          console.error(error);
          // Gérer l'erreur de récupération des détails du projet
        }
      );
    });
  }
  

  editResult(competenceId: string) {
    // Redirigez vers la page de modification du projet avec l'identifiant du projet en tant que paramètre
    this.router.navigate(['result/edit/', competenceId]);
  } 

}
