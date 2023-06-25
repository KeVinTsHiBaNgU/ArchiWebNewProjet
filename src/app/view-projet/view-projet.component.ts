import { Component } from '@angular/core';
import { ProjetService } from '../../../services/projet.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
        Swal.fire({
          title: 'Confirmation',
          text: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            // L'utilisateur a confirmé la suppression, procédez à la suppression du projet
            this.projetService.deleteProjet(projetId).subscribe(
              () => {
                // Suppression réussie, mettez à jour la liste des projets
                this.getProjets();
                Swal.fire('Supprimé', 'Le projet a été supprimé avec succès', 'success');
              },
              (error) => {
                console.error(error);
                Swal.fire('Erreur', 'Une erreur s\'est produite lors de la suppression du projet', 'error');
              }
            );
          }
        });
      }
    
      editProjet(projetId: string) {
        // Redirigez vers la page de modification du projet avec l'identifiant du projet en tant que paramètre
        this.router.navigate(['/projet/edit', projetId]);
      } 
      
}
