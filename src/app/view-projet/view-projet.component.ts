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
}
