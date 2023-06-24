import { Component } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-view-projet',
  templateUrl: './view-projet.component.html',
  styleUrls: ['./view-projet.component.css']
})
export class ViewProjetComponent {
  projets!: any[];
  

  constructor( private projetService: ProjetService, private router: Router) { }

  ngOnInit() {
    this.getProjets();
    
  }

  onAjouterProjet() {
    this.router.navigate(['/projet/new']);
  }

  getProjets() {
    this.projetService.getProjets()
      .subscribe(
        projets => {
          this.projets = projets;
        },
        error => {
          console.error(error);
          // Gérer l'erreur de récupération des projets
        }
        );
      }


      deleteProjet(projetId: string) {
        this.projetService.deleteProjet(projetId).subscribe(() => {
          // Suppression réussie, mettez à jour la liste des compétences
          this.getProjets();
        }, (error) => {
          console.error(error);
          // Gérer l'erreur de suppression de compétence
        });
      }

      editProjet(projetId: string) {
        // Redirigez vers la page de modification du projet avec l'identifiant du projet en tant que paramètre
        this.router.navigate(['/projet/edit', projetId]);
      } 
      
}
